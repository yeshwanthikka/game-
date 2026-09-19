import * as THREE from 'three';
import { Creature, AIState } from './creature.js';

export class SporeGrazer extends Creature {
  constructor(scene, terrain, position) {
    super(scene, terrain, position, 'grazer');

    this.speed = 2.2;
    this.runSpeed = 6.0;
    this.alertRadius = 20.0;
    this.fleeRadius = 10.0;
    this.health = 80;
    this.maxHealth = 80;

    this.bobTimer = Math.random() * 10;
    this.createModel();
  }

  createModel() {
    // 1. Central bulbous body
    const bodyGeo = new THREE.SphereGeometry(1.2, 16, 12);
    bodyGeo.scale(1.0, 0.8, 1.4);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x1f5449,
      roughness: 0.4,
      metalness: 0.2,
      emissive: 0x052a22,
      emissiveIntensity: 0.4
    });
    this.bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    this.bodyMesh.position.y = 1.6;
    this.bodyMesh.castShadow = true;
    this.mesh.add(this.bodyMesh);

    // 2. Bioluminescent spore sac on back
    const sacGeo = new THREE.DodecahedronGeometry(0.7, 1);
    this.sacMat = new THREE.MeshStandardMaterial({
      color: 0x00ffcc,
      emissive: 0x00ffaa,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.1,
      transparent: true,
      opacity: 0.9
    });
    const sacMesh = new THREE.Mesh(sacGeo, this.sacMat);
    sacMesh.position.set(0, 2.3, -0.2);
    this.mesh.add(sacMesh);

    // 3. Head & Sensory antennae
    const headGeo = new THREE.SphereGeometry(0.6, 12, 10);
    const headMat = new THREE.MeshStandardMaterial({ color: 0x224941, roughness: 0.5 });
    const headMesh = new THREE.Mesh(headGeo, headMat);
    headMesh.position.set(0, 1.8, 1.2);
    this.mesh.add(headMesh);

    // Antennae with glowing tips
    const antGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8);
    const antMat = new THREE.MeshStandardMaterial({ color: 0x336655 });
    const tipGeo = new THREE.SphereGeometry(0.12, 8, 8);
    this.antennaTipMat = new THREE.MeshBasicMaterial({ color: 0x00ffaa });

    [-0.25, 0.25].forEach((xOffset) => {
      const antenna = new THREE.Group();
      const stem = new THREE.Mesh(antGeo, antMat);
      stem.position.y = 0.4;
      stem.rotation.z = xOffset * 0.8;
      antenna.add(stem);

      const tip = new THREE.Mesh(tipGeo, this.antennaTipMat);
      tip.position.set(xOffset * 0.3, 0.8, 0);
      antenna.add(tip);

      antenna.position.set(xOffset, 2.1, 1.4);
      antenna.rotation.x = 0.3;
      this.mesh.add(antenna);
    });

    // 4. Four slender tripod-like legs
    const legGeo = new THREE.CylinderGeometry(0.1, 0.06, 1.8, 8);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x15352e, roughness: 0.8 });

    this.legs = [];
    const legPositions = [
      { x: -0.7, z: 0.7 },
      { x: 0.7, z: 0.7 },
      { x: -0.8, z: -0.7 },
      { x: 0.8, z: -0.7 }
    ];

    legPositions.forEach((pos, idx) => {
      const legGroup = new THREE.Group();
      legGroup.position.set(pos.x, 1.5, pos.z);
      const legMesh = new THREE.Mesh(legGeo, legMat);
      legMesh.position.y = -0.8;
      legMesh.castShadow = true;
      legGroup.add(legMesh);
      this.mesh.add(legGroup);
      this.legs.push({ group: legGroup, baseAngle: idx * Math.PI * 0.5 });
    });
  }

  evaluateState(distToPlayer, playerPos, delta) {
    if (distToPlayer < this.fleeRadius) {
      this.state = AIState.FLEE;
    } else if (distToPlayer < this.alertRadius && this.state !== AIState.FLEE) {
      this.state = AIState.ALERT;
    } else if (this.state === AIState.FLEE && distToPlayer > this.alertRadius * 1.4) {
      this.state = AIState.IDLE;
    } else if (this.state === AIState.ALERT && distToPlayer > this.alertRadius * 1.1) {
      this.state = AIState.IDLE;
    }
  }

  executeState(delta, distToPlayer, playerPos) {
    this.bobTimer += delta * 3;

    if (this.state === AIState.IDLE) {
      this.sacMat.emissive.setHex(0x00ffaa);
      this.sacMat.emissiveIntensity = 0.6 + Math.sin(this.bobTimer * 1.5) * 0.2;
      this.antennaTipMat.color.setHex(0x00ffaa);

      // Wander logic
      this.wanderTimer -= delta;
      if (this.wanderTimer <= 0) {
        this.wanderTimer = 3 + Math.random() * 4;
        this.wanderAngle += (Math.random() - 0.5) * 1.5;
      }

      // Smooth turn towards wander heading
      let diff = this.wanderAngle - this.heading;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      this.heading += diff * Math.min(1.0, 2.0 * delta);

      // Forward motion
      this.velocity.x = Math.sin(this.heading) * this.speed;
      this.velocity.z = Math.cos(this.heading) * this.speed;

      this.animateLegs(delta, 2.5);

    } else if (this.state === AIState.ALERT) {
      // Orange/amber warning glow
      this.sacMat.emissive.setHex(0xffaa00);
      this.sacMat.emissiveIntensity = 0.9 + Math.sin(this.bobTimer * 4.0) * 0.3;
      this.antennaTipMat.color.setHex(0xffaa00);

      // Stop moving and look warily at player
      this.velocity.set(0, 0, 0);
      this.turnTowards(playerPos, delta, 3.0);
      this.resetLegs();

    } else if (this.state === AIState.FLEE) {
      // Rapid pulse red/pink hazard glow
      this.sacMat.emissive.setHex(0xff0066);
      this.sacMat.emissiveIntensity = 1.2 + Math.sin(this.bobTimer * 8.0) * 0.4;
      this.antennaTipMat.color.setHex(0xff0066);

      // Sprint away from player
      this.turnAwayFrom(playerPos, delta, 5.0);
      this.velocity.x = Math.sin(this.heading) * this.runSpeed;
      this.velocity.z = Math.cos(this.heading) * this.runSpeed;

      this.animateLegs(delta, 7.0);
    }

    // Gentle body bobbing
    if (this.bodyMesh) {
      this.bodyMesh.position.y = 1.6 + Math.sin(this.bobTimer * 2) * 0.08;
    }
  }

  animateLegs(delta, rate) {
    this.legs.forEach((leg, i) => {
      const angle = Math.sin(this.bobTimer * rate + leg.baseAngle) * 0.4;
      leg.group.rotation.x = angle;
    });
  }

  resetLegs() {
    this.legs.forEach((leg) => {
      leg.group.rotation.x *= 0.85;
    });
  }
}
