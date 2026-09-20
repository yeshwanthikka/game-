// =========================================================
// STAR RUNNER — DEDICATED AUTHENTICATION LOGIC & BACKGROUND
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Interactive Canvas Background (Parallax Platformer World)
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initStars();
  });

  // Star Particles
  let stars = [];
  function initStars() {
    stars = [];
    for (let i = 0; i < 70; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.7),
        size: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.004 + 0.002
      });
    }
  }
  initStars();

  // Floating Clouds
  const clouds = [
    { x: width * 0.1, y: height * 0.18, scale: 1.1, speed: 0.15 },
    { x: width * 0.55, y: height * 0.12, scale: 0.85, speed: 0.1 },
    { x: width * 0.85, y: height * 0.24, scale: 1.25, speed: 0.2 }
  ];

  function drawCloud(cx, cy, scale) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.arc(18, -10, 24, 0, Math.PI * 2);
    ctx.arc(44, -5, 19, 0, Math.PI * 2);
    ctx.arc(62, 5, 15, 0, Math.PI * 2);
    ctx.arc(26, 10, 17, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Draw Platform with Scalloped Edge and Daisies
  function drawGroundPlatform() {
    const groundH = 80;
    const groundY = height - groundH;

    // Earth body
    const earthGrad = ctx.createLinearGradient(0, groundY, 0, height);
    earthGrad.addColorStop(0, '#4a2c1d');
    earthGrad.addColorStop(1, '#241208');
    ctx.fillStyle = earthGrad;
    ctx.fillRect(0, groundY, width, groundH);

    // Dark outline
    ctx.strokeStyle = '#1a110a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(width, groundY);
    ctx.stroke();

    // Grass Top
    const grassGrad = ctx.createLinearGradient(0, groundY, 0, groundY + 12);
    grassGrad.addColorStop(0, '#10b981');
    grassGrad.addColorStop(1, '#059669');
    ctx.fillStyle = grassGrad;
    ctx.fillRect(0, groundY, width, 12);

    // Scallops
    ctx.fillStyle = '#059669';
    for (let gx = 0; gx < width + 16; gx += 16) {
      ctx.beginPath();
      ctx.arc(gx + 8, groundY + 12, 6, 0, Math.PI, false);
      ctx.fill();
    }

    // Daisies
    for (let fx = 25; fx < width; fx += 75) {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(fx - 2, groundY - 3, 2.5, 0, Math.PI * 2);
      ctx.arc(fx + 2, groundY - 3, 2.5, 0, Math.PI * 2);
      ctx.arc(fx, groundY - 5, 2.5, 0, Math.PI * 2);
      ctx.arc(fx, groundY - 1, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffd60a';
      ctx.beginPath();
      ctx.arc(fx, groundY - 3, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }

    // Road dashes in dirt
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    for (let sx = 20; sx < width; sx += 60) {
      ctx.beginPath();
      ctx.roundRect(sx, groundY + 36, 24, 7, 3);
      ctx.fill();
    }
  }

  // Draw Mario Warp Pipe
  function drawPipe(px, py, pw, ph) {
    ctx.save();
    const pipeGrad = ctx.createLinearGradient(px, 0, px + pw, 0);
    pipeGrad.addColorStop(0, '#1b6e2d');
    pipeGrad.addColorStop(0.2, '#38b000');
    pipeGrad.addColorStop(0.55, '#70e000');
    pipeGrad.addColorStop(0.8, '#38b000');
    pipeGrad.addColorStop(1, '#1b6e2d');

    // Pipe Rim
    ctx.fillStyle = pipeGrad;
    ctx.beginPath();
    ctx.roundRect(px - 4, py, pw + 8, 20, [5, 5, 2, 2]);
    ctx.fill();

    ctx.strokeStyle = '#0d3814';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Pipe Body
    ctx.fillStyle = pipeGrad;
    ctx.beginPath();
    ctx.rect(px, py + 20, pw, ph - 20);
    ctx.fill();
    ctx.stroke();

    // Specular line
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.fillRect(px + 5, py + 2, 6, ph - 4);
    ctx.restore();
  }

  // Draw Question & Brick Blocks
  function drawBlocksFloating(time) {
    const floatY = Math.sin(time * 0.002) * 5;
    const groundY = height - 80;

    // Left Blocks
    if (width > 600) {
      const qx = width * 0.15;
      const qy = groundY - 140 + floatY;
      drawQuestionBlock(qx, qy, 38);
      drawBrickBlock(qx + 38, qy, 38);
      drawQuestionBlock(qx + 76, qy, 38);
    }

    // Right Pipe
    if (width > 700) {
      const pipeX = width * 0.82;
      const pipeH = 65;
      drawPipe(pipeX, groundY - pipeH, 50, pipeH);
    }
  }

  function drawQuestionBlock(bx, by, size) {
    ctx.save();
    ctx.fillStyle = '#ffbe0b';
    ctx.shadowColor = '#ffbe0b';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.roundRect(bx, by, size, size, 5);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.strokeStyle = '#b27b00';
    ctx.lineWidth = 2;
    ctx.stroke();

    // ? symbol
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 18px Orbitron, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('?', bx + size / 2, by + size / 2);
    ctx.restore();
  }

  function drawBrickBlock(bx, by, size) {
    ctx.save();
    ctx.fillStyle = '#a24222';
    ctx.beginPath();
    ctx.roundRect(bx, by, size, size, 4);
    ctx.fill();

    ctx.strokeStyle = '#571e0c';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Mortar lines
    ctx.fillStyle = '#571e0c';
    ctx.fillRect(bx, by + size / 2 - 1, size, 2);
    ctx.fillRect(bx + size / 2 - 1, by, 2, size / 2);
    ctx.fillRect(bx + size / 4 - 1, by + size / 2, 2, size / 2);
    ctx.restore();
  }

  function renderAnimation(time) {
    ctx.clearRect(0, 0, width, height);

    // 1. Sky Gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
    skyGrad.addColorStop(0, '#0e0e24');
    skyGrad.addColorStop(0.45, '#201538');
    skyGrad.addColorStop(1, '#cb7254');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Celestial Moon
    const moonX = width * 0.82;
    const moonY = Math.min(height * 0.22, 130);
    const moonR = 44;

    const glow = ctx.createRadialGradient(moonX, moonY, moonR * 0.6, moonX, moonY, moonR * 2.5);
    glow.addColorStop(0, 'rgba(255, 248, 220, 0.35)');
    glow.addColorStop(0.5, 'rgba(255, 214, 165, 0.12)');
    glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonR * 2.5, 0, Math.PI * 2);
    ctx.fill();

    const moonBody = ctx.createRadialGradient(moonX - 8, moonY - 8, 4, moonX, moonY, moonR);
    moonBody.addColorStop(0, '#ffffff');
    moonBody.addColorStop(0.8, '#ffeedb');
    moonBody.addColorStop(1, '#ffd6a5');
    ctx.fillStyle = moonBody;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
    ctx.fill();

    // 3. Twinkling Stars
    for (let s of stars) {
      const twinkle = Math.sin(time * s.twinkleSpeed + s.x) * 0.35 + 0.65;
      ctx.globalAlpha = s.alpha * twinkle;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // 4. Clouds
    for (let c of clouds) {
      c.x += c.speed;
      if (c.x > width + 100) c.x = -150;
      drawCloud(c.x, c.y, c.scale);
    }

    // 5. Far Purple Hills
    const farBaseY = height - 70;
    ctx.fillStyle = '#211736';
    ctx.beginPath();
    ctx.moveTo(-50, height);
    for (let i = -1; i < 15; i++) {
      const mx = i * 200;
      const hillH = 90 + ((i % 3) * 25);
      ctx.quadraticCurveTo(mx + 100, farBaseY - hillH, mx + 200, farBaseY);
    }
    ctx.lineTo(width + 100, height);
    ctx.closePath();
    ctx.fill();

    // 6. Midground Green/Teal Hills
    ctx.fillStyle = '#163528';
    ctx.beginPath();
    ctx.moveTo(-50, height);
    for (let i = -1; i < 20; i++) {
      const hx = i * 140;
      const hillH = 60 + ((i % 4) * 15);
      ctx.quadraticCurveTo(hx + 70, farBaseY - hillH + 15, hx + 140, farBaseY + 15);
    }
    ctx.lineTo(width + 100, height);
    ctx.closePath();
    ctx.fill();

    // 7. Ground Platform & Floating Blocks
    drawBlocksFloating(time);
    drawGroundPlatform();

    requestAnimationFrame(renderAnimation);
  }
  requestAnimationFrame(renderAnimation);

  // =========================================================
  // 2. Authentication Logic & Form Handling
  // =========================================================
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const groupNickname = document.getElementById('group-nickname');
  const inputEmail = document.getElementById('input-email');
  const inputNickname = document.getElementById('input-nickname');
  const inputPassword = document.getElementById('input-password');
  const btnSubmit = document.getElementById('btn-submit');
  const submitText = document.getElementById('submit-text');
  const btnGuest = document.getElementById('btn-guest');
  const authFeedback = document.getElementById('auth-feedback');
  const authForm = document.getElementById('auth-form');

  let mode = 'login'; // 'login' or 'register'

  function setMode(newMode) {
    mode = newMode;
    authFeedback.textContent = '';
    authFeedback.className = 'auth-feedback';

    if (mode === 'login') {
      tabLogin.classList.add('active');
      tabRegister.classList.remove('active');
      groupNickname.style.display = 'none';
      inputNickname.removeAttribute('required');
      submitText.textContent = 'START RUNNING ▶';
    } else {
      tabLogin.classList.remove('active');
      tabRegister.classList.add('active');
      groupNickname.style.display = 'flex';
      inputNickname.setAttribute('required', 'true');
      submitText.textContent = 'CREATE RUNNER ID & PLAY ▶';
    }
  }

  tabLogin.addEventListener('click', () => setMode('login'));
  tabRegister.addEventListener('click', () => setMode('register'));

  // Quick Guest Play
  btnGuest.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  // Handle Form Submit
  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = inputEmail.value.trim();
    const password = inputPassword.value;
    const nickname = inputNickname.value.trim();

    authFeedback.className = 'auth-feedback';
    authFeedback.textContent = mode === 'login' ? 'Connecting to SQLite database...' : 'Registering Runner profile...';
    btnSubmit.disabled = true;

    try {
      const url = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const bodyPayload = mode === 'login' 
        ? { identifier: email, password }
        : { gmail: email, nickname, password };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Save token and user profile into localStorage
      localStorage.setItem('sr_auth_token', data.token);
      localStorage.setItem('sr_auth_user', JSON.stringify(data.user));

      if (data.user) {
        if (data.user.level) {
          const currentLevel = parseInt(localStorage.getItem('sr_unlocked_level') || '1', 10);
          localStorage.setItem('sr_unlocked_level', Math.max(currentLevel, data.user.level).toString());
        }
        if (data.user.best_score !== undefined) {
          const currentBest = parseInt(localStorage.getItem('sr_best') || '0', 10);
          localStorage.setItem('sr_best', Math.max(currentBest, data.user.best_score).toString());
        }
      }

      authFeedback.className = 'auth-feedback success';
      authFeedback.textContent = `Access Granted! Welcome ${data.user?.nickname || 'Runner'}! Entering game...`;

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 500);

    } catch (err) {
      authFeedback.className = 'auth-feedback error';
      authFeedback.textContent = err.message || 'An error occurred during authentication';
      btnSubmit.disabled = false;
    }
  });

  // Check if already logged in and display welcome option
  const existingUserStr = localStorage.getItem('sr_auth_user');
  if (existingUserStr) {
    try {
      const existingUser = JSON.parse(existingUserStr);
      if (existingUser && existingUser.nickname) {
        authFeedback.className = 'auth-feedback success';
        authFeedback.textContent = `Logged in as ${existingUser.nickname} (World 1-${existingUser.level || 1}). Redirecting or switch account.`;
        submitText.textContent = `RESUME AS ${existingUser.nickname.toUpperCase()} ▶`;
      }
    } catch (e) {}
  }
});
