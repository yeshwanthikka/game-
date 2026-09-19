import * as THREE from 'three';

export class SkyManager {
  constructor(scene) {
    this.scene = scene;

    // Day/Night cycle properties
    this.dayDuration = 120; // 120 seconds per full cycle
    this.time = 25; // start in late morning

    // Lights
    this.ambientLight = null;
    this.sunLight = null;
    this.moonLight = null;
    this.sunMesh = null;
    this.moonMesh = null;

    this.init();
  }

  init() {
    // Atmospheric fog - masks world boundaries & pop-in
    this.scene.fog = new THREE.FogExp2(0x1a0f28, 0.013);

    // Ambient light
    this.ambientLight = new THREE.AmbientLight(0x2d1840, 1.2);
    this.scene.add(this.ambientLight);

    // Sun directional light (primary light)
    this.sunLight = new THREE.DirectionalLight(0xffeedd, 2.0);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 1024;
    this.sunLight.shadow.mapSize.height = 1024;
    this.sunLight.shadow.camera.near = 0.5;
    this.sunLight.shadow.camera.far = 250;
    const d = 60;
    this.sunLight.shadow.camera.left = -d;
    this.sunLight.shadow.camera.right = d;
    this.sunLight.shadow.camera.top = d;
    this.sunLight.shadow.camera.bottom = -d;
    this.scene.add(this.sunLight);

    // Sun sphere visual
    const sunGeo = new THREE.SphereGeometry(6, 16, 16);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xffd27d });
    this.sunMesh = new THREE.Mesh(sunGeo, sunMat);
    this.scene.add(this.sunMesh);

    // Alien twin moon visual
    const moonGeo = new THREE.SphereGeometry(4.5, 16, 16);
    const moonMat = new THREE.MeshBasicMaterial({ color: 0x4df2ff });
    this.moonMesh = new THREE.Mesh(moonGeo, moonMat);
    this.scene.add(this.moonMesh);
  }

  update(delta, playerPos) {
    this.time = (this.time + delta) % this.dayDuration;
    const cycleRatio = this.time / this.dayDuration; // 0 to 1
    const angle = cycleRatio * Math.PI * 2;

    const sunDistance = 140;
    const sunX = (playerPos ? playerPos.x : 0) + Math.cos(angle) * sunDistance;
    const sunY = Math.sin(angle) * sunDistance;
    const sunZ = (playerPos ? playerPos.z : 0) + Math.sin(angle * 0.5) * 40;

    // Sun position & targeting
    this.sunLight.position.set(sunX, Math.max(sunY, -10), sunZ);
    if (playerPos) {
      this.sunLight.target.position.copy(playerPos);
      this.sunLight.target.updateMatrixWorld();
    }
    this.sunMesh.position.set(sunX, sunY, sunZ);

    // Moon on opposite side
    const moonX = (playerPos ? playerPos.x : 0) - Math.cos(angle) * sunDistance;
    const moonY = -Math.sin(angle) * sunDistance;
    const moonZ = (playerPos ? playerPos.z : 0) - Math.sin(angle * 0.5) * 40;
    this.moonMesh.position.set(moonX, moonY, moonZ);

    // Daylight intensity vs Night
    const isDay = sunY > 0;
    const heightFactor = THREE.MathUtils.clamp(sunY / sunDistance, -1, 1);

    if (isDay) {
      // Day transition: warm golden amber to harsh midday cyan
      this.sunLight.intensity = THREE.MathUtils.lerp(0.2, 2.2, heightFactor);
      this.ambientLight.intensity = THREE.MathUtils.lerp(0.3, 1.2, heightFactor);
      this.ambientLight.color.setHex(0x402b4d);
      this.scene.fog.color.lerp(new THREE.Color(0x35193b), 0.05);
      this.scene.background = this.scene.fog.color;
    } else {
      // Night transition: deep alien eerie indigo / bioluminescent glow
      this.sunLight.intensity = 0.05;
      this.ambientLight.intensity = 0.35;
      this.ambientLight.color.setHex(0x0c0b24);
      this.scene.fog.color.lerp(new THREE.Color(0x080614), 0.05);
      this.scene.background = this.scene.fog.color;
    }

    return {
      isNight: !isDay,
      timeOfDay: this.time,
      cycleProgress: cycleRatio,
      lightIntensity: this.sunLight.intensity
    };
  }
}
