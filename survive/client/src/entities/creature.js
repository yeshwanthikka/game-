import * as THREE from 'three';

export const AIState = {
  IDLE: 'IDLE',
  ALERT: 'ALERT',
  ATTACK: 'ATTACK',
  FLEE: 'FLEE',
  DEAD: 'DEAD'
};

export class Creature {
  constructor(scene, terrain, position, type = 'creature') {
    this.scene = scene;
    this.terrain = terrain;
    this.type = type;

    this.position = position ? position.clone() : new THREE.Vector3(0, 0, 0);
    this.velocity = new THREE.Vector3();
    this.state = AIState.IDLE;
    this.stateTimer = 0;

    // Speeds & radii
    this.speed = 3.5;
    this.runSpeed = 6.5;
    this.alertRadius = 25.0;
    this.attackRadius = 12.0;
    this.fleeRadius = 35.0;

    // Movement & heading
    this.wanderAngle = Math.random() * Math.PI * 2;
    this.heading = this.wanderAngle;
    this.wanderTimer = 0;

    // Vitals
    this.health = 100;
    this.maxHealth = 100;
    this.isDead = false;

    // Three.js container
    this.mesh = new THREE.Group();
    this.scene.add(this.mesh);

    // Initial positioning
    const groundY = this.terrain.getHeight(this.position.x, this.position.z);
    this.position.y = groundY;
    this.mesh.position.copy(this.position);
    this.mesh.rotation.y = this.heading;
  }

  update(delta, playerPos) {
    if (this.isDead) return;

    this.stateTimer += delta;
    const distToPlayer = this.position.distanceTo(playerPos);

    this.evaluateState(distToPlayer, playerPos, delta);
    const damageDealt = this.executeState(delta, distToPlayer, playerPos) || 0;

    // Integrate horizontal motion
    this.position.x += this.velocity.x * delta;
    this.position.z += this.velocity.z * delta;

    // Clamp to terrain height
    const groundY = this.terrain.getHeight(this.position.x, this.position.z);
    this.position.y = groundY;

    // Restrict within world boundary
    const halfBound = (this.terrain.size / 2) - 10;
    this.position.x = THREE.MathUtils.clamp(this.position.x, -halfBound, halfBound);
    this.position.z = THREE.MathUtils.clamp(this.position.z, -halfBound, halfBound);

    // Sync mesh transform
    this.mesh.position.copy(this.position);
    this.mesh.rotation.y = this.heading;

    return damageDealt;
  }

  // Override in subclasses
  evaluateState(distToPlayer, playerPos, delta) {}
  executeState(delta, distToPlayer, playerPos) {}

  turnTowards(targetPos, delta, turnSpeed = 4.0) {
    const dx = targetPos.x - this.position.x;
    const dz = targetPos.z - this.position.z;
    const targetHeading = Math.atan2(dx, dz);

    let diff = targetHeading - this.heading;
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;

    this.heading += diff * Math.min(1.0, turnSpeed * delta);
  }

  turnAwayFrom(targetPos, delta, turnSpeed = 4.0) {
    const dx = this.position.x - targetPos.x;
    const dz = this.position.z - targetPos.z;
    const targetHeading = Math.atan2(dx, dz);

    let diff = targetHeading - this.heading;
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;

    this.heading += diff * Math.min(1.0, turnSpeed * delta);
  }

  takeDamage(amount) {
    if (this.isDead) return;
    this.health = Math.max(0, this.health - amount);
    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    this.isDead = true;
    this.state = AIState.DEAD;
    this.destroy();
  }

  destroy() {
    this.isDead = true;
    if (this.mesh && this.mesh.parent) {
      this.scene.remove(this.mesh);
      this.mesh.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    }
  }
}
