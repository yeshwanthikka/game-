import * as THREE from 'three';
import { sound } from '../audio/sound.js';

export class WeaponSystem {
  constructor(camera, scene, terrain) {
    this.camera = camera;
    this.scene = scene;
    this.terrain = terrain;

    this.raycaster = new THREE.Raycaster();
    this.damage = 45;
    this.fireCooldown = 0;
    this.fireInterval = 0.22; // rapid plasma fire rate

    this.recoilOffset = new THREE.Vector3();
    this.recoilVelocity = new THREE.Vector3();
    this.basePos = new THREE.Vector3(0.3, -0.25, -0.55);

    this.tracers = [];
    this.sparks = [];

    this.createBlasterModel();
  }

  createBlasterModel() {
    this.gunGroup = new THREE.Group();

    // 1. Rifle chassis
    const bodyGeo = new THREE.BoxGeometry(0.1, 0.14, 0.5);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a24,
      metalness: 0.85,
      roughness: 0.25
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.set(0, 0, 0);
    this.gunGroup.add(body);

    // 2. Plasma acceleration coil barrel
    const barrelGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.4, 12);
    barrelGeo.rotateX(Math.PI / 2);
    const barrelMat = new THREE.MeshStandardMaterial({
      color: 0x05050a,
      metalness: 0.9,
      roughness: 0.1
    });
    const barrel = new THREE.Mesh(barrelGeo, barrelMat);
    barrel.position.set(0, 0.02, -0.35);
    this.gunGroup.add(barrel);

    // Glowing energy conduits
    const coilGeo = new THREE.TorusGeometry(0.045, 0.01, 8, 16);
    const coilMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    [-0.22, -0.32, -0.42].forEach((zPos) => {
      const coil = new THREE.Mesh(coilGeo, coilMat);
      coil.position.set(0, 0.02, zPos);
      this.gunGroup.add(coil);
    });

    // 3. Holo-Sight emitter
    const sightGeo = new THREE.BoxGeometry(0.04, 0.05, 0.08);
    const sightMat = new THREE.MeshStandardMaterial({ color: 0x2d3748 });
    const sight = new THREE.Mesh(sightGeo, sightMat);
    sight.position.set(0, 0.09, -0.05);
    this.gunGroup.add(sight);

    const reticleGeo = new THREE.RingGeometry(0.015, 0.02, 16);
    const reticleMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });
    const reticle = new THREE.Mesh(reticleGeo, reticleMat);
    reticle.position.set(0, 0.12, -0.05);
    this.gunGroup.add(reticle);

    // 4. Muzzle flash light
    this.muzzleLight = new THREE.PointLight(0x00f0ff, 0, 8);
    this.muzzleLight.position.set(0, 0.02, -0.6);
    this.gunGroup.add(this.muzzleLight);

    // Initial position attached to camera
    this.gunGroup.position.copy(this.basePos);
    this.camera.add(this.gunGroup);
    this.scene.add(this.camera);
  }

  canFire() {
    return this.fireCooldown <= 0;
  }

  fire(player, creatureManager, resourceManager) {
    if (!this.canFire()) return null;

    if (player.inventory.ammo <= 0) {
      sound.playDryFire();
      this.fireCooldown = 0.25;
      return { fired: false, reason: 'no_ammo' };
    }

    // Deduct ammo & play sound
    player.inventory.ammo--;
    sound.playBlaster();
    this.fireCooldown = this.fireInterval;

    // Recoil kickback
    this.recoilVelocity.z += 0.09;
    this.recoilVelocity.y += 0.02;

    // Flash muzzle
    this.muzzleLight.intensity = 4.0;

    // Determine ray target from camera center
    this.raycaster.setFromCamera(new THREE.Vector2(0, 0), this.camera);
    const origin = this.raycaster.ray.origin;
    const direction = this.raycaster.ray.direction;

    let hitPoint = null;
    let hitCreature = null;
    let closestDist = 120.0;

    // 1. Check Stalkers
    if (creatureManager && creatureManager.stalkers) {
      creatureManager.stalkers.forEach((s) => {
        if (s.isDead) return;
        const dist = s.position.distanceTo(origin);
        if (dist > closestDist) return;

        // Bounding sphere intersection
        const toCreature = new THREE.Vector3().subVectors(s.position, origin);
        toCreature.y += 1.0; // Center mass
        const projection = toCreature.dot(direction);
        if (projection > 0 && projection < closestDist) {
          const closestPoint = new THREE.Vector3().copy(origin).addScaledVector(direction, projection);
          const offsetDist = closestPoint.distanceTo(new THREE.Vector3(s.position.x, s.position.y + 1.0, s.position.z));
          if (offsetDist < 1.4) {
            closestDist = projection;
            hitPoint = closestPoint;
            hitCreature = s;
          }
        }
      });
    }

    // 2. Check Grazers
    if (creatureManager && creatureManager.grazers) {
      creatureManager.grazers.forEach((g) => {
        if (g.isDead) return;
        const dist = g.position.distanceTo(origin);
        if (dist > closestDist) return;

        const toCreature = new THREE.Vector3().subVectors(g.position, origin);
        toCreature.y += 1.2;
        const projection = toCreature.dot(direction);
        if (projection > 0 && projection < closestDist) {
          const closestPoint = new THREE.Vector3().copy(origin).addScaledVector(direction, projection);
          const offsetDist = closestPoint.distanceTo(new THREE.Vector3(g.position.x, g.position.y + 1.2, g.position.z));
          if (offsetDist < 1.6) {
            closestDist = projection;
            hitPoint = closestPoint;
            hitCreature = g;
          }
        }
      });
    }

    // 3. Check Swarm
    let hitSwarm = false;
    if (creatureManager && creatureManager.swarm && !hitCreature) {
      // Ray cast against swarm units
      for (const u of creatureManager.swarm.units) {
        if (u.isDead) continue;
        const toUnit = new THREE.Vector3().subVectors(u.pos, origin);
        const projection = toUnit.dot(direction);
        if (projection > 0 && projection < closestDist) {
          const closestPoint = new THREE.Vector3().copy(origin).addScaledVector(direction, projection);
          if (closestPoint.distanceTo(u.pos) < 1.0) {
            closestDist = projection;
            hitPoint = closestPoint;
            u.health -= this.damage;
            hitSwarm = true;
            if (u.health <= 0) {
              u.isDead = true;
              player.kills = (player.kills || 0) + 1;
              if (resourceManager && Math.random() < 0.6) {
                resourceManager.spawnLoot('skitterer', u.pos);
              }
            }
            break;
          }
        }
      }
    }

    // 4. Default terrain / horizon distance if no creature hit
    if (!hitPoint) {
      // Trace ray onto terrain
      hitPoint = new THREE.Vector3().copy(origin).addScaledVector(direction, Math.min(closestDist, 80));
    }

    // Creature damage reaction & loot drop
    if (hitCreature) {
      sound.playHit();
      hitCreature.takeDamage(this.damage);
      // Flash creature emissive briefly
      if (hitCreature.bodyMesh && hitCreature.bodyMesh.material) {
        const origColor = hitCreature.bodyMesh.material.color.getHex();
        hitCreature.bodyMesh.material.color.setHex(0xffffff);
        setTimeout(() => {
          if (hitCreature && hitCreature.bodyMesh && hitCreature.bodyMesh.material) {
            hitCreature.bodyMesh.material.color.setHex(origColor);
          }
        }, 80);
      }

      if (hitCreature.isDead) {
        player.kills = (player.kills || 0) + 1;
        if (resourceManager) {
          resourceManager.spawnLoot(hitCreature.type, hitCreature.position);
        }
      }
    } else if (hitSwarm) {
      sound.playHit();
    }

    // Spawn visual tracer and impact sparks
    this.createTracer(hitPoint);
    this.createImpactSparks(hitPoint);

    return { fired: true, hit: !!(hitCreature || hitSwarm), hitPoint };
  }

  createTracer(endPoint) {
    const muzzleWorld = new THREE.Vector3();
    this.muzzleLight.getWorldPosition(muzzleWorld);

    const dist = muzzleWorld.distanceTo(endPoint);
    const tracerGeo = new THREE.CylinderGeometry(0.015, 0.015, dist, 6);
    tracerGeo.rotateX(Math.PI / 2);

    const tracerMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.95
    });

    const tracer = new THREE.Mesh(tracerGeo, tracerMat);
    tracer.position.copy(muzzleWorld).lerp(endPoint, 0.5);
    tracer.lookAt(endPoint);

    this.scene.add(tracer);
    this.tracers.push({ mesh: tracer, life: 0.08, maxLife: 0.08 });
  }

  createImpactSparks(position) {
    const sparkCount = 8;
    const sparkGeo = new THREE.BoxGeometry(0.05, 0.05, 0.05);
    const sparkMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });

    for (let i = 0; i < sparkCount; i++) {
      const mesh = new THREE.Mesh(sparkGeo, sparkMat);
      mesh.position.copy(position);

      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        Math.random() * 4 + 1,
        (Math.random() - 0.5) * 6
      );

      this.scene.add(mesh);
      this.sparks.push({ mesh, vel, life: 0.35, maxLife: 0.35 });
    }
  }

  update(delta) {
    this.fireCooldown = Math.max(0, this.fireCooldown - delta);

    // Decay muzzle light
    if (this.muzzleLight.intensity > 0) {
      this.muzzleLight.intensity = Math.max(0, this.muzzleLight.intensity - delta * 25.0);
    }

    // Recoil spring recovery
    this.recoilVelocity.z -= this.recoilOffset.z * 50.0 * delta;
    this.recoilVelocity.y -= this.recoilOffset.y * 50.0 * delta;
    this.recoilVelocity.multiplyScalar(0.7);

    this.recoilOffset.addScaledVector(this.recoilVelocity, delta);
    this.gunGroup.position.copy(this.basePos).add(this.recoilOffset);

    // Update tracers
    for (let i = this.tracers.length - 1; i >= 0; i--) {
      const t = this.tracers[i];
      t.life -= delta;
      t.mesh.material.opacity = Math.max(0, t.life / t.maxLife);
      if (t.life <= 0) {
        this.scene.remove(t.mesh);
        t.mesh.geometry.dispose();
        t.mesh.material.dispose();
        this.tracers.splice(i, 1);
      }
    }

    // Update sparks
    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const s = this.sparks[i];
      s.life -= delta;
      s.vel.y -= 12.0 * delta; // gravity
      s.mesh.position.addScaledVector(s.vel, delta);
      const scale = Math.max(0, s.life / s.maxLife);
      s.mesh.scale.set(scale, scale, scale);

      if (s.life <= 0) {
        this.scene.remove(s.mesh);
        s.mesh.geometry.dispose();
        s.mesh.material.dispose();
        this.sparks.splice(i, 1);
      }
    }
  }

  destroy() {
    this.tracers.forEach((t) => this.scene.remove(t.mesh));
    this.sparks.forEach((s) => this.scene.remove(s.mesh));
    if (this.gunGroup && this.gunGroup.parent) {
      this.gunGroup.parent.remove(this.gunGroup);
    }
  }
}
