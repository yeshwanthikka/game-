const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, 'star_runner.sqlite');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log(`Connected to SQLite database at: ${DB_PATH}`);
  }
});

function initDb() {
  return new Promise((resolve, reject) => {
    db.serialize(async () => {
      // 1. Users Table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          gmail TEXT UNIQUE NOT NULL,
          nickname TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          level INTEGER DEFAULT 1,
          best_score INTEGER DEFAULT 0,
          coins INTEGER DEFAULT 0,
          character_customization TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) return reject(err);
      });

      // 2. Scores / Leaderboard Table
      db.run(`
        CREATE TABLE IF NOT EXISTS scores (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          nickname TEXT NOT NULL,
          score INTEGER NOT NULL,
          level INTEGER NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `, async (err) => {
        if (err) return reject(err);

        // Check if default pilot exists, seed if empty
        db.get('SELECT COUNT(*) as count FROM users', async (err, row) => {
          if (!err && row && row.count === 0) {
            const defaultPass = await bcrypt.hash('password123', 10);
            const defaultCustomization = JSON.stringify({
              skin: '#ffd6a5',
              hat: '#3a86ff',
              shirt: '#ff6b6b',
              pants: '#2b2d42',
              style: 'classic'
            });

            db.run(`
              INSERT INTO users (gmail, nickname, password_hash, level, best_score, coins, character_customization)
              VALUES (?, ?, ?, ?, ?, ?, ?)
            `, ['pilot@gmail.com', 'CosmicRacer', defaultPass, 3, 19200, 150, defaultCustomization], function(seedErr) {
              if (!seedErr) {
                db.run(`
                  INSERT INTO scores (user_id, nickname, score, level)
                  VALUES (?, ?, ?, ?)
                `, [this.lastID, 'CosmicRacer', 19200, 3]);
                console.log('Seeded initial Star Runner pilot: pilot@gmail.com (Score: 19200, Level: 3)');
              }
            });
          }
          resolve();
        });
      });
    });
  });
}

function dbAll(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function dbGet(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function dbRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

module.exports = {
  db,
  initDb,
  dbAll,
  dbGet,
  dbRun
};
