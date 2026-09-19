import * as THREE from 'three';
import { sound } from '../audio/sound.js';

export class EscapePod {
  constructor(scene, terrain) {
    this.scene = scene;
    this.terrain = terrain;

    const groundY = this.terrain.getHeight(0, 0);
    this.position = new THREE.Vector3(0, groundY, 0);
    this.state = 'DAMAGED'; // 'DAMAGED', 'DEFENDING', 'LAUNCHED'
    this.defenseTimer = 20.0;
    this.alarmTimer = 0;
    this.pulseTime = 0;

    this.required = {
      shipParts: 4,
      bioFuel: 25,
      alienAlloy: 10
    };

    this.initPodModel();
  }

  initPodModel() {
    this.podGroup = new THREE.Group();
    this.podGroup.position.copy(this.position);

    // 1. Pod Main Fuselage (Sci-fi Lander Module)
    const hullGeo = new THREE.CylinderGeometry(1.6, 3.4, 6.5, 10);
    const hullMat = new THREE.MeshStandardMaterial({
      color: 0x3d4852,
      metalness: 0.85,
      roughness: 0.25
    });
    this.hullMesh = new THREE.Mesh(hullGeo, hullMat);
    this.hullMesh.position.y = 3.6;
    this.hullMesh.castShadow = true;
    this.podGroup.add(this.hullMesh);

    // Glowing cyan hull status rings
    const ringGeo = new THREE.TorusGeometry(2.6, 0.08, 8, 24);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 2;
    ring1.position.y = 2.4;
    this.podGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.08, 8, 24), ringMat);
    ring2.rotation.x = Math.PI / 2;
    ring2.position.y = 5.2;
    this.podGroup.add(ring2);

    // Command cockpit canopy (amber glow)
    const canopyGeo = new THREE.SphereGeometry(0.9, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    const canopyMat = new THREE.MeshStandardMaterial({
      color: 0xffaa00,
      emissive: 0xff6600,
      emissiveIntensity: 0.8,
      metalness: 0.9,
      roughness: 0.1
    });
    const canopy = new THREE.Mesh(canopyGeo, canopyMat);
    canopy.position.set(0, 4.2, 1.6);
    canopy.rotation.x = 0.5;
    this.podGroup.add(canopy);

    // 2. Heavy Hydraulic Landing Struts (4 legs planted into terrain)
    const strutGeo = new THREE.CylinderGeometry(0.18, 0.25, 4.2, 6);
    const footGeo = new THREE.BoxGeometry(1.0, 0.25, 1.2);
    const strutMat = new THREE.MeshStandardMaterial({ color: 0x1a202c, metalness: 0.9, roughness: 0.3 });

    const legAngles = [Math.PI * 0.25, Math.PI * 0.75, Math.PI * 1.25, Math.PI * 1.75];
    legAngles.forEach((ang) => {
      const legGroup = new THREE.Group();
      legGroup.rotation.y = ang;

      const strut = new THREE.Mesh(strutGeo, strutMat);
      strut.position.set(2.4, 1.8, 0);
      strut.rotation.z = -0.45;
      strut.castShadow = true;
      legGroup.add(strut);

      const foot = new THREE.Mesh(footGeo, strutMat);
      foot.position.set(3.4, 0.15, 0);
      foot.castShadow = true;
      legGroup.add(foot);

      this.podGroup.add(legGroup);
    });

    // 3. Dual Ion Thruster Nozzles at base
    const thrusterGeo = new THREE.CylinderGeometry(0.7, 1.1, 1.5, 12);
    const thrusterMat = new THREE.MeshStandardMaterial({ color: 0x111116, metalness: 0.95 });
    [-1.0, 1.0].forEach((x) => {
      const t = new THREE.Mesh(thrusterGeo, thrusterMat);
      t.position.set(x, 0.6, 0);
      this.podGroup.add(t);
    });

    // 4. Emergency Beacon Mast on Top
    const mastGeo = new THREE.CylinderGeometry(0.08, 0.12, 2.5);
    const mast = new THREE.Mesh(mastGeo, strutMat);
    mast.position.y = 7.8;
    this.podGroup.add(mast);

    const beaconGeo = new THREE.SphereGeometry(0.45, 16, 16);
    this.beaconMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
    this.beaconMesh = new THREE.Mesh(beaconGeo, this.beaconMat);
    this.beaconMesh.position.y = 9.2;
    this.podGroup.add(this.beaconMesh);

    // Strobe Point Light
    this.beaconLight = new THREE.PointLight(0xffaa00, 4, 30);
    this.beaconLight.position.y = 9.5;
    this.podGroup.add(this.beaconLight);

    // 5. Permanent 180m TALL SKY-BEACON PILLAR (Visible across the whole map)
    const skyBeamGeo = new THREE.CylinderGeometry(0.8, 2.2, 180, 12);
    this.skyBeamMat = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide
    });
    this.skyBeam = new THREE.Mesh(skyBeamGeo, this.skyBeamMat);
    this.skyBeam.position.y = 98;
    this.podGroup.add(this.skyBeam);

    // Floating Hologram Ring over pod
    const holoRingGeo = new THREE.TorusGeometry(3.5, 0.12, 8, 32);
    this.holoRingMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.7
    });
    this.holoRing = new THREE.Mesh(holoRingGeo, this.holoRingMat);
    this.holoRing.rotation.x = Math.PI / 2;
    this.holoRing.position.y = 11.5;
    this.podGroup.add(this.holoRing);

    // 6. Interactive Repair Terminal Console (Positioned right in front of pod)
    this.consoleGroup = new THREE.Group();
    this.consoleGroup.position.set(0, 0, 3.8);

    const consolePedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.45, 1.3, 8),
      strutMat
    );
    consolePedestal.position.y = 0.65;
    this.consoleGroup.add(consolePedestal);

    const screenGeo = new THREE.BoxGeometry(0.7, 0.45, 0.08);
    this.screenMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
    const screen = new THREE.Mesh(screenGeo, this.screenMat);
    screen.position.set(0, 1.35, 0);
    screen.rotation.x = -0.35;
    this.consoleGroup.add(screen);

    const consoleLight = new THREE.PointLight(0x00f0ff, 2, 8);
    consoleLight.position.set(0, 1.6, 0.2);
    this.consoleGroup.add(consoleLight);

    this.podGroup.add(this.consoleGroup);

    // 7. Rocket Liftoff Flame Mesh (Hidden until launch)
    const flameGeo = new THREE.ConeGeometry(2.4, 10.0, 16);
    flameGeo.rotateX(Math.PI);
    this.flameMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0
    });
    this.flameMesh = new THREE.Mesh(flameGeo, this.flameMat);
    this.flameMesh.position.set(0, -4.5, 0);
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
    // Console is located around (0, y, 3.8)
    const consoleWorldPos = new THREE.Vector3(0, this.position.y, 3.8);
    const dist = playerPos.distanceTo(consoleWorldPos);

    if (dist > 5.0) return null;

    if (this.state === 'DAMAGED') {
      if (this.isReadyToRepair(inventory)) {
        return {
          canLaunch: true,
          prompt: '[E] INITIATE EMERGENCY EXTRACTION LAUNCH SEQUENCE'
        };
      } else {
        const missing = [];
        if (inventory.shipParts < this.required.shipParts) missing.push(`Parts: ${inventory.shipParts}/4`);
        if (inventory.bioFuel < this.required.bioFuel) missing.push(`Bio-Fuel: ${inventory.bioFuel}/25`);
        if (inventory.alienAlloy < this.required.alienAlloy) missing.push(`Alloy: ${inventory.alienAlloy}/10`);
        return {
          canLaunch: false,
          prompt: `[E] ESCAPE POD OFFLINE — NEED: [${missing.join(' | ')}]`
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
    this.beaconMat.color.setHex(0x00ff88);
    this.beaconLight.color.setHex(0x00ff88);
    this.skyBeamMat.color.setHex(0x00ff88);
    this.skyBeamMat.opacity = 0.8;

    sound.playAlarm();
    return true;
  }

  update(delta, playerPos, creatureManager) {
    this.pulseTime += delta;

    // Rotate Holographic Ring
    if (this.holoRing) {
      this.holoRing.rotation.z += delta * 1.2;
    }

    if (this.state === 'DAMAGED') {
      // Gentle beacon pulse
      const pulse = 0.5 + Math.sin(this.pulseTime * 3.0) * 0.3;
      this.beaconLight.intensity = pulse * 4.0;
      this.skyBeamMat.opacity = 0.35 + pulse * 0.2;
      this.skyBeam.rotation.y += delta * 0.5;

    } else if (this.state === 'DEFENDING') {
      this.defenseTimer -= delta;
      this.alarmTimer += delta;

      // Pulse alarm every 2 seconds
      if (this.alarmTimer >= 2.0) {
        this.alarmTimer = 0;
        sound.playAlarm();
      }

      // Fast beacon warning strobe
      const strobe = Math.sin(this.defenseTimer * 10.0) > 0;
      this.beaconLight.intensity = strobe ? 8.0 : 1.0;
      this.skyBeamMat.opacity = 0.5 + Math.sin(this.defenseTimer * 8.0) * 0.3;
      this.skyBeam.rotation.y += delta * 3.0;

      // Check countdown complete
      if (this.defenseTimer <= 0) {
        this.state = 'LAUNCHED';
        this.skyBeamMat.opacity = 0.95;
        this.flameMat.opacity = 0.85;
        sound.playLaunch();
        return { extracted: true };
      }
    } else if (this.state === 'LAUNCHED') {
      // Whole pod liftoff into outer space
      this.podGroup.position.y += delta * 50.0;
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
