// Authentication and SQLite Progress Synchronization Client for Star Runner

class AuthManager {
  constructor() {
    this.token = localStorage.getItem('sr_auth_token') || null;
    this.user = JSON.parse(localStorage.getItem('sr_auth_user') || 'null');
    this.apiBase = '';
  }

  isLoggedIn() {
    return !!(this.token && this.user);
  }

  setSession(token, user) {
    this.token = token;
    this.user = user;
    localStorage.setItem('sr_auth_token', token);
    localStorage.setItem('sr_auth_user', JSON.stringify(user));

    // Synchronize game level and best score with user profile
    if (user.level) {
      const currentLevel = parseInt(localStorage.getItem('sr_unlocked_level') || '1', 10);
      const higherLevel = Math.max(currentLevel, user.level);
      localStorage.setItem('sr_unlocked_level', higherLevel.toString());
      if (window.game) {
        window.game.maxUnlockedLevel = higherLevel;
      }
    }

    if (user.best_score !== undefined) {
      const currentBest = parseInt(localStorage.getItem('sr_best') || '0', 10);
      const higherBest = Math.max(currentBest, user.best_score);
      localStorage.setItem('sr_best', higherBest.toString());
      if (window.game) {
        window.game.bestScore = higherBest;
      }
    }

    // Apply customizer colors if stored
    if (user.character_customization && window.charCustomizer) {
      try {
        const cust = typeof user.character_customization === 'string' 
          ? JSON.parse(user.character_customization) 
          : user.character_customization;
        if (cust && cust.skin) {
          window.charCustomizer.current = { ...window.charCustomizer.current, ...cust };
          window.charCustomizer.saveToStorage();
        }
      } catch (e) {
        console.warn('Could not apply customizer colors from user profile', e);
      }
    }

    this.renderHomeProfile();
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('sr_auth_token');
    localStorage.removeItem('sr_auth_user');
    window.location.href = 'login.html';
  }

  async register(gmail, nickname, password) {
    const cust = window.charCustomizer ? window.charCustomizer.current : null;
    const res = await fetch(`${this.apiBase}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gmail,
        nickname,
        password,
        character_customization: cust
      })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    this.setSession(data.token, data.user);
    return data;
  }

  async login(identifier, password) {
    const res = await fetch(`${this.apiBase}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    this.setSession(data.token, data.user);
    return data;
  }

  async syncProgress(score = 0, level = 1, coinsToAdd = 0) {
    if (!this.isLoggedIn()) return null;

    try {
      const cust = window.charCustomizer ? window.charCustomizer.current : null;
      const res = await fetch(`${this.apiBase}/api/user/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({
          score,
          level,
          coinsToAdd,
          character_customization: cust
        })
      });

      if (res.ok) {
        const data = await res.json();
        this.user = data.user;
        localStorage.setItem('sr_auth_user', JSON.stringify(data.user));
        this.renderHomeProfile();
        return data.user;
      }
    } catch (e) {
      console.warn('Failed to sync progress to database:', e);
    }
    return null;
  }

  async fetchLeaderboard() {
    try {
      const res = await fetch(`${this.apiBase}/api/leaderboard`);
      return await res.json();
    } catch (e) {
      return { leaderboard: [] };
    }
  }

  // Update Home Menu Screen UI (Matching attached picture!)
  renderHomeProfile() {
    const authBar = document.getElementById('home-auth-bar');
    const profileCard = document.getElementById('home-profile-card');
    const bestScoreEl = document.getElementById('home-best-score');

    if (this.isLoggedIn()) {
      if (authBar) authBar.style.display = 'none';
      if (profileCard) {
        profileCard.style.display = 'flex';
        const nickEl = document.getElementById('profile-nickname');
        const emailEl = document.getElementById('profile-email');
        const levelEl = document.getElementById('profile-level');

        if (nickEl) nickEl.textContent = this.user.nickname || 'Star Pilot';
        if (emailEl) emailEl.textContent = this.user.gmail || '';
        if (levelEl) levelEl.textContent = `World 1-${this.user.level || 1}`;
      }

      if (bestScoreEl && this.user.best_score !== undefined) {
        bestScoreEl.textContent = this.user.best_score.toString();
      }
    } else {
      if (authBar) authBar.style.display = 'flex';
      if (profileCard) profileCard.style.display = 'none';
      if (bestScoreEl) {
        bestScoreEl.textContent = (localStorage.getItem('sr_best') || '0').toString();
      }
    }
  }

  initUI() {
    const loginTriggerBtn = document.getElementById('home-login-btn');
    const logoutBtn = document.getElementById('profile-logout-btn');
    const authModal = document.getElementById('auth-modal');
    const authCloseBtn = document.getElementById('auth-close-btn');
    const authGuestBtn = document.getElementById('auth-guest-btn');

    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const authForm = document.getElementById('auth-form');
    const fieldNickname = document.getElementById('field-nickname');
    const authSubmitBtn = document.getElementById('auth-submit-btn');
    const authStatus = document.getElementById('auth-status');

    let currentMode = 'login'; // 'login' or 'register'

    const setMode = (mode) => {
      currentMode = mode;
      if (authStatus) authStatus.textContent = '';
      if (mode === 'login') {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        fieldNickname.style.display = 'none';
        document.getElementById('auth-nickname-input').removeAttribute('required');
        authSubmitBtn.querySelector('span').textContent = 'AUTHENTICATE PILOT';
      } else {
        tabLogin.classList.remove('active');
        tabRegister.classList.add('active');
        fieldNickname.style.display = 'block';
        document.getElementById('auth-nickname-input').setAttribute('required', 'true');
        authSubmitBtn.querySelector('span').textContent = 'CREATE RUNNER ID';
      }
    };

    if (tabLogin) tabLogin.addEventListener('click', () => setMode('login'));
    if (tabRegister) tabRegister.addEventListener('click', () => setMode('register'));

    if (loginTriggerBtn) {
      loginTriggerBtn.addEventListener('click', () => {
        if (authModal) authModal.classList.remove('hidden');
        setMode('login');
      });
    }

    if (authCloseBtn) {
      authCloseBtn.addEventListener('click', () => {
        if (authModal) authModal.classList.add('hidden');
      });
    }

    if (authGuestBtn) {
      authGuestBtn.addEventListener('click', () => {
        if (authModal) authModal.classList.add('hidden');
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        this.logout();
      });
    }

    if (authForm) {
      authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('auth-email-input').value.trim();
        const password = document.getElementById('auth-password-input').value;
        const nickname = document.getElementById('auth-nickname-input').value.trim();

        authStatus.style.color = 'var(--neon-cyan)';
        authStatus.textContent = currentMode === 'login' ? 'Connecting to SQLite Database...' : 'Registering Pilot...';
        authSubmitBtn.disabled = true;

        try {
          if (currentMode === 'login') {
            await this.login(email, password);
          } else {
            await this.register(email, nickname, password);
          }
          authStatus.style.color = 'var(--neon-green)';
          authStatus.textContent = 'Access Granted! Welcome, Pilot.';
          setTimeout(() => {
            if (authModal) authModal.classList.add('hidden');
            authSubmitBtn.disabled = false;
            authStatus.textContent = '';
          }, 600);
        } catch (err) {
          authStatus.style.color = 'var(--neon-pink)';
          authStatus.textContent = err.message || 'Authentication error';
          authSubmitBtn.disabled = false;
        }
      });
    }

    // Leaderboard button & modal
    const lbBtn = document.getElementById('home-leaderboard-btn');
    const lbModal = document.getElementById('leaderboard-modal');
    const lbCloseBtn = document.getElementById('lb-close-btn');

    if (lbBtn && lbModal) {
      lbBtn.addEventListener('click', async () => {
        lbModal.classList.remove('hidden');
        const content = document.getElementById('lb-content');
        content.innerHTML = '<div style="color: var(--neon-cyan); padding: 1rem;">Querying SQLite high scores...</div>';

        const data = await this.fetchLeaderboard();
        if (data.leaderboard && data.leaderboard.length > 0) {
          let html = '<div class="lb-table">';
          data.leaderboard.forEach((p, idx) => {
            const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`;
            html += `
              <div class="lb-row ${this.user && this.user.nickname === p.nickname ? 'highlight' : ''}">
                <span class="lb-rank">${medal}</span>
                <span class="lb-nick">${p.nickname}</span>
                <span class="lb-level">World 1-${p.level}</span>
                <span class="lb-score">${p.best_score} PTS</span>
              </div>
            `;
          });
          html += '</div>';
          content.innerHTML = html;
        } else {
          content.innerHTML = '<div style="color: var(--text-muted); padding: 1rem;">No pilots logged yet. Set the first record!</div>';
        }
      });
    }

    if (lbCloseBtn && lbModal) {
      lbCloseBtn.addEventListener('click', () => {
        lbModal.classList.add('hidden');
      });
    }

    // Initial render of profile
    this.renderHomeProfile();
  }
}

window.authManager = new AuthManager();

window.addEventListener('DOMContentLoaded', () => {
  window.authManager.initUI();
});
