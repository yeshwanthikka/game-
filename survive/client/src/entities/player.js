import * as THREE from 'three';

export class PlayerController {
  constructor(camera, domElement, terrain) {
    this.camera = camera;
    this.domElement = domElement;
    this.terrain = terrain;

    this.position = new THREE.Vector3(0, 5, 10);
    this.velocity = new THREE.Vector3();
    this.eyeHeight = 1.7;
    this.speed = 14;
    this.sprintMultiplier = 1.7;
    this.jumpForce = 8.5;
    this.gravity = 24.0;
    this.isGrounded = false;

    // Camera rotation pitch & yaw
    this.pitch = 0;
    this.yaw = 0;
    this.isLocked = false;

    // Movement state
    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      sprint: false,
      jump: false
    };

    // Stats
    this.health = 100;
    this.maxHealth = 100;
    this.stamina = 100;
    this.maxStamina = 100;
    this.inventory = {
      bioFuel: 0,
      alienAlloy: 0,
      shipParts: 0,
      ammo: 30
    };

    this.setupInputs();
  }

  setupInputs() {
    this.domElement.addEventListener('click', () => {
      if (!this.isLocked) {
        this.domElement.requestPointerLock();
      }
    });

    document.addEventListener('pointerlockchange', () => {
      this.isLocked = document.pointerLockElement === this.domElement;
      const blocker = document.getElementById('blocker');
      const modalLb = document.getElementById('modal-leaderboard');
      const modalBestiary = document.getElementById('modal-bestiary');
      const isAnyModalOpen = (modalLb && modalLb.style.display === 'block') || (modalBestiary && modalBestiary.style.display === 'block');

      if (blocker) {
        blocker.style.display = (this.isLocked || isAnyModalOpen) ? 'none' : 'flex';
      }
    });

    document.addEventListener('mousemove', (e) => {
      if (!this.isLocked) return;
      const sens = 0.0022;
      this.yaw -= e.movementX * sens;
      this.pitch -= e.movementY * sens;
      this.pitch = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, this.pitch));
    });

    window.addEventListener('keydown', (e) => this.onKey(e.code, true));
    window.addEventListener('keyup', (e) => this.onKey(e.code, false));
  }

  onKey(code, isDown) {
    switch (code) {
      case 'KeyW':
      case 'ArrowUp':
        this.keys.forward = isDown;
        break;
      case 'KeyS':
      case 'ArrowDown':
        this.keys.backward = isDown;
        break;
      case 'KeyA':
      case 'ArrowLeft':
        this.keys.left = isDown;
        break;
      case 'KeyD':
      case 'ArrowRight':
        this.keys.right = isDown;
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        this.keys.sprint = isDown;
        break;
      case 'Space':
        this.keys.jump = isDown;
        break;
    }
  }

  update(delta) {
    // 1. Calculate direction vectors from yaw
    const forward = new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw)).normalize();
    const right = new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw)).normalize();

    const moveDir = new THREE.Vector3();
    if (this.keys.forward) moveDir.add(forward);
    if (this.keys.backward) moveDir.sub(forward);
    if (this.keys.right) moveDir.add(right);
    if (this.keys.left) moveDir.sub(right);

    if (moveDir.lengthSq() > 0) {
      moveDir.normalize();
    }

    // Sprint & Stamina
    let curSpeed = this.speed;
    if (this.keys.sprint && this.stamina > 5 && moveDir.lengthSq() > 0) {
      curSpeed *= this.sprintMultiplier;
      this.stamina = Math.max(0, this.stamina - 20 * delta);
    } else {
      this.stamina = Math.min(this.maxStamina, this.stamina + 15 * delta);
    }

    // Horizontal acceleration
    this.velocity.x = moveDir.x * curSpeed;
    this.velocity.z = moveDir.z * curSpeed;

    // Vertical / Gravity & Jump
    if (this.isGrounded) {
      if (this.keys.jump) {
        this.velocity.y = this.jumpForce;
        this.isGrounded = false;
      } else {
        this.velocity.y = 0;
      }
    } else {
      this.velocity.y -= this.gravity * delta;
    }

    // Position integration
    this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;
    this.position.z += this.velocity.z * delta;

    // Terrain ground clamping
    const groundY = this.terrain.getHeight(this.position.x, this.position.z);
    const targetY = groundY + this.eyeHeight;

    if (this.position.y <= targetY) {
      this.position.y = targetY;
      this.velocity.y = 0;
      this.isGrounded = true;
    } else {
      this.isGrounded = false;
    }

    // Keep within world bounds
    const maxBound = (this.terrain.size / 2) - 5;
    this.position.x = THREE.MathUtils.clamp(this.position.x, -maxBound, maxBound);
    this.position.z = THREE.MathUtils.clamp(this.position.z, -maxBound, maxBound);

    // Apply to camera with rotation
    this.camera.position.copy(this.position);
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.y = this.yaw;
    this.camera.rotation.x = this.pitch;
  }
}
