import * as THREE from 'three';

export class SwarmManager {
  constructor(scene, terrain, centerPos, count = 25) {
    this.scene = scene;
    this.terrain = terrain;
    this.count = count;
    this.center = centerPos ? centerPos.clone() : new THREE.Vector3(30, 0, 30);

    this.dummy = new THREE.Object3D();
    this.units = [];

    this.speed = 5.2;
    this.runSpeed = 9.0;
    this.detectionRadius = 24.0;
    this.attackRadius = 1.8;
    this.damagePerBite = 5;

    this.createInstancedMesh();
    this.initUnits();
  }

  createInstancedMesh() {
    // Sharp, low-poly arachnid-like body
    const bodyGeo = new THREE.ConeGeometry(0.35, 0.9, 5);
    bodyGeo.rotateX(Math.PI / 2);

    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x1a2e05,
      roughness: 0.3,
      metalness: 0.4,
      emissive: 0x44ff00,
      emissiveIntensity: 0.6
    });

    this.mesh = new THREE.InstancedMesh(bodyGeo, bodyMat, this.count);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }

  initUnits() {
    for (let i = 0; i < this.count; i++) {
      const angle = (i / this.count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const dist = 2 + Math.random() * 8;
      const x = this.center.x + Math.cos(angle) * dist;
      const z = this.center.z + Math.sin(angle) * dist;
      const y = this.terrain.getHeight(x, z) + 0.3;

      this.units.push({
        id: i,
        pos: new THREE.Vector3(x, y, z),
        vel: new THREE.Vector3(),
        heading: Math.random() * Math.PI * 2,
        wanderTimer: Math.random() * 3,
        wanderAngle: Math.random() * Math.PI * 2,
        flockOffset: new THREE.Vector3(
          (Math.random() - 0.5) * 5,
          0,
          (Math.random() - 0.5) * 5
        ),
        attackCooldown: Math.random(),
        health: 30,
        isDead: false,
        skitterPhase: Math.random() * Math.PI * 2
      });
    }
  }

  update(delta, playerPos) {
    let totalDamage = 0;
    const time = performance.now() * 0.005;

    for (let i = 0; i < this.count; i++) {
      const u = this.units[i];
      if (u.isDead) {
        // Hide dead unit underground / zero scale
        this.dummy.position.set(0, -500, 0);
        this.dummy.scale.set(0, 0, 0);
        this.dummy.updateMatrix();
        this.mesh.setMatrixAt(i, this.dummy.matrix);
        continue;
      }

      u.attackCooldown = Math.max(0, u.attackCooldown - delta);
      u.skitterPhase += delta * 12;

      const distToPlayer = u.pos.distanceTo(playerPos);
      const isHunting = distToPlayer < this.detectionRadius;

      if (isHunting) {
        // Swarm rush towards player with slight encirclement offset
        const targetX = playerPos.x + u.flockOffset.x;
        const targetZ = playerPos.z + u.flockOffset.z;
        const dx = targetX - u.pos.x;
        const dz = targetZ - u.pos.z;
        const targetHeading = Math.atan2(dx, dz);

        // Quick agile turn
        let diff = targetHeading - u.heading;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        u.heading += diff * Math.min(1.0, 8.0 * delta);

        if (distToPlayer > this.attackRadius) {
          // Sprint with rapid zig-zag skitter
          const jitter = Math.sin(u.skitterPhase) * 1.5;
          u.vel.x = Math.sin(u.heading + jitter * 0.2) * this.runSpeed;
          u.vel.z = Math.cos(u.heading + jitter * 0.2) * this.runSpeed;
        } else {
          // Within biting range!
          u.vel.set(0, 0, 0);
          if (u.attackCooldown <= 0) {
            totalDamage += this.damagePerBite;
            u.attackCooldown = 0.9 + Math.random() * 0.4;
          }
        }
      } else {
        // Idle wandering in pack cluster
        u.wanderTimer -= delta;
        if (u.wanderTimer <= 0) {
          u.wanderTimer = 2.0 + Math.random() * 3.0;
          u.wanderAngle += (Math.random() - 0.5) * 2.5;
        }

        let diff = u.wanderAngle - u.heading;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        u.heading += diff * Math.min(1.0, 3.0 * delta);

        u.vel.x = Math.sin(u.heading) * this.speed;
        u.vel.z = Math.cos(u.heading) * this.speed;
      }

      // Integrate position
      u.pos.x += u.vel.x * delta;
      u.pos.z += u.vel.z * delta;

      // Keep within map boundaries
      const maxBound = (this.terrain.size / 2) - 8;
      u.pos.x = THREE.MathUtils.clamp(u.pos.x, -maxBound, maxBound);
      u.pos.z = THREE.MathUtils.clamp(u.pos.z, -maxBound, maxBound);

      // Clamp to terrain height + skitter scuttle height
      const groundY = this.terrain.getHeight(u.pos.x, u.pos.z);
      const hop = Math.abs(Math.sin(u.skitterPhase)) * 0.15;
      u.pos.y = groundY + 0.35 + hop;

      // Update instanced transform
      this.dummy.position.copy(u.pos);
      this.dummy.rotation.set(0, u.heading, 0);
      const scale = 0.65 + Math.sin(time + u.id) * 0.05;
      this.dummy.scale.set(scale, scale * 0.8, scale);
      this.dummy.updateMatrix();

      this.mesh.setMatrixAt(i, this.dummy.matrix);
    }

    this.mesh.instanceMatrix.needsUpdate = true;
    return totalDamage;
  }

  damageNearest(pos, radius, damage) {
    for (let i = 0; i < this.count; i++) {
      const u = this.units[i];
      if (!u.isDead && u.pos.distanceTo(pos) < radius) {
        u.health -= damage;
        if (u.health <= 0) {
          u.isDead = true;
        }
        return true;
      }
    }
    return false;
  }

  destroy() {
    if (this.mesh && this.mesh.parent) {
      this.scene.remove(this.mesh);
      if (this.mesh.geometry) this.mesh.geometry.dispose();
      if (this.mesh.material) this.mesh.material.dispose();
    }
  }
}
