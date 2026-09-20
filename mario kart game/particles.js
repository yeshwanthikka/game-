// Star Runner - High-performance Particle FX Engine

class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  reset() {
    this.particles = [];
  }

  add(x, y, options = {}) {
    const {
      vx = (Math.random() - 0.5) * 4,
      vy = (Math.random() - 0.5) * 4,
      size = Math.random() * 4 + 2,
      color = '#ffffff',
      life = 30,
      gravity = 0,
      fade = true,
      shape = 'circle', // 'circle', 'spark', 'confetti'
      rotation = Math.random() * Math.PI * 2,
      vRot = (Math.random() - 0.5) * 0.2
    } = options;

    this.particles.push({
      x, y, vx, vy, size, color,
      life, maxLife: life,
      gravity, fade, shape,
      rotation, vRot
    });
  }

  // --- Specific Visual FX Presets ---

  createJumpPuff(x, y) {
    for (let i = 0; i < 7; i++) {
      this.add(x + (Math.random() - 0.5) * 20, y, {
        vx: (Math.random() - 0.5) * 3,
        vy: Math.random() * 1.5 + 0.5,
        size: Math.random() * 4 + 3,
        color: 'rgba(255, 255, 255, 0.6)',
        life: 20,
        gravity: 0.05
      });
    }
  }

  createDoubleJumpRing(x, y) {
    const colors = ['#00f0ff', '#ffffff', '#9d4edd'];
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2;
      const speed = Math.random() * 3 + 2;
      this.add(x, y, {
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3.5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 25,
        shape: 'spark'
      });
    }
  }

  createCoinBurst(x, y) {
    const colors = ['#ffbe0b', '#ffd60a', '#ffffff', '#ff9e00'];
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      this.add(x, y, {
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 35,
        gravity: 0.15,
        shape: 'spark'
      });
    }
  }

  createHitSparks(x, y) {
    const colors = ['#ff007f', '#ff5400', '#ffffff'];
    for (let i = 0; i < 16; i++) {
      this.add(x, y, {
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        size: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 25,
        gravity: 0.2
      });
    }
  }

  createShieldBreak(x, y) {
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      this.add(x, y, {
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4 + 2,
        color: '#00f0ff',
        life: 30,
        shape: 'spark'
      });
    }
  }

  createStompPoof(x, y) {
    const colors = ['#ffffff', '#ffd166', '#ef476f'];
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2;
      const speed = Math.random() * 4 + 2;
      this.add(x, y, {
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        size: Math.random() * 4 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 25,
        shape: 'spark'
      });
    }
  }

  createBlockDust(x, y) {
    for (let i = 0; i < 8; i++) {
      this.add(x + (Math.random() - 0.5) * 24, y, {
        vx: (Math.random() - 0.5) * 3,
        vy: -(Math.random() * 2 + 1),
        size: Math.random() * 3 + 2,
        color: '#ffbe0b',
        life: 20
      });
    }
  }

  createConfetti(width, height) {
    const colors = ['#00f0ff', '#ff007f', '#ffbe0b', '#00f59b', '#9d4edd', '#ffffff'];
    for (let i = 0; i < 70; i++) {
      this.add(Math.random() * width, -20 - Math.random() * 100, {
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 4 + 3,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 140,
        shape: 'confetti',
        gravity: 0.05
      });
    }
  }

  createRunDust(x, y) {
    this.add(x - 5, y + 2, {
      vx: -(Math.random() * 2 + 1),
      vy: -(Math.random() * 0.8),
      size: Math.random() * 3 + 2,
      color: 'rgba(255, 255, 255, 0.35)',
      life: 15,
      gravity: -0.02
    });
  }

  createSkidDust(x, y) {
    for (let i = 0; i < 4; i++) {
      this.add(x + (Math.random() - 0.5) * 10, y + 2, {
        vx: (Math.random() - 0.5) * 3,
        vy: -(Math.random() * 1.5 + 0.5),
        size: Math.random() * 3.5 + 2,
        color: 'rgba(255, 255, 255, 0.5)',
        life: 18,
        gravity: 0.05
      });
    }
  }

  createBrickShatter(x, y) {
    const velocities = [
      { vx: -2.8, vy: -5.5 },
      { vx: 2.8, vy: -5.5 },
      { vx: -1.6, vy: -3.5 },
      { vx: 1.6, vy: -3.5 }
    ];
    for (let v of velocities) {
      this.add(x, y, {
        vx: v.vx,
        vy: v.vy,
        size: 9,
        color: '#b04a32',
        life: 45,
        gravity: 0.28,
        shape: 'confetti',
        vRot: (Math.random() - 0.5) * 0.35
      });
    }
  }

  createStarTrail(x, y) {
    const starColors = ['#ffbe0b', '#00f0ff', '#ff007f', '#00f59b', '#ffd60a'];
    for (let i = 0; i < 2; i++) {
      this.add(x + (Math.random() - 0.5) * 20, y + (Math.random() - 0.5) * 20, {
        vx: -(Math.random() * 1.5),
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 4 + 3,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        life: 20,
        shape: 'spark',
        gravity: 0.02
      });
    }
  }

  createProjectileHit(x, y, color = '#ffbe0b') {
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const speed = Math.random() * 4.5 + 2.0;
      this.add(x, y, {
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4 + 2.5,
        color: i % 2 === 0 ? color : '#ffffff',
        life: 22,
        shape: 'spark'
      });
    }
  }

  createBossExplosion(x, y) {
    const burstColors = ['#ff007f', '#ffbe0b', '#00f0ff', '#ff5400', '#ffffff', '#ffd60a'];
    // Outer fiery shockwave
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 7.5 + 3.0;
      this.add(x, y, {
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        size: Math.random() * 7 + 4,
        color: burstColors[Math.floor(Math.random() * burstColors.length)],
        life: 45,
        shape: 'spark',
        gravity: 0.12
      });
    }
    // Confetti celebration
    for (let i = 0; i < 25; i++) {
      this.add(x, y, {
        vx: (Math.random() - 0.5) * 6,
        vy: -(Math.random() * 6 + 3),
        size: Math.random() * 9 + 5,
        color: burstColors[Math.floor(Math.random() * burstColors.length)],
        life: 60,
        shape: 'confetti',
        gravity: 0.15,
        vRot: (Math.random() - 0.5) * 0.4
      });
    }
  }

  // --- Update & Draw ---

  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.vRot;
      p.life--;

      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const alpha = p.fade ? Math.max(0, p.life / p.maxLife) : 1;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;

      if (p.shape === 'confetti') {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else if (p.shape === 'spark') {
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.lineTo(p.size / 2, 0);
        ctx.lineTo(0, p.size);
        ctx.lineTo(-p.size / 2, 0);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }
}

const particleSystem = new ParticleSystem();
