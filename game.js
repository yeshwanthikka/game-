// Star Runner — Continuous Open World Platformer Engine
// 10 Seamless Biomes across 19,000+ Pixels, 10 Fast-Travel Waypoints, 10 Arsenal Weapons, 10 Reference Monster Bosses, Radar Mini-Map & Interactive World Map

const BIOME_ZONES = [
  { id: 1, name: "Emerald Haven", code: "ZONE-01", startX: -100, endX: 1950, theme: "grass", skyTop: "#0f0e26", skyMid: "#23153c", skyBot: "#e58e65", ambientColor: "#10b981", desc: "Verdant starting hub with rolling hills and ancient ruins." },
  { id: 2, name: "Mycelium Marsh", code: "ZONE-02", startX: 1950, endX: 3850, theme: "mushroom", skyTop: "#120c29", skyMid: "#3d1b54", skyBot: "#f59e6c", ambientColor: "#ff4d6d", desc: "Bioluminescent swamp filled with bouncing giant fungi." },
  { id: 3, name: "Crystal Caverns", code: "ZONE-03", startX: 3850, endX: 5750, theme: "crystal", skyTop: "#080b18", skyMid: "#111d3d", skyBot: "#00f0ff", ambientColor: "#00f0ff", desc: "Deep subterranean chasm glowing with azure quartz prisms." },
  { id: 4, name: "Sunset Bridges", code: "ZONE-04", startX: 5750, endX: 7650, theme: "grass", skyTop: "#1c0d2b", skyMid: "#5a1f49", skyBot: "#fca371", ambientColor: "#f77f00", desc: "Suspension bridges stretching over bottomless golden valleys." },
  { id: 5, name: "Verdant Canopy", code: "ZONE-05", startX: 7650, endX: 9550, theme: "grass", skyTop: "#0d1b2a", skyMid: "#1b4332", skyBot: "#74c69d", ambientColor: "#2ec4b6", desc: "Towering colossal redwoods with high aerial branches." },
  { id: 6, name: "Neon Cyber-Sector", code: "ZONE-06", startX: 9550, endX: 11450, theme: "crystal", skyTop: "#070817", skyMid: "#1a0b38", skyBot: "#ff007f", ambientColor: "#c77dff", desc: "Techno-metropolis ruins humming with antigrav energy." },
  { id: 7, name: "Dune Ruins", code: "ZONE-07", startX: 11450, endX: 13350, theme: "mushroom", skyTop: "#1c1106", skyMid: "#42280d", skyBot: "#e7a93b", ambientColor: "#e7a93b", desc: "Endless desert sands surrounding fallen imperial monoliths." },
  { id: 8, name: "Sky Kingdom", code: "ZONE-08", startX: 13350, endX: 15250, theme: "grass", skyTop: "#081c30", skyMid: "#19456b", skyBot: "#a8dadc", ambientColor: "#48cae4", desc: "Levitating celestial isles drifting in the upper stratosphere." },
  { id: 9, name: "Molten Caldera", code: "ZONE-09", startX: 15250, endX: 17150, theme: "crystal", skyTop: "#1c0404", skyMid: "#450808", skyBot: "#ff5400", ambientColor: "#ff5400", desc: "Volcanic magma chasms and scorching geysers." },
  { id: 10, name: "Astral Void Citadel", code: "ZONE-10", startX: 17150, endX: 19800, theme: "crystal", skyTop: "#050614", skyMid: "#190833", skyBot: "#ffd60a", ambientColor: "#f72585", desc: "The cosmic threshold housing the Great Star Gate." }
];

const WAYPOINTS_DATA = [
  { id: 1, name: "Haven Sanctum", biome: "Emerald Haven", x: 140, y: 460, defaultActive: true },
  { id: 2, name: "Spore Sanctum", biome: "Mycelium Marsh", x: 2150, y: 440 },
  { id: 3, name: "Crystal Grotto", biome: "Crystal Caverns", x: 4050, y: 450 },
  { id: 4, name: "Sunset Arch", biome: "Sunset Bridges", x: 5950, y: 450 },
  { id: 5, name: "High Canopy", biome: "Verdant Canopy", x: 7850, y: 460 },
  { id: 6, name: "Grid Terminal", biome: "Neon Cyber-Sector", x: 9750, y: 450 },
  { id: 7, name: "Dune Oasis", biome: "Dune Ruins", x: 11650, y: 450 },
  { id: 8, name: "Aether Roost", biome: "Sky Kingdom", x: 13550, y: 440 },
  { id: 9, name: "Caldera Bastion", biome: "Molten Caldera", x: 15450, y: 450 },
  { id: 10, name: "Citadel Sentry", biome: "Astral Void Citadel", x: 17350, y: 450 }
];

const WEAPONS_DATA = [
  { id: "solar", name: "Solar Blaster", icon: "☀️", dmg: 20, speed: 7.0, color: "#ffd60a", glow: "#ff9e00", ptype: "fireball", biome: "Emerald Haven", x: 1140, y: 280 },
  { id: "spore", name: "Spore Cannon", icon: "🍄", dmg: 22, speed: 7.2, color: "#ff4d6d", glow: "#c9184a", ptype: "spore", biome: "Mycelium Marsh", x: 2850, y: 250 },
  { id: "crystal", name: "Crystal Darts", icon: "💎", dmg: 25, speed: 7.5, color: "#00f0ff", glow: "#0077b6", ptype: "crystal", biome: "Crystal Caverns", x: 4750, y: 310 },
  { id: "sunfire", name: "Sunfire Wand", icon: "🔥", dmg: 26, speed: 7.8, color: "#ff7b00", glow: "#ff0054", ptype: "wand", biome: "Sunset Bridges", x: 6650, y: 270 },
  { id: "boomerang", name: "Thorn Boomerang", icon: "🪃", dmg: 28, speed: 8.0, color: "#52b788", glow: "#1b4332", ptype: "boomerang", biome: "Verdant Canopy", x: 8550, y: 230 },
  { id: "plasma", name: "Plasma Laser", icon: "⚡", dmg: 30, speed: 8.5, color: "#c77dff", glow: "#7209b7", ptype: "laser", biome: "Neon Cyber-Sector", x: 10450, y: 260 },
  { id: "chakram", name: "Sand Chakram", icon: "💿", dmg: 32, speed: 8.5, color: "#e7a93b", glow: "#bc6c25", ptype: "chakram", biome: "Dune Ruins", x: 12350, y: 260 },
  { id: "thunder", name: "Thunderbolt Rod", icon: "⚡", dmg: 35, speed: 9.0, color: "#48cae4", glow: "#0096c7", ptype: "thunder", biome: "Sky Kingdom", x: 14250, y: 280 },
  { id: "bomb", name: "Magma Bomb", icon: "💣", dmg: 38, speed: 8.0, color: "#ff5400", glow: "#9d0208", ptype: "bomb", biome: "Molten Caldera", x: 16150, y: 300 },
  { id: "nova", name: "Cosmic Nova", icon: "🌌", dmg: 42, speed: 9.5, color: "#f72585", glow: "#7209b7", ptype: "nova", biome: "Astral Void Citadel", x: 18050, y: 260 }
];

const BOSSES_DATA = [
  { id: 1, name: "Thornshell Cyclops", title: "GROVE BEHEMOTH", type: "thornshell", biome: "Emerald Haven", x: 1650, y: 416, origY: 416, w: 64, h: 64, minX: 1450, maxX: 1880, vx: 0.75, hp: 80, color: "#2d6a4f" },
  { id: 2, name: "Spore Shroomling", title: "MYCELIUM LORD", type: "shroomling", biome: "Mycelium Marsh", x: 3450, y: 426, origY: 426, w: 64, h: 64, minX: 3250, maxX: 3750, vx: -0.85, hp: 100, color: "#a01a56" },
  { id: 3, name: "Crypt Skel-Knight", title: "SPECTRAL OVERLORD", type: "skeleton", biome: "Crystal Caverns", x: 5350, y: 390, origY: 390, w: 64, h: 64, minX: 5100, maxX: 5650, vx: 0.95, hp: 120, color: "#e2e8f0" },
  { id: 4, name: "Gloom Grimoire", title: "FORBIDDEN ARCHIVE", type: "grimoire", biome: "Sunset Bridges", x: 7250, y: 390, origY: 390, w: 64, h: 64, minX: 7000, maxX: 7550, vx: -1.05, hp: 140, color: "#6b21a8" },
  { id: 5, name: "Ocular Stalker", title: "WATCHER IN THE DARK", type: "ocular", biome: "Verdant Canopy", x: 9150, y: 436, origY: 436, w: 64, h: 64, minX: 8900, maxX: 9450, vx: 1.15, hp: 160, color: "#ef233c" },
  { id: 6, name: "Venom Arachnotron", title: "HEXA-EYED PREDATOR", type: "arachnotron", biome: "Neon Cyber-Sector", x: 11050, y: 426, origY: 426, w: 64, h: 64, minX: 10800, maxX: 11350, vx: -1.25, hp: 180, color: "#4a044e" },
  { id: 7, name: "Dune Fang Lurker", title: "ABYSSAL REPTILIAN", type: "lurker", biome: "Dune Ruins", x: 12950, y: 426, origY: 426, w: 64, h: 64, minX: 12700, maxX: 13250, vx: 1.30, hp: 200, color: "#1d3557" },
  { id: 8, name: "Vespoid Sky-Wasp", title: "HORNET QUEEN", type: "wasp", biome: "Sky Kingdom", x: 14850, y: 370, origY: 370, w: 64, h: 64, minX: 14600, maxX: 15150, vx: 1.35, hp: 220, color: "#fca311" },
  { id: 9, name: "Magma Spiketooth Snail", title: "CALDERA JUGGERNAUT", type: "snail", biome: "Molten Caldera", x: 16750, y: 436, origY: 436, w: 64, h: 64, minX: 16450, maxX: 17050, vx: -1.35, hp: 240, color: "#d00000" },
  { id: 10, name: "Astral Octo-Beast", title: "ELDRITCH VOID TITAN", type: "octo", biome: "Astral Void Citadel", x: 18650, y: 436, origY: 436, w: 68, h: 68, minX: 18350, maxX: 19100, vx: 1.45, hp: 260, color: "#7209b7" }
];

// Continuous Open World Platforms across 10 Interconnected Biomes
const OPEN_WORLD_PLATFORMS = [
  // Biome 1: Emerald Haven (-100 to 1950)
  { x: -100, y: 500, w: 850, biomeId: 1 },
  { x: 800, y: 460, w: 450, biomeId: 1 },
  { x: 1300, y: 430, w: 400, biomeId: 1 },
  { x: 1750, y: 480, w: 500, biomeId: 1 },

  // Biome 2: Mycelium Marsh (1950 to 3850)
  { x: 2150, y: 480, w: 500, biomeId: 2 },
  { x: 2700, y: 420, w: 420, biomeId: 2 },
  { x: 3170, y: 370, w: 420, biomeId: 2 },
  { x: 3640, y: 460, w: 500, biomeId: 2 },

  // Biome 3: Crystal Caverns (3850 to 5750)
  { x: 4050, y: 490, w: 520, biomeId: 3 },
  { x: 4620, y: 440, w: 460, biomeId: 3 },
  { x: 5130, y: 470, w: 450, biomeId: 3 },
  { x: 5630, y: 480, w: 520, biomeId: 3 },

  // Biome 4: Sunset Bridges (5750 to 7650)
  { x: 6050, y: 480, w: 400, biomeId: 4 },
  { x: 6500, y: 450, w: 300, type: "moving", moveSpeed: 0.015, moveRange: 50, biomeId: 4 },
  { x: 6850, y: 420, w: 380, biomeId: 4 },
  { x: 7280, y: 450, w: 280, type: "moving", moveSpeed: 0.018, moveRange: 55, biomeId: 4 },
  { x: 7610, y: 490, w: 500, biomeId: 4 },

  // Biome 5: Verdant Canopy (7650 to 9550)
  { x: 8000, y: 490, w: 450, biomeId: 5 },
  { x: 8500, y: 410, w: 420, biomeId: 5 },
  { x: 8970, y: 350, w: 440, biomeId: 5 },
  { x: 9460, y: 440, w: 400, biomeId: 5 },
  { x: 9910, y: 490, w: 450, biomeId: 5 },

  // Biome 6: Neon Cyber-Sector (9550 to 11450)
  { x: 10300, y: 480, w: 420, biomeId: 6 },
  { x: 10770, y: 440, w: 340, type: "moving", moveSpeed: 0.020, moveRange: 60, biomeId: 6 },
  { x: 11160, y: 400, w: 420, biomeId: 6 },
  { x: 11630, y: 440, w: 360, type: "moving", moveSpeed: 0.022, moveRange: 65, biomeId: 6 },
  { x: 12040, y: 490, w: 480, biomeId: 6 },

  // Biome 7: Dune Ruins (11450 to 13350)
  { x: 12450, y: 490, w: 450, biomeId: 7 },
  { x: 12950, y: 430, w: 380, biomeId: 7 },
  { x: 13380, y: 470, w: 460, biomeId: 7 },
  { x: 13890, y: 400, w: 400, biomeId: 7 },
  { x: 14340, y: 480, w: 500, biomeId: 7 },

  // Biome 8: Sky Kingdom (13350 to 15250)
  { x: 14780, y: 480, w: 420, biomeId: 8 },
  { x: 15250, y: 410, w: 340, type: "moving", moveSpeed: 0.022, moveRange: 60, biomeId: 8 },
  { x: 15640, y: 370, w: 400, biomeId: 8 },
  { x: 16090, y: 430, w: 360, type: "moving", moveSpeed: 0.024, moveRange: 65, biomeId: 8 },
  { x: 16500, y: 480, w: 480, biomeId: 8 },

  // Biome 9: Molten Caldera (15250 to 17150)
  { x: 16920, y: 490, w: 420, biomeId: 9 },
  { x: 17390, y: 430, w: 360, biomeId: 9 },
  { x: 17800, y: 460, w: 380, biomeId: 9 },
  { x: 18230, y: 400, w: 380, type: "moving", moveSpeed: 0.025, moveRange: 65, biomeId: 9 },
  { x: 18660, y: 490, w: 520, biomeId: 9 },

  // Biome 10: Astral Void Citadel (17150 to 19800+)
  { x: 19120, y: 490, w: 460, biomeId: 10 },
  { x: 19630, y: 430, w: 380, type: "moving", moveSpeed: 0.025, moveRange: 70, biomeId: 10 },
  { x: 20060, y: 390, w: 450, biomeId: 10 },
  { x: 20560, y: 440, w: 420, biomeId: 10 },
  { x: 21030, y: 490, w: 1800, biomeId: 10 } // Grand Star Gate Summit!
];

// Blocks scattered across the continuum
const OPEN_WORLD_BLOCKS = [
  // Biome 1
  { x: 300, y: 350, type: "question", content: "coin" },
  { x: 340, y: 350, type: "brick" },
  { x: 380, y: 350, type: "question", content: "star" },
  { x: 420, y: 350, type: "brick" },
  { x: 460, y: 350, type: "question", content: "coin" },
  { x: 1100, y: 320, type: "question", content: "shield" },
  { x: 1140, y: 320, type: "brick" },
  { x: 1180, y: 320, type: "question", content: "boost" },
  { x: 680, y: 440, type: "pipe", w: 52, h: 60 },

  // Biome 2
  { x: 2350, y: 360, type: "brick" },
  { x: 2390, y: 360, type: "question", content: "magnet" },
  { x: 2430, y: 360, type: "brick" },
  { x: 2900, y: 310, type: "question", content: "coin" },
  { x: 2940, y: 310, type: "question", content: "shield" },

  // Biome 3
  { x: 4250, y: 360, type: "question", content: "coin" },
  { x: 4290, y: 360, type: "brick" },
  { x: 4330, y: 360, type: "question", content: "shield" },
  { x: 4850, y: 330, type: "pipe", w: 52, h: 70 },
  { x: 5350, y: 350, type: "question", content: "boost" },

  // Biome 4
  { x: 6200, y: 360, type: "question", content: "coin" },
  { x: 6240, y: 360, type: "brick" },
  { x: 6280, y: 360, type: "question", content: "boost" },
  { x: 7050, y: 290, type: "question", content: "shield" },

  // Biome 5
  { x: 8150, y: 360, type: "question", content: "shield" },
  { x: 8650, y: 290, type: "question", content: "coin" },
  { x: 8690, y: 290, type: "brick" },
  { x: 8730, y: 290, type: "question", content: "boost" },

  // Biome 6
  { x: 10450, y: 360, type: "question", content: "magnet" },
  { x: 11300, y: 290, type: "question", content: "shield" },
  { x: 11340, y: 290, type: "brick" },
  { x: 11380, y: 290, type: "question", content: "boost" },

  // Biome 7
  { x: 12600, y: 360, type: "question", content: "shield" },
  { x: 13100, y: 310, type: "brick" },
  { x: 13140, y: 310, type: "question", content: "coin" },
  { x: 13180, y: 310, type: "brick" },

  // Biome 8
  { x: 14950, y: 360, type: "question", content: "boost" },
  { x: 15780, y: 290, type: "question", content: "shield" },

  // Biome 9
  { x: 17100, y: 360, type: "question", content: "shield" },
  { x: 17550, y: 310, type: "brick" },
  { x: 17590, y: 310, type: "question", content: "boost" },

  // Biome 10
  { x: 19300, y: 360, type: "question", content: "shield" },
  { x: 20250, y: 300, type: "question", content: "boost" },
  { x: 20700, y: 320, type: "question", content: "star" }
];

// Normal enemies patrolling across biomes
const OPEN_WORLD_ENEMIES = [
  // Biome 1
  { x: 480, y: 468, type: "slime", minX: 200, maxX: 700, vx: -0.7 },
  { x: 1050, y: 428, type: "slime", minX: 850, maxX: 1200, vx: 0.75 },
  // Biome 2
  { x: 2400, y: 448, type: "slime", minX: 2200, maxX: 2600, vx: -0.8 },
  { x: 2900, y: 388, type: "drone", minX: 2750, maxX: 3100, vx: 0.9, origY: 340 },
  // Biome 3
  { x: 4300, y: 458, type: "spiky", minX: 4100, maxX: 4500, vx: 0.85 },
  { x: 4850, y: 408, type: "slime", minX: 4700, maxX: 5050, vx: -0.9 },
  // Biome 4
  { x: 6250, y: 448, type: "slime", minX: 6100, maxX: 6400, vx: -0.95 },
  { x: 7050, y: 388, type: "drone", minX: 6900, maxX: 7200, vx: 1.05, origY: 340 },
  // Biome 5
  { x: 8200, y: 458, type: "slime", minX: 8050, maxX: 8400, vx: -1.0 },
  { x: 8750, y: 378, type: "drone", minX: 8550, maxX: 8900, vx: 1.15, origY: 320 },
  // Biome 6
  { x: 10500, y: 448, type: "spiky", minX: 10350, maxX: 10700, vx: 1.05 },
  { x: 11350, y: 368, type: "slime", minX: 11200, maxX: 11550, vx: -1.15 },
  // Biome 7
  { x: 12650, y: 458, type: "spiky", minX: 12500, maxX: 12850, vx: -1.1 },
  { x: 13550, y: 438, type: "drone", minX: 13420, maxX: 13800, vx: 1.25, origY: 380 },
  // Biome 8
  { x: 14950, y: 448, type: "slime", minX: 14800, maxX: 15150, vx: 1.2 },
  { x: 15800, y: 338, type: "drone", minX: 15680, maxX: 16000, vx: 1.35, origY: 320 },
  // Biome 9
  { x: 17100, y: 458, type: "spiky", minX: 16950, maxX: 17300, vx: -1.25 },
  { x: 18000, y: 428, type: "drone", minX: 17850, maxX: 18150, vx: 1.45, origY: 380 },
  // Biome 10
  { x: 19350, y: 458, type: "spiky", minX: 19150, maxX: 19550, vx: 1.35 },
  { x: 20250, y: 358, type: "drone", minX: 20100, maxX: 20480, vx: 1.55, origY: 320 }
];

// Star coins spread across the biomes
const OPEN_WORLD_COINS = [
  { x: 220, y: 450 }, { x: 250, y: 450 }, { x: 280, y: 450 },
  { x: 620, y: 390 }, { x: 650, y: 370 }, { x: 680, y: 390 },
  { x: 2280, y: 410 }, { x: 2320, y: 410 }, { x: 2850, y: 340 }, { x: 2890, y: 340 },
  { x: 4180, y: 420 }, { x: 4220, y: 420 }, { x: 4750, y: 370 }, { x: 4790, y: 370 },
  { x: 6150, y: 410 }, { x: 6190, y: 410 }, { x: 6950, y: 350 }, { x: 6990, y: 350 },
  { x: 8100, y: 420 }, { x: 8140, y: 420 }, { x: 8600, y: 340 }, { x: 8640, y: 340 },
  { x: 10400, y: 410 }, { x: 10440, y: 410 }, { x: 11250, y: 330 }, { x: 11290, y: 330 },
  { x: 12550, y: 420 }, { x: 12590, y: 420 }, { x: 13480, y: 390 }, { x: 13520, y: 390 },
  { x: 14880, y: 410 }, { x: 14920, y: 410 }, { x: 15720, y: 300 }, { x: 15760, y: 300 },
  { x: 17050, y: 420 }, { x: 17090, y: 420 }, { x: 17900, y: 380 }, { x: 17940, y: 380 },
  { x: 19250, y: 420 }, { x: 19290, y: 420 }, { x: 20150, y: 320 }, { x: 20190, y: 320 }
];

class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    // States: 'MENU', 'PLAYING', 'PAUSED', 'GAMEOVER', 'VICTORY'
    this.state = 'MENU';
    this.isWorldMapOpen = false;

    // Open World Arsenal Inventory & Progression
    this.inventory = [];
    this.currentWeaponIndex = -1;
    this.activeWaypoints = new Set([1]); // Waypoint 1 (Haven Sanctum) active by default
    this.claimedSigils = new Set();     // 10 Astral Sigils to collect from bosses
    this.currentBiome = BIOME_ZONES[0];
    this.lastCheckpointId = 1;

    // Load saved progression from LocalStorage
    try {
      const savedWp = localStorage.getItem('sr_active_waypoints');
      if (savedWp) {
        const arr = JSON.parse(savedWp);
        if (Array.isArray(arr)) arr.forEach(id => this.activeWaypoints.add(id));
      }
      const savedArsenal = localStorage.getItem('sr_arsenal');
      if (savedArsenal) {
        this.inventory = JSON.parse(savedArsenal);
      }
      const savedSigils = localStorage.getItem('sr_claimed_sigils');
      if (savedSigils) {
        const arr = JSON.parse(savedSigils);
        if (Array.isArray(arr)) arr.forEach(id => this.claimedSigils.add(id));
      }
      const savedCp = localStorage.getItem('sr_checkpoint_id');
      if (savedCp) this.lastCheckpointId = parseInt(savedCp, 10) || 1;
    } catch (e) {}

    // Best Score
    this.bestScore = 0;
    try {
      const savedBest = localStorage.getItem('sr_best');
      if (savedBest) this.bestScore = parseInt(savedBest, 10) || 0;
    } catch (e) {}

    // Audio, Character, Particles
    this.sound = soundManager;
    this.character = characterManager;
    this.particles = particleSystem;

    // Viewport & Dynamic Camera
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.camera = { x: 0, y: 0, zoom: 1.35 };

    // Player State (Responsive Platformer Controls)
    this.player = {
      x: 140,
      y: 380,
      w: 48,
      h: 64,
      vx: 0,
      vy: 0,
      accel: 0.28,
      friction: 0.85,
      baseMaxSpeed: 3.4,
      maxSpeed: 3.4,
      gravity: 0.46,
      jumpForce: -11.2,
      doubleJumpForce: -9.6,
      isGrounded: false,
      jumpsLeft: 2,
      maxJumps: 2,
      coyoteTimer: 0,
      jumpBufferTimer: 0,
      invulnerableTimer: 0,
      hasShield: false,
      magnetTimer: 0,
      boostTimer: 0,
      starTimer: 0,
      frame: 0,
      facing: 1,
      currentWeapon: null
    };

    // Movement Inputs
    this.keys = {
      left: false,
      right: false,
      jump: false
    };

    // Weapons & Projectiles
    this.projectiles = [];
    this.shootCooldown = 0;
    this.lastGateWarning = 0;

    // Stats
    this.lives = 3;
    this.maxLives = 3;
    this.score = 0;
    this.coinsCollected = 0;

    // Open World Entities
    this.platforms = [];
    this.blocks = [];
    this.enemies = [];
    this.coins = [];
    this.powerups = [];
    this.bouncingCoins = [];
    this.scorePopups = [];
    this.waypoints = [];
    this.weaponChests = [];
    this.bosses = [];
    this.activeBoss = null;
    this.starGate = { x: 21550, y: 160, w: 60, h: 330, unlocked: false };

    // Background Elements
    this.stars = [];
    this.clouds = [];
    this.fireflies = [];
    this.initBackgroundElements();

    // DOM Elements Bindings
    this.hudElement = document.getElementById('hud');
    this.scoreValEl = document.getElementById('hud-score');
    this.coinValEl = document.getElementById('hud-coins');
    this.bestScoreEl = document.getElementById('home-best-score');
    this.homeOverlay = document.getElementById('home-overlay');
    this.pauseOverlay = document.getElementById('pause-overlay');
    this.gameoverOverlay = document.getElementById('gameover-overlay');
    this.customizerOverlay = document.getElementById('customizer-overlay');
    this.worldmapOverlay = document.getElementById('worldmap-overlay');
    this.levelClearOverlay = document.getElementById('levelclear-overlay');
    this.powerupMeters = document.getElementById('powerup-meters');

    // Open World HUD Elements
    this.hudBiomeNameEl = document.getElementById('hud-biome-name');
    this.hudSigilsValEl = document.getElementById('hud-sigils-val');
    this.hudWeaponsValEl = document.getElementById('hud-weapons-val');
    this.hudWaypointsValEl = document.getElementById('hud-waypoints-val');

    // Weapon & Boss HUD Elements
    this.weaponCapsuleEl = document.getElementById('hud-weapon-capsule');
    this.weaponIconEl = document.getElementById('hud-weapon-icon');
    this.weaponNameEl = document.getElementById('hud-weapon-name');
    this.bossHudBarEl = document.getElementById('boss-hud-bar');
    this.bossHudNameEl = document.getElementById('boss-hud-name');
    this.bossBarFillEl = document.getElementById('boss-bar-fill');
    this.bossHpNumEl = document.getElementById('boss-hud-hp-num');

    // Mini-map & World Map Canvas
    this.minimapCanvas = document.getElementById('hud-minimap-canvas');
    this.minimapCtx = this.minimapCanvas ? this.minimapCanvas.getContext('2d') : null;
    this.worldmapCanvas = document.getElementById('worldmap-canvas');
    this.worldmapCtx = this.worldmapCanvas ? this.worldmapCanvas.getContext('2d') : null;
    this.worldmapBeaconsList = document.getElementById('worldmap-beacons-list');
    this.wmSigilsCountEl = document.getElementById('wm-sigils-count');
    this.wmWeaponsCountEl = document.getElementById('wm-weapons-count');
    this.wmBeaconsCountEl = document.getElementById('wm-beacons-count');

    // Setup Event Listeners & Resize
    this.setupEventListeners();
    this.resizeCanvas();
    this.loadOpenWorld(true);

    // Start Engine Loop
    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.gameLoop(t));

    // Update UI initial values
    this.updateBestScoreDisplay();
  }

  resizeCanvas() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  // --- Background Scenery Init ---

  initBackgroundElements() {
    this.stars = [];
    const starColors = ['#ffffff', '#fff2b2', '#caf0f8', '#ffd6a5', '#c7f9cc'];
    for (let i = 0; i < 150; i++) {
      this.stars.push({
        x: Math.random() * 2400,
        y: Math.random() * 550,
        size: Math.random() * 2.2 + 0.8,
        speed: Math.random() * 0.04 + 0.015,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        alpha: Math.random() * 0.75 + 0.25,
        twinkleSpeed: Math.random() * 0.03 + 0.015
      });
    }

    this.clouds = [];
    for (let i = 0; i < 9; i++) {
      this.clouds.push({
        x: i * 260 + Math.random() * 80,
        y: Math.random() * 160 + 35,
        scale: Math.random() * 0.4 + 0.8,
        speed: Math.random() * 0.035 + 0.02,
        alpha: Math.random() * 0.25 + 0.4
      });
    }

    this.fireflies = [];
    for (let i = 0; i < 28; i++) {
      this.fireflies.push({
        x: Math.random() * 2000,
        y: Math.random() * 550 + 80,
        size: Math.random() * 2.5 + 1.2,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  // --- Open World Loading & Setup ---

  loadOpenWorld(startAtCheckpoint = true) {
    // 1. Platforms (10 biomes continuous continuum)
    this.platforms = OPEN_WORLD_PLATFORMS.map(p => ({
      ...p,
      h: 400,
      origY: p.y,
      movePhase: Math.random() * Math.PI * 2
    }));

    // 2. Determine spawn location (cleanly grounded on platform)
    let spawnX = 160;
    let spawnY = 436;

    if (startAtCheckpoint && this.lastCheckpointId) {
      const cp = WAYPOINTS_DATA.find(w => w.id === this.lastCheckpointId);
      if (cp) {
        spawnX = cp.x + 10;
        const cpPlat = this.platforms.find(p => spawnX >= p.x && spawnX <= p.x + p.w);
        spawnY = cpPlat ? cpPlat.y - this.player.h : cp.y - 24;
      }
    } else {
      const startPlat = this.platforms.find(p => spawnX >= p.x && spawnX <= p.x + p.w);
      if (startPlat) spawnY = startPlat.y - this.player.h;
    }

    // Reset Player position & movement kinematics
    this.player.x = spawnX;
    this.player.y = spawnY;
    this.player.vx = 0;
    this.player.vy = 0;
    this.player.facing = 1;
    this.player.isGrounded = true;
    this.player.jumpsLeft = 2;
    this.player.coyoteTimer = 0;
    this.player.jumpBufferTimer = 0;
    this.player.invulnerableTimer = 0;
    this.player.boostTimer = 0;
    this.player.magnetTimer = 0;
    this.player.starTimer = 0;
    this.player.hasShield = false;
    this.player.frame = 0;

    // Equip first unlocked weapon if available
    if (this.inventory.length > 0) {
      if (this.currentWeaponIndex < 0 || this.currentWeaponIndex >= this.inventory.length) {
        this.currentWeaponIndex = 0;
      }
      this.player.currentWeapon = this.inventory[this.currentWeaponIndex];
    } else {
      this.player.currentWeapon = null;
      this.currentWeaponIndex = -1;
    }

    // Camera initial position comfortably framing character
    const targetVirtualH = 540;
    this.camera.zoom = Math.max(0.95, Math.min(1.35, this.height / targetVirtualH));
    const viewW = this.width / this.camera.zoom;
    const viewH = this.height / this.camera.zoom;
    this.camera.x = Math.max(-40, this.player.x - viewW * 0.35);
    this.camera.y = Math.max(-40, (this.player.y + 20) - viewH * 0.58);

    // Entity reset
    this.particles.reset();
    this.bouncingCoins = [];
    this.scorePopups = [];
    this.projectiles = [];
    this.shootCooldown = 0;

    // Interactive Blocks (? blocks, bricks, pipes)
    this.blocks = OPEN_WORLD_BLOCKS.map(b => ({
      ...b,
      w: b.w || 38,
      h: b.h || 38,
      bumpY: 0,
      empty: false
    }));

    // 10 Waypoint Beacons
    this.waypoints = WAYPOINTS_DATA.map(wp => ({
      ...wp,
      w: 44,
      h: 72,
      active: this.activeWaypoints.has(wp.id),
      pulsePhase: Math.random() * Math.PI * 2
    }));

    // 10 Hidden Weapon Shrines
    this.weaponChests = WEAPONS_DATA.map(w => ({
      ...w,
      w: 42,
      h: 36,
      opened: this.inventory.some(i => i.id === w.id),
      sparklePhase: Math.random() * Math.PI * 2
    }));

    // 10 Boss Monsters
    this.bosses = BOSSES_DATA.map(b => ({
      ...b,
      curHp: b.hp,
      maxHp: b.hp,
      alive: !this.claimedSigils.has(b.id),
      hitFlash: 0,
      phase: Math.random() * Math.PI * 2
    }));
    this.activeBoss = null;

    // Enemies (Slimes, Flying Drones, Spikies)
    this.enemies = OPEN_WORLD_ENEMIES.map(e => ({
      ...e,
      w: 36,
      h: 32,
      origVx: e.vx || 1.4,
      alive: true,
      squashed: false,
      squashTimer: 0,
      phase: Math.random() * Math.PI * 2
    }));

    // Star Coins
    this.coins = OPEN_WORLD_COINS.map(c => ({
      ...c,
      r: 10,
      collected: false
    }));

    this.powerups = [];

    // Grand Cosmic Star Gate at the Astral Summit
    this.starGate = {
      x: 21550,
      y: 150,
      w: 64,
      h: 340,
      reached: false
    };

    // Detect current biome & refresh all HUD displays
    this.updateCurrentBiome();
    this.updateHUD();
    this.updateHeartsUI();
    this.updateArsenalHUD();
    this.updateQuestTrackerHUD();
    this.updateBossHUD();
  }

  startOpenWorld() {
    this.lives = this.maxLives;
    this.loadOpenWorld(true);
    this.state = 'PLAYING';
    this.homeOverlay.classList.add('hidden');
    this.pauseOverlay.classList.add('hidden');
    this.gameoverOverlay.classList.add('hidden');
    this.customizerOverlay.classList.add('hidden');
    this.worldmapOverlay.classList.add('hidden');
    this.levelClearOverlay.classList.add('hidden');
    this.updateHeartsUI();
    this.sound.startMusic();
  }

  // --- Input & Controls ---

  setupEventListeners() {
    window.addEventListener('resize', () => this.resizeCanvas());

    // Keyboard inputs
    window.addEventListener('keydown', (e) => {
      this.sound.init();

      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        this.keys.left = true;
      } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        this.keys.right = true;
      } else if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        e.preventDefault();
        this.keys.jump = true;
        this.handleJumpPress();
      } else if (e.code === 'KeyF' || e.code === 'KeyJ' || e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        e.preventDefault();
        this.shootWeapon();
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        this.toggleWorldMap();
      } else if (e.code === 'KeyQ') {
        e.preventDefault();
        this.cycleWeapon(-1);
      } else if (e.code === 'KeyE') {
        e.preventDefault();
        this.cycleWeapon(1);
      } else if (e.code.startsWith('Digit')) {
        const digit = parseInt(e.code.replace('Digit', ''), 10);
        const slot = digit === 0 ? 9 : digit - 1;
        this.selectWeaponSlot(slot);
      } else if (e.code === 'Escape' || e.code === 'KeyP') {
        e.preventDefault();
        if (this.isWorldMapOpen) {
          this.closeWorldMap();
        } else {
          this.togglePause();
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        this.keys.left = false;
      } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        this.keys.right = false;
      } else if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        this.keys.jump = false;
        if (this.player.vy < -3.5) {
          this.player.vy *= 0.55;
        }
      }
    });

    // Mobile Virtual D-Pad & Attack/Arsenal buttons
    const leftBtn = document.getElementById('mobile-left-btn');
    const rightBtn = document.getElementById('mobile-right-btn');
    const jumpBtn = document.getElementById('mobile-jump-btn');
    const attackBtn = document.getElementById('mobile-attack-btn');
    const prevWpnBtn = document.getElementById('mobile-prev-wpn');
    const nextWpnBtn = document.getElementById('mobile-next-wpn');

    if (leftBtn) {
      leftBtn.addEventListener('pointerdown', (e) => { e.preventDefault(); this.keys.left = true; });
      leftBtn.addEventListener('pointerup', (e) => { e.preventDefault(); this.keys.left = false; });
      leftBtn.addEventListener('pointerleave', (e) => { this.keys.left = false; });
      leftBtn.addEventListener('pointercancel', (e) => { this.keys.left = false; });
    }
    if (rightBtn) {
      rightBtn.addEventListener('pointerdown', (e) => { e.preventDefault(); this.keys.right = true; });
      rightBtn.addEventListener('pointerup', (e) => { e.preventDefault(); this.keys.right = false; });
      rightBtn.addEventListener('pointerleave', (e) => { this.keys.right = false; });
      rightBtn.addEventListener('pointercancel', (e) => { this.keys.right = false; });
    }
    if (jumpBtn) {
      jumpBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.keys.jump = true;
        this.handleJumpPress();
      });
      jumpBtn.addEventListener('pointerup', (e) => {
        e.preventDefault();
        this.keys.jump = false;
        if (this.player.vy < -3.5) this.player.vy *= 0.55;
      });
      jumpBtn.addEventListener('pointercancel', (e) => {
        this.keys.jump = false;
      });
    }
    if (attackBtn) {
      attackBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.shootWeapon();
      });
    }
    if (prevWpnBtn) {
      prevWpnBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.cycleWeapon(-1);
      });
    }
    if (nextWpnBtn) {
      nextWpnBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.cycleWeapon(1);
      });
    }

    // HUD Arsenal Cycling Buttons
    document.getElementById('hud-prev-wpn-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.cycleWeapon(-1);
    });
    document.getElementById('hud-next-wpn-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.cycleWeapon(1);
    });
    document.getElementById('hud-weapon-capsule')?.addEventListener('click', () => {
      this.cycleWeapon(1);
    });

    // World Map Controls
    document.getElementById('hud-map-btn')?.addEventListener('click', () => {
      this.sound.playClick();
      this.openWorldMap();
    });
    document.getElementById('hud-minimap-container')?.addEventListener('click', () => {
      this.sound.playClick();
      this.openWorldMap();
    });
    document.getElementById('worldmap-close-btn')?.addEventListener('click', () => {
      this.sound.playClick();
      this.closeWorldMap();
    });
    document.getElementById('worldmap-resume-btn')?.addEventListener('click', () => {
      this.sound.playClick();
      this.closeWorldMap();
    });
    document.getElementById('btn-unlock-all-beacons')?.addEventListener('click', () => {
      this.sound.playClick();
      this.unlockAllWaypoints();
    });

    // Menu and Customizer UI Buttons
    document.getElementById('home-play-btn')?.addEventListener('click', () => {
      this.sound.playClick();
      this.startOpenWorld();
    });

    document.getElementById('home-levels-btn')?.addEventListener('click', () => {
      this.sound.playClick();
      this.openWorldMap();
    });

    document.getElementById('home-custom-btn')?.addEventListener('click', () => {
      this.sound.playClick();
      this.openCustomizer();
    });

    document.getElementById('custom-back-btn')?.addEventListener('click', () => {
      this.sound.playClick();
      this.closeCustomizer();
    });

    document.getElementById('custom-random-btn')?.addEventListener('click', () => {
      this.sound.playClick();
      this.character.randomize();
      this.syncCustomizerUI();
    });

    // Level Clear / Grand Finale Modal Buttons
    document.getElementById('lc-next-btn')?.addEventListener('click', () => {
      this.sound.playClick();
      this.levelClearOverlay.classList.add('hidden');
      this.teleportToWaypoint(1);
    });

    document.getElementById('lc-levels-btn')?.addEventListener('click', () => {
      this.sound.playClick();
      this.levelClearOverlay.classList.add('hidden');
      this.openWorldMap();
    });

    document.getElementById('lc-menu-btn')?.addEventListener('click', () => {
      this.sound.playClick();
      this.showMenu();
    });

    // Game Over Buttons
    document.getElementById('btn-retry')?.addEventListener('click', () => {
      this.sound.playClick();
      this.lives = this.maxLives;
      this.loadOpenWorld(true);
      this.state = 'PLAYING';
      this.gameoverOverlay.classList.add('hidden');
      this.sound.startMusic();
    });

    document.getElementById('btn-gameover-custom')?.addEventListener('click', () => {
      this.sound.playClick();
      this.gameoverOverlay.classList.add('hidden');
      this.openCustomizer();
    });

    document.getElementById('btn-gameover-menu')?.addEventListener('click', () => {
      this.sound.playClick();
      this.showMenu();
    });

    // Pause Buttons
    document.getElementById('btn-resume')?.addEventListener('click', () => {
      this.sound.playClick();
      this.togglePause();
    });

    document.getElementById('btn-pause-menu')?.addEventListener('click', () => {
      this.sound.playClick();
      this.showMenu();
    });

    document.getElementById('hud-pause-btn')?.addEventListener('click', () => {
      this.sound.playClick();
      this.togglePause();
    });

    document.getElementById('hud-sound-btn')?.addEventListener('click', () => {
      const isMuted = this.sound.toggleMute();
      const soundIcon = document.getElementById('sound-icon');
      if (soundIcon) soundIcon.textContent = isMuted ? '🔇' : '🔊';
    });

    // Init customizer
    this.setupCustomizerControls();
  }

  handleJumpPress() {
    this.sound.init();

    if (this.state === 'MENU' || this.state === 'GAMEOVER') {
      this.lives = this.maxLives;
      this.startOpenWorld();
      return;
    }

    if (this.state !== 'PLAYING') return;

    if (this.player.isGrounded || this.player.coyoteTimer > 0) {
      this.doJump(false);
    } else if (this.player.jumpsLeft > 0) {
      this.doJump(true);
    } else {
      this.player.jumpBufferTimer = 6;
    }
  }

  doJump(isDoubleJump) {
    this.player.isGrounded = false;
    this.player.coyoteTimer = 0;
    this.player.jumpBufferTimer = 0;

    const force = isDoubleJump ? this.player.doubleJumpForce : this.player.jumpForce;
    const boostMultiplier = this.player.boostTimer > 0 ? 1.25 : 1.0;
    this.player.vy = force * boostMultiplier;

    if (isDoubleJump) {
      this.player.jumpsLeft--;
      this.sound.playDoubleJump();
      this.particles.createDoubleJumpRing(this.player.x + this.player.w / 2, this.player.y + this.player.h);
    } else {
      this.player.jumpsLeft = this.player.maxJumps - 1;
      this.sound.playJump();
      this.particles.createJumpPuff(this.player.x + this.player.w / 2, this.player.y + this.player.h);
    }
  }

  shootWeapon() {
    this.sound.init();

    if (this.state === 'MENU' || this.state === 'GAMEOVER') {
      return;
    }
    if (this.state !== 'PLAYING') return;
    if (this.shootCooldown > 0) return;

    if (!this.player.currentWeapon) {
      this.addScorePopup(this.player.x + this.player.w / 2, this.player.y - 12, '⚠️ FIND WEAPON CHEST!', '#ffbe0b');
      this.shootCooldown = 22;
      return;
    }

    const wpn = this.player.currentWeapon;
    const dir = this.player.facing >= 0 ? 1 : -1;
    const spawnX = dir > 0 ? this.player.x + this.player.w - 6 : this.player.x - 14;
    const spawnY = this.player.y + this.player.h * 0.42;

    this.projectiles.push({
      x: spawnX,
      y: spawnY,
      vx: dir * wpn.speed,
      vy: 0,
      w: 18,
      h: 18,
      dmg: wpn.dmg,
      color: wpn.color,
      glow: wpn.glow,
      ptype: wpn.ptype,
      rot: 0,
      life: 80
    });

    this.shootCooldown = 15;
    this.sound.playShoot();
    this.particles.createProjectileHit(spawnX + 9, spawnY + 9, wpn.color);
  }

  killBoss(targetBoss = null) {
    const b = targetBoss || this.activeBoss || this.bosses.find(x => x.alive);
    if (!b || !b.alive) return;
    this.defeatBoss(b);
  }

  // --- Weapon Arsenal & Cycling ---

  unlockWeapon(wpnChest) {
    wpnChest.opened = true;
    const exists = this.inventory.some(w => w.id === wpnChest.id);
    if (!exists) {
      this.inventory.push(wpnChest);
      this.currentWeaponIndex = this.inventory.length - 1;
      this.player.currentWeapon = wpnChest;
      try {
        localStorage.setItem('sr_arsenal', JSON.stringify(this.inventory));
      } catch (e) {}

      this.sound.playWeaponFound();
      this.particles.createDoubleJumpRing(wpnChest.x + 20, wpnChest.y + 18);
      this.particles.createCoinBurst(wpnChest.x + 20, wpnChest.y + 18);
      this.addScorePopup(wpnChest.x + 20, wpnChest.y - 20, `⚔️ ${wpnChest.name.toUpperCase()} ACQUIRED!`, '#ffd60a');
      this.score += 500;
    } else {
      this.player.currentWeapon = wpnChest;
      this.sound.playClick();
      this.addScorePopup(wpnChest.x + 20, wpnChest.y - 20, `⚔️ EQUIPPED ${wpnChest.name.toUpperCase()}`, '#00f0ff');
    }
    this.updateArsenalHUD();
    this.updateQuestTrackerHUD();
  }

  cycleWeapon(dir) {
    if (this.inventory.length === 0) {
      this.addScorePopup(this.player.x + 24, this.player.y - 15, '⚠️ FIND WEAPON CHESTS IN BIOMES!', '#ffbe0b');
      return;
    }
    this.currentWeaponIndex = (this.currentWeaponIndex + dir + this.inventory.length) % this.inventory.length;
    this.player.currentWeapon = this.inventory[this.currentWeaponIndex];
    this.sound.playClick();
    this.particles.createDoubleJumpRing(this.player.x + 24, this.player.y + 32);
    this.addScorePopup(this.player.x + 24, this.player.y - 18, `${this.player.currentWeapon.icon} ${this.player.currentWeapon.name.toUpperCase()}`, this.player.currentWeapon.color);
    this.updateArsenalHUD();
  }

  selectWeaponSlot(slotIndex) {
    if (slotIndex >= 0 && slotIndex < this.inventory.length) {
      this.currentWeaponIndex = slotIndex;
      this.player.currentWeapon = this.inventory[this.currentWeaponIndex];
      this.sound.playClick();
      this.particles.createDoubleJumpRing(this.player.x + 24, this.player.y + 32);
      this.addScorePopup(this.player.x + 24, this.player.y - 18, `${this.player.currentWeapon.icon} ${this.player.currentWeapon.name.toUpperCase()}`, this.player.currentWeapon.color);
      this.updateArsenalHUD();
    }
  }

  updateArsenalHUD() {
    if (!this.weaponCapsuleEl) return;
    const wpn = this.player.currentWeapon;
    if (wpn) {
      this.weaponCapsuleEl.classList.remove('locked');
      this.weaponCapsuleEl.classList.add('armed');
      if (this.weaponIconEl) this.weaponIconEl.textContent = wpn.icon;
      if (this.weaponNameEl) this.weaponNameEl.textContent = `${wpn.name.toUpperCase()} (${wpn.dmg} DMG)`;
    } else {
      this.weaponCapsuleEl.classList.add('locked');
      this.weaponCapsuleEl.classList.remove('armed');
      if (this.weaponIconEl) this.weaponIconEl.textContent = '⚔️';
      if (this.weaponNameEl) this.weaponNameEl.textContent = 'UNARMED';
    }
  }

  // --- Waypoints & Fast Travel ---

  activateWaypoint(wp) {
    if (wp.active) return;
    wp.active = true;
    this.activeWaypoints.add(wp.id);
    this.lastCheckpointId = wp.id;

    // Full heal & checkpoint restore
    this.lives = this.maxLives;
    this.updateHeartsUI();

    try {
      localStorage.setItem('sr_active_waypoints', JSON.stringify([...this.activeWaypoints]));
      localStorage.setItem('sr_checkpoint_id', wp.id);
    } catch (e) {}

    this.sound.playPowerupReveal();
    this.particles.createDoubleJumpRing(wp.x + 22, wp.y + 36);
    this.particles.createCoinBurst(wp.x + 22, wp.y + 36);
    this.addScorePopup(wp.x + 22, wp.y - 25, `🌀 ${wp.name.toUpperCase()} ACTIVATED! (FULL HEAL)`, '#00f59b');
    this.score += 300;

    this.updateQuestTrackerHUD();
  }

  teleportToWaypoint(wpId) {
    const wp = this.waypoints.find(w => w.id === wpId);
    if (!wp) return;

    const underPlat = this.platforms.find(p => wp.x >= p.x && wp.x <= p.x + p.w) || this.platforms[0];
    this.player.x = wp.x + 10;
    this.player.y = underPlat ? underPlat.y - this.player.h : wp.y - 24;
    this.player.vx = 0;
    this.player.vy = 0;
    this.player.isGrounded = true;
    this.lastCheckpointId = wp.id;

    // Immediate camera snap
    const targetVirtualH = 540;
    this.camera.zoom = Math.max(0.95, Math.min(1.35, this.height / targetVirtualH));
    const viewW = this.width / this.camera.zoom;
    const viewH = this.height / this.camera.zoom;
    this.camera.x = Math.max(-40, this.player.x - viewW * 0.35);
    this.camera.y = Math.max(-40, (this.player.y + 20) - viewH * 0.58);

    this.sound.playPowerup();
    this.particles.createDoubleJumpRing(this.player.x + 24, this.player.y + 32);
    this.addScorePopup(this.player.x + 24, this.player.y - 25, `⚡ FAST TRAVEL TO ${wp.name.toUpperCase()}!`, '#00f0ff');

    this.updateCurrentBiome();
    this.closeWorldMap();
  }

  unlockAllWaypoints() {
    this.waypoints.forEach(wp => {
      wp.active = true;
      this.activeWaypoints.add(wp.id);
    });
    try {
      localStorage.setItem('sr_active_waypoints', JSON.stringify([...this.activeWaypoints]));
    } catch (e) {}
    this.sound.playCoin();
    this.renderWorldMapModal();
    this.updateQuestTrackerHUD();
  }

  // --- World Map Modal & Radar ---

  openWorldMap() {
    this.isWorldMapOpen = true;
    if (this.worldmapOverlay) this.worldmapOverlay.classList.remove('hidden');
    this.renderWorldMapModal();
  }

  closeWorldMap() {
    this.isWorldMapOpen = false;
    if (this.worldmapOverlay) this.worldmapOverlay.classList.add('hidden');
  }

  toggleWorldMap() {
    if (this.isWorldMapOpen) this.closeWorldMap();
    else this.openWorldMap();
  }

  renderWorldMapModal() {
    if (this.wmSigilsCountEl) this.wmSigilsCountEl.textContent = `${this.claimedSigils.size} / 10`;
    if (this.wmWeaponsCountEl) this.wmWeaponsCountEl.textContent = `${this.inventory.length} / 10`;
    if (this.wmBeaconsCountEl) this.wmBeaconsCountEl.textContent = `${this.activeWaypoints.size} / 10`;

    if (this.worldmapBeaconsList) {
      let html = '';
      this.waypoints.forEach(wp => {
        const isActive = this.activeWaypoints.has(wp.id);
        const isCurrent = this.lastCheckpointId === wp.id;
        const stateClass = isCurrent ? 'current' : (isActive ? 'active' : 'locked');
        const statusText = isCurrent ? '📍 CURRENT' : (isActive ? '⚡ TELEPORT' : '🔒 UNDISCOVERED');

        html += `
          <div class="beacon-card ${stateClass}" data-beacon="${wp.id}">
            <div class="beacon-header">
              <span class="beacon-id">WAYPOINT #${wp.id}</span>
              <span class="beacon-status">${isActive ? '🟢' : '⚪'}</span>
            </div>
            <div class="beacon-name">${wp.name}</div>
            <div class="beacon-biome">${wp.biome}</div>
            <div class="beacon-travel-tag">${statusText}</div>
          </div>
        `;
      });
      this.worldmapBeaconsList.innerHTML = html;

      this.worldmapBeaconsList.querySelectorAll('.beacon-card.active, .beacon-card.current').forEach(card => {
        card.addEventListener('click', () => {
          const wpId = parseInt(card.dataset.beacon, 10);
          this.sound.playClick();
          this.teleportToWaypoint(wpId);
        });
      });
    }

    this.drawWorldMapModal();
  }

  // --- Biome & Quest Tracker Updates ---

  updateCurrentBiome() {
    const px = this.player.x;
    const found = BIOME_ZONES.find(b => px >= b.startX && px < b.endX) || BIOME_ZONES[0];
    if (this.currentBiome !== found) {
      this.currentBiome = found;
      this.addScorePopup(this.player.x + 24, this.player.y - 30, `ENTERING ${found.name.toUpperCase()}`, found.ambientColor);
    }
    if (this.hudBiomeNameEl) this.hudBiomeNameEl.textContent = this.currentBiome.name.toUpperCase();
  }

  updateQuestTrackerHUD() {
    if (this.hudSigilsValEl) this.hudSigilsValEl.textContent = `${this.claimedSigils.size}/10`;
    if (this.hudWeaponsValEl) this.hudWeaponsValEl.textContent = `${this.inventory.length}/10`;
    if (this.hudWaypointsValEl) this.hudWaypointsValEl.textContent = `${this.activeWaypoints.size}/10`;
  }

  updateBossHUD(targetBoss = null) {
    if (!this.bossHudBarEl) return;
    const b = targetBoss || this.activeBoss;
    if (!b || !b.alive) {
      this.bossHudBarEl.classList.add('hidden');
      return;
    }

    this.bossHudBarEl.classList.remove('hidden');
    if (this.bossHudNameEl) this.bossHudNameEl.textContent = `👑 ${b.name.toUpperCase()} (${b.title})`;
    const pct = Math.max(0, Math.min(100, (b.curHp / b.maxHp) * 100));
    if (this.bossBarFillEl) this.bossBarFillEl.style.width = `${pct}%`;
    if (this.bossHpNumEl) this.bossHpNumEl.textContent = `${b.curHp} / ${b.maxHp} HP`;
  }

  defeatBoss(b) {
    if (!b || !b.alive) return;
    b.alive = false;
    b.curHp = 0;
    this.claimedSigils.add(b.id);
    try {
      localStorage.setItem('sr_claimed_sigils', JSON.stringify([...this.claimedSigils]));
    } catch (e) {}

    this.sound.playBossDefeat();
    this.particles.createBossExplosion(b.x + b.w / 2, b.y + b.h / 2);
    this.score += 1500;
    this.addScorePopup(b.x + b.w / 2, b.y - 25, `👑 ASTRAL SIGIL CLAIMED! (${this.claimedSigils.size}/10)`, '#ffd60a');
    this.updateBossHUD(null);
    this.updateQuestTrackerHUD();

    if (this.claimedSigils.size === 10) {
      setTimeout(() => {
        this.addScorePopup(this.player.x + 24, this.player.y - 35, '🌟 ALL 10 SIGILS CLAIMED! THE STAR GATE IS OPEN!', '#00f0ff');
      }, 1200);
    }
  }

  triggerGrandFinale() {
    this.state = 'VICTORY';
    this.sound.playLevelClear();
    this.sound.stopMusic();
    this.particles.createConfetti(this.width, this.height);

    const isNewRecord = this.score > this.bestScore;
    if (isNewRecord) {
      this.bestScore = this.score;
      try {
        localStorage.setItem('sr_best', this.bestScore);
      } catch (e) {}
    }

    const titleEl = document.querySelector('#levelclear-overlay .clear-title');
    if (titleEl) titleEl.textContent = '★ COSMIC TRIUMPH! ★';
    const subEl = document.getElementById('lc-level-name');
    if (subEl) subEl.textContent = 'ALL 10 ASTRAL SIGILS RESTORED — REALM LIBERATED!';
    document.getElementById('lc-coins').textContent = this.coinsCollected;
    document.getElementById('lc-score').textContent = this.score + 5000;

    const nextBtn = document.getElementById('lc-next-btn');
    if (nextBtn) nextBtn.querySelector('span').textContent = '↺ EXPLORE REALM AGAIN';

    this.levelClearOverlay.classList.remove('hidden');
  }

  triggerGameOver() {
    this.state = 'GAMEOVER';
    this.sound.playGameOver();
    this.sound.stopMusic();

    const isNewRecord = this.score > this.bestScore;
    if (isNewRecord) {
      this.bestScore = this.score;
      try {
        localStorage.setItem('sr_best', this.bestScore);
      } catch (e) {}
      this.particles.createConfetti(this.width, this.height);
    }

    document.getElementById('go-final-score').textContent = this.score;
    document.getElementById('go-coins').textContent = this.coinsCollected;
    document.getElementById('go-best-score').textContent = this.bestScore;

    const newRecordTag = document.getElementById('go-new-record');
    if (newRecordTag) newRecordTag.style.display = isNewRecord ? 'block' : 'none';

    this.gameoverOverlay.classList.remove('hidden');
  }

  showMenu() {
    this.state = 'MENU';
    this.sound.stopMusic();
    this.homeOverlay.classList.remove('hidden');
    this.pauseOverlay.classList.add('hidden');
    this.gameoverOverlay.classList.add('hidden');
    this.customizerOverlay.classList.add('hidden');
    this.worldmapOverlay.classList.add('hidden');
    this.levelClearOverlay.classList.add('hidden');
  }

  togglePause() {
    if (this.state === 'PLAYING') {
      this.state = 'PAUSED';
      this.pauseOverlay.classList.remove('hidden');
    } else if (this.state === 'PAUSED') {
      this.state = 'PLAYING';
      this.pauseOverlay.classList.add('hidden');
    }
  }

  // --- Damage & Lives Handling ---

  handlePlayerDamage(hitX = 0) {
    if (this.player.invulnerableTimer > 0) return;

    if (this.player.hasShield) {
      this.player.hasShield = false;
      this.sound.playHit();
      this.particles.createShieldBreak(this.player.x + this.player.w / 2, this.player.y + this.player.h / 2);
      this.player.invulnerableTimer = 60;
      return;
    }

    this.lives--;
    this.sound.playHit();
    this.particles.createHitSparks(this.player.x + this.player.w / 2, this.player.y + this.player.h / 2);
    this.updateHeartsUI();

    // Damage knockback
    this.player.vy = -5.0;
    this.player.vx = hitX > this.player.x ? -2.6 : 2.6;

    if (this.lives <= 0) {
      this.triggerGameOver();
    } else {
      this.player.invulnerableTimer = 110;
    }
  }

  handleVoidFall() {
    this.lives--;
    this.sound.playHit();
    this.updateHeartsUI();

    if (this.lives <= 0) {
      this.triggerGameOver();
    } else {
      // Safe emergency rescue directly to active waypoint beacon or platform
      this.player.invulnerableTimer = 120;
      const cp = this.waypoints.find(w => w.id === this.lastCheckpointId) || this.waypoints[0];
      const respawnX = cp ? cp.x + 10 : 160;
      const underPlat = this.platforms.find(p => respawnX >= p.x && respawnX <= p.x + p.w) || this.platforms[0];
      this.player.x = respawnX;
      this.player.y = underPlat ? underPlat.y - this.player.h : 436;
      this.player.vx = 0;
      this.player.vy = 0;
      this.player.isGrounded = true;

      // Immediate camera snap
      const targetVirtualH = 540;
      this.camera.zoom = Math.max(0.95, Math.min(1.35, this.height / targetVirtualH));
      const viewW = this.width / this.camera.zoom;
      const viewH = this.height / this.camera.zoom;
      this.camera.x = Math.max(-40, this.player.x - viewW * 0.35);
      this.camera.y = Math.max(-40, (this.player.y + 20) - viewH * 0.58);

      this.particles.createDoubleJumpRing(this.player.x + this.player.w / 2, this.player.y + this.player.h);
      this.addScorePopup(this.player.x + 20, this.player.y - 20, '⚠️ RESCUED TO BEACON', '#ff0054');
    }
  }

  // --- Main Update Loop ---

  addScorePopup(x, y, text, color = '#ffbe0b') {
    this.scorePopups.push({
      x,
      y,
      text,
      vy: -1.7,
      alpha: 1.0,
      color,
      life: 36
    });
  }

  update(dt) {
    if (this.state !== 'PLAYING') {
      this.particles.update();
      return;
    }

    // 1. Horizontal Super Mario Movement (Acceleration, Skid & Deceleration)
    const isStarActive = this.player.starTimer > 0;
    const speedBoost = this.player.boostTimer > 0 ? 1.3 : (isStarActive ? 1.25 : 1.0);
    const maxSpeed = this.player.maxSpeed * speedBoost;

    if (this.keys.left) {
      this.player.vx -= this.player.accel;
      if (this.player.vx < -maxSpeed) this.player.vx = -maxSpeed;
      this.player.facing = -1;
    } else if (this.keys.right) {
      this.player.vx += this.player.accel;
      if (this.player.vx > maxSpeed) this.player.vx = maxSpeed;
      this.player.facing = 1;
    } else {
      this.player.vx *= this.player.friction;
      if (Math.abs(this.player.vx) < 0.05) this.player.vx = 0;
    }

    // Skid dust when reversing direction at high speed
    if (Math.sign(this.player.vx) !== 0 && Math.sign(this.player.vx) !== this.player.facing && Math.abs(this.player.vx) > 1.8 && this.player.isGrounded) {
      this.particles.createSkidDust(this.player.x + 24, this.player.y + this.player.h - 4);
    }

    // Apply horizontal motion
    this.player.x += this.player.vx;

    // Boundary constraints
    if (this.player.x < -80) this.player.x = -80;

    // 2. Power-up Timers
    if (this.player.starTimer > 0) {
      this.player.starTimer--;
      if (Math.random() < 0.55) {
        this.particles.createStarTrail(this.player.x + this.player.w / 2, this.player.y + this.player.h / 2);
      }
    }
    if (this.player.boostTimer > 0) {
      this.player.boostTimer--;
      this.player.jumpsLeft = this.player.maxJumps;
    }
    if (this.player.magnetTimer > 0) this.player.magnetTimer--;
    if (this.player.invulnerableTimer > 0) this.player.invulnerableTimer--;

    // 3. Vertical Gravity & Movement
    this.player.vy += this.player.gravity;
    this.player.y += this.player.vy;
    this.player.frame++;

    if (this.player.coyoteTimer > 0) this.player.coyoteTimer--;
    if (this.player.jumpBufferTimer > 0) this.player.jumpBufferTimer--;

    // 4. Platform Collisions
    let onAnySurface = false;
    const playerFeet = this.player.y + this.player.h;
    const prevFeet = playerFeet - this.player.vy;

    for (let plat of this.platforms) {
      if (plat.type === 'moving') {
        plat.movePhase += plat.moveSpeed;
        plat.y = plat.origY + Math.sin(plat.movePhase) * plat.moveRange;
      }

      const withinX = (this.player.x + this.player.w * 0.8 > plat.x) &&
                      (this.player.x + this.player.w * 0.2 < plat.x + plat.w);

      if (withinX && prevFeet <= plat.y + 14 && playerFeet >= plat.y) {
        this.player.y = plat.y - this.player.h;
        this.player.vy = 0;
        this.player.isGrounded = true;
        this.player.jumpsLeft = this.player.maxJumps;
        onAnySurface = true;

        if (Math.abs(this.player.vx) > 1.2 && Math.random() < 0.25) {
          this.particles.createRunDust(this.player.x + 8, plat.y);
        }

        if (this.player.jumpBufferTimer > 0) this.doJump(false);
      }
    }

    // 5. Interactive Block Collisions (Mario ? Blocks, Bricks, Pipes)
    for (let i = this.blocks.length - 1; i >= 0; i--) {
      const block = this.blocks[i];
      if (block.dead) continue;

      if (block.bumpY < 0) {
        block.bumpY += 1.8;
        if (block.bumpY > 0) block.bumpY = 0;
      }

      const blockBox = {
        x: block.x,
        y: block.y + block.bumpY,
        w: block.w,
        h: block.h
      };

      // Check collision with player
      if (this.checkCollision(this.player, blockBox)) {
        // A. Hitting Block from Below with Head
        if (this.player.vy < 0 && (this.player.y - this.player.vy) >= blockBox.y + blockBox.h - 14) {
          this.player.y = blockBox.y + blockBox.h;
          this.player.vy = 1.0;
          block.bumpY = -12;

          if (block.type === 'question' && !block.empty) {
            block.empty = true;
            block.type = 'empty';
            this.sound.playBlockBump();
            this.particles.createBlockDust(block.x + block.w / 2, block.y);
            this.handleBlockContent(block);
          } else if (block.type === 'brick') {
            if (this.player.starTimer > 0) {
              // Super Star powers shatter bricks completely!
              block.dead = true;
              this.sound.playBrickShatter();
              this.particles.createBrickShatter(block.x + block.w / 2, block.y + block.h / 2);
              this.score += 150;
              this.addScorePopup(block.x + block.w / 2, block.y, '+150', '#ff007f');
            } else {
              this.sound.playBlockBump();
              this.particles.createBlockDust(block.x + block.w / 2, block.y);
              this.score += 50;
            }
          } else {
            this.sound.playBlockBump();
          }
        }
        // B. Landing on Top of Block as a Platform
        else if (this.player.vy > 0 && prevFeet <= blockBox.y + 12 && playerFeet >= blockBox.y) {
          this.player.y = blockBox.y - this.player.h;
          this.player.vy = 0;
          this.player.isGrounded = true;
          this.player.jumpsLeft = this.player.maxJumps;
          onAnySurface = true;
        }
        // C. Side Wall Collision
        else if (this.player.vx > 0 && this.player.x + this.player.w >= blockBox.x && this.player.x < blockBox.x) {
          this.player.x = blockBox.x - this.player.w;
          this.player.vx = 0;
        } else if (this.player.vx < 0 && this.player.x <= blockBox.x + blockBox.w && this.player.x + this.player.w > blockBox.x + blockBox.w) {
          this.player.x = blockBox.x + blockBox.w;
          this.player.vx = 0;
        }
      }
    }

    if (!onAnySurface && this.player.isGrounded) {
      this.player.isGrounded = false;
      this.player.coyoteTimer = 6;
    }

    // 6. Void Fall Check (World depth pit)
    if (this.player.y > 680) {
      this.handleVoidFall();
    }

    // 7. Enemy Updates & Stomping Logic
    for (let enemy of this.enemies) {
      if (!enemy.alive) {
        if (enemy.squashed) {
          enemy.squashTimer--;
        }
        continue;
      }

      // Patrol movement
      if (enemy.type === 'slime' || enemy.type === 'spiky') {
        enemy.x += enemy.vx;
        if (enemy.x <= enemy.minX || enemy.x + enemy.w >= enemy.maxX) {
          enemy.vx = -enemy.vx;
        }
      } else if (enemy.type === 'drone') {
        enemy.phase += 0.04;
        enemy.y = enemy.origY + Math.sin(enemy.phase) * 35;
        enemy.x += enemy.vx;
        if (enemy.x <= enemy.minX || enemy.x + enemy.w >= enemy.maxX) {
          enemy.vx = -enemy.vx;
        }
      }

      // Check collision with player
      if (this.checkCollision(this.player, enemy)) {
        // A. Super Star Invincibility: Blast through any enemy on touch!
        if (this.player.starTimer > 0) {
          enemy.alive = false;
          enemy.squashed = true;
          enemy.squashTimer = 22;
          this.score += 300;
          this.sound.playStomp();
          this.particles.createStompPoof(enemy.x + enemy.w / 2, enemy.y + enemy.h / 2);
          this.addScorePopup(enemy.x + enemy.w / 2, enemy.y, '+300', '#ffd60a');
          continue;
        }

        // B. Stomp condition: player is falling onto enemy from above
        const stomping = (this.player.vy > 0) && (prevFeet <= enemy.y + 18) && (enemy.type !== 'spiky');

        if (stomping) {
          // Stomp victory! Authentic Mario bounce rebound
          enemy.alive = false;
          enemy.squashed = true;
          enemy.squashTimer = 22;
          this.player.vy = -11.5; // High Mario rebound bounce!
          this.score += 200;
          this.sound.playStomp();
          this.particles.createStompPoof(enemy.x + enemy.w / 2, enemy.y + enemy.h / 2);
          this.addScorePopup(enemy.x + enemy.w / 2, enemy.y, '+200', '#00f0ff');
        } else {
          // Player hit by enemy
          this.handlePlayerDamage(enemy.x);
        }
      }
    }

    // 8. Coin Collection & Magnet Attraction
    const playerCenter = {
      x: this.player.x + this.player.w / 2,
      y: this.player.y + this.player.h / 2
    };

    for (let coin of this.coins) {
      if (coin.collected) continue;

      if (this.player.magnetTimer > 0) {
        const dx = playerCenter.x - coin.x;
        const dy = playerCenter.y - coin.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 320) {
          coin.x += (dx / dist) * 10;
          coin.y += (dy / dist) * 10;
        }
      }

      if (Math.abs(playerCenter.x - coin.x) < (this.player.w / 2 + coin.r) &&
          Math.abs(playerCenter.y - coin.y) < (this.player.h / 2 + coin.r)) {
        coin.collected = true;
        this.coinsCollected++;
        this.score += 50;
        this.sound.playCoin();
        this.particles.createCoinBurst(coin.x, coin.y);
        this.addScorePopup(coin.x, coin.y - 12, '+50', '#ffbe0b');
      }
    }

    // 9. Bouncing Coins Animation (vaulting from ? blocks)
    for (let i = this.bouncingCoins.length - 1; i >= 0; i--) {
      const bc = this.bouncingCoins[i];
      bc.y += bc.vy;
      bc.vy += 0.46; // Gravity
      bc.rot += 0.35;
      bc.life--;
      if (bc.life <= 0) {
        this.particles.createCoinBurst(bc.x, bc.y);
        this.bouncingCoins.splice(i, 1);
      }
    }

    // 10. Floating Score Popups Update
    for (let i = this.scorePopups.length - 1; i >= 0; i--) {
      const sp = this.scorePopups[i];
      sp.y += sp.vy;
      sp.life--;
      sp.alpha = Math.max(0, sp.life / 36);
      if (sp.life <= 0) {
        this.scorePopups.splice(i, 1);
      }
    }

    // 11. Power-ups Pickup
    for (let pw of this.powerups) {
      if (pw.collected) continue;
      if (pw.vy) {
        pw.y += pw.vy;
        pw.vy += 0.18;
        if (pw.vy > 0) pw.vy = 0;
      }

      if (Math.abs(playerCenter.x - pw.x) < 32 && Math.abs(playerCenter.y - pw.y) < 32) {
        pw.collected = true;
        this.sound.playPowerup();
        this.score += 250;

        if (pw.type === 'shield') {
          this.player.hasShield = true;
          this.addScorePopup(pw.x, pw.y, 'SHIELD ACTIVE!', '#00f0ff');
        } else if (pw.type === 'magnet') {
          this.player.magnetTimer = 500;
          this.addScorePopup(pw.x, pw.y, 'STAR MAGNET!', '#ff007f');
        } else if (pw.type === 'boost') {
          this.player.boostTimer = 400;
          this.addScorePopup(pw.x, pw.y, 'SPEED BOOTS!', '#00f59b');
        } else if (pw.type === 'star') {
          this.player.starTimer = 550;
          this.addScorePopup(pw.x, pw.y, '★ SUPER STAR! ★', '#ffd60a');
        }

        this.particles.createDoubleJumpRing(pw.x, pw.y);
      }
    }

    // 12. Hidden Weapon Shrines Pickup (10 Weapons across biomes)
    for (let wc of this.weaponChests) {
      if (!wc.opened) {
        wc.sparklePhase += 0.05;
        if (this.checkCollision(this.player, wc)) {
          this.unlockWeapon(wc);
        }
      }
    }

    // 13. Waypoint Beacons Discovery (10 Fast-Travel Anchors)
    for (let wp of this.waypoints) {
      wp.pulsePhase += 0.04;
      const distToWp = Math.abs((this.player.x + this.player.w / 2) - (wp.x + wp.w / 2));
      const distY = Math.abs((this.player.y + this.player.h / 2) - (wp.y + wp.h / 2));
      if (distToWp < 48 && distY < 64 && !wp.active) {
        this.activateWaypoint(wp);
      }
    }

    // 14. Projectiles Physics & Combat Collision
    if (this.shootCooldown > 0) this.shootCooldown--;

    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.rot += 0.25;
      p.life--;

      if (Math.random() < 0.35) {
        this.particles.createStarTrail(p.x + p.w / 2, p.y + p.h / 2);
      }

      let hit = false;

      // Obstacle block collision
      for (let b of this.blocks) {
        if (b.dead || b.type === 'empty') continue;
        if (this.checkCollision(p, b)) {
          hit = true;
          this.particles.createProjectileHit(p.x + p.w / 2, p.y + p.h / 2, p.color);
          break;
        }
      }

      // Normal Enemy hit
      if (!hit) {
        for (let enemy of this.enemies) {
          if (!enemy.alive) continue;
          if (this.checkCollision(p, enemy)) {
            hit = true;
            enemy.alive = false;
            enemy.squashed = true;
            enemy.squashTimer = 22;
            this.score += 150;
            this.sound.playHit();
            this.particles.createProjectileHit(enemy.x + enemy.w / 2, enemy.y + enemy.h / 2, p.color);
            this.addScorePopup(enemy.x + enemy.w / 2, enemy.y, '+150', '#00f0ff');
            break;
          }
        }
      }

      // Boss Monsters Hit Check across active realm
      if (!hit) {
        for (let boss of this.bosses) {
          if (!boss.alive) continue;
          if (Math.abs(boss.x - this.player.x) > 1200) continue;
          if (this.checkCollision(p, boss)) {
            hit = true;
            boss.curHp = Math.max(0, boss.curHp - p.dmg);
            boss.hitFlash = 12;
            this.sound.playBossHit();
            this.particles.createProjectileHit(p.x + p.w / 2, p.y + p.h / 2, p.color);
            this.addScorePopup(boss.x + boss.w / 2, boss.y - 10, `-${p.dmg}`, '#ff007f');
            this.updateBossHUD(boss);

            if (boss.curHp <= 0) {
              this.defeatBoss(boss);
            }
            break;
          }
        }
      }

      if (hit || p.life <= 0) {
        this.projectiles.splice(i, 1);
      }
    }

    // 15. Active Boss AI, Combat & Domain Synchronization
    let nearestBoss = null;
    let minDist = 1200;

    for (let boss of this.bosses) {
      if (!boss.alive) continue;
      const d = Math.abs(this.player.x - boss.x);
      if (d < minDist) {
        minDist = d;
        nearestBoss = boss;
      }

      // Only run physics & collisions for bosses in active camera proximity (< 1300px)
      if (d > 1300) continue;

      boss.phase += 0.04;
      if (boss.hitFlash > 0) boss.hitFlash--;

      // Movement & Patrol Kinematics
      const isFlying = (boss.type === 'skeleton' || boss.type === 'grimoire' || boss.type === 'wasp');
      if (isFlying) {
        boss.x += boss.vx;
        boss.y = boss.origY + Math.sin(boss.phase * 1.5) * 25;
      } else {
        boss.x += boss.vx;
        const hop = Math.abs(Math.sin(boss.phase * 2.5)) * 6;
        boss.y = boss.origY - hop;
      }

      // Patrol boundaries
      if (boss.x <= boss.minX) {
        boss.x = boss.minX;
        boss.vx = Math.abs(boss.vx);
      } else if (boss.x + boss.w >= boss.maxX) {
        boss.x = boss.maxX - boss.w;
        boss.vx = -Math.abs(boss.vx);
      }

      // Check collision between Player and Boss Monster
      if (this.checkCollision(this.player, boss)) {
        if (this.player.starTimer > 0) {
          boss.curHp = Math.max(0, boss.curHp - 4);
          boss.hitFlash = 8;
          this.sound.playBossHit();
          this.particles.createHitSparks(boss.x + boss.w / 2, boss.y + boss.h / 2);
          this.updateBossHUD(boss);
          if (boss.curHp <= 0) this.defeatBoss(boss);
        } else {
          // Stomp Condition: Falling onto the boss from above
          const stomping = (this.player.vy > 0) && (prevFeet <= boss.y + 24);
          if (stomping) {
            boss.curHp = Math.max(0, boss.curHp - 25);
            boss.hitFlash = 14;
            this.player.vy = -12.5; // High rebound
            this.sound.playBossHit();
            this.particles.createStompPoof(this.player.x + this.player.w / 2, boss.y);
            this.addScorePopup(boss.x + boss.w / 2, boss.y - 12, '-25 STOMP!', '#ffbe0b');
            this.updateBossHUD(boss);
            if (boss.curHp <= 0) this.defeatBoss(boss);
          } else {
            this.handlePlayerDamage(boss.x + boss.w / 2);
          }
        }
      }
    }

    this.activeBoss = nearestBoss;
    this.updateBossHUD(nearestBoss);

    // 16. Cosmic Star Gate at the Astral Summit (x: 21,550)
    const gate = this.starGate;
    if (this.player.x + this.player.w >= gate.x && this.player.x <= gate.x + gate.w) {
      if (this.claimedSigils.size >= 10) {
        if (!gate.reached) {
          gate.reached = true;
          this.triggerGrandFinale();
        }
      } else {
        // Sealed by celestial barrier until all 10 Sigils are assembled
        this.player.x = gate.x - this.player.w - 12;
        this.player.vx = -4.5;
        this.sound.playHit();
        this.particles.createShieldBreak(gate.x, this.player.y + 25);
        if (!this.lastGateWarning || Date.now() - this.lastGateWarning > 1400) {
          this.lastGateWarning = Date.now();
          this.addScorePopup(gate.x - 30, this.player.y - 15, `🔒 REQUIRES 10 ASTRAL SIGILS (${this.claimedSigils.size}/10)!`, '#ff007f');
        }
      }
    }

    // Particles update
    this.particles.update();

    // 17. Dynamic Camera Zoom & Viewport Tracking across the 22,000px Continuum
    const targetVirtualH = 540;
    this.camera.zoom = Math.max(0.95, Math.min(1.35, this.height / targetVirtualH));
    const viewW = this.width / this.camera.zoom;
    const viewH = this.height / this.camera.zoom;

    // Smooth horizontal follow without artificial walls
    const targetCamX = this.player.x - viewW * 0.35;
    this.camera.x += (targetCamX - this.camera.x) * 0.14;
    if (this.camera.x < -40) this.camera.x = -40;
    if (this.camera.x > 21800) this.camera.x = 21800;

    // Smooth vertical follow - comfortable clearance above bottom controls
    const targetCamY = Math.max(-40, (this.player.y + 20) - viewH * 0.58);
    this.camera.y += (targetCamY - this.camera.y) * 0.10;

    // Biome tracking & HUD refresh
    this.updateCurrentBiome();
    this.updateHUD();
    this.drawMiniMap();
  }

  handleBlockContent(block) {
    if (block.content === 'coin') {
      this.coinsCollected++;
      this.score += 100;
      this.sound.playCoin();
      this.addScorePopup(block.x + block.w / 2, block.y - 18, '+100', '#ffbe0b');
      this.bouncingCoins.push({
        x: block.x + block.w / 2,
        y: block.y - 8,
        vy: -8.5,
        rot: 0,
        life: 32
      });
      this.particles.createCoinBurst(block.x + block.w / 2, block.y - 12);
    } else if (['shield', 'boost', 'magnet', 'star'].includes(block.content)) {
      this.powerups.push({
        x: block.x + block.w / 2,
        y: block.y - 20,
        vy: -3.5,
        type: block.content,
        collected: false
      });
      this.sound.playPowerupReveal();
      this.addScorePopup(block.x + block.w / 2, block.y - 22, block.content.toUpperCase() + '!', '#00f0ff');
    }
  }

  checkCollision(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.w &&
      rect1.x + rect1.w > rect2.x &&
      rect1.y < rect2.y + rect2.h &&
      rect1.y + rect1.h > rect2.y
    );
  }

  // --- Rendering ---

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    const currentZone = this.currentBiome || BIOME_ZONES[0];

    // 1. Parallax Painterly Background (Screen space)
    this.drawParallaxBackground(ctx, currentZone);

    // 2. Main Game World (Scaled and Camera Tracked)
    ctx.save();
    ctx.scale(this.camera.zoom, this.camera.zoom);
    ctx.translate(-this.camera.x, -this.camera.y);

    // Continuous Open World Platforms across 10 biomes
    this.drawPlatforms(ctx);

    // Interactive Blocks (? Blocks, Bricks)
    this.drawBlocks(ctx);

    // Bouncing Coins vaulting from ? blocks
    this.drawBouncingCoins(ctx);

    // 10 Fast-Travel Waypoint Beacons
    this.drawWaypoints(ctx);

    // 10 Arsenal Weapon Chests
    this.drawWeaponChests(ctx);

    // Regular Stompable Cartoon Enemies
    this.drawEnemies(ctx);

    // 10 Reference Monster Bosses in their respective domains
    this.drawBosses(ctx);

    // The Great Celestial Star Gate (Citadel terminus x: 21,550)
    this.drawStarGate(ctx);

    // Collectible Coins & Power-ups
    this.drawCoins(ctx);
    this.drawPowerups(ctx);

    // Fired Combat Projectiles
    this.drawProjectiles(ctx);

    // Particle Effects
    this.particles.draw(ctx);

    // Floating Score Popups (+100, +200, STAR!)
    this.drawScorePopups(ctx);

    // Player Character (facing direction, run stride, jump kinematics, rainbow star aura)
    if (this.state === 'PLAYING' || this.state === 'PAUSED' || this.state === 'LEVELCLEAR' || this.state === 'VICTORY') {
      // Guaranteed bright fallback marker so player is always visible
      ctx.save();
      ctx.fillStyle = 'rgba(255, 0, 100, 0.55)';
      ctx.shadowColor = '#ff0064';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(this.player.x + this.player.w / 2, this.player.y + this.player.h / 2, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      // Draw the full character sprite on top
      try {
        this.character.draw(ctx, this.player.x, this.player.y, this.player.w, this.player.h, {
          frame: this.player.frame,
          isGrounded: this.player.isGrounded,
          vy: this.player.vy,
          vx: this.player.vx,
          facing: this.player.facing,
          invulnerable: this.player.invulnerableTimer > 0,
          hasShield: this.player.hasShield,
          isInvincible: this.player.starTimer > 0
        });
      } catch (e) {
        // If character draw fails, draw a simple rectangle as fallback
        ctx.fillStyle = '#ff007f';
        ctx.fillRect(this.player.x, this.player.y, this.player.w, this.player.h);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('P', this.player.x + this.player.w / 2, this.player.y + this.player.h / 2 + 4);
      }
    }

    ctx.restore();

    // DEBUG: Screen-space player position indicator (always visible regardless of camera)
    if (this.state === 'PLAYING') {
      const screenPx = (this.player.x - this.camera.x) * this.camera.zoom;
      const screenPy = (this.player.y - this.camera.y) * this.camera.zoom;
      ctx.save();
      ctx.fillStyle = '#00ff00';
      ctx.strokeStyle = '#00ff00';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(screenPx + this.player.w * this.camera.zoom / 2, screenPy + this.player.h * this.camera.zoom / 2, 22, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Crosshair
      ctx.beginPath();
      ctx.moveTo(screenPx - 5, screenPy + this.player.h * this.camera.zoom / 2);
      ctx.lineTo(screenPx + this.player.w * this.camera.zoom + 5, screenPy + this.player.h * this.camera.zoom / 2);
      ctx.moveTo(screenPx + this.player.w * this.camera.zoom / 2, screenPy - 5);
      ctx.lineTo(screenPx + this.player.w * this.camera.zoom / 2, screenPy + this.player.h * this.camera.zoom + 5);
      ctx.stroke();

      // Position readout
      ctx.fillStyle = '#00ff00';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`POS: ${Math.round(this.player.x)},${Math.round(this.player.y)} | CAM: ${Math.round(this.camera.x)},${Math.round(this.camera.y)} | ZOOM: ${this.camera.zoom.toFixed(2)} | STATE: ${this.state}`, 10, this.height - 8);
      ctx.restore();
    }

    // 3. Screen-Space Mini-Map Radar in HUD
    this.drawMiniMap();

    // 4. World Map Modal Canvas if open
    if (this.isWorldMapOpen) {
      this.drawWorldMapModal();
    }
  }

  drawBouncingCoins(ctx) {
    for (let bc of this.bouncingCoins) {
      ctx.save();
      ctx.translate(bc.x, bc.y);
      const spin = Math.abs(Math.cos(bc.rot));
      ctx.scale(Math.max(0.18, spin), 1);

      ctx.fillStyle = '#ffbe0b';
      ctx.shadowColor = '#ffbe0b';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#b27b00';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('★', 0, 0);
      ctx.restore();
    }
  }

  drawScorePopups(ctx) {
    for (let sp of this.scorePopups) {
      ctx.save();
      ctx.globalAlpha = sp.alpha;
      ctx.fillStyle = sp.color;
      ctx.strokeStyle = '#050711';
      ctx.lineWidth = 3.5;
      ctx.font = '900 15px Orbitron, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.strokeText(sp.text, sp.x, sp.y);
      ctx.fillText(sp.text, sp.x, sp.y);
      ctx.restore();
    }
  }

  drawParallaxBackground(ctx, lvl) {
    const w = this.width;
    const h = this.height;
    const zone = lvl || this.currentBiome || BIOME_ZONES[0];

    // 1. Sky gradient tailored to level/biome theme
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
    skyGrad.addColorStop(0, zone.skyTop || '#0f0e26');
    skyGrad.addColorStop(0.42, zone.skyMid || '#23153c');
    skyGrad.addColorStop(1, zone.skyBot || '#e58e65');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    // 2. Giant Warm Celestial Moon / Sun
    ctx.save();
    const moonX = w * 0.80;
    const moonY = Math.min(h * 0.22, 140);
    const moonR = 48;

    const moonGlow = ctx.createRadialGradient(moonX, moonY, moonR * 0.7, moonX, moonY, moonR * 2.8);
    moonGlow.addColorStop(0, 'rgba(255, 248, 220, 0.42)');
    moonGlow.addColorStop(0.5, 'rgba(255, 214, 165, 0.15)');
    moonGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = moonGlow;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonR * 2.8, 0, Math.PI * 2);
    ctx.fill();

    const moonBody = ctx.createRadialGradient(moonX - 10, moonY - 10, 4, moonX, moonY, moonR);
    moonBody.addColorStop(0, '#fffdfa');
    moonBody.addColorStop(0.8, '#ffeedb');
    moonBody.addColorStop(1, '#ffd6a5');
    ctx.fillStyle = moonBody;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 3. Twinkling Stars
    ctx.save();
    for (let s of this.stars) {
      const starX = ((s.x - this.camera.x * s.speed) % w + w) % w;
      const twinkle = Math.sin(Date.now() * s.twinkleSpeed) * 0.35 + 0.65;
      ctx.globalAlpha = s.alpha * twinkle;
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(starX, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 4. Soft Puffy Cartoon Clouds
    ctx.save();
    for (let c of this.clouds) {
      const cx = ((c.x - this.camera.x * c.speed) % (w + 400) + (w + 400)) % (w + 400) - 200;
      ctx.globalAlpha = c.alpha;
      this.drawCartoonCloud(ctx, cx, c.y, c.scale);
    }
    ctx.restore();

    // 5. Layer 1: Far Rolling Cartoon Hills (Smooth quadratic domes)
    ctx.save();
    const farOffset = -(this.camera.x * 0.05) % 2400;
    const farBaseY = h * 0.74;
    ctx.fillStyle = zone.theme === 'crystal' ? '#0e1c38' : (zone.theme === 'mushroom' ? '#2f143f' : '#23163d');
    ctx.beginPath();
    ctx.moveTo(-100, h);
    for (let i = -1; i < 18; i++) {
      const mx = i * 220 + farOffset;
      const hillH = 95 + ((i % 4) * 24);
      ctx.quadraticCurveTo(mx + 110, farBaseY - hillH, mx + 220, farBaseY);
    }
    ctx.lineTo(w + 300, h);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 6. Layer 2: Midground Rolling Hills with Cartoon Bushes
    ctx.save();
    const midOffset = -(this.camera.x * 0.12) % 2400;
    const midBaseY = h * 0.81;
    ctx.fillStyle = zone.theme === 'crystal' ? '#092742' : (zone.theme === 'mushroom' ? '#3e1a42' : '#1a3c2e');
    ctx.beginPath();
    ctx.moveTo(-100, h);
    for (let i = -1; i < 24; i++) {
      const hx = i * 160 + midOffset;
      const hillH = 65 + ((i % 3) * 20);
      ctx.quadraticCurveTo(hx + 80, midBaseY - hillH, hx + 160, midBaseY);
    }
    ctx.lineTo(w + 300, h);
    ctx.closePath();
    ctx.fill();

    // Cute rounded bushes on hilltops
    ctx.fillStyle = zone.theme === 'crystal' ? '#00f0ff' : (zone.theme === 'mushroom' ? '#ff007f' : '#2ec4b6');
    ctx.globalAlpha = 0.35;
    for (let i = -1; i < 24; i++) {
      const hx = i * 160 + midOffset + 80;
      const hillH = 65 + ((i % 3) * 20);
      ctx.beginPath();
      ctx.arc(hx, midBaseY - hillH + 4, 16, 0, Math.PI * 2);
      ctx.arc(hx - 10, midBaseY - hillH + 8, 12, 0, Math.PI * 2);
      ctx.arc(hx + 10, midBaseY - hillH + 8, 12, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 7. Ambient Glowing Fireflies
    ctx.save();
    for (let f of this.fireflies) {
      const fx = ((f.x - this.camera.x * 0.35) % w + w) % w;
      const fy = f.y + Math.sin(Date.now() * 0.003 + f.phase) * 15;
      const glow = Math.sin(Date.now() * 0.005 + f.phase) * 0.3 + 0.7;

      ctx.fillStyle = `rgba(255, 230, 110, ${glow * 0.85})`;
      ctx.shadowColor = '#ffbe0b';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(fx, fy, f.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  drawCartoonCloud(ctx, x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.78)';
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.arc(18, -10, 24, 0, Math.PI * 2);
    ctx.arc(44, -5, 19, 0, Math.PI * 2);
    ctx.arc(62, 5, 15, 0, Math.PI * 2);
    ctx.arc(26, 10, 17, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    // Subtle cloud shadow on underside
    ctx.fillStyle = 'rgba(220, 230, 248, 0.35)';
    ctx.beginPath();
    ctx.arc(26, 10, 15, 0, Math.PI);
    ctx.fill();
    ctx.restore();
  }

  drawPlatforms(ctx) {
    const defaultZone = this.currentBiome || BIOME_ZONES[0];
    const camLeft = this.camera.x - 200;
    const camRight = this.camera.x + this.width / this.camera.zoom + 200;

    for (let p of this.platforms) {
      if (p.x + p.w < camLeft || p.x > camRight) continue;

      ctx.save();
      const pZone = BIOME_ZONES.find(b => b.id === p.biomeId) || defaultZone;

      // Earth body palette tailored to theme
      let earthTop = '#4a2c1d';
      let earthBot = '#2c170c';
      let topColor = '#10b981';
      let topColorDark = '#059669';

      if (pZone.theme === 'mushroom') {
        earthTop = '#3f1f45';
        earthBot = '#240f28';
        topColor = pZone.ambientColor || '#ff4d6d';
        topColorDark = '#c9184a';
      } else if (pZone.theme === 'crystal') {
        earthTop = '#1e2942';
        earthBot = '#0f172a';
        topColor = pZone.ambientColor || '#00f0ff';
        topColorDark = '#0284c7';
      } else {
        topColor = pZone.ambientColor || '#10b981';
        topColorDark = '#059669';
      }

      // 1. Earth Body with Strata Gradient
      const platGrad = ctx.createLinearGradient(p.x, p.y, p.x, p.y + 120);
      platGrad.addColorStop(0, earthTop);
      platGrad.addColorStop(1, earthBot);
      ctx.fillStyle = platGrad;

      ctx.beginPath();
      ctx.roundRect(p.x, p.y, p.w, p.h, [14, 14, 0, 0]);
      ctx.fill();

      // Strata Rock Bands
      ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
      ctx.fillRect(p.x, p.y + 35, p.w, 5);
      ctx.fillRect(p.x, p.y + 80, p.w, 7);

      // Embedded stylized stone chunks
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      for (let sx = p.x + 24; sx < p.x + p.w - 30; sx += 70) {
        ctx.beginPath();
        ctx.roundRect(sx, p.y + 50, 18, 10, 3);
        ctx.fill();
      }

      // 2. Platform outline
      ctx.strokeStyle = '#1a110a';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.roundRect(p.x, p.y, p.w, p.h, [14, 14, 0, 0]);
      ctx.stroke();

      // 3. Top Surface Turf Cap
      if (p.type === 'moving') {
        // Sci-Fi Glowing Pulse Platform
        ctx.fillStyle = '#ff007f';
        ctx.shadowColor = '#ff007f';
        ctx.shadowBlur = 14;
        ctx.fillRect(p.x, p.y, p.w, 6);
        ctx.shadowBlur = 0;

        // Pulse arrows
        ctx.fillStyle = '#ffffff';
        for (let ax = p.x + 20; ax < p.x + p.w - 20; ax += 35) {
          ctx.beginPath();
          ctx.moveTo(ax, p.y + 2);
          ctx.lineTo(ax + 8, p.y + 4);
          ctx.lineTo(ax, p.y + 6);
          ctx.fill();
        }
      } else {
        // Lush thick grass cap
        const grassGrad = ctx.createLinearGradient(p.x, p.y, p.x, p.y + 14);
        grassGrad.addColorStop(0, topColor);
        grassGrad.addColorStop(1, topColorDark);
        ctx.fillStyle = grassGrad;
        ctx.beginPath();
        ctx.roundRect(p.x, p.y, p.w, 12, [14, 14, 2, 2]);
        ctx.fill();

        // Natural hanging grass fringe / scallops
        ctx.fillStyle = topColorDark;
        for (let gx = p.x + 8; gx < p.x + p.w - 8; gx += 16) {
          ctx.beginPath();
          ctx.arc(gx + 8, p.y + 12, 6.5, 0, Math.PI, false);
          ctx.fill();
        }

        // Cute blooming daisies and clover tufts along the platform!
        for (let fx = p.x + 30; fx < p.x + p.w - 30; fx += 80) {
          // Daisy flower
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(fx - 2, p.y - 3, 2.5, 0, Math.PI * 2);
          ctx.arc(fx + 2, p.y - 3, 2.5, 0, Math.PI * 2);
          ctx.arc(fx, p.y - 5, 2.5, 0, Math.PI * 2);
          ctx.arc(fx, p.y - 1, 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#ffd60a';
          ctx.beginPath();
          ctx.arc(fx, p.y - 3, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
    }
  }

  drawBlocks(ctx) {
    for (let b of this.blocks) {
      if (b.dead) continue;
      ctx.save();
      const by = b.y + b.bumpY;

      if (b.type === 'pipe') {
        // Classic Mario Warp Pipe with 3D cylindrical shine
        const pipeGrad = ctx.createLinearGradient(b.x, 0, b.x + b.w, 0);
        pipeGrad.addColorStop(0, '#1b6e2d');
        pipeGrad.addColorStop(0.2, '#38b000');
        pipeGrad.addColorStop(0.55, '#70e000');
        pipeGrad.addColorStop(0.8, '#38b000');
        pipeGrad.addColorStop(1, '#1b6e2d');

        // Pipe Rim
        ctx.fillStyle = pipeGrad;
        ctx.beginPath();
        ctx.roundRect(b.x - 4, by, b.w + 8, 22, [5, 5, 2, 2]);
        ctx.fill();

        ctx.strokeStyle = '#0d3814';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.roundRect(b.x - 4, by, b.w + 8, 22, [5, 5, 2, 2]);
        ctx.stroke();

        // Pipe Inner Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
        ctx.fillRect(b.x - 2, by + 1, b.w + 4, 3.5);

        // Pipe Body
        ctx.fillStyle = pipeGrad;
        ctx.beginPath();
        ctx.rect(b.x, by + 22, b.w, b.h - 22);
        ctx.fill();
        ctx.stroke();

        // Specular vertical highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.fillRect(b.x + 6, by + 2, 7, b.h - 4);
      } else if (b.type === 'question') {
        // Glowing Golden Mario ? Mystery Block
        const pulse = Math.sin(Date.now() * 0.006 + b.x) * 0.05 + 0.95;
        ctx.fillStyle = '#ffbe0b';
        ctx.shadowColor = '#ffbe0b';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.roundRect(b.x, by, b.w, b.h, 6);
        ctx.fill();

        // Dark beveled border
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#b27b00';
        ctx.lineWidth = 2.4;
        ctx.strokeRect(b.x, by, b.w, b.h);

        // Corner rivets
        ctx.fillStyle = '#b27b00';
        ctx.fillRect(b.x + 3, by + 3, 3, 3);
        ctx.fillRect(b.x + b.w - 6, by + 3, 3, 3);
        ctx.fillRect(b.x + 3, by + b.h - 6, 3, 3);
        ctx.fillRect(b.x + b.w - 6, by + b.h - 6, 3, 3);

        // Diagonal glossy light sheen beam
        const sheenX = ((Date.now() * 0.04 + b.x) % (b.w * 3)) - b.w;
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(b.x, by, b.w, b.h, 6);
        ctx.clip();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
        ctx.beginPath();
        ctx.moveTo(b.x + sheenX, by);
        ctx.lineTo(b.x + sheenX + 12, by);
        ctx.lineTo(b.x + sheenX - 6, by + b.h);
        ctx.lineTo(b.x + sheenX - 18, by + b.h);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // Pulsing Question Mark text
        ctx.fillStyle = '#4a3000';
        ctx.font = '900 22px Orbitron, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('?', b.x + b.w / 2, by + b.h / 2 + 1);
      } else if (b.type === 'brick') {
        // Red/Brown Brick Block with tactile texture
        ctx.fillStyle = '#a84128';
        ctx.beginPath();
        ctx.roundRect(b.x, by, b.w, b.h, 4);
        ctx.fill();

        // Highlight rim
        ctx.strokeStyle = '#d46348';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(b.x + 1, by + b.h - 1);
        ctx.lineTo(b.x + 1, by + 1);
        ctx.lineTo(b.x + b.w - 1, by + 1);
        ctx.stroke();

        ctx.strokeStyle = '#1e222b';
        ctx.lineWidth = 2.2;
        ctx.strokeRect(b.x, by, b.w, b.h);

        // Brick seam lines
        ctx.strokeStyle = '#6e2b1b';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(b.x, by + b.h / 2);
        ctx.lineTo(b.x + b.w, by + b.h / 2);
        ctx.moveTo(b.x + b.w / 2, by);
        ctx.lineTo(b.x + b.w / 2, by + b.h / 2);
        ctx.moveTo(b.x + b.w * 0.25, by + b.h / 2);
        ctx.lineTo(b.x + b.w * 0.25, by + b.h);
        ctx.moveTo(b.x + b.w * 0.75, by + b.h / 2);
        ctx.lineTo(b.x + b.w * 0.75, by + b.h);
        ctx.stroke();
      } else if (b.type === 'empty') {
        // Solid Metallic Spent Block
        ctx.fillStyle = '#64748b';
        ctx.beginPath();
        ctx.roundRect(b.x, by, b.w, b.h, 4);
        ctx.fill();

        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2.2;
        ctx.strokeRect(b.x, by, b.w, b.h);

        ctx.fillStyle = '#334155';
        ctx.fillRect(b.x + 4, by + 4, 3, 3);
        ctx.fillRect(b.x + b.w - 7, by + 4, 3, 3);
        ctx.fillRect(b.x + 4, by + b.h - 7, 3, 3);
        ctx.fillRect(b.x + b.w - 7, by + b.h - 7, 3, 3);
      }

      ctx.restore();
    }
  }

  drawEnemies(ctx) {
    for (let e of this.enemies) {
      if (!e.alive && !e.squashed) continue;

      ctx.save();
      ctx.translate(e.x, e.y);

      if (e.squashed) {
        // Squashed flat pancake Mario stomp animation
        ctx.scale(1.3, 0.25);
        ctx.translate(-4, 75);

        // Draw flat squashed slime with dizzy 'x x' eyes
        ctx.fillStyle = '#c9184a';
        ctx.beginPath();
        ctx.ellipse(18, 16, 22, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#1e222a';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Dizzy stars floating
        ctx.fillStyle = '#ffd60a';
        ctx.font = '10px sans-serif';
        ctx.fillText('★', 6, 8);
        ctx.fillText('★', 28, 8);

        ctx.restore();
        continue;
      }

      if (e.type === 'slime') {
        // Charming Squishy Cartoon Slime / Goomba with walking feet & glancing eyes
        const walkCycle = Math.sin(Date.now() * 0.012 + e.x);
        const squashY = Math.abs(walkCycle) * 2.5;
        const dir = e.vx > 0 ? 1 : -1;

        // Stubby walking feet
        ctx.fillStyle = '#a01a24';
        const foot1Offset = walkCycle * 4.5;
        const foot2Offset = -walkCycle * 4.5;
        ctx.beginPath();
        ctx.ellipse(10 + foot1Offset, 30, 6, 3.5, 0, 0, Math.PI * 2);
        ctx.ellipse(26 + foot2Offset, 30, 6, 3.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#1e222a';
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Squishy Body with gradient
        const bodyGrad = ctx.createLinearGradient(0, 4, 0, 32);
        bodyGrad.addColorStop(0, '#ff4d6d');
        bodyGrad.addColorStop(1, '#c9184a');
        ctx.fillStyle = bodyGrad;

        ctx.beginPath();
        ctx.moveTo(8, 30 - squashY);
        ctx.bezierCurveTo(2, 14, 8, 4, 18, 4);
        ctx.bezierCurveTo(28, 4, 34, 14, 28, 30 - squashY);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#1e222a';
        ctx.lineWidth = 2.2;
        ctx.stroke();

        // Highlight glint on top
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.beginPath();
        ctx.ellipse(13, 10, 4, 2, -0.3, 0, Math.PI * 2);
        ctx.fill();

        // Expressive Eyes looking in travel direction
        const eyeShift = dir * 2.5;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.ellipse(13 + eyeShift * 0.5, 16, 4.5, 6, 0, 0, Math.PI * 2);
        ctx.ellipse(23 + eyeShift * 0.5, 16, 4.5, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#1e222a';
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Dark Pupils
        ctx.fillStyle = '#1e222a';
        ctx.beginPath();
        ctx.arc(14 + eyeShift, 16.5, 2.3, 0, Math.PI * 2);
        ctx.arc(24 + eyeShift, 16.5, 2.3, 0, Math.PI * 2);
        ctx.fill();

        // Catchlight reflections
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(13.2 + eyeShift, 15.5, 0.8, 0, Math.PI * 2);
        ctx.arc(23.2 + eyeShift, 15.5, 0.8, 0, Math.PI * 2);
        ctx.fill();
      } else if (e.type === 'drone') {
        // Flying Bat Drone / Paratroopa
        ctx.fillStyle = '#7209b7';
        ctx.beginPath();
        ctx.arc(18, 16, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#1e222a';
        ctx.lineWidth = 2.2;
        ctx.stroke();

        // Animated bat wings
        const wingFlap = Math.sin(Date.now() * 0.018) * 9;
        ctx.fillStyle = '#b5179e';
        ctx.beginPath();
        ctx.moveTo(6, 14);
        ctx.lineTo(-10, 6 + wingFlap);
        ctx.lineTo(4, 22);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(30, 14);
        ctx.lineTo(46, 6 + wingFlap);
        ctx.lineTo(32, 22);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Glowing animated core
        ctx.fillStyle = '#ff007f';
        ctx.shadowColor = '#ff007f';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(18, 15, 3.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (e.type === 'spiky') {
        // Spiky Un-stompable Turtle / Hedgehog
        ctx.fillStyle = '#ff7b00';
        ctx.beginPath();
        ctx.arc(18, 18, 14, Math.PI, 0, false);
        ctx.lineTo(32, 30);
        ctx.lineTo(4, 30);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#1e222a';
        ctx.lineWidth = 2.4;
        ctx.stroke();

        // Dangerous Spikes on Top
        ctx.fillStyle = '#ffffff';
        for (let sx = 6; sx <= 26; sx += 7) {
          ctx.beginPath();
          ctx.moveTo(sx, 12);
          ctx.lineTo(sx + 3.5, 2);
          ctx.lineTo(sx + 7, 12);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }

        // Angry eyes
        ctx.fillStyle = '#1e222a';
        ctx.beginPath();
        ctx.arc(12, 20, 2, 0, Math.PI * 2);
        ctx.arc(24, 20, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  drawCoins(ctx) {
    for (let c of this.coins) {
      if (c.collected) continue;

      const spinScale = Math.abs(Math.sin(Date.now() * 0.005 + c.x));
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.scale(Math.max(0.18, spinScale), 1);

      // Gold coin glow & body
      ctx.fillStyle = '#ffbe0b';
      ctx.shadowColor = '#ffbe0b';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(0, 0, c.r, 0, Math.PI * 2);
      ctx.fill();

      // Inner border
      ctx.strokeStyle = '#b27b00';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Inner star emblem
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('★', 0, 0);

      ctx.restore();
    }
  }

  drawPowerups(ctx) {
    for (let pw of this.powerups) {
      if (pw.collected) continue;

      ctx.save();
      ctx.translate(pw.x, pw.y);

      let color = '#00f0ff';
      let icon = '🛡️';
      if (pw.type === 'magnet') { color = '#ff007f'; icon = '🧲'; }
      if (pw.type === 'boost') { color = '#00f59b'; icon = '🚀'; }
      if (pw.type === 'star') { color = '#ffd60a'; icon = '⭐'; }

      ctx.shadowColor = color;
      ctx.shadowBlur = 18;
      ctx.fillStyle = 'rgba(20, 26, 54, 0.9)';
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.8;

      ctx.beginPath();
      ctx.arc(0, 0, 19, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.font = '18px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(icon, 0, 1);
      ctx.restore();
    }
  }

  // 10 Fast-Travel Waypoint Beacons
  drawWaypoints(ctx) {
    if (!this.waypoints) return;
    const camLeft = this.camera.x - 200;
    const camRight = this.camera.x + this.width / this.camera.zoom + 200;

    for (let wp of this.waypoints) {
      if (wp.x < camLeft || wp.x > camRight) continue;
      const isActive = this.activeWaypoints.has(wp.id);
      ctx.save();
      ctx.translate(wp.x, wp.y);

      // 1. Base Pedestal
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = isActive ? '#00f0ff' : '#475569';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.roundRect(-24, 20, 48, 20, [4, 4, 0, 0]);
      ctx.fill();
      ctx.stroke();

      // Glowing rune base circle
      if (isActive) {
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 16;
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.7)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(0, 36, 32, 6, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 2. Monolith Spire Pillar
      const spireGrad = ctx.createLinearGradient(-12, -45, 12, 20);
      if (isActive) {
        spireGrad.addColorStop(0, '#00f0ff');
        spireGrad.addColorStop(0.5, '#0284c7');
        spireGrad.addColorStop(1, '#0f172a');
      } else {
        spireGrad.addColorStop(0, '#64748b');
        spireGrad.addColorStop(1, '#1e293b');
      }
      ctx.fillStyle = spireGrad;
      ctx.beginPath();
      ctx.moveTo(-12, 20);
      ctx.lineTo(-7, -40);
      ctx.lineTo(0, -52);
      ctx.lineTo(7, -40);
      ctx.lineTo(12, 20);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // 3. Floating Beacon Crystal Orb at apex
      const floatBob = Math.sin(Date.now() * 0.005 + wp.id) * 3;
      const orbY = -64 + floatBob;
      ctx.shadowColor = isActive ? '#00f0ff' : '#64748b';
      ctx.shadowBlur = isActive ? 18 : 6;
      ctx.fillStyle = isActive ? '#00f0ff' : '#94a3b8';
      ctx.beginPath();
      ctx.arc(0, orbY, 9, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, orbY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Active Vertical Energy Ray
      if (isActive) {
        const beamAlpha = Math.sin(Date.now() * 0.01 + wp.id) * 0.15 + 0.35;
        const beamGrad = ctx.createLinearGradient(0, orbY, 0, -280);
        beamGrad.addColorStop(0, `rgba(0, 240, 255, ${beamAlpha})`);
        beamGrad.addColorStop(1, 'rgba(0, 240, 255, 0)');
        ctx.fillStyle = beamGrad;
        ctx.fillRect(-6, -280, 12, orbY + 280);
      }

      // 4. In-World Waypoint Name & Status
      ctx.shadowBlur = 0;
      ctx.font = '900 10px Orbitron, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = isActive ? '#00f0ff' : '#cbd5e1';
      ctx.fillText(wp.name.toUpperCase(), 0, -84 + floatBob);

      ctx.font = '700 8px Orbitron, sans-serif';
      ctx.fillStyle = isActive ? '#10b981' : '#f59e0b';
      ctx.fillText(isActive ? '● WAYPOINT ACTIVE' : '○ STEP TO ACTIVATE', 0, -74 + floatBob);

      ctx.restore();
    }
  }

  // 10 Arsenal Weapon Chests
  drawWeaponChests(ctx) {
    if (!this.weaponChests) return;
    const camLeft = this.camera.x - 200;
    const camRight = this.camera.x + this.width / this.camera.zoom + 200;

    for (let c of this.weaponChests) {
      if (c.x < camLeft || c.x > camRight) continue;
      this.drawSingleWeaponChest(ctx, c);
    }
  }

  drawSingleWeaponChest(ctx, c) {
    ctx.save();

    if (!c.opened) {
      // Floating bobbing motion
      const bob = Math.sin(Date.now() * 0.005 + c.x) * 4;
      const cy = c.y + bob;

      // Golden aura glow
      ctx.shadowColor = '#ffd60a';
      ctx.shadowBlur = 16;

      // Chest Body (Wood & Gold)
      const chestGrad = ctx.createLinearGradient(c.x, cy, c.x, cy + c.h);
      chestGrad.addColorStop(0, '#ffd60a');
      chestGrad.addColorStop(0.25, '#d4a373');
      chestGrad.addColorStop(1, '#8b5a2b');
      ctx.fillStyle = chestGrad;
      ctx.beginPath();
      ctx.roundRect(c.x, cy + 10, c.w, c.h - 10, 4);
      ctx.fill();

      // Chest Lid (Dome)
      ctx.fillStyle = '#ffd60a';
      ctx.beginPath();
      ctx.roundRect(c.x - 2, cy, c.w + 4, 13, [8, 8, 2, 2]);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#3e2723';
      ctx.lineWidth = 2.2;
      ctx.stroke();
      ctx.strokeRect(c.x, cy + 10, c.w, c.h - 10);

      // Gold Iron Straps & Keyhole Latch
      ctx.fillStyle = '#fff3b0';
      ctx.fillRect(c.x + 8, cy, 4, c.h);
      ctx.fillRect(c.x + c.w - 12, cy, 4, c.h);

      ctx.fillStyle = '#ffbe0b';
      ctx.beginPath();
      ctx.arc(c.x + c.w / 2, cy + 12, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#4a2800';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      ctx.fillStyle = '#1a0d00';
      ctx.fillRect(c.x + c.w / 2 - 1, cy + 11, 2, 3);

      // Pulsing Weapon Emblem & Name above Chest
      const iconBob = Math.sin(Date.now() * 0.007) * 3;
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffd60a';
      ctx.shadowBlur = 12;
      ctx.font = 'bold 18px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(c.weapon.icon, c.x + c.w / 2, cy - 14 + iconBob);

      ctx.fillStyle = '#ffd60a';
      ctx.font = '900 10px Orbitron, sans-serif';
      ctx.fillText(c.weapon.name.toUpperCase(), c.x + c.w / 2, cy - 28 + iconBob);
    } else {
      // Opened Chest
      ctx.fillStyle = '#5c3a21';
      ctx.beginPath();
      ctx.roundRect(c.x, c.y + 12, c.w, c.h - 12, 4);
      ctx.fill();
      ctx.strokeStyle = '#2d1b0e';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Open lid tilted back
      ctx.save();
      ctx.translate(c.x, c.y + 10);
      ctx.rotate(-0.4);
      ctx.fillStyle = '#c59b27';
      ctx.fillRect(0, -10, c.w, 10);
      ctx.strokeRect(0, -10, c.w, 10);
      ctx.restore();

      // Glowing empty golden interior
      ctx.fillStyle = 'rgba(255, 214, 10, 0.4)';
      ctx.fillRect(c.x + 4, c.y + 14, c.w - 8, 8);
    }

    ctx.restore();
  }

  // The Great Celestial Star Gate (unlocks with 10 Sigils)
  drawStarGate(ctx) {
    const gx = 21550;
    const gy = 260;
    const camLeft = this.camera.x - 300;
    const camRight = this.camera.x + this.width / this.camera.zoom + 300;
    if (gx < camLeft || gx > camRight) return;

    ctx.save();
    ctx.translate(gx, gy);

    const sigilsCount = this.claimedSigils.size;
    const isUnlocked = sigilsCount >= 10;

    // 1. Massive Colossal Stone Gateway Pillars
    const archGrad = ctx.createLinearGradient(-70, 0, 70, 0);
    archGrad.addColorStop(0, '#0f0e26');
    archGrad.addColorStop(0.5, '#2e1065');
    archGrad.addColorStop(1, '#0f0e26');
    ctx.fillStyle = archGrad;
    ctx.strokeStyle = isUnlocked ? '#ffd60a' : '#7209b7';
    ctx.lineWidth = 3.5;

    // Left pillar
    ctx.beginPath();
    ctx.roundRect(-80, -100, 32, 240, [8, 8, 0, 0]);
    ctx.fill();
    ctx.stroke();

    // Right pillar
    ctx.beginPath();
    ctx.roundRect(48, -100, 32, 240, [8, 8, 0, 0]);
    ctx.fill();
    ctx.stroke();

    // Archway lintel
    ctx.beginPath();
    ctx.roundRect(-95, -135, 190, 40, [12, 12, 4, 4]);
    ctx.fill();
    ctx.stroke();

    // 2. 10 Sigil Sockets on the Lintel
    for (let i = 1; i <= 10; i++) {
      const sx = -72 + (i - 1) * 16;
      const sy = -115;
      const hasSigil = this.claimedSigils.has(i);

      ctx.save();
      ctx.beginPath();
      ctx.arc(sx, sy, 6, 0, Math.PI * 2);
      if (hasSigil) {
        ctx.fillStyle = '#ffd60a';
        ctx.shadowColor = '#ffd60a';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 8px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('★', sx, sy);
      } else {
        ctx.fillStyle = '#1e1b4b';
        ctx.fill();
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      ctx.restore();
    }

    // 3. Central Event Horizon / Star Portal
    ctx.save();
    if (isUnlocked) {
      // Swirling iridescent vortex
      const time = Date.now() * 0.002;
      const radGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 75);
      radGrad.addColorStop(0, '#ffffff');
      radGrad.addColorStop(0.3, '#ffd60a');
      radGrad.addColorStop(0.6, '#f72585');
      radGrad.addColorStop(1, 'rgba(114, 9, 183, 0.4)');
      ctx.fillStyle = radGrad;
      ctx.shadowColor = '#ffd60a';
      ctx.shadowBlur = 30;

      ctx.beginPath();
      ctx.ellipse(0, 0, 60, 95, 0, 0, Math.PI * 2);
      ctx.fill();

      // Swirl rays
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.2;
      for (let k = 0; k < 6; k++) {
        const a = time * 2 + (k * Math.PI) / 3;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(Math.cos(a + 0.5) * 40, Math.sin(a + 0.5) * 60, Math.cos(a) * 55, Math.sin(a) * 90);
        ctx.stroke();
      }
    } else {
      // Dark Energy Barrier with Force Grid
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.beginPath();
      ctx.ellipse(0, 0, 56, 90, 0, 0, Math.PI * 2);
      ctx.fill();

      const barrierAlpha = Math.sin(Date.now() * 0.008) * 0.3 + 0.7;
      ctx.strokeStyle = `rgba(247, 37, 133, ${barrierAlpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Barrier grid lines
      ctx.strokeStyle = 'rgba(247, 37, 133, 0.25)';
      ctx.lineWidth = 1;
      for (let ly = -80; ly <= 80; ly += 20) {
        ctx.beginPath();
        ctx.moveTo(-45, ly);
        ctx.lineTo(45, ly);
        ctx.stroke();
      }
    }
    ctx.restore();

    // 4. Floating Holographic Portal Marquee
    const badgeBob = Math.sin(Date.now() * 0.005) * 4;
    const badgeY = -155 + badgeBob;
    ctx.shadowBlur = 12;
    ctx.shadowColor = isUnlocked ? '#ffd60a' : '#f72585';
    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
    ctx.strokeStyle = isUnlocked ? '#ffd60a' : '#f72585';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.roundRect(-120, badgeY - 18, 240, 36, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 0;
    ctx.font = '900 11px Orbitron, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (isUnlocked) {
      ctx.fillStyle = '#ffd60a';
      ctx.fillText('✨ STAR GATE OPEN — STEP IN TO ASCEND ✨', 0, badgeY);
    } else {
      ctx.fillText(`🔒 STAR GATE SEALED (${sigilsCount}/10 SIGILS)`, 0, badgeY);
    }

    ctx.restore();
  }

  drawClaimedSigilAltar(ctx, b) {
    const altarX = b.x + b.w / 2;
    const altarY = b.origY || b.y;
    const camLeft = this.camera.x - 200;
    const camRight = this.camera.x + this.width / this.camera.zoom + 200;
    if (altarX < camLeft || altarX > camRight) return;

    ctx.save();
    ctx.translate(altarX, altarY + 20);

    // Stone Pedestal
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#ffd60a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-20, 0, 40, 16, [4, 4, 0, 0]);
    ctx.fill();
    ctx.stroke();

    // Floating Rotating Golden Sigil Star
    const starBob = Math.sin(Date.now() * 0.006 + b.id) * 4;
    const starY = -22 + starBob;
    ctx.shadowColor = '#ffd60a';
    ctx.shadowBlur = 16;
    ctx.fillStyle = '#ffd60a';
    ctx.beginPath();
    ctx.arc(0, starY, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('★', 0, starY);

    // Altar Text
    ctx.shadowBlur = 0;
    ctx.font = '800 8px Orbitron, sans-serif';
    ctx.fillStyle = '#00f0ff';
    ctx.fillText(`SIGIL 0${b.id} CLAIMED`, 0, -42 + starBob);

    ctx.restore();
  }

  drawProjectiles(ctx) {
    for (let p of this.projectiles) {
      ctx.save();
      ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
      ctx.rotate(p.rot);

      ctx.shadowColor = p.glow || p.color;
      ctx.shadowBlur = 16;

      if (p.ptype === 'fireball') {
        // Golden fiery sunball
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Flame spurs
        ctx.fillStyle = '#ff7b00';
        for (let i = 0; i < 4; i++) {
          const ang = (Math.PI / 2) * i;
          ctx.beginPath();
          ctx.arc(Math.cos(ang) * 6, Math.sin(ang) * 6, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (p.ptype === 'spore') {
        // Bouncy glowing spore burst
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(0, 0, 7.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffb3c6';
        ctx.beginPath();
        ctx.arc(-2, -2, 2.5, 0, Math.PI * 2);
        ctx.arc(3, 2, 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.ptype === 'crystal') {
        // Sparkling diamond prism
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(0, -9);
        ctx.lineTo(8, 0);
        ctx.lineTo(0, 9);
        ctx.lineTo(-8, 0);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.6;
        ctx.stroke();
      } else if (p.ptype === 'wand') {
        // Solar wand comet
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffe3e0';
        ctx.beginPath();
        ctx.arc(1, 0, 4, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.ptype === 'boomerang') {
        // Curved razor blade
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(0, 0, 9, -1.2, 1.2, false);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#d8f3dc';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (p.ptype === 'laser') {
        // High-velocity plasma beam
        ctx.fillStyle = p.color;
        ctx.fillRect(-12, -4, 24, 8);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-8, -2, 16, 4);
      } else if (p.ptype === 'chakram') {
        // Serrated spinning golden chakram
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(0, 0, 8.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#1a1a1a';
        ctx.beginPath();
        ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.8;
        ctx.stroke();
      } else if (p.ptype === 'thunder') {
        // Jagged lightning dart
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(-9, -6);
        ctx.lineTo(-1, 0);
        ctx.lineTo(-3, 2);
        ctx.lineTo(9, 6);
        ctx.stroke();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.6;
        ctx.stroke();
      } else if (p.ptype === 'bomb') {
        // Round magma bomb
        ctx.fillStyle = '#1e1e1e';
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ff5400';
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffd60a';
        ctx.fillRect(4, -8, 4, 4);
      } else {
        // Cosmic nova starburst
        ctx.fillStyle = p.color;
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const r = i % 2 === 0 ? 10 : 4;
          const a = (Math.PI / 4) * i;
          ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
        }
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  // --- 10 Reference Monster Boss Visuals ---

  drawBosses(ctx) {
    if (!this.bosses) return;
    const camLeft = this.camera.x - 200;
    const camRight = this.camera.x + this.width / this.camera.zoom + 200;

    for (let b of this.bosses) {
      if (!b.alive) {
        if (this.claimedSigils.has(b.id)) {
          this.drawClaimedSigilAltar(ctx, b);
        }
        continue;
      }
      if (b.x + b.w < camLeft || b.x > camRight) continue;
      this.drawSingleBoss(ctx, b);
    }
  }

  drawBoss(ctx, b) {
    this.drawSingleBoss(ctx, b || this.boss);
  }

  drawSingleBoss(ctx, b) {
    if (!b || !b.alive) return;

    ctx.save();

    // 1. In-World Floating Health Bar & Title
    const barW = 64;
    const barH = 6;
    const barX = b.x + (b.w - barW) / 2;
    const barY = b.y - 20;

    // Dark Background track
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(barX, barY, barW, barH, 3);
    ctx.fill();
    ctx.stroke();

    // Health Fill Bar (Green -> Yellow -> Red)
    const hpPct = Math.max(0, Math.min(1, b.curHp / b.maxHp));
    const fillW = Math.max(2, barW * hpPct);
    const hpGrad = ctx.createLinearGradient(barX, barY, barX + barW, barY);
    if (hpPct > 0.5) {
      hpGrad.addColorStop(0, '#00f59b');
      hpGrad.addColorStop(1, '#70e000');
    } else if (hpPct > 0.25) {
      hpGrad.addColorStop(0, '#ffbe0b');
      hpGrad.addColorStop(1, '#fb8500');
    } else {
      hpGrad.addColorStop(0, '#ff0054');
      hpGrad.addColorStop(1, '#9d0208');
    }
    ctx.fillStyle = hpGrad;
    ctx.beginPath();
    ctx.roundRect(barX, barY, fillW, barH, 3);
    ctx.fill();

    // Boss Name Tag above bar
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 6;
    ctx.font = '900 9px Orbitron, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(b.name.toUpperCase(), barX + barW / 2, barY - 4);
    ctx.shadowBlur = 0;

    // 2. Render Monster Model with Hit Flash & Orientation
    ctx.translate(b.x + b.w / 2, b.y + b.h / 2);
    const dir = b.vx >= 0 ? 1 : -1;
    ctx.scale(dir, 1);

    // White hit flash when wounded
    if (b.hitFlash > 0) {
      ctx.filter = 'brightness(2.2) contrast(1.3)';
    }

    // Render signature beast model based on type
    switch (b.type) {
      case 'thornshell':
        this.drawThornshell(ctx, b);
        break;
      case 'shroomling':
        this.drawShroomling(ctx, b);
        break;
      case 'skeleton':
        this.drawSkeleton(ctx, b);
        break;
      case 'grimoire':
        this.drawGrimoire(ctx, b);
        break;
      case 'ocular':
        this.drawOcular(ctx, b);
        break;
      case 'arachnotron':
        this.drawArachnotron(ctx, b);
        break;
      case 'lurker':
        this.drawLurker(ctx, b);
        break;
      case 'wasp':
        this.drawWasp(ctx, b);
        break;
      case 'snail':
        this.drawSnail(ctx, b);
        break;
      case 'octo':
      default:
        this.drawOcto(ctx, b);
        break;
    }

    ctx.restore();
  }

  // 1. Level 1: Thornshell Cyclops (Armored horned turtle with single cyclops eye)
  drawThornshell(ctx, b) {
    const walk = Math.sin(b.phase * 3);

    // Spiked Carapace Shell
    const shellGrad = ctx.createLinearGradient(-26, -20, 26, 20);
    shellGrad.addColorStop(0, '#2d6a4f');
    shellGrad.addColorStop(1, '#1b4332');
    ctx.fillStyle = shellGrad;
    ctx.beginPath();
    ctx.ellipse(0, 0, 26, 22, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#081c15';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // 4 Bone Spikes along the shell
    ctx.fillStyle = '#f8f9fa';
    const spikeCoords = [
      [-16, -18, -20, -28],
      [-5, -22, -6, -34],
      [8, -20, 10, -31],
      [18, -12, 25, -20]
    ];
    for (let s of spikeCoords) {
      ctx.beginPath();
      ctx.moveTo(s[0] - 3, s[1]);
      ctx.lineTo(s[2], s[3]);
      ctx.lineTo(s[0] + 3, s[1]);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Reptilian Clawed Feet
    ctx.fillStyle = '#40916c';
    ctx.beginPath();
    ctx.roundRect(-18 + walk * 3, 16, 12, 12, 4);
    ctx.roundRect(8 - walk * 3, 16, 12, 12, 4);
    ctx.fill();
    ctx.stroke();

    // Claws
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(-18 + walk * 3 + 1, 26, 3, 4);
    ctx.fillRect(-18 + walk * 3 + 7, 26, 3, 4);
    ctx.fillRect(8 - walk * 3 + 1, 26, 3, 4);
    ctx.fillRect(8 - walk * 3 + 7, 26, 3, 4);

    // Head with horn
    ctx.fillStyle = '#52b788';
    ctx.beginPath();
    ctx.roundRect(14, -12, 18, 18, 6);
    ctx.fill();
    ctx.stroke();

    // Snout horn
    ctx.fillStyle = '#ffd166';
    ctx.beginPath();
    ctx.moveTo(28, -8);
    ctx.lineTo(35, -14);
    ctx.lineTo(26, -4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Giant Cyclops Eye
    ctx.fillStyle = '#ffd166';
    ctx.beginPath();
    ctx.arc(22, -3, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Slit pupil
    ctx.fillStyle = '#081c15';
    ctx.beginPath();
    ctx.ellipse(23, -3, 2, 4.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Catchlight
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(21.5, -4.5, 1.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Level 2: Spore Shroomling (Giant spotted mushroom beast with walking boots)
  drawShroomling(ctx, b) {
    const walk = Math.sin(b.phase * 3);

    // Chunky Maroon Feet
    ctx.fillStyle = '#590d22';
    ctx.strokeStyle = '#250008';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.ellipse(-12 + walk * 4, 22, 9, 6, 0, 0, Math.PI * 2);
    ctx.ellipse(12 - walk * 4, 22, 9, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Mushroom Stalk Body
    ctx.fillStyle = '#f8edeb';
    ctx.beginPath();
    ctx.roundRect(-16, -4, 32, 24, [8, 8, 4, 4]);
    ctx.fill();
    ctx.stroke();

    // Angry eyes on stalk
    ctx.fillStyle = '#03071e';
    ctx.beginPath();
    ctx.ellipse(-6, 6, 3, 4, 0, 0, Math.PI * 2);
    ctx.ellipse(8, 6, 3, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Red brows
    ctx.strokeStyle = '#9d0208';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-10, 2);
    ctx.lineTo(-2, 4);
    ctx.moveTo(12, 2);
    ctx.lineTo(4, 4);
    ctx.stroke();

    // Giant Crimson Mushroom Cap
    const capGrad = ctx.createLinearGradient(0, -32, 0, 0);
    capGrad.addColorStop(0, '#ff4d6d');
    capGrad.addColorStop(1, '#800f2f');
    ctx.fillStyle = capGrad;
    ctx.strokeStyle = '#250008';
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    ctx.ellipse(0, -12, 30, 20, 0, Math.PI, 0, false);
    ctx.lineTo(28, -6);
    ctx.quadraticCurveTo(0, 0, -28, -6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Cream-Yellow Polkadots on Cap
    ctx.fillStyle = '#ffea00';
    const spots = [[-16, -18, 5], [0, -24, 6], [16, -18, 5], [-8, -12, 4], [10, -11, 4.5]];
    for (let s of spots) {
      ctx.beginPath();
      ctx.arc(s[0], s[1], s[2], 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 3. Level 3: Crypt Skel-Knight (Floating horned skull with cyan spectral fire)
  drawSkeleton(ctx, b) {
    const floatY = Math.sin(b.phase * 2) * 4;

    // Cyan Spectral Flame Aura
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 18;

    // Horned Iron Helmet
    ctx.fillStyle = '#475569';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.arc(0, -10 + floatY, 20, Math.PI, 0, false);
    ctx.fill();
    ctx.stroke();

    // Helmet horns
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.moveTo(-16, -12 + floatY);
    ctx.quadraticCurveTo(-30, -22 + floatY, -26, -34 + floatY);
    ctx.quadraticCurveTo(-20, -20 + floatY, -10, -18 + floatY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(16, -12 + floatY);
    ctx.quadraticCurveTo(30, -22 + floatY, 26, -34 + floatY);
    ctx.quadraticCurveTo(20, -20 + floatY, 10, -18 + floatY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Bleached Skull
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.roundRect(-16, -10 + floatY, 32, 22, [4, 4, 10, 10]);
    ctx.fill();
    ctx.stroke();

    // Glowing Cyan Eye Sockets
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.ellipse(-7, -2 + floatY, 5, 6, -0.15, 0, Math.PI * 2);
    ctx.ellipse(7, -2 + floatY, 5, 6, 0.15, 0, Math.PI * 2);
    ctx.fill();

    // Burning Cyan Spirit Flame Core
    ctx.fillStyle = '#00f0ff';
    ctx.beginPath();
    ctx.arc(-7, -2 + floatY, 3, 0, Math.PI * 2);
    ctx.arc(7, -2 + floatY, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;

    // Teeth Grin
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-10, 7 + floatY, 20, 2);
    for (let tx = -8; tx <= 8; tx += 4) {
      ctx.fillRect(tx, 5 + floatY, 2, 5);
    }

    // Ribcage floating below
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(0, 14 + floatY);
    ctx.lineTo(0, 26 + floatY);
    ctx.moveTo(-10, 18 + floatY);
    ctx.lineTo(10, 18 + floatY);
    ctx.moveTo(-8, 23 + floatY);
    ctx.lineTo(8, 23 + floatY);
    ctx.stroke();
  }

  // 4. Level 4: Gloom Grimoire (Floating forbidden tome with cyclops eye and ribbon tongue)
  drawGrimoire(ctx, b) {
    const flap = Math.sin(b.phase * 4) * 0.25;

    // Dark Purple Leather Tome
    ctx.save();
    ctx.rotate(flap);

    // Book Shadow & Cover
    ctx.fillStyle = '#240046';
    ctx.strokeStyle = '#ffd60a';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.roundRect(-24, -20, 48, 40, 6);
    ctx.fill();
    ctx.stroke();

    // Gilded Corners
    ctx.fillStyle = '#ffd60a';
    ctx.fillRect(-24, -20, 8, 8);
    ctx.fillRect(16, -20, 8, 8);
    ctx.fillRect(-24, 12, 8, 8);
    ctx.fillRect(16, 12, 8, 8);

    // Gilded Parchment Pages
    ctx.fillStyle = '#ffeedb';
    ctx.fillRect(18, -16, 6, 32);

    // Giant Demonic Cyclops Eye in Center
    ctx.fillStyle = '#ff0054';
    ctx.shadowColor = '#ff0054';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(0, -2, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(0, -2, 7, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Slit pupil
    ctx.fillStyle = '#03071e';
    ctx.beginPath();
    ctx.ellipse(1, -2, 2.2, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Razor teeth inside lower book edge
    ctx.fillStyle = '#ffffff';
    for (let tx = -14; tx <= 14; tx += 6) {
      ctx.beginPath();
      ctx.moveTo(tx - 2, 14);
      ctx.lineTo(tx, 8);
      ctx.lineTo(tx + 2, 14);
      ctx.fill();
    }

    // Long Undulating Crimson Bookmark Tongue
    const tongueWave = Math.sin(Date.now() * 0.008) * 8;
    ctx.fillStyle = '#d90429';
    ctx.beginPath();
    ctx.moveTo(-4, 14);
    ctx.quadraticCurveTo(8 + tongueWave, 24, 4 + tongueWave, 34);
    ctx.lineTo(1 + tongueWave, 34);
    ctx.quadraticCurveTo(2, 24, -4, 14);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  // 5. Level 5: Ocular Stalker (Massive bloodshot eyeball crawling on 4 spider legs)
  drawOcular(ctx, b) {
    const step = Math.sin(b.phase * 4);

    // 4 Jointed Arachnid Legs
    ctx.strokeStyle = '#212529';
    ctx.lineWidth = 3.2;

    const legs = [
      [-14, 4, -28 + step * 4, -8, -32 + step * 5, 24],
      [-6, 8, -18 - step * 4, 12, -22 - step * 5, 24],
      [6, 8, 18 + step * 4, 12, 22 + step * 5, 24],
      [14, 4, 28 - step * 4, -8, 32 - step * 5, 24]
    ];
    for (let l of legs) {
      ctx.beginPath();
      ctx.moveTo(l[0], l[1]);
      ctx.lineTo(l[2], l[3]);
      ctx.lineTo(l[4], l[5]);
      ctx.stroke();
    }

    // Massive Spherical Eyeball
    const eyeGrad = ctx.createRadialGradient(4, -4, 4, 0, 0, 24);
    eyeGrad.addColorStop(0, '#ffffff');
    eyeGrad.addColorStop(0.85, '#f8f9fa');
    eyeGrad.addColorStop(1, '#e9ecef');
    ctx.fillStyle = eyeGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 22, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2.4;
    ctx.stroke();

    // Red Capillary Blood Vessels
    ctx.strokeStyle = 'rgba(217, 4, 41, 0.75)';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(-16, -10);
    ctx.lineTo(-6, -4);
    ctx.lineTo(-2, -6);
    ctx.moveTo(-14, 10);
    ctx.lineTo(-4, 6);
    ctx.moveTo(10, -14);
    ctx.lineTo(4, -8);
    ctx.stroke();

    // Huge Fiery Crimson Iris
    const irisGrad = ctx.createRadialGradient(6, 0, 2, 6, 0, 11);
    irisGrad.addColorStop(0, '#ffbe0b');
    irisGrad.addColorStop(0.5, '#ff0054');
    irisGrad.addColorStop(1, '#7209b7');
    ctx.fillStyle = irisGrad;
    ctx.beginPath();
    ctx.arc(6, 0, 11, 0, Math.PI * 2);
    ctx.fill();

    // Dilated Pupil
    ctx.fillStyle = '#03071e';
    ctx.beginPath();
    ctx.arc(7, 0, 6, 0, Math.PI * 2);
    ctx.fill();

    // Specular Highlights
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(4, -3, 2.5, 0, Math.PI * 2);
    ctx.arc(8, 2, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // Severed Optic Nerve on Top
    ctx.fillStyle = '#800f2f';
    ctx.beginPath();
    ctx.roundRect(-6, -26, 12, 7, 3);
    ctx.fill();
  }

  // 6. Level 6: Venom Arachnotron (6-eyed purple alien spider titan)
  drawArachnotron(ctx, b) {
    const walk = Math.sin(b.phase * 4);

    // 6 Scuttling Alien Legs
    ctx.strokeStyle = '#3a0ca3';
    ctx.lineWidth = 3.2;
    const aLegs = [
      [-16, -2, -32 + walk * 4, -12, -36 + walk * 5, 22],
      [-12, 4, -26 - walk * 4, 10, -28 - walk * 5, 22],
      [-8, 8, -20 + walk * 4, 14, -20 + walk * 5, 22],
      [8, 8, 20 - walk * 4, 14, 20 - walk * 5, 22],
      [12, 4, 26 + walk * 4, 10, 28 + walk * 5, 22],
      [16, -2, 32 - walk * 4, -12, 36 - walk * 5, 22]
    ];
    for (let l of aLegs) {
      ctx.beginPath();
      ctx.moveTo(l[0], l[1]);
      ctx.lineTo(l[2], l[3]);
      ctx.lineTo(l[4], l[5]);
      ctx.stroke();
    }

    // Bulbous Alien Abdomen
    const bodyGrad = ctx.createLinearGradient(0, -22, 0, 18);
    bodyGrad.addColorStop(0, '#7209b7');
    bodyGrad.addColorStop(1, '#10002b');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.ellipse(0, 0, 24, 18, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#05010a';
    ctx.lineWidth = 2.4;
    ctx.stroke();

    // Magenta Chevron Bio-Markings
    ctx.strokeStyle = '#ff007f';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-10, -8);
    ctx.lineTo(0, -2);
    ctx.lineTo(10, -8);
    ctx.moveTo(-8, 0);
    ctx.lineTo(0, 5);
    ctx.lineTo(8, 0);
    ctx.stroke();

    // 6 Glowing Acid-Green Eyes (2 rows of 3)
    ctx.fillStyle = '#39ff14';
    ctx.shadowColor = '#39ff14';
    ctx.shadowBlur = 10;
    const eyes = [
      [8, -6, 2.5], [14, -7, 2.8], [20, -5, 2.2],
      [8, 1, 2.2], [14, 0, 2.6], [19, 1, 2.0]
    ];
    for (let e of eyes) {
      ctx.beginPath();
      ctx.arc(e[0], e[1], e[2], 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.shadowBlur = 0;

    // Dripping Venom Mandibles
    ctx.fillStyle = '#4cc9f0';
    ctx.beginPath();
    ctx.moveTo(18, 5);
    ctx.lineTo(26, 12);
    ctx.lineTo(20, 15);
    ctx.closePath();
    ctx.fill();
  }

  // 7. Level 7: Dune Fang Lurker (Blue-slate fanged dinosaur cave beast)
  drawLurker(ctx, b) {
    const walk = Math.sin(b.phase * 3);

    // Powerful Quadruped Legs
    ctx.fillStyle = '#1d3557';
    ctx.strokeStyle = '#0d1b2a';
    ctx.lineWidth = 2.4;

    ctx.beginPath();
    ctx.roundRect(-22 + walk * 3, 8, 10, 16, 3);
    ctx.roundRect(10 - walk * 3, 8, 10, 16, 3);
    ctx.fill();
    ctx.stroke();

    // Blue Beast Torso
    const lurkGrad = ctx.createLinearGradient(-26, -14, 26, 14);
    lurkGrad.addColorStop(0, '#457b9d');
    lurkGrad.addColorStop(1, '#1d3557');
    ctx.fillStyle = lurkGrad;
    ctx.beginPath();
    ctx.ellipse(0, 0, 26, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Spiny Amber Ridge along spine
    ctx.fillStyle = '#e7a93b';
    const spines = [-18, -10, -2, 6, 14];
    for (let sx of spines) {
      ctx.beginPath();
      ctx.moveTo(sx - 3, -14);
      ctx.lineTo(sx, -24);
      ctx.lineTo(sx + 3, -14);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Predatory Dinosaur Maw & Fangs
    ctx.fillStyle = '#457b9d';
    ctx.beginPath();
    ctx.roundRect(16, -10, 18, 16, 4);
    ctx.fill();
    ctx.stroke();

    // Rows of razor teeth
    ctx.fillStyle = '#ffffff';
    for (let tx = 18; tx <= 30; tx += 4) {
      ctx.beginPath();
      ctx.moveTo(tx - 1, -2);
      ctx.lineTo(tx + 1, -2);
      ctx.lineTo(tx, 3);
      ctx.closePath();
      ctx.fill();
    }

    // Piercing Amber Eye
    ctx.fillStyle = '#ffd60a';
    ctx.beginPath();
    ctx.arc(20, -5, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#03071e';
    ctx.fillRect(20, -7, 1.5, 4);
  }

  // 8. Level 8: Vespoid Sky-Wasp (Armored hornet queen with buzzing wings and stinger)
  drawWasp(ctx, b) {
    const buzz = Math.sin(Date.now() * 0.05) * 14;

    // Translucent High-Speed Buzzing Wings
    ctx.fillStyle = 'rgba(175, 238, 238, 0.65)';
    ctx.strokeStyle = '#caf0f8';
    ctx.lineWidth = 1.8;

    // Upper and lower wing sets
    ctx.beginPath();
    ctx.ellipse(-6, -18 + buzz, 18, 7, -0.6, 0, Math.PI * 2);
    ctx.ellipse(8, -20 - buzz, 20, 8, -0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Armored Amber & Black Striped Abdomen
    ctx.fillStyle = '#fca311';
    ctx.beginPath();
    ctx.ellipse(-14, 4, 18, 12, 0.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#14213d';
    ctx.lineWidth = 2.4;
    ctx.stroke();

    // Hazard Stripes
    ctx.fillStyle = '#14213d';
    ctx.fillRect(-22, -4, 4, 16);
    ctx.fillRect(-14, -6, 4, 20);
    ctx.fillRect(-6, -8, 4, 22);

    // Deadly Stinger Barb with Poison Spark
    ctx.fillStyle = '#ff0054';
    ctx.shadowColor = '#ff0054';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(-30, 2);
    ctx.lineTo(-38, 6);
    ctx.lineTo(-28, 9);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    // Head & Thorax
    ctx.fillStyle = '#14213d';
    ctx.beginPath();
    ctx.roundRect(8, -10, 16, 16, 6);
    ctx.fill();
    ctx.stroke();

    // Ruby Compound Eye
    ctx.fillStyle = '#d90429';
    ctx.beginPath();
    ctx.ellipse(18, -4, 5, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(17, -5, 1.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // 9. Level 9: Magma Spiketooth Snail (Volcanic obsidian snail with eye stalks)
  drawSnail(ctx, b) {
    const footWobble = Math.sin(b.phase * 3) * 2;

    // Molten Lava Foot
    const lavaGrad = ctx.createLinearGradient(-30, 16, 30, 16);
    lavaGrad.addColorStop(0, '#d00000');
    lavaGrad.addColorStop(0.5, '#ff5400');
    lavaGrad.addColorStop(1, '#ffba08');
    ctx.fillStyle = lavaGrad;
    ctx.beginPath();
    ctx.roundRect(-28, 12 + footWobble, 56, 12, 6);
    ctx.fill();

    ctx.strokeStyle = '#370617';
    ctx.lineWidth = 2.4;
    ctx.stroke();

    // Volcanic Basalt Spiral Shell
    ctx.fillStyle = '#212529';
    ctx.beginPath();
    ctx.arc(-4, 0, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Glowing Magma Fissures on Shell
    ctx.strokeStyle = '#ff5400';
    ctx.shadowColor = '#ff5400';
    ctx.shadowBlur = 10;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(-4, 0, 14, 0.4, 4.5, false);
    ctx.arc(-4, 0, 7, 1.5, 5.8, false);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Fiery Obsidian Spikes on Shell
    ctx.fillStyle = '#370617';
    const shellSpikes = [[-18, -16, -26, -24], [-2, -22, -4, -32], [14, -14, 22, -22]];
    for (let sp of shellSpikes) {
      ctx.beginPath();
      ctx.moveTo(sp[0] - 3, sp[1]);
      ctx.lineTo(sp[2], sp[3]);
      ctx.lineTo(sp[0] + 3, sp[1]);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Two Articulated Eye Stalks
    ctx.strokeStyle = '#ff7b00';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(14, 12);
    ctx.quadraticCurveTo(22, 0, 20, -14);
    ctx.moveTo(18, 12);
    ctx.quadraticCurveTo(28, 2, 28, -12);
    ctx.stroke();

    // Eye Orbs on tips
    ctx.fillStyle = '#ffd60a';
    ctx.beginPath();
    ctx.arc(20, -14, 4.5, 0, Math.PI * 2);
    ctx.arc(28, -12, 4.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#03071e';
    ctx.beginPath();
    ctx.arc(21, -14, 2, 0, Math.PI * 2);
    ctx.arc(29, -12, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // 10. Level 10: Astral Octo-Beast (Final Boss: Eldritch crimson/purple octopus)
  drawOcto(ctx, b) {
    // Cosmic Void Distortion Halo
    ctx.shadowColor = '#7209b7';
    ctx.shadowBlur = 24;

    // 6 Undulating Writhing Tentacles
    ctx.fillStyle = '#560bad';
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 1.6;

    for (let i = 0; i < 6; i++) {
      const wave = Math.sin(b.phase * 3 + i * 0.9) * 8;
      const tx = -20 + i * 8;
      ctx.beginPath();
      ctx.moveTo(tx, 14);
      ctx.quadraticCurveTo(tx + wave, 24, tx + wave * 1.5, 34);
      ctx.lineTo(tx + 4 + wave * 1.5, 34);
      ctx.quadraticCurveTo(tx + 4 + wave, 24, tx + 4, 14);
      ctx.closePath();
      ctx.fill();

      // Glowing Cyan Suction Cups
      ctx.fillStyle = '#00f0ff';
      ctx.beginPath();
      ctx.arc(tx + wave, 24, 2, 0, Math.PI * 2);
      ctx.arc(tx + wave * 1.4, 30, 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#560bad';
    }

    // Eldritch Void Mantle Head
    const octoGrad = ctx.createRadialGradient(0, -8, 4, 0, -4, 26);
    octoGrad.addColorStop(0, '#f72585');
    octoGrad.addColorStop(0.6, '#7209b7');
    octoGrad.addColorStop(1, '#3a0ca3');
    ctx.fillStyle = octoGrad;

    ctx.beginPath();
    ctx.ellipse(0, -6, 26, 22, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#10002b';
    ctx.lineWidth = 2.6;
    ctx.stroke();

    // Constellation Star Markings on Forehead
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(-8, -14, 1.5, 0, Math.PI * 2);
    ctx.arc(0, -18, 2, 0, Math.PI * 2);
    ctx.arc(8, -14, 1.5, 0, Math.PI * 2);
    ctx.arc(-4, -10, 1.2, 0, Math.PI * 2);
    ctx.arc(4, -10, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // 4 Hypnotic Golden Eyes
    ctx.fillStyle = '#ffd60a';
    ctx.shadowColor = '#ffd60a';
    ctx.shadowBlur = 10;
    const oEyes = [-15, -6, 4, 13];
    for (let ox of oEyes) {
      ctx.beginPath();
      ctx.ellipse(ox, 2, 3.8, 5, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // Horizontal slit pupils
    ctx.fillStyle = '#10002b';
    for (let ox of oEyes) {
      ctx.beginPath();
      ctx.ellipse(ox, 2, 1.5, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // --- Mini-Map Radar & World Map Rendering ---

  drawMiniMap() {
    if (!this.minimapCanvas) return;
    const ctx = this.minimapCtx || this.minimapCanvas.getContext('2d');
    if (!this.minimapCtx) this.minimapCtx = ctx;

    const mw = this.minimapCanvas.width;
    const mh = this.minimapCanvas.height;

    // 1. Radar background
    ctx.fillStyle = 'rgba(6, 12, 28, 0.94)';
    ctx.fillRect(0, 0, mw, mh);

    // Crosshair grid
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.22)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(mw / 2, 0);
    ctx.lineTo(mw / 2, mh);
    ctx.moveTo(0, mh / 2);
    ctx.lineTo(mw, mh / 2);
    ctx.stroke();

    // Circular range ring
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
    ctx.beginPath();
    ctx.arc(mw / 2, mh / 2, 16, 0, Math.PI * 2);
    ctx.stroke();

    // Radar scan beam
    const sweep = (Date.now() * 0.09) % mw;
    const sweepGrad = ctx.createLinearGradient(sweep - 20, 0, sweep, 0);
    sweepGrad.addColorStop(0, 'rgba(0, 240, 255, 0)');
    sweepGrad.addColorStop(1, 'rgba(0, 240, 255, 0.35)');
    ctx.fillStyle = sweepGrad;
    ctx.fillRect(sweep - 20, 0, 20, mh);

    // Coordinate mapping centered around player
    const px = this.player.x;
    const range = 2200;
    const minWorldX = px - range / 2;
    const worldScale = mw / range;

    const toMapX = (wx) => (wx - minWorldX) * worldScale;
    const toMapY = (wy) => Math.max(6, Math.min(mh - 6, (wy / 580) * mh));

    // Draw platforms in range (bright neon turf line)
    for (let p of this.platforms) {
      if (p.x + p.w < minWorldX || p.x > minWorldX + range) continue;
      const mx = toMapX(p.x);
      const my = toMapY(p.y);
      const mwPlat = Math.max(4, p.w * worldScale);
      ctx.fillStyle = '#00f59b';
      ctx.fillRect(mx, my, mwPlat, 3);
    }

    // Draw Waypoints (bright cyan beacons)
    for (let wp of this.waypoints) {
      if (wp.x < minWorldX || wp.x > minWorldX + range) continue;
      const wx = toMapX(wp.x);
      const wy = toMapY(wp.y);
      const isActive = this.activeWaypoints.has(wp.id);
      ctx.fillStyle = isActive ? '#00f0ff' : '#64748b';
      ctx.shadowColor = isActive ? '#00f0ff' : 'transparent';
      ctx.shadowBlur = isActive ? 8 : 0;
      ctx.beginPath();
      ctx.arc(wx, wy, isActive ? 3.5 : 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // Draw Weapon Shrines (gold)
    for (let w of this.weaponChests) {
      if (w.x < minWorldX || w.x > minWorldX + range) continue;
      const wx = toMapX(w.x);
      const wy = toMapY(w.y);
      ctx.fillStyle = w.opened ? '#64748b' : '#ffd60a';
      ctx.shadowColor = w.opened ? 'transparent' : '#ffd60a';
      ctx.shadowBlur = w.opened ? 0 : 6;
      ctx.beginPath();
      ctx.arc(wx, wy, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // Draw Bosses (glowing danger red)
    for (let b of this.bosses) {
      if (!b.alive || b.x < minWorldX || b.x > minWorldX + range) continue;
      const bx = toMapX(b.x);
      const by = toMapY(b.y);
      ctx.fillStyle = '#ff0054';
      ctx.shadowColor = '#ff0054';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(bx, by, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // Draw Star Gate if in range
    if (21550 >= minWorldX && 21550 <= minWorldX + range) {
      const gx = toMapX(21550);
      ctx.fillStyle = this.claimedSigils.size >= 10 ? '#ffd60a' : '#7209b7';
      ctx.fillRect(gx - 2, 8, 4, mh - 16);
    }

    // Draw Player marker at radar center
    const pmx = mw / 2;
    const pmy = toMapY(this.player.y);
    const pulse = Math.sin(Date.now() * 0.012) * 2;

    // Pulse wave
    ctx.strokeStyle = 'rgba(255, 214, 10, 0.6)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(pmx, pmy, 6 + pulse, 0, Math.PI * 2);
    ctx.stroke();

    // Player core
    ctx.fillStyle = '#ffd60a';
    ctx.shadowColor = '#ffd60a';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(pmx, pmy, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Direction arrow
    const faceDir = (this.player.facing >= 0) ? 1 : -1;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(pmx + faceDir * 8, pmy);
    ctx.lineTo(pmx + faceDir * 3, pmy - 3);
    ctx.lineTo(pmx + faceDir * 3, pmy + 3);
    ctx.closePath();
    ctx.fill();

    // Biome code tag
    if (this.currentBiome) {
      ctx.fillStyle = this.currentBiome.ambientColor || '#00f0ff';
      ctx.font = '900 7.5px Orbitron, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(this.currentBiome.code, 5, 10);
    }
  }

  drawWorldMapModal() {
    if (!this.worldMapCanvas) return;
    const ctx = this.worldMapCtx || this.worldMapCanvas.getContext('2d');
    if (!this.worldMapCtx) this.worldMapCtx = ctx;

    const w = this.worldMapCanvas.width;
    const h = this.worldMapCanvas.height;

    // 1. Deep Space Void Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#060814');
    bgGrad.addColorStop(1, '#0e1329');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Subtle grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // World X span: -100 to 22,000 (total ~22,100px)
    const WORLD_START = -100;
    const WORLD_END = 22100;
    const WORLD_WIDTH = WORLD_END - WORLD_START;
    const PADDING_X = 40;
    const MAP_DRAW_W = w - PADDING_X * 2;
    const toMapX = (wx) => PADDING_X + ((wx - WORLD_START) / WORLD_WIDTH) * MAP_DRAW_W;

    // 2. Render 10 Biome Columns & Silhouettes
    const biomeY = 28;
    const biomeH = 145;

    for (let b of BIOME_ZONES) {
      const bx1 = toMapX(b.startX);
      const bx2 = toMapX(b.endX);
      const bw = bx2 - bx1;

      // Biome column atmospheric gradient
      const zoneGrad = ctx.createLinearGradient(bx1, biomeY, bx1, biomeY + biomeH);
      zoneGrad.addColorStop(0, b.skyTop || '#111827');
      zoneGrad.addColorStop(0.55, b.skyMid || '#1f2937');
      zoneGrad.addColorStop(1, b.skyBot || '#374151');
      ctx.fillStyle = zoneGrad;
      ctx.fillRect(bx1, biomeY, bw, biomeH);

      // Biome border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.strokeRect(bx1, biomeY, bw, biomeH);

      // Biome Zone Label
      ctx.fillStyle = b.ambientColor || '#00f0ff';
      ctx.font = '900 8px Orbitron, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(b.code, bx1 + bw / 2, biomeY - 12);

      ctx.fillStyle = '#e2e8f0';
      ctx.font = '700 7.5px Orbitron, sans-serif';
      ctx.fillText(b.name.split(' ')[0], bx1 + bw / 2, biomeY - 3);
    }

    // 3. Central Traversable World Pathway
    const pathY = biomeY + biomeH * 0.64;
    ctx.strokeStyle = 'rgba(255, 214, 10, 0.35)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(PADDING_X, pathY);
    ctx.lineTo(w - PADDING_X, pathY);
    ctx.stroke();

    // 4. Draw Waypoint Nodes
    for (let wp of this.waypoints) {
      const mx = toMapX(wp.x);
      const my = pathY;
      const isActive = this.activeWaypoints.has(wp.id);
      const isCur = this.lastCheckpointId === wp.id;

      // Glow ring
      if (isActive) {
        ctx.fillStyle = isCur ? 'rgba(255, 214, 10, 0.3)' : 'rgba(0, 240, 255, 0.25)';
        ctx.beginPath();
        ctx.arc(mx, my, isCur ? 11 : 8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Pin body
      ctx.fillStyle = isCur ? '#ffd60a' : (isActive ? '#00f0ff' : '#475569');
      ctx.beginPath();
      ctx.arc(mx, my, isCur ? 6 : 4.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Node label
      ctx.fillStyle = isActive ? '#ffffff' : '#94a3b8';
      ctx.font = '800 7px Orbitron, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`W${wp.id}`, mx, my + 14);
    }

    // 5. Draw Boss Monster Locations & Sigil Badges
    for (let b of this.bosses) {
      const bx = toMapX(b.x);
      const by = pathY - 32;
      const isClaimed = this.claimedSigils.has(b.id);

      ctx.save();
      ctx.fillStyle = isClaimed ? '#ffd60a' : (b.alive ? '#ff0054' : '#64748b');
      ctx.beginPath();
      ctx.arc(bx, by, 5.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 7.5px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(isClaimed ? '★' : '💀', bx, by);
      ctx.restore();
    }

    // 6. Draw Weapon Shrines
    for (let ws of this.weaponChests) {
      const wx = toMapX(ws.x);
      const wy = pathY + 28;
      const isUnlocked = this.inventory.some(inv => inv.id === ws.weapon.id);

      ctx.fillStyle = isUnlocked ? '#00f59b' : '#f59e0b';
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(ws.weapon.icon, wx, wy);
    }

    // 7. Star Gate Terminal Marker
    const gateMx = toMapX(21550);
    const gateUnlocked = this.claimedSigils.size >= 10;
    ctx.fillStyle = gateUnlocked ? '#ffd60a' : '#7209b7';
    ctx.shadowColor = gateUnlocked ? '#ffd60a' : '#7209b7';
    ctx.shadowBlur = 12;
    ctx.fillRect(gateMx - 4, biomeY + 10, 8, biomeH - 20);
    ctx.shadowBlur = 0;

    ctx.fillStyle = gateUnlocked ? '#ffd60a' : '#c084fc';
    ctx.font = '900 7px Orbitron, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('STAR GATE', gateMx, biomeY - 4);

    // 8. Player Pulsing "YOU ARE HERE" Beacon
    const playerMx = toMapX(this.player.x);
    const playerPulse = Math.sin(Date.now() * 0.008) * 3;

    ctx.save();
    ctx.shadowColor = '#ffd60a';
    ctx.shadowBlur = 14;
    ctx.fillStyle = 'rgba(255, 214, 10, 0.4)';
    ctx.beginPath();
    ctx.arc(playerMx, pathY, 12 + playerPulse, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffd60a';
    ctx.beginPath();
    ctx.arc(playerMx, pathY, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(playerMx, pathY, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Animated "YOU" tag
    const tagBob = Math.sin(Date.now() * 0.006) * 3;
    ctx.fillStyle = '#ffd60a';
    ctx.font = '900 7.5px Orbitron, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('▲ YOU', playerMx, pathY - 14 + tagBob);
    ctx.restore();

    // 9. Bottom Legend Bar
    const legendY = h - 10;
    ctx.fillStyle = '#94a3b8';
    ctx.font = '700 7.5px Orbitron, sans-serif';
    ctx.textAlign = 'left';
    const progressPct = Math.min(100, Math.max(0, Math.round((Math.max(0, this.player.x) / 21550) * 100)));
    ctx.fillText(`EXPLORATION PROGRESS: ${progressPct}%   |   BEACONS: ${this.activeWaypoints.size}/10   |   SIGILS: ${this.claimedSigils.size}/10   |   WEAPONS: ${this.inventory.length}/10`, PADDING_X, legendY);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#00f0ff';
    ctx.fillText('CLICK ANY ACTIVE BEACON IN LIST TO FAST-TRAVEL INSTANTLY', w - PADDING_X, legendY);
  }

  // --- UI & HUD Synchronization ---

  updateHUD() {
    if (this.scoreValEl) this.scoreValEl.textContent = this.score;
    if (this.coinValEl) this.coinValEl.textContent = this.coinsCollected;

    if (this.powerupMeters) {
      let metersHtml = '';
      if (this.player.starTimer > 0) {
        const pct = (this.player.starTimer / 550) * 100;
        metersHtml += `
          <div class="powerup-pill star" style="border-color: #ffd60a; background: rgba(255, 214, 10, 0.15);">
            <span class="powerup-icon">⭐</span>
            <div class="powerup-info">
              <div class="powerup-name" style="color: #ffd60a;">Super Star!</div>
              <div class="powerup-bar-bg"><div class="powerup-bar-fill" style="width: ${pct}%; background: #ffd60a;"></div></div>
            </div>
          </div>`;
      }
      if (this.player.hasShield) {
        metersHtml += `
          <div class="powerup-pill shield">
            <span class="powerup-icon">🛡️</span>
            <div class="powerup-info">
              <div class="powerup-name">Shield Active</div>
              <div class="powerup-bar-bg"><div class="powerup-bar-fill" style="width: 100%"></div></div>
            </div>
          </div>`;
      }
      if (this.player.magnetTimer > 0) {
        const pct = (this.player.magnetTimer / 500) * 100;
        metersHtml += `
          <div class="powerup-pill magnet">
            <span class="powerup-icon">🧲</span>
            <div class="powerup-info">
              <div class="powerup-name">Star Magnet</div>
              <div class="powerup-bar-bg"><div class="powerup-bar-fill" style="width: ${pct}%"></div></div>
            </div>
          </div>`;
      }
      if (this.player.boostTimer > 0) {
        const pct = (this.player.boostTimer / 400) * 100;
        metersHtml += `
          <div class="powerup-pill boost">
            <span class="powerup-icon">🚀</span>
            <div class="powerup-info">
              <div class="powerup-name">Super Boots</div>
              <div class="powerup-bar-bg"><div class="powerup-bar-fill" style="width: ${pct}%"></div></div>
            </div>
          </div>`;
      }
      this.powerupMeters.innerHTML = metersHtml;
    }
  }

  updateHeartsUI() {
    for (let i = 1; i <= 3; i++) {
      const heartEl = document.getElementById(`heart-${i}`);
      if (heartEl) {
        if (i <= this.lives) heartEl.classList.remove('lost');
        else heartEl.classList.add('lost');
      }
    }
  }

  updateBestScoreDisplay() {
    if (this.bestScoreEl) this.bestScoreEl.textContent = this.bestScore;
  }

  // --- Character Customizer Controls ---

  setupCustomizerControls() {
    this.character.initPreview('charPreviewCanvas');

    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.preset, 10);
        this.character.applyPreset(idx);
        this.syncCustomizerUI();
      });
    });

    document.querySelectorAll('.style-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.style-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.character.setProp('hatStyle', pill.dataset.style);
      });
    });

    this.bindSwatchGroup('skin-swatches', 'skin');
    this.bindSwatchGroup('hat-swatches', 'hat');
    this.bindSwatchGroup('hatfront-swatches', 'hatFront');
    this.bindSwatchGroup('hair-swatches', 'hair');
    this.bindSwatchGroup('shirt-swatches', 'shirt');
    this.bindSwatchGroup('pants-swatches', 'pants');

    this.bindColorInput('skin-custom-color', 'skin', 'skin-swatches');
    this.bindColorInput('hat-custom-color', 'hat', 'hat-swatches');
    this.bindColorInput('hatfront-custom-color', 'hatFront', 'hatfront-swatches');
    this.bindColorInput('hair-custom-color', 'hair', 'hair-swatches');
    this.bindColorInput('shirt-custom-color', 'shirt', 'shirt-swatches');
    this.bindColorInput('pants-custom-color', 'pants', 'pants-swatches');
  }

  bindSwatchGroup(groupId, prop) {
    const group = document.getElementById(groupId);
    if (!group) return;

    group.querySelectorAll('.color-swatch').forEach(swatch => {
      swatch.addEventListener('click', () => {
        group.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        this.character.setProp(prop, swatch.dataset.color);
      });
    });
  }

  bindColorInput(inputId, prop, groupId) {
    const input = document.getElementById(inputId);
    if (!input) return;

    input.addEventListener('input', (e) => {
      const color = e.target.value;
      const group = document.getElementById(groupId);
      if (group) group.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      this.character.setProp(prop, color);
    });
  }

  syncCustomizerUI() {
    const cur = this.character.current;

    document.querySelectorAll('.style-pill').forEach(pill => {
      if (pill.dataset.style === cur.hatStyle) pill.classList.add('active');
      else pill.classList.remove('active');
    });

    this.syncGroupSwatch('skin-swatches', cur.skin);
    this.syncGroupSwatch('hat-swatches', cur.hat);
    this.syncGroupSwatch('hatfront-swatches', cur.hatFront);
    this.syncGroupSwatch('hair-swatches', cur.hair);
    this.syncGroupSwatch('shirt-swatches', cur.shirt);
    this.syncGroupSwatch('pants-swatches', cur.pants);
  }

  syncGroupSwatch(groupId, colorVal) {
    const group = document.getElementById(groupId);
    if (!group) return;

    group.querySelectorAll('.color-swatch').forEach(s => {
      if (s.dataset.color && s.dataset.color.toLowerCase() === colorVal.toLowerCase()) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });
  }

  openCustomizer() {
    this.syncCustomizerUI();
    this.customizerOverlay.classList.remove('hidden');
    this.character.startPreviewLoop();
  }

  closeCustomizer() {
    this.customizerOverlay.classList.add('hidden');
    this.character.stopPreviewLoop();
    if (this.state === 'MENU') {
      this.homeOverlay.classList.remove('hidden');
    }
  }

  // --- Game Loop ---

  gameLoop(currentTime) {
    if (!this.lastTime) this.lastTime = currentTime;
    const elapsed = Math.min((currentTime - this.lastTime) / 1000, 0.1);
    this.lastTime = currentTime;

    // Fixed 60Hz physics step: guarantees stable, smooth, identical speed on 60Hz, 120Hz, 144Hz, 240Hz screens
    this.physicsAccumulator = (this.physicsAccumulator || 0) + elapsed;
    const FIXED_STEP = 1 / 60;
    let updates = 0;
    while (this.physicsAccumulator >= FIXED_STEP && updates < 5) {
      this.update(FIXED_STEP);
      this.physicsAccumulator -= FIXED_STEP;
      updates++;
    }

    this.draw();
    requestAnimationFrame((t) => this.gameLoop(t));
  }
}

// Start Game Instance on Load
window.addEventListener('DOMContentLoaded', () => {
  window.gameInstance = new Game();
});
