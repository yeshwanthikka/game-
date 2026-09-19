import * as THREE from 'three';
import { SporeGrazer } from './grazer.js';
import { DuskStalker } from './stalker.js';
import { SwarmManager } from './swarm.js';

export class CreatureManager {
  constructor(scene, terrain) {
    this.scene = scene;
    this.terrain = terrain;

    this.grazers = [];
    this.stalkers = [];
    this.swarm = null;

    this.safeZoneRadius = 22.0; // Crash site safe area around (0,0)
    this.spawnCheckTimer = 0;
    this.spawnInterval = 5.0;

    // Caps
    this.caps = {
      day: { grazers: 7, stalkers: 3 },
      night: { grazers: 4, stalkers: 6 }
    };

    this.initCreatures();
  }

  initCreatures() {
    // 1. Initial Grazers (spread across peaceful quadrants)
    const initialGrazerPositions = [
      new THREE.Vector3(30, 0, -35),
      new THREE.Vector3(-40, 0, 40),
      new THREE.Vector3(-55, 0, -30),
      new THREE.Vector3(50, 0, 45),
      new THREE.Vector3(25, 0, 65)
    ];

    initialGrazerPositions.forEach((pos) => {
      this.spawnGrazer(pos);
    });

    // 2. Initial Dusk Stalkers (distant prowlers)
    const initialStalkerPositions = [
      new THREE.Vector3(70, 0, -60),
      new THREE.Vector3(-75, 0, 65),
      new THREE.Vector3(60, 0, 75)
    ];

    initialStalkerPositions.forEach((pos) => {
      this.spawnStalker(pos);
    });

    // 3. Acid Skitterer Swarm Pack
    this.swarm = new SwarmManager(this.scene, this.terrain, new THREE.Vector3(45, 0, -45), 25);
  }

  getValidSpawnPosition(minDistFromPlayer = 35, maxDist = 95, playerPos = new THREE.Vector3()) {
    const halfBound = (this.terrain.size / 2) - 20;

    for (let attempts = 0; attempts < 15; attempts++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = minDistFromPlayer + Math.random() * (maxDist - minDistFromPlayer);
      const x = THREE.MathUtils.clamp(playerPos.x + Math.cos(angle) * dist, -halfBound, halfBound);
      const z = THREE.MathUtils.clamp(playerPos.z + Math.sin(angle) * dist, -halfBound, halfBound);

      // Verify not in crash site safe zone
      const distToCenter = Math.hypot(x, z);
      if (distToCenter > this.safeZoneRadius) {
        const y = this.terrain.getHeight(x, z);
        return new THREE.Vector3(x, y, z);
      }
    }

    return new THREE.Vector3(40, 0, 40);
  }

  spawnGrazer(position) {
    const grazer = new SporeGrazer(this.scene, this.terrain, position);
    this.grazers.push(grazer);
    return grazer;
  }

  spawnStalker(position) {
    const stalker = new DuskStalker(this.scene, this.terrain, position);
    this.stalkers.push(stalker);
    return stalker;
  }

  update(delta, playerPos, isNight) {
    let totalDamage = 0;

    // 1. Update Grazers
    for (let i = this.grazers.length - 1; i >= 0; i--) {
      const g = this.grazers[i];
      if (g.isDead) {
        g.destroy();
        this.grazers.splice(i, 1);
        continue;
      }
      g.update(delta, playerPos);
    }

    // 2. Update Stalkers
    for (let i = this.stalkers.length - 1; i >= 0; i--) {
      const s = this.stalkers[i];
      if (s.isDead) {
        s.destroy();
        this.stalkers.splice(i, 1);
        continue;
      }

      // Safe zone avoidance: Stalkers will not attack inside the crash pod radius
      const distToCenter = Math.hypot(s.position.x, s.position.z);
      const playerInSafeZone = Math.hypot(playerPos.x, playerPos.z) < this.safeZoneRadius;

      if (playerInSafeZone && distToCenter < this.safeZoneRadius + 5) {
        // Turn away from safe zone
        s.turnAwayFrom(new THREE.Vector3(0, 0, 0), delta, 4.0);
        s.velocity.x = Math.sin(s.heading) * s.speed;
        s.velocity.z = Math.cos(s.heading) * s.speed;
        s.position.x += s.velocity.x * delta;
        s.position.z += s.velocity.z * delta;
        s.mesh.position.copy(s.position);
        s.mesh.rotation.y = s.heading;
      } else {
        const dmg = s.update(delta, playerPos);
        if (dmg > 0 && !playerInSafeZone) {
          totalDamage += dmg;
        }
      }
    }

    // 3. Update Swarm
    if (this.swarm) {
      const playerInSafeZone = Math.hypot(playerPos.x, playerPos.z) < this.safeZoneRadius;
      const swarmDmg = this.swarm.update(delta, playerPos);
      if (swarmDmg > 0 && !playerInSafeZone) {
        totalDamage += swarmDmg;
      }
    }

    // 4. Periodic Population Maintenance / Respawn
    this.spawnCheckTimer += delta;
    if (this.spawnCheckTimer >= this.spawnInterval) {
      this.spawnCheckTimer = 0;
      const targetCaps = isNight ? this.caps.night : this.caps.day;

      if (this.grazers.length < targetCaps.grazers) {
        const spawnPos = this.getValidSpawnPosition(40, 90, playerPos);
        this.spawnGrazer(spawnPos);
      }

      if (this.stalkers.length < targetCaps.stalkers) {
        const spawnPos = this.getValidSpawnPosition(45, 95, playerPos);
        this.spawnStalker(spawnPos);
      }
    }

    return {
      damageDealt: totalDamage,
      counts: {
        grazers: this.grazers.length,
        stalkers: this.stalkers.length,
        swarmUnits: this.swarm ? this.swarm.units.filter((u) => !u.isDead).length : 0
      }
    };
  }

  destroy() {
    this.grazers.forEach((g) => g.destroy());
    this.stalkers.forEach((s) => s.destroy());
    if (this.swarm) this.swarm.destroy();
    this.grazers = [];
    this.stalkers = [];
    this.swarm = null;
  }
}
