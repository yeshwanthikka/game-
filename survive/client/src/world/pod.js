import * as THREE from 'three';
import { sound } from '../audio/sound.js';

export class EscapePod {
  constructor(scene, terrain) {
    this.scene = scene;
    this.terrain = terrain;

    this.position = new THREE.Vector3(0, this.terrain.getHeight(0, 0), 0);
    this.state = 'DAMAGED'; // 'DAMAGED', 'DEFENDING', 'LAUNCHED'
    this.defenseTimer = 20.0; // 20s defense event
    this.alarmTimer = 0;

    this.required = {
      shipParts: 4,
      bioFuel: 25,
      alienAlloy: 10
    };

    this.initPodConsole();
  }

  initPodConsole() {
    this.podGroup = new THREE.Group();
    this.podGroup.position.copy(this.position);

    // Interactive repair console pillar near pod
    const consoleGeo = new THREE.CylinderGeometry(0.3, 0.4, 1.2, 8);
    const consoleMat = new THREE.MeshStandardMaterial({
      color: 0x1a202c,
      metalness: 0.8,
      roughness: 0.2
    });
    this.consoleMesh = new THREE.Mesh(consoleGeo, consoleMat);
    this.consoleMesh.position.set(2.5, 0.6, 2.0);
    this.podGroup.add(this.consoleMesh);

    // Console screen display
    const screenGeo = new THREE.BoxGeometry(0.45, 0.3, 0.05);
    this.screenMat = new THREE.MeshBasicMaterial({ color: 0xff0055 });
    const screen = new THREE.Mesh(screenGeo, this.screenMat);
    screen.position.set(2.5, 1.25, 2.0);
    screen.rotation.x = -0.4;
    this.podGroup.add(screen);

    // Emergency launch sky pillar beam (disabled until launch)
    const beamGeo = new THREE.CylinderGeometry(1.5, 4.0, 260, 12);
    this.launchBeamMat = new THREE.MeshBasicMaterial({
      color: 0x00ffaa,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide
    });
    this.launchBeam = new THREE.Mesh(beamGeo, this.launchBeamMat);
    this.launchBeam.position.set(0, 130, 0);
    this.podGroup.add(this.launchBeam);

    // Thruster flame particles / mesh for liftoff
    const flameGeo = new THREE.ConeGeometry(1.8, 8.0, 12);
    flameGeo.rotateX(Math.PI);
    this.flameMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0
    });
    this.flameMesh = new THREE.Mesh(flameGeo, this.flameMat);
    this.flameMesh.position.set(0, -3.0, 0);
    this.podGroup.add(this.flameMesh);

    this.scene.add(this.podGroup);
  }

  isReadyToRepair(inventory) {
    return (
      inventory.shipParts >= this.required.shipParts &&
      inventory.bioFuel >= this.required.bioFuel &&
      inventory.alienAlloy >= this.required.alienAlloy
    );
  }

  getPrompt(playerPos, inventory) {
    const dist = playerPos.distanceTo(new THREE.Vector3(2.5, this.position.y, 2.0));
    if (dist > 4.5) return null;

    if (this.state === 'DAMAGED') {
      if (this.isReadyToRepair(inventory)) {
        return {
          canLaunch: true,
          prompt: '[E] INITIATE EMERGENCY EXTRACTION LAUNCH SEQUENCE'
        };
      } else {
        const missing = [];
        if (inventory.shipParts < this.required.shipParts) missing.push(`Parts ${inventory.shipParts}/4`);
        if (inventory.bioFuel < this.required.bioFuel) missing.push(`Bio-Fuel ${inventory.bioFuel}/25`);
        if (inventory.alienAlloy < this.required.alienAlloy) missing.push(`Alloy ${inventory.alienAlloy}/10`);
        return {
          canLaunch: false,
          prompt: `[E] POD OFFLINE — REQUIRED: [${missing.join(' | ')}]`
        };
      }
    } else if (this.state === 'DEFENDING') {
      return {
        canLaunch: false,
        prompt: `DEFEND POD! LAUNCH WINDOW IN ${Math.ceil(this.defenseTimer)}s`
      };
    }

    return null;
  }

  initiateLaunch(inventory) {
    if (this.state !== 'DAMAGED' || !this.isReadyToRepair(inventory)) return false;

    this.state = 'DEFENDING';
    this.defenseTimer = 20.0;
    this.screenMat.color.setHex(0x00ff88);
    this.launchBeamMat.opacity = 0.5;

    sound.playAlarm();
    return true;
  }

  update(delta, playerPos, creatureManager) {
    if (this.state === 'DEFENDING') {
      this.defenseTimer -= delta;
      this.alarmTimer += delta;

      // Pulse alarm every 2 seconds
      if (this.alarmTimer >= 2.0) {
        this.alarmTimer = 0;
        sound.playAlarm();
      }

      // Sky beam animation
      this.launchBeam.rotation.y += delta * 2.0;
      this.launchBeamMat.opacity = 0.4 + Math.sin(this.defenseTimer * 8.0) * 0.2;

      // Check countdown complete
      if (this.defenseTimer <= 0) {
        this.state = 'LAUNCHED';
        this.launchBeamMat.opacity = 0.9;
        this.flameMat.opacity = 0.8;
        sound.playLaunch();
        return { extracted: true };
      }
    } else if (this.state === 'LAUNCHED') {
      // Pod liftoff animation into outer space
      this.podGroup.position.y += delta * 45.0;
      this.flameMesh.scale.set(
        1.0 + Math.random() * 0.3,
        1.0 + Math.random() * 0.5,
        1.0 + Math.random() * 0.3
      );
    }

    return null;
  }

  destroy() {
    this.scene.remove(this.podGroup);
  }
}
