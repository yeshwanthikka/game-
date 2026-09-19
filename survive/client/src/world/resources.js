import * as THREE from 'three';
import { sound } from '../audio/sound.js';

export class ResourceManager {
  constructor(scene, terrain) {
    this.scene = scene;
    this.terrain = terrain;

    this.shipParts = [];
    this.harvestNodes = [];
    this.lootDrops = [];

    this.initShipParts();
    this.initHarvestNodes();
  }

  initShipParts() {
    const partDefinitions = [
      { id: 'thruster', name: 'ION THRUSTER CORE', x: 65, z: 65, color: 0x00f0ff },
      { id: 'nav', name: 'SUB-LIGHT NAV BEACON', x: -65, z: 60, color: 0xffaa00 },
      { id: 'hull', name: 'ALLOY HULL PLATING', x: -60, z: -65, color: 0x00ff88 },
      { id: 'reactor', name: 'HYPER-DRIVE REACTOR', x: 65, z: -65, color: 0xff00ff }
    ];

    partDefinitions.forEach((def) => {
      const y = this.terrain.getHeight(def.x, def.z);
      const group = new THREE.Group();
      group.position.set(def.x, y, def.z);

      // Mechanical debris container
      const wreckGeo = new THREE.CylinderGeometry(0.8, 1.2, 1.4, 6);
      const wreckMat = new THREE.MeshStandardMaterial({
        color: 0x2d3748,
        metalness: 0.8,
        roughness: 0.3
      });
      const wreck = new THREE.Mesh(wreckGeo, wreckMat);
      wreck.position.y = 0.7;
      wreck.castShadow = true;
      group.add(wreck);

      // Glowing core component
      const coreGeo = new THREE.DodecahedronGeometry(0.45);
      const coreMat = new THREE.MeshStandardMaterial({
        color: def.color,
        emissive: def.color,
        emissiveIntensity: 1.2,
        roughness: 0.1
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      core.position.y = 1.6;
      group.add(core);

      // Sky Beacon Beam (Visible across the entire planet)
      const beamGeo = new THREE.CylinderGeometry(0.35, 1.2, 140, 8);
      const beamMat = new THREE.MeshBasicMaterial({
        color: def.color,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.y = 70;
      group.add(beam);

      // Base point light
      const light = new THREE.PointLight(def.color, 3, 14);
      light.position.y = 2.0;
      group.add(light);

      this.scene.add(group);

      this.shipParts.push({
        id: def.id,
        name: def.name,
        group,
        core,
        pos: new THREE.Vector3(def.x, y, def.z),
        collected: false
      });
    });
  }

  initHarvestNodes() {
    // 1. Bio-Flora clusters (+4 Bio-Fuel)
    const floraCoords = [
      [35, -20], [-45, 25], [20, 45], [-35, -50],
      [55, 15], [-50, -25], [15, -60], [-25, 65]
    ];
    floraCoords.forEach(([x, z], idx) => {
      const y = this.terrain.getHeight(x, z);
      const group = new THREE.Group();
      group.position.set(x, y, z);

      const floraGeo = new THREE.SphereGeometry(0.9, 12, 12);
      floraGeo.scale(1, 1.5, 1);
      const floraMat = new THREE.MeshStandardMaterial({
        color: 0x00ffaa,
        emissive: 0x00aa77,
        emissiveIntensity: 0.8,
        roughness: 0.4
      });
      const mesh = new THREE.Mesh(floraGeo, floraMat);
      mesh.position.y = 1.2;
      mesh.castShadow = true;
      group.add(mesh);

      this.scene.add(group);
      this.harvestNodes.push({
        id: `flora_${idx}`,
        type: 'flora',
        name: 'BIO-SPORE HARVEST',
        group,
        pos: new THREE.Vector3(x, y, z),
        collected: false,
        resource: 'bioFuel',
        amount: 4
      });
    });

    // 2. Alien Alloy Crystal Outcrops (+2 Alloy)
    const alloyCoords = [
      [-55, 45], [45, 55], [-40, -45], [50, -40],
      [25, 30], [-30, 35], [-20, -35], [35, -55]
    ];
    alloyCoords.forEach(([x, z], idx) => {
      const y = this.terrain.getHeight(x, z);
      const group = new THREE.Group();
      group.position.set(x, y, z);

      const rockGeo = new THREE.OctahedronGeometry(0.85, 0);
      rockGeo.scale(1.2, 1.8, 1.0);
      const rockMat = new THREE.MeshStandardMaterial({
        color: 0xffaa00,
        emissive: 0xff6600,
        emissiveIntensity: 0.7,
        metalness: 0.8,
        roughness: 0.25
      });
      const mesh = new THREE.Mesh(rockGeo, rockMat);
      mesh.position.y = 0.9;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.castShadow = true;
      group.add(mesh);

      this.scene.add(group);
      this.harvestNodes.push({
        id: `alloy_${idx}`,
        type: 'alloy',
        name: 'ALLOY OUTCROP',
        group,
        pos: new THREE.Vector3(x, y, z),
        collected: false,
        resource: 'alienAlloy',
        amount: 2
      });
    });

    // 3. Ammo Supply Crates (+15 Ammo)
    const ammoCoords = [
      [-15, 20], [20, -15], [-20, -20], [22, 22], [50, 0], [-50, 0]
    ];
    ammoCoords.forEach(([x, z], idx) => {
      const y = this.terrain.getHeight(x, z);
      const group = new THREE.Group();
      group.position.set(x, y, z);

      const crateGeo = new THREE.BoxGeometry(0.8, 0.5, 0.8);
      const crateMat = new THREE.MeshStandardMaterial({
        color: 0x00f0ff,
        emissive: 0x0066aa,
        emissiveIntensity: 0.6,
        metalness: 0.7,
        roughness: 0.3
      });
      const mesh = new THREE.Mesh(crateGeo, crateMat);
      mesh.position.y = 0.3;
      mesh.castShadow = true;
      group.add(mesh);

      this.scene.add(group);
      this.harvestNodes.push({
        id: `ammo_${idx}`,
        type: 'ammo',
        name: 'SALVAGE AMMO POD',
        group,
        pos: new THREE.Vector3(x, y, z),
        collected: false,
        resource: 'ammo',
        amount: 15
      });
    });
  }

  spawnLoot(creatureType, position) {
    const group = new THREE.Group();
    const groundY = this.terrain.getHeight(position.x, position.z);
    group.position.set(position.x, groundY + 0.5, position.z);

    let lootData = { resource: 'bioFuel', amount: 3, name: 'BIO-FUEL CELL', color: 0x00ffcc };

    if (creatureType === 'stalker') {
      lootData = { resource: 'alienAlloy', amount: 2, name: 'ALLOY FRAGMENT', color: 0xffaa00 };
    } else if (creatureType === 'skitterer') {
      lootData = { resource: 'ammo', amount: 8, name: 'PLASMA AMMO', color: 0x00f0ff };
    }

    const geo = new THREE.DodecahedronGeometry(0.35);
    const mat = new THREE.MeshStandardMaterial({
      color: lootData.color,
      emissive: lootData.color,
      emissiveIntensity: 1.0,
      metalness: 0.5,
      roughness: 0.2
    });
    const mesh = new THREE.Mesh(geo, mat);
    group.add(mesh);

    const light = new THREE.PointLight(lootData.color, 2, 6);
    group.add(light);

    this.scene.add(group);

    this.lootDrops.push({
      group,
      mesh,
      pos: group.position,
      resource: lootData.resource,
      amount: lootData.amount,
      name: lootData.name,
      life: 60.0,
      collected: false
    });
  }

  getNearbyInteractive(playerPos) {
    let closest = null;
    let minDistance = 3.5;

    // Check Ship Parts
    for (const part of this.shipParts) {
      if (part.collected) continue;
      const dist = playerPos.distanceTo(part.pos);
      if (dist < minDistance) {
        minDistance = dist;
        closest = {
          category: 'part',
          item: part,
          prompt: `[E] SALVAGE ${part.name}`
        };
      }
    }

    // Check Harvest Nodes
    if (!closest) {
      for (const node of this.harvestNodes) {
        if (node.collected) continue;
        const dist = playerPos.distanceTo(node.pos);
        if (dist < minDistance) {
          minDistance = dist;
          closest = {
            category: 'harvest',
            item: node,
            prompt: `[E] GATHER ${node.name}`
          };
        }
      }
    }

    return closest;
  }

  interact(player, interactive) {
    if (!interactive || !interactive.item) return false;

    const item = interactive.item;
    if (interactive.category === 'part') {
      item.collected = true;
      player.inventory.shipParts = Math.min(4, player.inventory.shipParts + 1);
      this.scene.remove(item.group);
      sound.playPickup();
      return { success: true, message: `Acquired ${item.name} [${player.inventory.shipParts}/4]` };
    } else if (interactive.category === 'harvest') {
      item.collected = true;
      player.inventory[item.resource] += item.amount;
      this.scene.remove(item.group);
      sound.playHarvest();
      return { success: true, message: `Harvested +${item.amount} ${item.resource.toUpperCase()}` };
    }

    return false;
  }

  update(delta, playerPos, player) {
    const time = performance.now() * 0.003;

    // Animate Ship Part Cores
    this.shipParts.forEach((part) => {
      if (!part.collected && part.core) {
        part.core.rotation.y += delta * 1.5;
        part.core.rotation.x += delta * 0.8;
      }
    });

    // Animate & Check Auto-Pickup for Creature Loot Drops
    for (let i = this.lootDrops.length - 1; i >= 0; i--) {
      const drop = this.lootDrops[i];
      drop.life -= delta;

      // Bob & Rotate
      drop.mesh.rotation.y += delta * 2.0;
      drop.mesh.position.y = Math.sin(time * 3.0 + i) * 0.1;

      // Check walkover distance (auto pickup within 2.2m)
      const dist = playerPos.distanceTo(drop.pos);
      if (dist < 2.2 && !drop.collected) {
        drop.collected = true;
        player.inventory[drop.resource] += drop.amount;
        sound.playPickup();
        this.scene.remove(drop.group);
        this.lootDrops.splice(i, 1);
        continue;
      }

      if (drop.life <= 0) {
        this.scene.remove(drop.group);
        this.lootDrops.splice(i, 1);
      }
    }
  }

  destroy() {
    this.shipParts.forEach((p) => this.scene.remove(p.group));
    this.harvestNodes.forEach((n) => this.scene.remove(n.group));
    this.lootDrops.forEach((d) => this.scene.remove(d.group));
  }
}
