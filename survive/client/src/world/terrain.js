import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

export class Terrain {
  constructor(scene, size = 300, segments = 128) {
    this.scene = scene;
    this.size = size;
    this.segments = segments;
    this.noise2D = createNoise2D();

    this.mesh = null;
    this.heightData = [];
    this.rockInstances = null;
    this.alienFloraInstances = null;

    this.init();
  }

  getHeight(x, z) {
    // Multi-octave simplex noise for varied alien dune & crag topography
    const s1 = 0.008;
    const s2 = 0.025;
    const s3 = 0.08;

    let h = this.noise2D(x * s1, z * s1) * 16.0;
    h += this.noise2D(x * s2, z * s2) * 6.0;
    h += this.noise2D(x * s3, z * s3) * 1.8;

    // Flatten center crash site radius (20 units)
    const distFromCenter = Math.sqrt(x * x + z * z);
    if (distFromCenter < 25) {
      const factor = Math.max(0, (distFromCenter - 8) / 17);
      h = h * factor;
    }

    // Boundary wall rise to keep player within bounded zone
    const halfSize = this.size / 2;
    const edgeDist = Math.max(Math.abs(x), Math.abs(z));
    if (edgeDist > halfSize - 30) {
      const wallFactor = (edgeDist - (halfSize - 30)) / 30;
      h += Math.pow(wallFactor, 2) * 45;
    }

    return h;
  }

  init() {
    const geometry = new THREE.PlaneGeometry(this.size, this.size, this.segments, this.segments);
    geometry.rotateX(-Math.PI / 2);

    const positions = geometry.attributes.position;
    const count = positions.count;
    const colors = new Float32Array(count * 3);

    // Alien terrain gradient palette
    const colLow = new THREE.Color(0x24112e);   // Dark purple crags/valleys
    const colMid = new THREE.Color(0x752b57);   // Crimson/violet dunes
    const colHigh = new THREE.Color(0xd46839);  // Burnt amber ridges
    const colPeak = new THREE.Color(0x00f0ff);  // Cyan crystalline outcrops

    for (let i = 0; i < count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);
      const y = this.getHeight(x, z);
      positions.setY(i, y);

      // Color based on height
      const t = THREE.MathUtils.clamp((y + 5) / 28, 0, 1);
      const c = new THREE.Color();
      if (t < 0.4) {
        c.lerpColors(colLow, colMid, t / 0.4);
      } else if (t < 0.8) {
        c.lerpColors(colMid, colHigh, (t - 0.4) / 0.4);
      } else {
        c.lerpColors(colHigh, colPeak, (t - 0.8) / 0.2);
      }

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.computeVertexNormals();

    const material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.85,
      metalness: 0.15,
      flatShading: true
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);

    this.spawnRocksAndFlora();
    this.spawnCrashSite();
  }

  spawnRocksAndFlora() {
    // 1. InstancedMesh for Alien Crags/Rocks (Performance optimized)
    const rockGeo = new THREE.DodecahedronGeometry(1.5, 1);
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x3d1a45,
      roughness: 0.9,
      metalness: 0.1
    });

    const rockCount = 140;
    this.rockInstances = new THREE.InstancedMesh(rockGeo, rockMat, rockCount);
    this.rockInstances.castShadow = true;
    this.rockInstances.receiveShadow = true;

    const dummy = new THREE.Object3D();
    for (let i = 0; i < rockCount; i++) {
      const x = (Math.random() - 0.5) * (this.size - 60);
      const z = (Math.random() - 0.5) * (this.size - 60);
      // Avoid crash center
      if (Math.hypot(x, z) < 15) continue;

      const y = this.getHeight(x, z);
      dummy.position.set(x, y + 0.4, z);

      const scale = 0.8 + Math.random() * 2.2;
      dummy.scale.set(scale, scale * (0.8 + Math.random() * 1.5), scale);
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      dummy.updateMatrix();
      this.rockInstances.setMatrixAt(i, dummy.matrix);
    }
    this.rockInstances.instanceMatrix.needsUpdate = true;
    this.scene.add(this.rockInstances);

    // 2. InstancedMesh for Bioluminescent Alien Spire Flora
    const floraGeo = new THREE.ConeGeometry(0.6, 3.2, 5);
    const floraMat = new THREE.MeshStandardMaterial({
      color: 0x00ffcc,
      emissive: 0x008877,
      emissiveIntensity: 0.5,
      roughness: 0.4
    });

    const floraCount = 90;
    this.alienFloraInstances = new THREE.InstancedMesh(floraGeo, floraMat, floraCount);
    for (let i = 0; i < floraCount; i++) {
      const x = (Math.random() - 0.5) * (this.size - 60);
      const z = (Math.random() - 0.5) * (this.size - 60);
      if (Math.hypot(x, z) < 12) continue;

      const y = this.getHeight(x, z);
      dummy.position.set(x, y + 1.6, z);
      dummy.scale.set(0.6 + Math.random() * 0.8, 0.8 + Math.random() * 1.4, 0.6 + Math.random() * 0.8);
      dummy.rotation.set((Math.random() - 0.5) * 0.2, Math.random() * Math.PI, (Math.random() - 0.5) * 0.2);
      dummy.updateMatrix();
      this.alienFloraInstances.setMatrixAt(i, dummy.matrix);
    }
    this.alienFloraInstances.instanceMatrix.needsUpdate = true;
    this.scene.add(this.alienFloraInstances);
  }

  spawnCrashSite() {
    // Crashed Pod geometry at (0, 0)
    const podGroup = new THREE.Group();

    // Main pod chassis
    const bodyGeo = new THREE.CylinderGeometry(2.2, 1.4, 6, 8);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x4a5568,
      metalness: 0.85,
      roughness: 0.3
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.rotation.z = Math.PI / 3;
    body.rotation.x = 0.3;
    body.position.set(0, 1.2, 0);
    podGroup.add(body);

    // Glowing emergency beacon
    const beaconGeo = new THREE.SphereGeometry(0.4, 16, 16);
    const beaconMat = new THREE.MeshStandardMaterial({
      color: 0xff3366,
      emissive: 0xff0044,
      emissiveIntensity: 2.0
    });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.set(-1.8, 2.8, 0.8);
    podGroup.add(beacon);

    // Extraction beacon light
    const beaconLight = new THREE.PointLight(0xff0044, 4, 15);
    beaconLight.position.set(-1.8, 3.0, 0.8);
    podGroup.add(beaconLight);

    const podY = this.getHeight(0, 0);
    podGroup.position.set(0, podY, 0);
    this.scene.add(podGroup);
  }
}
