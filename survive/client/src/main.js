import * as THREE from 'three';
import { Terrain } from './world/terrain.js';
import { SkyManager } from './world/sky.js';
import { PlayerController } from './entities/player.js';
import { api } from './net/api.js';

class Game {
  constructor() {
    this.container = document.getElementById('canvas-container');
    this.clock = new THREE.Clock();
    this.survivalSeconds = 0;

    // Setup Three.js Core
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // World & Systems
    this.terrain = new Terrain(this.scene, 320, 128);
    this.sky = new SkyManager(this.scene);
    this.player = new PlayerController(this.camera, this.renderer.domElement, this.terrain);

    // Initial spawn location on terrain
    const spawnY = this.terrain.getHeight(0, 10) + this.player.eyeHeight;
    this.player.position.set(0, spawnY, 10);

    // UI elements
    this.initUI();
    this.setupModals();

    // Resize Handler
    window.addEventListener('resize', () => this.onWindowResize());

    // Start loop
    this.animate();
  }

  initUI() {
    this.ui = {
      cycleLabel: document.getElementById('cycle-label'),
      cycleBadge: document.getElementById('cycle-badge'),
      timer: document.getElementById('survival-timer'),
      healthVal: document.getElementById('health-val'),
      healthFill: document.getElementById('health-fill'),
      staminaVal: document.getElementById('stamina-val'),
      staminaFill: document.getElementById('stamina-fill'),
      partsVal: document.getElementById('parts-val'),
      fuelVal: document.getElementById('fuel-val'),
      alloyVal: document.getElementById('alloy-val'),
      ammoVal: document.getElementById('ammo-val')
    };

    // Quick start button click
    const startBtn = document.getElementById('start-button');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        this.renderer.domElement.requestPointerLock();
      });
    }
  }

  setupModals() {
    const lbBtn = document.getElementById('btn-leaderboard');
    const bestiaryBtn = document.getElementById('btn-bestiary');
    const modalLb = document.getElementById('modal-leaderboard');
    const modalBestiary = document.getElementById('modal-bestiary');
    const closeLb = document.getElementById('close-leaderboard');
    const closeBestiary = document.getElementById('close-bestiary');

    lbBtn.addEventListener('click', async () => {
      if (document.exitPointerLock) document.exitPointerLock();
      const blocker = document.getElementById('blocker');
      if (blocker) blocker.style.display = 'none';

      modalLb.style.display = 'block';
      const content = document.getElementById('leaderboard-content');
      content.innerHTML = '<div style="color:#00f0ff;">Loading telemetry from SQLite database...</div>';
      const data = await api.getLeaderboard();

      let html = '<div style="margin-bottom:14px;"><strong style="color:#00f0ff; letter-spacing:1px;">FASTEST EXTRACTIONS:</strong><br>';
      if (data.fastestExtraction && data.fastestExtraction.length > 0) {
        data.fastestExtraction.forEach((r, idx) => {
          html += `<div style="padding:4px 0; border-bottom:1px solid rgba(255,255,255,0.08);">#${idx + 1} <b style="color:#fff;">${r.username}</b> — Time: <span style="color:#00ff88;">${r.survival_time_sec}s</span> | Kills: ${r.kills} | Resources: ${r.resources_collected}</div>`;
        });
      } else {
        html += '<div style="color:#718096; padding:4px 0;">No successful extractions logged yet. Reach the extraction beacon to set a record!</div>';
      }
      html += '</div>';

      html += '<div style="margin-top:14px;"><strong style="color:#ffaa00; letter-spacing:1px;">LONGEST SURVIVORS:</strong><br>';
      if (data.longestSurvival && data.longestSurvival.length > 0) {
        data.longestSurvival.forEach((r, idx) => {
          html += `<div style="padding:4px 0; border-bottom:1px solid rgba(255,255,255,0.08);">#${idx + 1} <b style="color:#fff;">${r.username}</b> — <span style="color:#ffaa00;">${r.survival_time_sec}s</span> [${r.outcome.toUpperCase()}] | Kills: ${r.kills}</div>`;
        });
      }
      html += '</div>';

      content.innerHTML = html;
    });

    closeLb.addEventListener('click', () => {
      modalLb.style.display = 'none';
      const blocker = document.getElementById('blocker');
      if (blocker && !this.player.isLocked) blocker.style.display = 'flex';
    });

    bestiaryBtn.addEventListener('click', async () => {
      if (document.exitPointerLock) document.exitPointerLock();
      const blocker = document.getElementById('blocker');
      if (blocker) blocker.style.display = 'none';

      modalBestiary.style.display = 'block';
      const content = document.getElementById('bestiary-content');
      content.innerHTML = '<div style="color:#00f0ff;">Scanning local database...</div>';
      const creatures = await api.getBestiary();

      if (creatures.length === 0) {
        content.innerHTML = '<div style="color:#718096;">No creature intelligence files found in database.</div>';
        return;
      }

      let html = '';
      creatures.forEach((c) => {
        html += `
          <div style="background:rgba(255,255,255,0.04); border-left: 3px solid #00f0ff; padding:12px; margin-bottom:12px; border-radius:4px;">
            <div style="font-size:15px; font-weight:bold; color:#00f0ff;">${c.display_name} <span style="font-size:12px; color:#a0aec0;">[${c.creature_type.toUpperCase()}]</span></div>
            <div style="color:#ff0055; font-size:12px; margin: 4px 0;">Danger Rating: ${c.danger_level} &bull; Total Recorded Kills: ${c.total_kills}</div>
            <div style="font-size:12px; color:#cbd5e0; line-height: 1.5;">${c.description}</div>
          </div>
        `;
      });
      content.innerHTML = html;
    });

    closeBestiary.addEventListener('click', () => {
      modalBestiary.style.display = 'none';
      const blocker = document.getElementById('blocker');
      if (blocker && !this.player.isLocked) blocker.style.display = 'flex';
    });
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  updateHUD(skyData, delta) {
    if (this.player.isLocked) {
      this.survivalSeconds += delta;
      const mins = Math.floor(this.survivalSeconds / 60).toString().padStart(2, '0');
      const secs = Math.floor(this.survivalSeconds % 60).toString().padStart(2, '0');
      this.ui.timer.textContent = `${mins}:${secs}`;
    }

    // Sky / Day-Night cycle
    if (skyData.isNight) {
      this.ui.cycleLabel.textContent = 'NIGHT';
      this.ui.cycleBadge.textContent = 'ECLIPSE / HIGH HAZARD';
      this.ui.cycleBadge.className = 'cycle-badge night';
    } else {
      this.ui.cycleLabel.textContent = 'DAY';
      this.ui.cycleBadge.textContent = 'SOLAR RADIANCE';
      this.ui.cycleBadge.className = 'cycle-badge';
    }

    // Vitals
    const healthPercent = Math.round((this.player.health / this.player.maxHealth) * 100);
    const staminaPercent = Math.round((this.player.stamina / this.player.maxStamina) * 100);

    this.ui.healthVal.textContent = `${healthPercent}%`;
    this.ui.healthFill.style.width = `${healthPercent}%`;

    this.ui.staminaVal.textContent = `${staminaPercent}%`;
    this.ui.staminaFill.style.width = `${staminaPercent}%`;

    // Inventory
    this.ui.partsVal.textContent = `${this.player.inventory.shipParts} / 4`;
    this.ui.fuelVal.textContent = `${this.player.inventory.bioFuel}`;
    this.ui.alloyVal.textContent = `${this.player.inventory.alienAlloy}`;
    this.ui.ammoVal.textContent = `${this.player.inventory.ammo}`;
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = Math.min(this.clock.getDelta(), 0.1);

    // Update systems
    this.player.update(delta);
    const skyData = this.sky.update(delta, this.player.position);
    this.updateHUD(skyData, delta);

    // Render Scene
    this.renderer.render(this.scene, this.camera);
  }
}

// Instantiate game on load
window.addEventListener('DOMContentLoaded', () => {
  new Game();
});
