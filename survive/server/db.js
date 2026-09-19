import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, 'survive_and_run.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
  }
});

// Helper for promise-based queries
export function dbRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

export function dbGet(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

export function dbAll(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export async function initDB() {
  // Users table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Runs table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS runs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      username TEXT NOT NULL,
      outcome TEXT NOT NULL, -- 'extracted' or 'killed'
      survival_time_sec REAL NOT NULL,
      kills INTEGER DEFAULT 0,
      resources_collected INTEGER DEFAULT 0,
      cause_of_death TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // Bestiary entries / kill stats per player
  await dbRun(`
    CREATE TABLE IF NOT EXISTS bestiary (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      creature_type TEXT UNIQUE NOT NULL,
      display_name TEXT NOT NULL,
      danger_level TEXT NOT NULL,
      description TEXT NOT NULL,
      total_kills INTEGER DEFAULT 0
    )
  `);

  // Seed default bestiary data if empty
  const count = await dbGet('SELECT COUNT(*) as count FROM bestiary');
  if (count.count === 0) {
    const seedCreatures = [
      {
        type: 'swarm',
        name: 'Acid Skitterer',
        danger: 'Medium (in packs)',
        desc: 'Fast, fragile arachnid-like xenomorphs that hunt in swarms. Disorienting and overwhelming in open dunes.',
        kills: 0
      },
      {
        type: 'stalker',
        name: 'Dusk Stalker',
        danger: 'High',
        desc: 'Solitary, cunning apex predator. Cloaks itself in shadows and actively pursues vulnerable explorers.',
        kills: 0
      },
      {
        type: 'passive',
        name: 'Spore Grazer',
        danger: 'Low / Harmless',
        desc: 'Luminescent herbivore wandering near alien flora. Yields vital bio-fuel and repair materials when harvested.',
        kills: 0
      }
    ];

    for (const c of seedCreatures) {
      await dbRun(
        `INSERT INTO bestiary (creature_type, display_name, danger_level, description, total_kills)
         VALUES (?, ?, ?, ?, ?)`,
        [c.type, c.name, c.danger, c.desc, c.kills]
      );
    }
  }

  console.log('Database initialized successfully with schema and seed data.');
}

export default db;
