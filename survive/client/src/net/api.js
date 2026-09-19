const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001/api';

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('alien_survival_token') || null;
    this.user = JSON.parse(localStorage.getItem('alien_survival_user') || 'null');
  }

  setSession(token, user) {
    this.token = token;
    this.user = user;
    localStorage.setItem('alien_survival_token', token);
    localStorage.setItem('alien_survival_user', JSON.stringify(user));
  }

  clearSession() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('alien_survival_token');
    localStorage.removeItem('alien_survival_user');
  }

  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`);
      return await res.json();
    } catch (e) {
      console.warn('API is unreachable, offline mode available:', e.message);
      return null;
    }
  }

  async login(username, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    this.setSession(data.token, data.user);
    return data;
  }

  async register(username, password) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    this.setSession(data.token, data.user);
    return data;
  }

  async submitRun(runData) {
    const headers = { 'Content-Type': 'application/json' };
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;

    try {
      const res = await fetch(`${API_BASE}/runs`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          username: this.user ? this.user.username : 'Scout',
          ...runData
        })
      });
      return await res.json();
    } catch (e) {
      console.warn('Failed to submit run to backend:', e);
      return null;
    }
  }

  async getLeaderboard() {
    try {
      const res = await fetch(`${API_BASE}/leaderboard`);
      return await res.json();
    } catch (e) {
      return { fastestExtraction: [], longestSurvival: [], mostKills: [] };
    }
  }

  async getBestiary() {
    try {
      const res = await fetch(`${API_BASE}/bestiary`);
      return await res.json();
    } catch (e) {
      return [];
    }
  }
}

export const api = new ApiClient();
