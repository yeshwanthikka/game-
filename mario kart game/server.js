const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { initDb, dbAll, dbGet, dbRun } = require('./db.js');

const app = express();
const PORT = process.env.PORT || 8085;
const JWT_SECRET = process.env.JWT_SECRET || 'star_runner_mario_secret_key_2026';

app.use(cors());
app.use(express.json());

// Serve static assets
app.use(express.static(path.join(__dirname)));

// Serve login page explicitly
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// JWT Auth Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Authentication token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Session expired or invalid token' });
    req.user = user;
    next();
  });
}

// 1. REGISTER
app.post('/api/auth/register', async (req, res) => {
  try {
    const { gmail, nickname, password, character_customization } = req.body;

    if (!gmail || !nickname || !password) {
      return res.status(400).json({ error: 'Gmail, Nickname and Password are required' });
    }

    // Gmail / Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(gmail)) {
      return res.status(400).json({ error: 'Please enter a valid email address (e.g. yourname@gmail.com)' });
    }

    if (nickname.trim().length < 2 || nickname.trim().length > 20) {
      return res.status(400).json({ error: 'Nickname must be between 2 and 20 characters' });
    }

    if (password.length < 4) {
      return res.status(400).json({ error: 'Password must be at least 4 characters long' });
    }

    // Check existing
    const existing = await dbGet('SELECT * FROM users WHERE LOWER(gmail) = LOWER(?) OR LOWER(nickname) = LOWER(?)', [gmail.trim(), nickname.trim()]);
    if (existing) {
      if (existing.gmail.toLowerCase() === gmail.trim().toLowerCase()) {
        return res.status(409).json({ error: 'This Gmail address is already registered' });
      }
      return res.status(409).json({ error: 'This Runner Nickname is already taken' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const customJson = character_customization ? JSON.stringify(character_customization) : JSON.stringify({
      skin: '#ffd6a5', hat: '#3a86ff', shirt: '#ff6b6b', pants: '#2b2d42'
    });

    const result = await dbRun(`
      INSERT INTO users (gmail, nickname, password_hash, level, best_score, coins, character_customization)
      VALUES (?, ?, ?, 1, 0, 0, ?)
    `, [gmail.trim().toLowerCase(), nickname.trim(), passwordHash, customJson]);

    const newUser = await dbGet('SELECT id, gmail, nickname, level, best_score, coins, character_customization FROM users WHERE id = ?', [result.lastID]);
    const token = jwt.sign({ id: newUser.id, nickname: newUser.nickname }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Pilot registered successfully!',
      token,
      user: {
        ...newUser,
        character_customization: JSON.parse(newUser.character_customization || '{}')
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Internal server error during registration' });
  }
});

// 2. LOGIN
app.post('/api/auth/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({ error: 'Gmail / Nickname and Password are required' });
    }

    const cleanIdentifier = identifier.trim().toLowerCase();
    const user = await dbGet(
      'SELECT * FROM users WHERE LOWER(gmail) = ? OR LOWER(nickname) = ?',
      [cleanIdentifier, cleanIdentifier]
    );

    if (!user) {
      return res.status(401).json({ error: 'Account not found with this Gmail or Nickname' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign({ id: user.id, nickname: user.nickname }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        gmail: user.gmail,
        nickname: user.nickname,
        level: user.level,
        best_score: user.best_score,
        coins: user.coins,
        character_customization: JSON.parse(user.character_customization || '{}')
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error during login' });
  }
});

// 3. GET CURRENT PROFILE
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await dbGet('SELECT id, gmail, nickname, level, best_score, coins, character_customization FROM users WHERE id = ?', [req.user.id]);
    if (!user) return res.status(404).json({ error: 'User profile not found' });

    res.json({
      user: {
        ...user,
        character_customization: JSON.parse(user.character_customization || '{}')
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// 4. SYNC PROGRESS (Score, Level, Coins, Customization)
app.post('/api/user/progress', authenticateToken, async (req, res) => {
  try {
    const { score, level, coinsToAdd, character_customization } = req.body;
    const userId = req.user.id;

    const current = await dbGet('SELECT * FROM users WHERE id = ?', [userId]);
    if (!current) return res.status(404).json({ error: 'User not found' });

    const newBestScore = Math.max(current.best_score, Number(score) || 0);
    const newLevel = Math.max(current.level, Number(level) || 1);
    const newCoins = current.coins + (Number(coinsToAdd) || 0);
    const newCustomization = character_customization ? JSON.stringify(character_customization) : current.character_customization;

    await dbRun(`
      UPDATE users
      SET best_score = ?, level = ?, coins = ?, character_customization = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [newBestScore, newLevel, newCoins, newCustomization, userId]);

    // Record score run if score provided
    if (score && score > 0) {
      await dbRun(`
        INSERT INTO scores (user_id, nickname, score, level)
        VALUES (?, ?, ?, ?)
      `, [userId, current.nickname, score, level || current.level]);
    }

    const updatedUser = await dbGet('SELECT id, gmail, nickname, level, best_score, coins, character_customization FROM users WHERE id = ?', [userId]);

    res.json({
      message: 'Progress synchronized with database',
      user: {
        ...updatedUser,
        character_customization: JSON.parse(updatedUser.character_customization || '{}')
      }
    });
  } catch (err) {
    console.error('Progress sync error:', err);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

// 5. LEADERBOARD
app.get('/api/leaderboard', async (req, res) => {
  try {
    const leaders = await dbAll(`
      SELECT nickname, best_score, level, coins
      FROM users
      ORDER BY best_score DESC, level DESC
      LIMIT 10
    `);
    res.json({ leaderboard: leaders });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load leaderboard' });
  }
});

// Start Server after DB Init
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`=============================================`);
    console.log(`Star Runner Backend Active on http://localhost:${PORT}/`);
    console.log(`SQLite database connected: star_runner.sqlite`);
    console.log(`=============================================`);
  });
}).catch((err) => {
  console.error('Database initialization failed:', err);
});
