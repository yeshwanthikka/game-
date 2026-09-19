// Star Runner - Character Customization & Vector Cartoon Rendering Engine
// Styled in high-polish 2D Chibi Cartoon aesthetics matching the reference art

const DEFAULT_CHARACTER = {
  skin: "#fed2a9",       // Warm peach skin
  hat: "#d9383a",        // Cap back/crown (Trucker red)
  hatFront: "#f0f2ea",   // Cap front panel & brim (Cream/white)
  hair: "#313739",       // Charcoal/dark hair
  shirt: "#5c3836",      // Warm rustic maroon/brown jacket
  innerShirt: "#7e8594", // Grey inner shirt
  pants: "#3a4756",      // Denim blue jeans
  shoes: "#42281d",      // Brown leather boots
  hatStyle: "trucker",   // 'trucker', 'beanie', 'cap_backward', 'hair_only'
  trail: "cyan"
};

const CHARACTER_PRESETS = [
  {
    name: "Classic Wanderer",
    data: {
      skin: "#fed2a9",
      hat: "#d9383a",
      hatFront: "#f0f2ea",
      hair: "#313739",
      shirt: "#5c3836",
      pants: "#3a4756",
      hatStyle: "trucker"
    }
  },
  {
    name: "Cyber Street",
    data: {
      skin: "#ffd6a5",
      hat: "#00f0ff",
      hatFront: "#ffffff",
      hair: "#111420",
      shirt: "#1e243d",
      pants: "#00f0ff",
      hatStyle: "trucker"
    }
  },
  {
    name: "Golden Scout",
    data: {
      skin: "#fcd5ce",
      hat: "#ffbe0b",
      hatFront: "#fff8db",
      hair: "#6f4e37",
      shirt: "#fb5607",
      pants: "#3a0ca3",
      hatStyle: "trucker"
    }
  },
  {
    name: "Neon Rogue",
    data: {
      skin: "#e0ac69",
      hat: "#ff007f",
      hatFront: "#240046",
      hair: "#4a0e4e",
      shirt: "#7209b7",
      pants: "#1b1d2e",
      hatStyle: "beanie"
    }
  }
];

class CharacterManager {
  constructor() {
    this.current = this.loadCharacter();
    this.previewAnimTime = 0;
    this.previewCanvas = null;
    this.previewCtx = null;
    this.previewAnimId = null;
  }

  loadCharacter() {
    try {
      const saved = localStorage.getItem('sr_character_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_CHARACTER, ...parsed };
      }
    } catch (e) {
      console.warn("Could not load character from localStorage, using default", e);
    }
    return { ...DEFAULT_CHARACTER };
  }

  saveCharacter(charData) {
    this.current = { ...this.current, ...charData };
    try {
      localStorage.setItem('sr_character_v2', JSON.stringify(this.current));
      localStorage.setItem('sr_character', JSON.stringify(this.current));
    } catch (e) {
      console.warn("Could not save character to localStorage", e);
    }
  }

  setProp(prop, value) {
    this.current[prop] = value;
    this.saveCharacter(this.current);
  }

  applyPreset(presetIndex) {
    if (CHARACTER_PRESETS[presetIndex]) {
      this.current = { ...CHARACTER_PRESETS[presetIndex].data };
      this.saveCharacter(this.current);
    }
  }

  randomize() {
    const skins = ["#fed2a9", "#ffd6a5", "#ffbe98", "#e0ac69", "#c68642", "#8d5524", "#fcd5ce"];
    const capColors = ["#d9383a", "#3a86ff", "#00f0ff", "#ff007f", "#ffbe0b", "#00f59b", "#212529"];
    const frontColors = ["#f0f2ea", "#ffffff", "#fff3b0", "#ffe5ec", "#e0fbfc"];
    const hairColors = ["#313739", "#1a1c23", "#5c3a21", "#a06c3a", "#e6b87d", "#ff007f"];
    const shirts = ["#5c3836", "#1f2937", "#2563eb", "#dc2626", "#059669", "#7c3aed", "#d97706"];
    const pants = ["#3a4756", "#1f2937", "#0f172a", "#1e3a8a", "#475569", "#00f0ff"];
    const styles = ["trucker", "beanie", "cap_backward", "hair_only"];

    const pick = arr => arr[Math.floor(Math.random() * arr.length)];
    this.current = {
      skin: pick(skins),
      hat: pick(capColors),
      hatFront: pick(frontColors),
      hair: pick(hairColors),
      shirt: pick(shirts),
      innerShirt: "#7e8594",
      pants: pick(pants),
      shoes: "#42281d",
      hatStyle: pick(styles),
      trail: "cyan"
    };
    this.saveCharacter(this.current);
  }

  // Draw the high-polish Chibi Cartoon character
  draw(ctx, x, y, width, height, state = {}) {
    const {
      skin = this.current.skin,
      hat = this.current.hat,
      hatFront = this.current.hatFront || "#f0f2ea",
      hair = this.current.hair || "#313739",
      shirt = this.current.shirt,
      innerShirt = this.current.innerShirt || "#7e8594",
      pants = this.current.pants,
      shoes = this.current.shoes || "#42281d",
      hatStyle = this.current.hatStyle || "trucker"
    } = this.current;

    const {
      frame = 0,
      isGrounded = true,
      vy = 0,
      vx = 0,
      facing = 1,
      invulnerable = false,
      hasShield = false,
      isInvincible = false
    } = state;

    // Blink effect when invulnerable
    if (invulnerable && !isInvincible && Math.floor(Date.now() / 80) % 2 === 0) {
      return;
    }

    ctx.save();
    ctx.translate(x, y);

    // Horizontal flip if facing left
    if (facing === -1) {
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
    }

    // Reference bounding box is 52 wide x 72 tall
    const scale = width / 52;
    ctx.scale(scale, scale);

    const outlineColor = "#1e222a";
    const outlineW = 2.4;

    // Helper for smooth dark cartoon outlines
    const strokeShape = (lw = outlineW) => {
      ctx.strokeStyle = outlineColor;
      ctx.lineWidth = lw;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.stroke();
    };

    // Run cycle / Jump kinematics
    let bobY = 0;
    let legRot1 = 0;
    let legRot2 = 0;
    let armRot1 = 0;
    let armRot2 = 0;
    let headTilt = 0;

    const isMoving = Math.abs(vx) > 0.25;

    if (isGrounded) {
      if (isMoving) {
        // Active Running stride
        bobY = Math.sin(frame * 0.28) * 2.2;
        legRot1 = Math.sin(frame * 0.28) * 0.75;
        legRot2 = -legRot1;
        armRot1 = -legRot1 * 0.85;
        armRot2 = -armRot1;
        headTilt = Math.sin(frame * 0.28) * 0.04;
      } else {
        // Relaxed Idle Breathing
        bobY = Math.sin(frame * 0.08) * 1.0;
        headTilt = Math.sin(frame * 0.08) * 0.02;
      }
    } else {
      bobY = -2.5;
      legRot1 = vy < 0 ? -0.55 : 0.6;
      legRot2 = vy < 0 ? 0.65 : -0.4;
      armRot1 = -0.9;
      armRot2 = 0.6;
      headTilt = vy < 0 ? -0.06 : 0.04;
    }

    // Cosmic Star Rainbow Aura
    if (isInvincible) {
      ctx.save();
      const rainbowHue = (Date.now() / 4) % 360;
      ctx.strokeStyle = `hsl(${rainbowHue}, 100%, 65%)`;
      ctx.lineWidth = 3.6;
      ctx.shadowColor = `hsl(${rainbowHue}, 100%, 60%)`;
      ctx.shadowBlur = 18;
      ctx.fillStyle = `hsla(${rainbowHue}, 100%, 65%, 0.22)`;
      ctx.beginPath();
      ctx.arc(26, 36, 36, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fill();

      // Orbiting Sparkle Stars
      for (let starIdx = 0; starIdx < 3; starIdx++) {
        const starAngle = (Date.now() * 0.008) + (starIdx * Math.PI * 2 / 3);
        const sx = 26 + Math.cos(starAngle) * 36;
        const sy = 36 + Math.sin(starAngle) * 36;
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffff00';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // Shield Aura
    if (hasShield) {
      ctx.save();
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 3.2;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 14;
      ctx.fillStyle = 'rgba(0, 240, 255, 0.16)';
      ctx.beginPath();
      ctx.arc(26, 36, 34, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fill();
      ctx.restore();
    }

    // Ground Drop Shadow
    if (isGrounded) {
      ctx.save();
      ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
      ctx.beginPath();
      ctx.ellipse(26, 71, 16, 4.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // ==========================================
    // 1. BACK ARM & HAND
    // ==========================================
    ctx.save();
    ctx.translate(21, 44 + bobY);
    ctx.rotate(armRot2);
    
    // Sleeve
    ctx.fillStyle = shirt;
    ctx.beginPath();
    ctx.roundRect(-4, 0, 8, 12, 4);
    ctx.fill();
    strokeShape();

    // Hand
    ctx.fillStyle = skin;
    ctx.beginPath();
    ctx.arc(0, 13, 3.8, 0, Math.PI * 2);
    ctx.fill();
    strokeShape();
    ctx.restore();

    // ==========================================
    // 2. BACK LEG & BOOT
    // ==========================================
    ctx.save();
    ctx.translate(21, 52 + bobY);
    ctx.rotate(legRot2);

    // Pants leg
    ctx.fillStyle = pants;
    ctx.beginPath();
    ctx.roundRect(-4.5, 0, 9, 11, [2, 2, 3, 3]);
    ctx.fill();
    strokeShape();

    // Boot
    ctx.fillStyle = shoes;
    ctx.beginPath();
    ctx.roundRect(-4.5, 9, 11, 7, 3);
    ctx.fill();
    strokeShape();

    // Boot sole
    ctx.fillStyle = "#1b1411";
    ctx.fillRect(-4.5, 14, 11, 2.2);
    ctx.restore();

    // ==========================================
    // 3. TORSO & JACKET
    // ==========================================
    ctx.save();
    ctx.translate(0, bobY);

    // Jacket Body
    ctx.fillStyle = shirt;
    ctx.beginPath();
    ctx.roundRect(17, 39, 18, 16, [4, 4, 3, 3]);
    ctx.fill();
    strokeShape();

    // Inner Shirt V-neck
    ctx.fillStyle = innerShirt;
    ctx.beginPath();
    ctx.moveTo(23, 39);
    ctx.lineTo(26, 45);
    ctx.lineTo(29, 39);
    ctx.closePath();
    ctx.fill();
    strokeShape(1.6);

    // Jacket Collar Lapels
    ctx.strokeStyle = outlineColor;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    // Left Lapel
    ctx.moveTo(22, 39);
    ctx.lineTo(24.5, 47);
    ctx.stroke();
    // Right Lapel
    ctx.moveTo(30, 39);
    ctx.lineTo(27.5, 47);
    ctx.stroke();

    // Jacket Center Zipper/Seam
    ctx.beginPath();
    ctx.moveTo(26, 47);
    ctx.lineTo(26, 55);
    ctx.stroke();
    ctx.restore();

    // ==========================================
    // 4. FRONT LEG & BOOT
    // ==========================================
    ctx.save();
    ctx.translate(29, 52 + bobY);
    ctx.rotate(legRot1);

    // Pants leg
    ctx.fillStyle = pants;
    ctx.beginPath();
    ctx.roundRect(-4.5, 0, 9, 11, [2, 2, 3, 3]);
    ctx.fill();
    strokeShape();

    // Boot
    ctx.fillStyle = shoes;
    ctx.beginPath();
    ctx.roundRect(-4.5, 9, 11, 7, 3);
    ctx.fill();
    strokeShape();

    // Boot sole
    ctx.fillStyle = "#1b1411";
    ctx.fillRect(-4.5, 14, 11, 2.2);
    ctx.restore();

    // ==========================================
    // 5. HEAD & FACE
    // ==========================================
    ctx.save();
    ctx.translate(26, 24 + bobY);
    ctx.rotate(headTilt);

    // Neck
    ctx.fillStyle = skin;
    ctx.fillRect(-4, 12, 8, 5);
    ctx.strokeStyle = outlineColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(-4, 12, 8, 5);

    // Main Head Contour (Chubby Chibi Shape)
    ctx.fillStyle = skin;
    ctx.beginPath();
    ctx.moveTo(-11, -12);
    ctx.bezierCurveTo(-14, 0, -14, 12, -4, 15);
    ctx.bezierCurveTo(4, 16, 12, 16, 14, 10);
    ctx.bezierCurveTo(16, 4, 16, -6, 11, -12);
    ctx.closePath();
    ctx.fill();
    strokeShape();

    // Hair under hat (Back of head and sideburns)
    ctx.fillStyle = hair;
    ctx.beginPath();
    // Back hair patch
    ctx.moveTo(-12, -8);
    ctx.lineTo(-7, -8);
    ctx.lineTo(-6, 8);
    ctx.lineTo(-10, 4);
    ctx.closePath();
    ctx.fill();
    strokeShape(1.8);

    // Sideburn in front of ear
    ctx.beginPath();
    ctx.moveTo(-6, 0);
    ctx.lineTo(-3, 0);
    ctx.lineTo(-4, 7);
    ctx.lineTo(-7, 5);
    ctx.closePath();
    ctx.fill();

    // Left Ear with inner contour
    ctx.fillStyle = skin;
    ctx.beginPath();
    ctx.arc(-11.5, 4.5, 4.2, 0, Math.PI * 2);
    ctx.fill();
    strokeShape();
    // Inner ear ridge
    ctx.strokeStyle = "#c98f65";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(-11.5, 4.5, 2.2, Math.PI * 0.4, Math.PI * 1.6);
    ctx.stroke();

    // Face Features
    // 1. Back Eye (Left eye in 3/4 perspective)
    ctx.fillStyle = "#1e2229";
    ctx.beginPath();
    ctx.ellipse(3, 4, 2.7, 4.2, 0, 0, Math.PI * 2);
    ctx.fill();
    // Specular highlight dot
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(4, 2.5, 1.1, 0, Math.PI * 2);
    ctx.fill();

    // 2. Front Eye (Right eye in 3/4 perspective)
    ctx.fillStyle = "#1e2229";
    ctx.beginPath();
    ctx.ellipse(12, 4.5, 2.7, 4.2, 0, 0, Math.PI * 2);
    ctx.fill();
    // Specular highlight dot
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(13, 3, 1.1, 0, Math.PI * 2);
    ctx.fill();

    // Eyebrows
    ctx.strokeStyle = hair;
    ctx.lineWidth = 1.8;
    // Left eyebrow
    ctx.beginPath();
    ctx.moveTo(1, -2.5);
    ctx.quadraticCurveTo(3.5, -4.5, 6, -3);
    ctx.stroke();
    // Right eyebrow
    ctx.beginPath();
    ctx.moveTo(10, -2);
    ctx.quadraticCurveTo(12.5, -4, 15, -2.5);
    ctx.stroke();

    // Cute curved nose tick
    ctx.strokeStyle = "#c98f65";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(7.5, 5);
    ctx.lineTo(8.5, 6.2);
    ctx.stroke();

    // Smirk / Smile
    ctx.strokeStyle = "#381e18";
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(4, 10);
    ctx.quadraticCurveTo(8.5, 12.5, 12, 10.5);
    ctx.stroke();

    // ==========================================
    // 6. HAT / HEADWEAR STYLES
    // ==========================================
    if (hatStyle === "trucker") {
      // --- TRUCKER / BASEBALL CAP (Exact match to reference art!) ---
      
      // 1. Back Crown Dome (Red/Color)
      ctx.fillStyle = hat;
      ctx.beginPath();
      ctx.moveTo(-13, -3);
      ctx.bezierCurveTo(-14, -18, -2, -23, 7, -22);
      ctx.bezierCurveTo(4, -13, 0, -4, -1, -3);
      ctx.closePath();
      ctx.fill();
      strokeShape();

      // 2. Front Crown Panel (White/Cream)
      ctx.fillStyle = hatFront;
      ctx.beginPath();
      ctx.moveTo(-1, -3);
      ctx.bezierCurveTo(0, -13, 4, -22, 7, -22);
      ctx.bezierCurveTo(14, -20, 17, -13, 16, -3);
      ctx.closePath();
      ctx.fill();
      strokeShape();

      // Top Squatchee Button
      ctx.fillStyle = hat;
      ctx.beginPath();
      ctx.arc(6, -22.5, 2.2, 0, Math.PI * 2);
      ctx.fill();
      strokeShape(1.4);

      // 3. Curved Visor Brim extending forward over brow
      ctx.fillStyle = hatFront;
      ctx.beginPath();
      ctx.moveTo(-4, -4);
      ctx.quadraticCurveTo(8, -5, 20, -3.5);
      ctx.quadraticCurveTo(21, -1.5, 18, 0);
      ctx.quadraticCurveTo(6, -1, -4, -2);
      ctx.closePath();
      ctx.fill();
      strokeShape(2.4);

      // Visor bottom shadow line
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.beginPath();
      ctx.moveTo(-3, -2);
      ctx.quadraticCurveTo(7, -1, 18, 0);
      ctx.quadraticCurveTo(8, 0.8, -3, 0);
      ctx.closePath();
      ctx.fill();

    } else if (hatStyle === "beanie") {
      // --- WARM KNIT BEANIE ---
      ctx.fillStyle = hat;
      ctx.beginPath();
      ctx.roundRect(-13, -22, 29, 20, [14, 14, 4, 4]);
      ctx.fill();
      strokeShape();

      // Beanie Fold Cuff
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(-13, -6, 29, 5);
      strokeShape();

      // Bobble on top
      ctx.fillStyle = hat;
      ctx.beginPath();
      ctx.arc(1.5, -23, 4, 0, Math.PI * 2);
      ctx.fill();
      strokeShape();

    } else if (hatStyle === "cap_backward") {
      // --- BACKWARD BASEBALL CAP ---
      ctx.fillStyle = hat;
      ctx.beginPath();
      ctx.roundRect(-13, -20, 28, 17, [12, 12, 2, 2]);
      ctx.fill();
      strokeShape();

      // Visor extending backwards to the left
      ctx.fillStyle = hatFront;
      ctx.beginPath();
      ctx.roundRect(-21, -5, 9, 3.5, 2);
      ctx.fill();
      strokeShape();

    } else {
      // --- HAIR ONLY / HEADBAND ---
      ctx.fillStyle = hair;
      ctx.beginPath();
      ctx.arc(1, -6, 14, Math.PI * 0.8, Math.PI * 2.1);
      ctx.fill();
      strokeShape();
    }

    ctx.restore(); // end head

    // ==========================================
    // 7. FRONT ARM & HAND
    // ==========================================
    ctx.save();
    ctx.translate(31, 43 + bobY);
    ctx.rotate(armRot1);

    // Sleeve
    ctx.fillStyle = shirt;
    ctx.beginPath();
    ctx.roundRect(-4, 0, 8, 13, 4);
    ctx.fill();
    strokeShape();

    // Hand
    ctx.fillStyle = skin;
    ctx.beginPath();
    ctx.arc(0, 14, 4, 0, Math.PI * 2);
    ctx.fill();
    strokeShape();
    ctx.restore();

    ctx.restore(); // end main character translate
  }

  // --- Preview Canvas in Customization Modal ---
  initPreview(canvasId) {
    this.previewCanvas = document.getElementById(canvasId);
    if (!this.previewCanvas) return;
    this.previewCtx = this.previewCanvas.getContext('2d');
    
    this.previewCanvas.width = 180;
    this.previewCanvas.height = 220;

    this.startPreviewLoop();
  }

  startPreviewLoop() {
    if (this.previewAnimId) cancelAnimationFrame(this.previewAnimId);

    const loop = () => {
      this.previewAnimTime += 1;
      this.renderPreview();
      this.previewAnimId = requestAnimationFrame(loop);
    };
    this.previewAnimId = requestAnimationFrame(loop);
  }

  stopPreviewLoop() {
    if (this.previewAnimId) {
      cancelAnimationFrame(this.previewAnimId);
      this.previewAnimId = null;
    }
  }

  renderPreview() {
    if (!this.previewCtx || !this.previewCanvas) return;
    const ctx = this.previewCtx;
    const w = this.previewCanvas.width;
    const h = this.previewCanvas.height;

    ctx.clearRect(0, 0, w, h);

    // Warm radial pedestal glow
    const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, 90);
    bgGrad.addColorStop(0, 'rgba(0, 240, 255, 0.12)');
    bgGrad.addColorStop(1, 'rgba(10, 15, 32, 0.9)');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Ground platform pedestal
    ctx.fillStyle = 'rgba(0, 240, 255, 0.18)';
    ctx.beginPath();
    ctx.ellipse(w / 2, h - 30, 52, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#1e2444';
    ctx.beginPath();
    ctx.roundRect(w / 2 - 45, h - 33, 90, 8, 4);
    ctx.fill();

    ctx.fillStyle = '#00f0ff';
    ctx.fillRect(w / 2 - 45, h - 33, 90, 2.5);

    // Draw Chibi Cartoon Character
    const charW = 58;
    const charH = 78;
    const posX = (w - charW) / 2;
    const posY = h - 34 - charH;

    this.draw(ctx, posX, posY, charW, charH, {
      frame: this.previewAnimTime,
      isGrounded: true,
      vy: 0,
      hasShield: false
    });
  }
}

const characterManager = new CharacterManager();
