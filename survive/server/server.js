import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { initDB, dbRun, dbGet, dbAll } from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'alien-hostile-planet-survival-key-2026';

app.use(cors());
app.use(express.json());

// Auth Middleware (optional token verification)
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Authentication token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
}

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString(), game: 'Survive and Run API' });
});

// 2. Auth: Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    if (username.length < 3 || password.length < 4) {
      return res.status(400).json({ error: 'Username must be >=3 chars, password >=4 chars' });
    }

    const existingUser = await dbGet('SELECT id FROM users WHERE username = ?', [username.trim()]);
    if (existingUser) {
      return res.status(409).json({ error: 'Username already taken' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const result = await dbRun(
      'INSERT INTO users (username, password_hash) VALUES (?, ?)',
      [username.trim(), passwordHash]
    );

    const token = jwt.sign({ id: result.lastID, username: username.trim() }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: result.lastID, username: username.trim() }
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 3. Auth: Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await dbGet('SELECT * FROM users WHERE username = ?', [username.trim()]);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 4. Runs: Submit completed run
app.post('/api/runs', async (req, res) => {
  try {
    const { username, outcome, survival_time_sec, kills, resources_collected, cause_of_death } = req.body;

    let userId = null;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        userId = decoded.id;
      } catch (e) {
        // Guest submission is also allowed
      }
    }

    const runUsername = username || (userId ? (await dbGet('SELECT username FROM users WHERE id = ?', [userId]))?.username : 'Guest Scout');

    const result = await dbRun(
      `INSERT INTO runs (user_id, username, outcome, survival_time_sec, kills, resources_collected, cause_of_death)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        runUsername,
        outcome || 'killed',
        survival_time_sec || 0,
        kills || 0,
        resources_collected || 0,
        cause_of_death || 'Planet Hazards'
      ]
    );

    // Update bestiary total kills if provided
    if (kills && kills > 0) {
      await dbRun(`UPDATE bestiary SET total_kills = total_kills + ? WHERE creature_type = 'swarm'`, [kills]);
    }

    res.status(201).json({ message: 'Run recorded successfully', runId: result.lastID });
  } catch (err) {
    console.error('Run submission error:', err);
    res.status(500).json({ error: 'Failed to record run' });
  }
});

// 5. Leaderboard: Top runs by category
app.get('/api/leaderboard', async (req, res) => {
  try {
    const fastestExtraction = await dbAll(`
      SELECT username, survival_time_sec, kills, resources_collected, created_at
      FROM runs
      WHERE outcome = 'extracted'
      ORDER BY survival_time_sec ASC
      LIMIT 10
    `);

    const longestSurvival = await dbAll(`
      SELECT username, outcome, survival_time_sec, kills, resources_collected, created_at
      FROM runs
      ORDER BY survival_time_sec DESC
      LIMIT 10
    `);

    const mostKills = await dbAll(`
      SELECT username, outcome, kills, survival_time_sec, resources_collected, created_at
      FROM runs
      ORDER BY kills DESC
      LIMIT 10
    `);

    res.json({
      fastestExtraction,
      longestSurvival,
      mostKills
    });
  } catch (err) {
    console.error('Leaderboard error:', err);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// 6. Bestiary: Creature intel
app.get('/api/bestiary', async (req, res) => {
  try {
    const entries = await dbAll('SELECT * FROM bestiary');
    res.json(entries);
  } catch (err) {
    console.error('Bestiary error:', err);
    res.status(500).json({ error: 'Failed to fetch bestiary' });
  }
});

// 7. My Runs: Player history
app.get('/api/me/runs', authenticateToken, async (req, res) => {
  try {
    const runs = await dbAll(
      'SELECT * FROM runs WHERE user_id = ? ORDER BY created_at DESC LIMIT 20',
      [req.user.id]
    );
    res.json(runs);
  } catch (err) {
    console.error('My runs error:', err);
    res.status(500).json({ error: 'Failed to fetch run history' });
  }
});

// Start server
async function start() {
  await initDB();
  app.listen(PORT, () => {
    console.log(`Alien Survival Backend active on http://localhost:${PORT}`);
  });
}

start();
