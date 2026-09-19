import * as THREE from 'three';
import { Creature, AIState } from './creature.js';

export class DuskStalker extends Creature {
  constructor(scene, terrain, position) {
    super(scene, terrain, position, 'stalker');

    this.speed = 3.2;
    this.runSpeed = 8.2;
    this.alertRadius = 26.0;
    this.attackRadius = 15.0;
    this.fleeRadius = 35.0;
    this.meleeRange = 2.4;
    this.damage = 16;
    this.attackCooldown = 0;
    this.attackInterval = 1.3;

    this.health = 140;
    this.maxHealth = 140;

    this.animTimer = Math.random() * 10;
    this.createModel();
  }

  createModel() {
    // 1. Sleek, predatory angular torso
    const torsoGeo = new THREE.ConeGeometry(0.8, 2.4, 6);
    torsoGeo.rotateX(Math.PI / 2);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x14121a,
      roughness: 0.35,
      metalness: 0.6,
      emissive: 0x0a0512,
      emissiveIntensity: 0.3
    });
    this.bodyMesh = new THREE.Mesh(torsoGeo, bodyMat);
    this.bodyMesh.position.set(0, 1.2, 0);
    this.bodyMesh.castShadow = true;
    this.mesh.add(this.bodyMesh);

    // 2. Predator head with angular mandibles
    const headGeo = new THREE.BoxGeometry(0.7, 0.55, 1.1);
    const headMat = new THREE.MeshStandardMaterial({
      color: 0x1d1a24,
      roughness: 0.3,
      metalness: 0.5
    });
    this.headMesh = new THREE.Mesh(headGeo, headMat);
    this.headMesh.position.set(0, 1.45, 1.4);
    this.headMesh.castShadow = true;
    this.mesh.add(this.headMesh);

    // Glowing eyes
    const eyeGeo = new THREE.SphereGeometry(0.1, 8, 8);
    this.eyeMat = new THREE.MeshBasicMaterial({ color: 0xff0044 });

    [-0.22, 0.22].forEach((xOffset) => {
      const eye = new THREE.Mesh(eyeGeo, this.eyeMat);
      eye.position.set(xOffset, 1.55, 1.9);
      this.mesh.add(eye);
    });

    // 3. Stalker tail with barb
    const tailGeo = new THREE.CylinderGeometry(0.08, 0.2, 1.8, 6);
    tailGeo.rotateX(Math.PI / 3);
    const tailMesh = new THREE.Mesh(tailGeo, bodyMat);
    tailMesh.position.set(0, 1.4, -1.5);
    this.mesh.add(tailMesh);

    // 4. Four muscular predator legs
    const upperLegGeo = new THREE.CylinderGeometry(0.12, 0.09, 1.2, 6);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x0f0e14, roughness: 0.7 });

    this.legs = [];
    const legCoords = [
      { x: -0.7, z: 0.8 },
      { x: 0.7, z: 0.8 },
      { x: -0.8, z: -0.8 },
      { x: 0.8, z: -0.8 }
    ];

    legCoords.forEach((coord, i) => {
      const legGroup = new THREE.Group();
      legGroup.position.set(coord.x, 1.1, coord.z);

      const upper = new THREE.Mesh(upperLegGeo, legMat);
      upper.position.y = -0.5;
      upper.rotation.z = (coord.x > 0 ? -1 : 1) * 0.3;
      upper.castShadow = true;
      legGroup.add(upper);

      this.mesh.add(legGroup);
      this.legs.push({ group: legGroup, offset: i * Math.PI * 0.5 });
    });
  }

  evaluateState(distToPlayer, playerPos, delta) {
    if (this.health < this.maxHealth * 0.25) {
      this.state = AIState.FLEE;
      return;
    }

    if (this.state === AIState.IDLE) {
      if (distToPlayer < this.attackRadius) {
        this.state = AIState.ATTACK;
      } else if (distToPlayer < this.alertRadius) {
        this.state = AIState.ALERT;
        this.stateTimer = 0;
      }
    } else if (this.state === AIState.ALERT) {
      if (distToPlayer < this.attackRadius || this.stateTimer > 2.0) {
        this.state = AIState.ATTACK;
      } else if (distToPlayer > this.alertRadius * 1.2) {
        this.state = AIState.IDLE;
      }
    } else if (this.state === AIState.ATTACK) {
      if (distToPlayer > this.alertRadius * 1.5) {
        this.state = AIState.IDLE;
      }
    } else if (this.state === AIState.FLEE) {
      if (distToPlayer > this.alertRadius * 1.6) {
        this.state = AIState.IDLE;
      }
    }
  }

  executeState(delta, distToPlayer, playerPos) {
    this.animTimer += delta * 4;
    this.attackCooldown = Math.max(0, this.attackCooldown - delta);

    let dealtDamage = 0;

    if (this.state === AIState.IDLE) {
      this.eyeMat.color.setHex(0xaa3333);

      this.wanderTimer -= delta;
      if (this.wanderTimer <= 0) {
        this.wanderTimer = 3.5 + Math.random() * 3.5;
        this.wanderAngle += (Math.random() - 0.5) * 2.0;
      }

      let diff = this.wanderAngle - this.heading;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      this.heading += diff * Math.min(1.0, 2.5 * delta);

      this.velocity.x = Math.sin(this.heading) * this.speed;
      this.velocity.z = Math.cos(this.heading) * this.speed;

      this.animateLegs(3.5);
      this.bodyMesh.position.y = 1.2;

    } else if (this.state === AIState.ALERT) {
      // Yellow warning eyes, low crouch
      this.eyeMat.color.setHex(0xffbb00);
      this.turnTowards(playerPos, delta, 5.0);
      this.velocity.set(0, 0, 0);

      // Crouch body down
      this.bodyMesh.position.y = 0.95;
      this.legs.forEach((leg) => {
        leg.group.rotation.x = 0.2;
      });

    } else if (this.state === AIState.ATTACK) {
      // Crimson hunt eyes, aggressive charge
      this.eyeMat.color.setHex(0xff0022);
      this.turnTowards(playerPos, delta, 6.0);

      this.bodyMesh.position.y = 1.1 + Math.sin(this.animTimer * 2.5) * 0.15;

      if (distToPlayer > this.meleeRange) {
        // Charge towards player
        this.velocity.x = Math.sin(this.heading) * this.runSpeed;
        this.velocity.z = Math.cos(this.heading) * this.runSpeed;
        this.animateLegs(9.0);
      } else {
        // In melee biting range!
        this.velocity.set(0, 0, 0);
        this.animateLegs(2.0);

        if (this.attackCooldown <= 0) {
          dealtDamage = this.damage;
          this.attackCooldown = this.attackInterval;
          // Strike lunge forward
          this.headMesh.position.z = 1.7;
          setTimeout(() => {
            if (this.headMesh) this.headMesh.position.z = 1.4;
          }, 200);
        }
      }

    } else if (this.state === AIState.FLEE) {
      this.eyeMat.color.setHex(0x5500aa);
      this.turnAwayFrom(playerPos, delta, 5.5);
      this.velocity.x = Math.sin(this.heading) * this.runSpeed;
      this.velocity.z = Math.cos(this.heading) * this.runSpeed;
      this.animateLegs(8.0);
    }

    return dealtDamage;
  }

  animateLegs(rate) {
    this.legs.forEach((leg) => {
      leg.group.rotation.x = Math.sin(this.animTimer * rate + leg.offset) * 0.6;
    });
  }
}
