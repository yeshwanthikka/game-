// Star Runner — Super Mario Bros Style Level Platformer Engine
// 10 Handcrafted Themed Levels, Interactive ? Blocks & Bricks, Stompable Cartoon Enemies, Flagpoles, and Full Mario Movement Controls

const LEVEL_DATA = [
  {
    id: 1,
    title: "Emerald Meadows",
    subtitle: "WORLD 1-1",
    theme: "grass",
    skyTop: "#0f0e26", skyMid: "#23153c", skyBot: "#e58e65",
    difficulty: "★☆☆☆☆",
    flagX: 2950,
    platforms: [
      { x: -100, y: 500, w: 900 },
      { x: 920, y: 460, w: 500 },
      { x: 1540, y: 420, w: 450 },
      { x: 2100, y: 480, w: 1150 }
    ],
    blocks: [
      { x: 300, y: 350, type: "question", content: "coin" },
      { x: 340, y: 350, type: "brick" },
      { x: 380, y: 350, type: "question", content: "star" },
      { x: 420, y: 350, type: "brick" },
      { x: 460, y: 350, type: "question", content: "coin" },
      // Second cluster
      { x: 1100, y: 320, type: "question", content: "shield" },
      { x: 1140, y: 320, type: "brick" },
      { x: 1180, y: 320, type: "question", content: "boost" },
      // Pipe
      { x: 700, y: 440, type: "pipe", w: 52, h: 60 }
    ],
    hiddenWeapon: {
      x: 1140, y: 276,
      weapon: { id: "solar", name: "Solar Blaster", icon: "☀️", dmg: 20, speed: 9.0, color: "#ffd60a", glow: "#ff9e00", ptype: "fireball" }
    },
    boss: {
      name: "Thornshell Cyclops",
      title: "GROVE BEHEMOTH",
      type: "thornshell",
      x: 2450, y: 416, origY: 416,
      w: 64, h: 64,
      minX: 2200, maxX: 2820,
      vx: 1.4,
      hp: 100,
      color: "#2d6a4f"
    },
    enemies: [
      { x: 480, y: 468, type: "slime", minX: 200, maxX: 680, vx: -1.2 },
      { x: 1200, y: 428, type: "slime", minX: 1000, maxX: 1400, vx: 1.2 },
      { x: 1750, y: 388, type: "slime", minX: 1600, maxX: 1950, vx: -1.4 }
    ],
    coins: [
      { x: 220, y: 450 }, { x: 250, y: 450 }, { x: 280, y: 450 },
      { x: 620, y: 390 }, { x: 650, y: 370 }, { x: 680, y: 390 },
      { x: 1650, y: 360 }, { x: 1700, y: 340 }, { x: 1750, y: 360 }
    ]
  },
  {
    id: 2,
    title: "Mushroom Heights",
    subtitle: "WORLD 1-2",
    theme: "mushroom",
    skyTop: "#120c29", skyMid: "#3d1b54", skyBot: "#f59e6c",
    difficulty: "★☆☆☆☆",
    flagX: 3250,
    platforms: [
      { x: -100, y: 500, w: 750 },
      { x: 760, y: 440, w: 420 },
      { x: 1280, y: 370, w: 450 },
      { x: 1830, y: 430, w: 380 },
      { x: 2310, y: 490, w: 1200 }
    ],
    blocks: [
      { x: 280, y: 360, type: "brick" },
      { x: 320, y: 360, type: "question", content: "magnet" },
      { x: 360, y: 360, type: "brick" },
      { x: 880, y: 310, type: "question", content: "coin" },
      { x: 920, y: 310, type: "question", content: "boost" },
      { x: 1400, y: 240, type: "brick" },
      { x: 1440, y: 240, type: "question", content: "shield" }
    ],
    hiddenWeapon: {
      x: 1420, y: 196,
      weapon: { id: "spore", name: "Spore Cannon", icon: "🍄", dmg: 22, speed: 8.5, color: "#ff4d6d", glow: "#c9184a", ptype: "spore" }
    },
    boss: {
      name: "Spore Shroomling",
      title: "MYCELIUM LORD",
      type: "shroomling",
      x: 2650, y: 426, origY: 426,
      w: 64, h: 64,
      minX: 2400, maxX: 3100,
      vx: -1.5,
      hp: 120,
      color: "#a01a56"
    },
    enemies: [
      { x: 450, y: 468, type: "slime", minX: 200, maxX: 650, vx: -1.4 },
      { x: 980, y: 408, type: "slime", minX: 800, maxX: 1150, vx: 1.3 },
      { x: 1500, y: 280, type: "drone", minX: 1350, maxX: 1650, vx: 1.6, origY: 280 }
    ],
    coins: [
      { x: 820, y: 390 }, { x: 850, y: 390 },
      { x: 1350, y: 320 }, { x: 1390, y: 300 }, { x: 1430, y: 320 }
    ]
  },
  {
    id: 3,
    title: "Crystal Caverns",
    subtitle: "WORLD 2-1",
    theme: "crystal",
    skyTop: "#080b18", skyMid: "#111d3d", skyBot: "#00f0ff",
    difficulty: "★★☆☆☆",
    flagX: 3450,
    platforms: [
      { x: -100, y: 500, w: 700 },
      { x: 700, y: 460, w: 460 },
      { x: 1260, y: 480, w: 500 },
      { x: 1860, y: 420, w: 400 },
      { x: 2360, y: 490, w: 1300 }
    ],
    blocks: [
      { x: 300, y: 360, type: "question", content: "coin" },
      { x: 340, y: 360, type: "brick" },
      { x: 380, y: 360, type: "question", content: "shield" },
      { x: 850, y: 330, type: "pipe", w: 52, h: 70 },
      { x: 1450, y: 340, type: "question", content: "magnet" }
    ],
    hiddenWeapon: {
      x: 1450, y: 296,
      weapon: { id: "crystal", name: "Crystal Darts", icon: "💎", dmg: 25, speed: 9.5, color: "#00f0ff", glow: "#0077b6", ptype: "crystal" }
    },
    boss: {
      name: "Crypt Skel-Knight",
      title: "SPECTRAL OVERLORD",
      type: "skeleton",
      x: 2750, y: 390, origY: 390,
      w: 64, h: 64,
      minX: 2450, maxX: 3300,
      vx: 1.6,
      hp: 140,
      color: "#e2e8f0"
    },
    enemies: [
      { x: 400, y: 468, type: "spiky", minX: 250, maxX: 600, vx: 1.0 },
      { x: 950, y: 428, type: "slime", minX: 850, maxX: 1100, vx: -1.4 },
      { x: 1550, y: 448, type: "spiky", minX: 1350, maxX: 1700, vx: -1.2 },
      { x: 2000, y: 388, type: "slime", minX: 1900, maxX: 2200, vx: 1.5 }
    ],
    coins: [
      { x: 500, y: 450 }, { x: 540, y: 450 },
      { x: 1050, y: 400 }, { x: 1090, y: 400 },
      { x: 1950, y: 360 }, { x: 1990, y: 360 }
    ]
  },
  {
    id: 4,
    title: "Sunset Bridges",
    subtitle: "WORLD 2-2",
    theme: "grass",
    skyTop: "#1c0d2b", skyMid: "#5a1f49", skyBot: "#fca371",
    difficulty: "★★☆☆☆",
    flagX: 3550,
    platforms: [
      { x: -100, y: 500, w: 650 },
      { x: 670, y: 440, w: 320 },
      { x: 1100, y: 460, w: 260, type: "moving", moveSpeed: 0.02, moveRange: 45 },
      { x: 1480, y: 410, w: 420 },
      { x: 2020, y: 450, w: 280, type: "moving", moveSpeed: 0.025, moveRange: 50 },
      { x: 2420, y: 490, w: 1350 }
    ],
    blocks: [
      { x: 250, y: 360, type: "question", content: "coin" },
      { x: 290, y: 360, type: "brick" },
      { x: 330, y: 360, type: "question", content: "boost" },
      { x: 1600, y: 280, type: "question", content: "shield" }
    ],
    hiddenWeapon: {
      x: 1600, y: 236,
      weapon: { id: "sunfire", name: "Sunfire Wand", icon: "🔥", dmg: 26, speed: 9.0, color: "#ff7b00", glow: "#ff0054", ptype: "wand" }
    },
    boss: {
      name: "Gloom Grimoire",
      title: "FORBIDDEN ARCHIVE",
      type: "grimoire",
      x: 2850, y: 390, origY: 390,
      w: 64, h: 64,
      minX: 2550, maxX: 3400,
      vx: -1.6,
      hp: 160,
      color: "#6b21a8"
    },
    enemies: [
      { x: 420, y: 468, type: "slime", minX: 200, maxX: 580, vx: -1.5 },
      { x: 1620, y: 378, type: "drone", minX: 1520, maxX: 1820, vx: 1.8, origY: 330 }
    ],
    coins: [
      { x: 740, y: 380 }, { x: 780, y: 380 },
      { x: 1180, y: 390 }, { x: 1220, y: 390 }
    ]
  },
  {
    id: 5,
    title: "Tree-Top Canopy",
    subtitle: "WORLD 3-1",
    theme: "grass",
    skyTop: "#0d1b2a", skyMid: "#1b4332", skyBot: "#74c69d",
    difficulty: "★★★☆☆",
    flagX: 3800,
    platforms: [
      { x: -100, y: 500, w: 600 },
      { x: 620, y: 410, w: 400 },
      { x: 1120, y: 340, w: 450 },
      { x: 1670, y: 400, w: 380 },
      { x: 2150, y: 460, w: 400 },
      { x: 2650, y: 500, w: 1400 }
    ],
    blocks: [
      { x: 200, y: 350, type: "question", content: "shield" },
      { x: 750, y: 280, type: "question", content: "coin" },
      { x: 790, y: 280, type: "brick" },
      { x: 830, y: 280, type: "question", content: "boost" },
      { x: 1280, y: 210, type: "question", content: "coin" }
    ],
    hiddenWeapon: {
      x: 1280, y: 166,
      weapon: { id: "boomerang", name: "Thorn Boomerang", icon: "🪃", dmg: 28, speed: 9.5, color: "#52b788", glow: "#1b4332", ptype: "boomerang" }
    },
    boss: {
      name: "Ocular Stalker",
      title: "WATCHER IN THE DARK",
      type: "ocular",
      x: 3100, y: 436, origY: 436,
      w: 64, h: 64,
      minX: 2750, maxX: 3650,
      vx: 1.7,
      hp: 180,
      color: "#ef233c"
    },
    enemies: [
      { x: 380, y: 468, type: "slime", minX: 180, maxX: 550, vx: -1.6 },
      { x: 800, y: 378, type: "slime", minX: 680, maxX: 950, vx: 1.5 },
      { x: 1300, y: 308, type: "drone", minX: 1180, maxX: 1500, vx: 1.9, origY: 270 }
    ],
    coins: [
      { x: 700, y: 350 }, { x: 740, y: 350 },
      { x: 1250, y: 280 }, { x: 1290, y: 280 }
    ]
  },
  {
    id: 6,
    title: "Neon Cyberzone",
    subtitle: "WORLD 3-2",
    theme: "crystal",
    skyTop: "#070817", skyMid: "#1a0b38", skyBot: "#ff007f",
    difficulty: "★★★☆☆",
    flagX: 3900,
    platforms: [
      { x: -100, y: 500, w: 600 },
      { x: 620, y: 450, w: 320, type: "moving", moveSpeed: 0.03, moveRange: 55 },
      { x: 1060, y: 400, w: 440 },
      { x: 1620, y: 430, w: 350, type: "moving", moveSpeed: 0.035, moveRange: 60 },
      { x: 2090, y: 420, w: 420 },
      { x: 2630, y: 490, w: 1450 }
    ],
    blocks: [
      { x: 250, y: 360, type: "question", content: "magnet" },
      { x: 1200, y: 280, type: "question", content: "boost" },
      { x: 1240, y: 280, type: "brick" },
      { x: 1280, y: 280, type: "question", content: "shield" }
    ],
    hiddenWeapon: {
      x: 1240, y: 236,
      weapon: { id: "plasma", name: "Plasma Laser", icon: "⚡", dmg: 30, speed: 11.0, color: "#c77dff", glow: "#7209b7", ptype: "laser" }
    },
    boss: {
      name: "Venom Arachnotron",
      title: "HEXA-EYED PREDATOR",
      type: "arachnotron",
      x: 3150, y: 426, origY: 426,
      w: 64, h: 64,
      minX: 2750, maxX: 3750,
      vx: -1.8,
      hp: 200,
      color: "#4a044e"
    },
    enemies: [
      { x: 400, y: 468, type: "spiky", minX: 200, maxX: 550, vx: 1.4 },
      { x: 1250, y: 368, type: "slime", minX: 1120, maxX: 1450, vx: -1.7 },
      { x: 2200, y: 388, type: "drone", minX: 2120, maxX: 2450, vx: 2.1, origY: 350 }
    ],
    coins: [
      { x: 300, y: 440 }, { x: 340, y: 440 },
      { x: 1150, y: 340 }, { x: 1190, y: 340 }
    ]
  },
  {
    id: 7,
    title: "Desert Ruins",
    subtitle: "WORLD 4-1",
    theme: "mushroom",
    skyTop: "#1c1106", skyMid: "#42280d", skyBot: "#e7a93b",
    difficulty: "★★★★☆",
    flagX: 4100,
    platforms: [
      { x: -100, y: 500, w: 550 },
      { x: 570, y: 440, w: 360 },
      { x: 1040, y: 470, w: 480 },
      { x: 1640, y: 390, w: 420 },
      { x: 2180, y: 430, w: 450 },
      { x: 2750, y: 490, w: 1550 }
    ],
    blocks: [
      { x: 200, y: 360, type: "question", content: "shield" },
      { x: 700, y: 310, type: "brick" },
      { x: 740, y: 310, type: "question", content: "coin" },
      { x: 780, y: 310, type: "brick" },
      { x: 1750, y: 260, type: "question", content: "boost" }
    ],
    hiddenWeapon: {
      x: 1750, y: 216,
      weapon: { id: "chakram", name: "Sand Chakram", icon: "💿", dmg: 32, speed: 9.5, color: "#e7a93b", glow: "#bc6c25", ptype: "chakram" }
    },
    boss: {
      name: "Dune Fang Lurker",
      title: "ABYSSAL REPTILIAN",
      type: "lurker",
      x: 3300, y: 426, origY: 426,
      w: 64, h: 64,
      minX: 2880, maxX: 3950,
      vx: 1.8,
      hp: 220,
      color: "#1d3557"
    },
    enemies: [
      { x: 350, y: 468, type: "spiky", minX: 150, maxX: 500, vx: -1.4 },
      { x: 1200, y: 438, type: "spiky", minX: 1080, maxX: 1450, vx: 1.5 },
      { x: 1800, y: 358, type: "slime", minX: 1680, maxX: 2000, vx: -1.8 },
      { x: 2350, y: 398, type: "drone", minX: 2220, maxX: 2550, vx: 2.2, origY: 360 }
    ],
    coins: [
      { x: 620, y: 380 }, { x: 660, y: 380 },
      { x: 1100, y: 410 }, { x: 1140, y: 410 }
    ]
  },
  {
    id: 8,
    title: "Sky Kingdom",
    subtitle: "WORLD 4-2",
    theme: "grass",
    skyTop: "#081c30", skyMid: "#19456b", skyBot: "#a8dadc",
    difficulty: "★★★★☆",
    flagX: 4300,
    platforms: [
      { x: -100, y: 500, w: 500 },
      { x: 520, y: 430, w: 320 },
      { x: 960, y: 380, w: 340, type: "moving", moveSpeed: 0.035, moveRange: 55 },
      { x: 1420, y: 440, w: 400 },
      { x: 1940, y: 370, w: 360, type: "moving", moveSpeed: 0.04, moveRange: 65 },
      { x: 2420, y: 430, w: 400 },
      { x: 2940, y: 490, w: 1550 }
    ],
    blocks: [
      { x: 150, y: 360, type: "question", content: "boost" },
      { x: 620, y: 300, type: "question", content: "shield" },
      { x: 1520, y: 320, type: "question", content: "magnet" }
    ],
    hiddenWeapon: {
      x: 1520, y: 276,
      weapon: { id: "thunder", name: "Thunderbolt Rod", icon: "⚡", dmg: 35, speed: 10.5, color: "#48cae4", glow: "#0096c7", ptype: "thunder" }
    },
    boss: {
      name: "Vespoid Sky-Wasp",
      title: "HORNET QUEEN",
      type: "wasp",
      x: 3450, y: 370, origY: 370,
      w: 64, h: 64,
      minX: 3050, maxX: 4150,
      vx: 1.9,
      hp: 240,
      color: "#fca311"
    },
    enemies: [
      { x: 300, y: 468, type: "slime", minX: 100, maxX: 450, vx: 1.7 },
      { x: 1550, y: 408, type: "drone", minX: 1450, maxX: 1780, vx: 2.3, origY: 370 },
      { x: 2550, y: 398, type: "spiky", minX: 2450, maxX: 2780, vx: -1.6 }
    ],
    coins: [
      { x: 570, y: 370 }, { x: 610, y: 370 },
      { x: 1020, y: 310 }, { x: 1060, y: 310 }
    ]
  },
  {
    id: 9,
    title: "Molten Magma Peaks",
    subtitle: "WORLD 5-1",
    theme: "crystal",
    skyTop: "#1c0404", skyMid: "#450808", skyBot: "#ff5400",
    difficulty: "★★★★★",
    flagX: 4750,
    platforms: [
      { x: -100, y: 500, w: 480 },
      { x: 490, y: 430, w: 320 },
      { x: 920, y: 470, w: 360 },
      { x: 1390, y: 410, w: 380 },
      { x: 1880, y: 440, w: 340, type: "moving", moveSpeed: 0.045, moveRange: 60 },
      { x: 2340, y: 390, w: 420 },
      { x: 2880, y: 450, w: 380 },
      { x: 3380, y: 500, w: 1600 }
    ],
    blocks: [
      { x: 180, y: 350, type: "question", content: "shield" },
      { x: 600, y: 300, type: "brick" },
      { x: 640, y: 300, type: "question", content: "boost" },
      { x: 1500, y: 280, type: "question", content: "shield" }
    ],
    hiddenWeapon: {
      x: 2340, y: 340,
      weapon: { id: "bomb", name: "Magma Bomb", icon: "💣", dmg: 38, speed: 8.5, color: "#ff5400", glow: "#9d0208", ptype: "bomb" }
    },
    boss: {
      name: "Magma Spiketooth Snail",
      title: "CALDERA JUGGERNAUT",
      type: "snail",
      x: 3850, y: 436, origY: 436,
      w: 64, h: 64,
      minX: 3500, maxX: 4600,
      vx: -1.5,
      hp: 260,
      color: "#d00000"
    },
    enemies: [
      { x: 250, y: 468, type: "spiky", minX: 100, maxX: 430, vx: -1.8 },
      { x: 1050, y: 438, type: "spiky", minX: 950, maxX: 1250, vx: 1.8 },
      { x: 1520, y: 378, type: "drone", minX: 1420, maxX: 1720, vx: 2.4, origY: 340 },
      { x: 2500, y: 358, type: "slime", minX: 2380, maxX: 2720, vx: -2.0 }
    ],
    coins: [
      { x: 550, y: 370 }, { x: 590, y: 370 },
      { x: 1450, y: 350 }, { x: 1490, y: 350 }
    ]
  },
  {
    id: 10,
    title: "Cosmic Star Citadel",
    subtitle: "WORLD 5-2 (FINAL)",
    theme: "crystal",
    skyTop: "#050614", skyMid: "#190833", skyBot: "#ffd60a",
    difficulty: "★★★★★",
    flagX: 5600,
    platforms: [
      { x: -100, y: 500, w: 450 },
      { x: 470, y: 430, w: 340 },
      { x: 920, y: 380, w: 360, type: "moving", moveSpeed: 0.045, moveRange: 60 },
      { x: 1390, y: 450, w: 420 },
      { x: 1920, y: 390, w: 380, type: "moving", moveSpeed: 0.05, moveRange: 65 },
      { x: 2410, y: 440, w: 450 },
      { x: 2970, y: 380, w: 420 },
      { x: 3500, y: 440, w: 450 },
      { x: 4070, y: 500, w: 1800 }
    ],
    blocks: [
      { x: 150, y: 360, type: "question", content: "shield" },
      { x: 600, y: 300, type: "question", content: "boost" },
      { x: 1520, y: 320, type: "question", content: "magnet" },
      { x: 2550, y: 310, type: "question", content: "shield" },
      { x: 3650, y: 310, type: "question", content: "boost" }
    ],
    hiddenWeapon: {
      x: 2550, y: 266,
      weapon: { id: "nova", name: "Cosmic Nova", icon: "🌌", dmg: 42, speed: 11.5, color: "#f72585", glow: "#7209b7", ptype: "nova" }
    },
    boss: {
      name: "Astral Octo-Beast",
      title: "ELDRITCH VOID TITAN",
      type: "octo",
      x: 4650, y: 436, origY: 436,
      w: 68, h: 68,
      minX: 4200, maxX: 5450,
      vx: 2.0,
      hp: 300,
      color: "#7209b7"
    },
    enemies: [
      { x: 250, y: 468, type: "spiky", minX: 100, maxX: 400, vx: 2.0 },
      { x: 1500, y: 418, type: "drone", minX: 1420, maxX: 1760, vx: 2.6, origY: 380 },
      { x: 2550, y: 408, type: "spiky", minX: 2440, maxX: 2820, vx: -2.0 },
      { x: 3100, y: 348, type: "drone", minX: 3000, maxX: 3350, vx: 2.8, origY: 310 },
      { x: 3650, y: 408, type: "slime", minX: 3530, maxX: 3900, vx: -2.2 }
    ],
    coins: [
      { x: 530, y: 370 }, { x: 570, y: 370 },
      { x: 1450, y: 390 }, { x: 1490, y: 390 },
      { x: 2500, y: 380 }, { x: 2540, y: 380 }
    ]
  }
];

class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    // States: 'MENU', 'PLAYING', 'PAUSED', 'GAMEOVER', 'LEVELCLEAR', 'LEVELSELECT'
    this.state = 'MENU';

    // Levels & Progression
    this.currentLevelIndex = 0; // 0 to 9
    this.maxUnlockedLevel = 1;  // 1 to 10
    try {
      const savedUnlocked = localStorage.getItem('sr_unlocked_level');
      if (savedUnlocked) this.maxUnlockedLevel = Math.max(1, Math.min(10, parseInt(savedUnlocked, 10)));
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

    // Viewport & Camera
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.camera = { x: 0, y: 0, zoom: 1.35 };

    // Player State (Super Mario platformer controls)
    this.player = {
      x: 80,
      y: 350,
      w: 48,
      h: 64,
      vx: 0,
      vy: 0,
      accel: 0.46,
      friction: 0.83,
      maxSpeed: 4.6,
      gravity: 0.58,
      jumpForce: -12.5,
      doubleJumpForce: -11.0,
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

    // Weapons & Boss Combat
    this.projectiles = [];
    this.boss = null;
    this.weaponChest = null;
    this.shootCooldown = 0;
    this.lastGateWarning = 0;

    // Game stats
    this.lives = 3;
    this.maxLives = 3;
    this.score = 0;
    this.coinsCollected = 0;

    // Level Entities
    this.platforms = [];
    this.blocks = [];
    this.enemies = [];
    this.coins = [];
    this.powerups = [];
    this.bouncingCoins = [];
    this.scorePopups = [];
    this.hazards = [];
    this.flag = { x: 0, y: 0, reached: false };

    // Background Elements
    this.stars = [];
    this.clouds = [];
    this.fireflies = [];
    this.initBackgroundElements();

    // DOM Elements
    this.hudElement = document.getElementById('hud');
    this.scoreValEl = document.getElementById('hud-score');
    this.coinValEl = document.getElementById('hud-coins');
    this.levelValEl = document.getElementById('hud-level');
    this.bestScoreEl = document.getElementById('home-best-score');
    this.homeOverlay = document.getElementById('home-overlay');
    this.pauseOverlay = document.getElementById('pause-overlay');
    this.gameoverOverlay = document.getElementById('gameover-overlay');
    this.customizerOverlay = document.getElementById('customizer-overlay');
    this.levelsOverlay = document.getElementById('levels-overlay');
    this.levelClearOverlay = document.getElementById('levelclear-overlay');
    this.powerupMeters = document.getElementById('powerup-meters');

    // Weapon & Boss HUD Elements
    this.weaponCapsuleEl = document.getElementById('hud-weapon-capsule');
    this.weaponIconEl = document.getElementById('hud-weapon-icon');
    this.weaponNameEl = document.getElementById('hud-weapon-name');
    this.weaponDmgEl = document.getElementById('hud-weapon-dmg');
    this.bossHudBarEl = document.getElementById('boss-hud-bar');
    this.bossHudNameEl = document.getElementById('boss-hud-name');
    this.bossBarFillEl = document.getElementById('boss-bar-fill');
    this.bossHpValEl = document.getElementById('boss-hp-val');
    this.bossLvlTagEl = document.getElementById('boss-lvl-tag');

    // Setup Event Listeners & Resize
    this.setupEventListeners();
    this.resizeCanvas();
    this.loadLevel(this.currentLevelIndex);

    // Start Engine Loop
    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.gameLoop(t));

    // Update UI initial values
    this.updateBestScoreDisplay();
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

  // --- Level Loading & Setup ---

  loadLevel(levelIndex) {
    this.currentLevelIndex = Math.max(0, Math.min(LEVEL_DATA.length - 1, levelIndex));
    const lvl = LEVEL_DATA[this.currentLevelIndex];

    // Reset Player position & state
    this.player.x = 80;
    this.player.y = 380;
    this.player.vx = 0;
    this.player.vy = 0;
    this.player.facing = 1;
    this.player.isGrounded = false;
    this.player.jumpsLeft = 2;
    this.player.coyoteTimer = 0;
    this.player.jumpBufferTimer = 0;
    this.player.invulnerableTimer = 0;
    this.player.boostTimer = 0;
    this.player.magnetTimer = 0;
    this.player.starTimer = 0;
    this.player.hasShield = false;
    this.player.frame = 0;
    this.player.currentWeapon = null;

    this.camera.x = 0;
    this.camera.y = 0;
    this.particles.reset();
    this.bouncingCoins = [];
    this.scorePopups = [];
    this.projectiles = [];
    this.shootCooldown = 0;

    // Platforms
    this.platforms = lvl.platforms.map(p => ({
      ...p,
      h: 400,
      origY: p.y,
      movePhase: 0
    }));

    // Interactive Blocks (? blocks, bricks, pipes)
    this.blocks = (lvl.blocks || []).map(b => ({
      ...b,
      w: b.w || 38,
      h: b.h || 38,
      bumpY: 0,
      empty: false
    }));

    // Hidden Weapon Chest
    if (lvl.hiddenWeapon) {
      this.weaponChest = {
        ...lvl.hiddenWeapon,
        w: 38,
        h: 34,
        opened: false,
        sparklePhase: 0
      };
    } else {
      this.weaponChest = null;
    }

    // Boss Monster
    if (lvl.boss) {
      this.boss = {
        ...lvl.boss,
        curHp: lvl.boss.hp,
        maxHp: lvl.boss.hp,
        alive: true,
        hitFlash: 0,
        phase: 0
      };
    } else {
      this.boss = null;
    }

    // Enemies (Slimes, Flying Drones, Spikies)
    this.enemies = (lvl.enemies || []).map(e => ({
      ...e,
      w: 36,
      h: 32,
      origVx: e.vx || 1.4,
      alive: true,
      squashed: false,
      squashTimer: 0,
      phase: 0
    }));

    // Coins
    this.coins = (lvl.coins || []).map(c => ({
      ...c,
      r: 10,
      collected: false
    }));

    // Powerups spawned in world or from blocks
    this.powerups = [];

    // Victory Flagpole
    this.flag = {
      x: lvl.flagX,
      y: 180,
      w: 12,
      h: 320,
      reached: false,
      flagSlideY: 0
    };

    // Update UI labels & HUD
    if (this.levelValEl) this.levelValEl.textContent = `${this.currentLevelIndex + 1}`;
    this.updateHUD();
    this.updateHeartsUI();
    this.updateWeaponHUD();
    this.updateBossHUD();
  }

  startLevel(index) {
    this.loadLevel(index);
    this.state = 'PLAYING';
    this.homeOverlay.classList.add('hidden');
    this.pauseOverlay.classList.add('hidden');
    this.gameoverOverlay.classList.add('hidden');
    this.customizerOverlay.classList.add('hidden');
    this.levelsOverlay.classList.add('hidden');
    this.levelClearOverlay.classList.add('hidden');
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
      } else if (e.code === 'Escape' || e.code === 'KeyP') {
        e.preventDefault();
        this.togglePause();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        this.keys.left = false;
      } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        this.keys.right = false;
      } else if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        this.keys.jump = false;
        // Mario variable jump: releasing early cuts vertical velocity
        if (this.player.vy < -3.5) {
          this.player.vy *= 0.55;
        }
      }
    });

    // Mobile Virtual D-Pad & Attack buttons
    const leftBtn = document.getElementById('mobile-left-btn');
    const rightBtn = document.getElementById('mobile-right-btn');
    const jumpBtn = document.getElementById('mobile-jump-btn');
    const attackBtn = document.getElementById('mobile-attack-btn');

    if (leftBtn) {
      leftBtn.addEventListener('pointerdown', (e) => { e.preventDefault(); this.keys.left = true; });
      leftBtn.addEventListener('pointerup', (e) => { e.preventDefault(); this.keys.left = false; });
      leftBtn.addEventListener('pointerleave', (e) => { this.keys.left = false; });
    }
    if (rightBtn) {
      rightBtn.addEventListener('pointerdown', (e) => { e.preventDefault(); this.keys.right = true; });
      rightBtn.addEventListener('pointerup', (e) => { e.preventDefault(); this.keys.right = false; });
      rightBtn.addEventListener('pointerleave', (e) => { this.keys.right = false; });
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
    }
    if (attackBtn) {
      attackBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.shootWeapon();
      });
    }

    // UI Buttons
    document.getElementById('home-play-btn')?.addEventListener('click', () => {
      this.sound.playClick();
      this.startLevel(this.currentLevelIndex);
    });

    document.getElementById('home-levels-btn')?.addEventListener('click', () => {
      this.sound.playClick();
      this.openLevelSelect();
    });

    document.getElementById('hud-levels-btn')?.addEventListener('click', () => {
      this.sound.playClick();
      this.openLevelSelect();
    });

    document.getElementById('levels-back-btn')?.addEventListener('click', () => {
      this.sound.playClick();
      this.closeLevelSelect();
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

    // Level Clear Overlay Buttons
    document.getElementById('lc-next-btn')?.addEventListener('click', () => {
      this.sound.playClick();
      if (this.currentLevelIndex + 1 < LEVEL_DATA.length) {
        this.startLevel(this.currentLevelIndex + 1);
      } else {
        this.startLevel(0); // Finished game, loop back
      }
    });

    document.getElementById('lc-levels-btn')?.addEventListener('click', () => {
      this.sound.playClick();
      this.levelClearOverlay.classList.add('hidden');
      this.openLevelSelect();
    });

    document.getElementById('lc-menu-btn')?.addEventListener('click', () => {
      this.sound.playClick();
      this.showMenu();
    });

    // Game Over Buttons
    document.getElementById('btn-retry')?.addEventListener('click', () => {
      this.sound.playClick();
      this.lives = this.maxLives;
      this.startLevel(this.currentLevelIndex);
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
      this.startLevel(this.currentLevelIndex);
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

  killBoss() {
    if (!this.boss || !this.boss.alive) return;
    this.boss.alive = false;
    this.boss.curHp = 0;
    this.sound.playBossDefeat();
    this.particles.createBossExplosion(this.boss.x + this.boss.w / 2, this.boss.y + this.boss.h / 2);
    this.score += 1000;
    this.addScorePopup(this.boss.x + this.boss.w / 2, this.boss.y - 25, '🏆 BOSS DEFEATED! +1000', '#ffd60a');
    this.updateBossHUD();
  }

  updateWeaponHUD() {
    if (!this.weaponCapsuleEl) return;
    const wpn = this.player.currentWeapon;
    if (wpn) {
      this.weaponCapsuleEl.classList.remove('locked');
      this.weaponCapsuleEl.classList.add('armed');
      if (this.weaponIconEl) this.weaponIconEl.textContent = wpn.icon;
      if (this.weaponNameEl) this.weaponNameEl.textContent = wpn.name;
      if (this.weaponDmgEl) this.weaponDmgEl.textContent = `${wpn.dmg} DMG`;
    } else {
      this.weaponCapsuleEl.classList.add('locked');
      this.weaponCapsuleEl.classList.remove('armed');
      if (this.weaponIconEl) this.weaponIconEl.textContent = '🔒';
      if (this.weaponNameEl) this.weaponNameEl.textContent = 'NONE';
      if (this.weaponDmgEl) this.weaponDmgEl.textContent = 'FIND CHEST';
    }
  }

  updateBossHUD() {
    if (!this.bossHudBarEl) return;
    if (!this.boss) {
      this.bossHudBarEl.classList.add('hidden');
      return;
    }

    const distToBoss = Math.abs(this.player.x - this.boss.x);
    if (distToBoss < 950 || this.boss.curHp < this.boss.maxHp) {
      this.bossHudBarEl.classList.remove('hidden');
    }

    if (this.bossHudNameEl) this.bossHudNameEl.textContent = `👑 ${this.boss.name.toUpperCase()}`;
    if (this.bossLvlTagEl) this.bossLvlTagEl.textContent = `LVL ${this.currentLevelIndex + 1} BOSS`;

    const pct = Math.max(0, Math.min(100, (this.boss.curHp / this.boss.maxHp) * 100));
    if (this.bossBarFillEl) this.bossBarFillEl.style.width = `${pct}%`;
    if (this.bossHpValEl) {
      if (this.boss.alive) {
        this.bossHpValEl.textContent = `${this.boss.curHp} / ${this.boss.maxHp} HP`;
      } else {
        this.bossHpValEl.textContent = `💀 DEFEATED!`;
      }
    }
  }

  resizeCanvas() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  // --- State Transitions ---

  showMenu() {
    this.state = 'MENU';
    this.homeOverlay.classList.remove('hidden');
    this.pauseOverlay.classList.add('hidden');
    this.gameoverOverlay.classList.add('hidden');
    this.customizerOverlay.classList.add('hidden');
    this.levelsOverlay.classList.add('hidden');
    this.levelClearOverlay.classList.add('hidden');
    this.updateBestScoreDisplay();
  }

  togglePause() {
    if (this.state === 'PLAYING') {
      this.state = 'PAUSED';
      this.pauseOverlay.classList.remove('hidden');
    } else if (this.state === 'PAUSED') {
      this.state = 'PLAYING';
      this.pauseOverlay.classList.add('hidden');
      this.lastTime = performance.now();
    }
  }

  openLevelSelect() {
    this.state = 'LEVELSELECT';
    this.renderLevelGrid();
    this.levelsOverlay.classList.remove('hidden');
  }

  closeLevelSelect() {
    this.levelsOverlay.classList.add('hidden');
    if (this.state === 'LEVELSELECT') {
      this.showMenu();
    }
  }

  renderLevelGrid() {
    const grid = document.getElementById('levels-grid');
    if (!grid) return;

    const BIOME_EMOJIS = ['🌿', '🍄', '💎', '🌅', '🌲', '⚡', '🏛️', '☁️', '🌋', '🏰'];

    // Handle Unlock All Levels button
    const unlockBtn = document.getElementById('btn-unlock-all');
    if (unlockBtn) {
      if (this.maxUnlockedLevel >= 10) {
        unlockBtn.querySelector('span').textContent = '✓ ALL 10 LEVELS UNLOCKED';
      } else {
        unlockBtn.querySelector('span').textContent = '⭐ UNLOCK ALL 10 LEVELS';
      }
      unlockBtn.onclick = () => {
        this.sound.playCoin();
        this.maxUnlockedLevel = 10;
        try {
          localStorage.setItem('sr_unlocked_level', '10');
        } catch (e) {}
        this.renderLevelGrid();
      };
    }

    let html = '';
    LEVEL_DATA.forEach((lvl, idx) => {
      const isUnlocked = lvl.id <= this.maxUnlockedLevel;
      const isActive = idx === this.currentLevelIndex;
      const statusClass = isUnlocked ? 'unlocked' : 'locked';
      const activeClass = isActive ? 'active-level' : '';
      const biomeIcon = BIOME_EMOJIS[idx] || '⭐';

      html += `
        <div class="level-card ${statusClass} ${activeClass}" data-level="${idx}">
          <div class="level-biome-badge">${biomeIcon}</div>
          <div class="level-code-tag">${lvl.subtitle}</div>
          <div class="level-name">${lvl.title}</div>
          <div class="level-stars">${lvl.difficulty}</div>
          <div class="level-number">${isUnlocked ? '#' + lvl.id : '🔒'}</div>
        </div>
      `;
    });
    grid.innerHTML = html;

    grid.querySelectorAll('.level-card.unlocked').forEach(card => {
      card.addEventListener('click', () => {
        const lvlIdx = parseInt(card.dataset.level, 10);
        this.sound.playClick();
        this.lives = this.maxLives;
        this.startLevel(lvlIdx);
      });
    });
  }

  triggerLevelClear() {
    this.state = 'LEVELCLEAR';
    this.sound.playLevelClear();
    this.particles.createConfetti(this.width, this.height);

    const lvl = LEVEL_DATA[this.currentLevelIndex];
    const nextLvlNum = lvl.id + 1;

    // Unlock next level in persistence
    if (nextLvlNum <= 10 && nextLvlNum > this.maxUnlockedLevel) {
      this.maxUnlockedLevel = nextLvlNum;
      try {
        localStorage.setItem('sr_unlocked_level', this.maxUnlockedLevel);
      } catch (e) {}
    }

    // Populate Level Clear Modal
    document.getElementById('lc-level-name').textContent = `${lvl.subtitle} — ${lvl.title}`;
    document.getElementById('lc-coins').textContent = this.coinsCollected;
    document.getElementById('lc-score').textContent = this.score;

    const nextBtn = document.getElementById('lc-next-btn');
    if (nextBtn) {
      nextBtn.querySelector('span').textContent = this.currentLevelIndex === 9 ? '🏆 VICTORY LAP (REPLAY)' : '▶ NEXT LEVEL';
    }

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
    this.player.vy = -6.5;
    this.player.vx = hitX > this.player.x ? -3.5 : 3.5;

    if (this.lives <= 0) {
      this.triggerGameOver();
    } else {
      this.player.invulnerableTimer = 90;
    }
  }

  handleVoidFall() {
    this.lives--;
    this.sound.playHit();
    this.updateHeartsUI();

    if (this.lives <= 0) {
      this.triggerGameOver();
    } else {
      // Emergency rescue bounce back to closest platform
      this.player.invulnerableTimer = 110;
      this.player.vy = -14.0;
      const targetPlat = this.platforms.find(p => p.x + p.w > this.player.x - 50) || this.platforms[0];
      if (targetPlat) {
        this.player.x = targetPlat.x + 40;
        this.player.y = targetPlat.y - 120;
      }
      this.particles.createDoubleJumpRing(this.player.x + this.player.w / 2, this.player.y);
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

    // 6. Void Fall Check
    if (this.player.y > this.height + 60) {
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

    // 12. Hidden Weapon Chest Pickup
    if (this.weaponChest && !this.weaponChest.opened) {
      this.weaponChest.sparklePhase += 0.05;
      if (this.checkCollision(this.player, this.weaponChest)) {
        this.weaponChest.opened = true;
        this.player.currentWeapon = this.weaponChest.weapon;
        this.sound.playWeaponFound();
        this.particles.createDoubleJumpRing(this.weaponChest.x + 19, this.weaponChest.y + 17);
        this.particles.createCoinBurst(this.weaponChest.x + 19, this.weaponChest.y + 17);
        this.addScorePopup(this.weaponChest.x + 19, this.weaponChest.y - 18, `⚔️ ${this.weaponChest.weapon.name.toUpperCase()}!`, '#ffd60a');
        this.updateWeaponHUD();
      }
    }

    // 13. Projectiles Physics & Combat Collision
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

      // Enemy hit
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

      // Boss Monster hit!
      if (!hit && this.boss && this.boss.alive) {
        if (this.checkCollision(p, this.boss)) {
          hit = true;
          this.boss.curHp = Math.max(0, this.boss.curHp - p.dmg);
          this.boss.hitFlash = 12;
          this.sound.playBossHit();
          this.particles.createProjectileHit(p.x + p.w / 2, p.y + p.h / 2, p.color);
          this.addScorePopup(this.boss.x + this.boss.w / 2, this.boss.y - 10, `-${p.dmg}`, '#ff007f');
          this.updateBossHUD();

          if (this.boss.curHp <= 0) {
            this.killBoss();
          }
        }
      }

      if (hit || p.life <= 0) {
        this.projectiles.splice(i, 1);
      }
    }

    // 14. Boss Monster AI, Stomp Damage & Player Combat
    if (this.boss && this.boss.alive) {
      this.boss.phase += 0.04;
      if (this.boss.hitFlash > 0) this.boss.hitFlash--;

      // Movement & Patrol Kinematics
      const isFlying = (this.boss.type === 'skeleton' || this.boss.type === 'grimoire' || this.boss.type === 'wasp');
      if (isFlying) {
        this.boss.x += this.boss.vx;
        this.boss.y = this.boss.origY + Math.sin(this.boss.phase * 1.5) * 25;
      } else {
        this.boss.x += this.boss.vx;
        const hop = Math.abs(Math.sin(this.boss.phase * 2.5)) * 6;
        this.boss.y = this.boss.origY - hop;
      }

      // Patrol boundary turnaround
      if (this.boss.x <= this.boss.minX) {
        this.boss.x = this.boss.minX;
        this.boss.vx = Math.abs(this.boss.vx);
      } else if (this.boss.x + this.boss.w >= this.boss.maxX) {
        this.boss.x = this.boss.maxX - this.boss.w;
        this.boss.vx = -Math.abs(this.boss.vx);
      }

      // Check collision between Player and Boss Monster
      if (this.checkCollision(this.player, this.boss)) {
        // A. Super Star Invincibility: Heavy shredding damage
        if (this.player.starTimer > 0) {
          this.boss.curHp = Math.max(0, this.boss.curHp - 4);
          this.boss.hitFlash = 8;
          this.sound.playBossHit();
          this.particles.createHitSparks(this.boss.x + this.boss.w / 2, this.boss.y + this.boss.h / 2);
          this.updateBossHUD();
          if (this.boss.curHp <= 0) this.killBoss();
        } else {
          // B. Stomp Condition: Player falling from above onto the boss
          const stomping = (this.player.vy > 0) && (prevFeet <= this.boss.y + 24);
          if (stomping) {
            // Stomp damage (25 DMG) & high Mario rebound bounce!
            this.boss.curHp = Math.max(0, this.boss.curHp - 25);
            this.boss.hitFlash = 14;
            this.player.vy = -12.5; // High rebound
            this.sound.playBossHit();
            this.particles.createStompPoof(this.player.x + this.player.w / 2, this.boss.y);
            this.addScorePopup(this.boss.x + this.boss.w / 2, this.boss.y - 12, '-25 STOMP!', '#ffbe0b');
            this.updateBossHUD();

            if (this.boss.curHp <= 0) {
              this.killBoss();
            }
          } else {
            // Player takes damage from the monster
            this.handlePlayerDamage(this.boss.x + this.boss.w / 2);
          }
        }
      }

      // Synchronize boss HUD visibility & health
      this.updateBossHUD();
    }

    // 15. Energy Gate Lock before Flagpole (Boss must be reduced to 0 HP)
    const gateX = this.flag.x - 70;
    if (this.boss && this.boss.alive) {
      if (this.player.x + this.player.w >= gateX) {
        this.player.x = gateX - this.player.w;
        this.player.vx = -4.0;
        this.sound.playHit();
        this.particles.createShieldBreak(gateX, this.player.y + 25);
        if (!this.lastGateWarning || Date.now() - this.lastGateWarning > 1200) {
          this.lastGateWarning = Date.now();
          this.addScorePopup(gateX - 25, this.player.y - 15, '⚠️ DEFEAT THE BOSS FIRST!', '#ff007f');
        }
      }
    }

    // 16. Flagpole Goal Detection (Unlocked only when boss is slain)
    if (!this.flag.reached && (!this.boss || !this.boss.alive) && this.player.x + this.player.w >= this.flag.x) {
      this.flag.reached = true;
      this.player.vx = 0;
      this.triggerLevelClear();
    }

    // Particles update
    this.particles.update();

    // 13. Dynamic Camera Zoom & Viewport Tracking (Crisp platformer framing)
    const targetVirtualH = 490;
    this.camera.zoom = Math.max(1.22, Math.min(1.65, this.height / targetVirtualH));
    const viewW = this.width / this.camera.zoom;
    const viewH = this.height / this.camera.zoom;

    // Smooth horizontal follow
    const targetCamX = this.player.x - viewW * 0.32;
    this.camera.x += (targetCamX - this.camera.x) * 0.12;
    if (this.camera.x < -60) this.camera.x = -60;

    // Smooth vertical follow: keeps ground comfortably in lower third
    const targetCamY = Math.max(0, (this.player.y + 30) - viewH * 0.74);
    this.camera.y += (targetCamY - this.camera.y) * 0.08;

    this.updateHUD();
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

    const lvl = LEVEL_DATA[this.currentLevelIndex] || LEVEL_DATA[0];

    // 1. Parallax Painterly Background (Screen space)
    this.drawParallaxBackground(ctx, lvl);

    // 2. Main Game World (Scaled and Camera Tracked)
    ctx.save();
    ctx.scale(this.camera.zoom, this.camera.zoom);
    ctx.translate(-this.camera.x, -this.camera.y);

    // Platforms (Grassy cliff ledges with wildflowers and earth strata)
    this.drawPlatforms(ctx, lvl);

    // Interactive Blocks (? Blocks, Bricks, Warp Pipes)
    this.drawBlocks(ctx);

    // Bouncing Coins vaulting from ? blocks
    this.drawBouncingCoins(ctx);

    // Hidden Weapon Chest
    this.drawWeaponChest(ctx);

    // Stompable Animated Cartoon Enemies (Squishy slimes, flapping paratroopas, spikies)
    this.drawEnemies(ctx);

    // Signature Reference Boss Monster (with animated features and HP bar)
    this.drawBoss(ctx);

    // Energy Gate Barrier (locks player out of flagpole until boss is slain)
    this.drawEnergyGate(ctx);

    // Collectible Coins & Power-ups
    this.drawCoins(ctx);
    this.drawPowerups(ctx);

    // Fired Combat Projectiles
    this.drawProjectiles(ctx);

    // Finish Flagpole
    this.drawFlagpole(ctx);

    // Particle Effects
    this.particles.draw(ctx);

    // Floating Score Popups (+100, +200, STAR!)
    this.drawScorePopups(ctx);

    // Player Character (facing direction, run stride, jump kinematics, rainbow star aura)
    if (this.state === 'PLAYING' || this.state === 'PAUSED' || this.state === 'LEVELCLEAR') {
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
    }

    ctx.restore();
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

    // 1. Sky gradient tailored to level theme
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
    skyGrad.addColorStop(0, lvl.skyTop || '#0f0e26');
    skyGrad.addColorStop(0.42, lvl.skyMid || '#23153c');
    skyGrad.addColorStop(1, lvl.skyBot || '#e58e65');
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
    ctx.fillStyle = lvl.theme === 'crystal' ? '#0e1c38' : (lvl.theme === 'mushroom' ? '#2f143f' : '#23163d');
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
    ctx.fillStyle = lvl.theme === 'crystal' ? '#092742' : (lvl.theme === 'mushroom' ? '#3e1a42' : '#1a3c2e');
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
    ctx.fillStyle = lvl.theme === 'crystal' ? '#00f0ff' : (lvl.theme === 'mushroom' ? '#ff007f' : '#2ec4b6');
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

  drawPlatforms(ctx, lvl) {
    for (let p of this.platforms) {
      ctx.save();

      // Earth body palette tailored to theme
      let earthTop = '#4a2c1d';
      let earthBot = '#2c170c';
      let topColor = '#10b981';
      let topColorDark = '#059669';

      if (lvl.theme === 'mushroom') {
        earthTop = '#3f1f45';
        earthBot = '#240f28';
        topColor = '#ff4d6d';
        topColorDark = '#c9184a';
      } else if (lvl.theme === 'crystal') {
        earthTop = '#1e2942';
        earthBot = '#0f172a';
        topColor = '#00f0ff';
        topColorDark = '#0284c7';
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

  drawFlagpole(ctx) {
    const f = this.flag;
    ctx.save();

    // 1. Base Pedestal
    ctx.fillStyle = '#3a4756';
    ctx.strokeStyle = '#1e242b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(f.x - 24, 460, 60, 40, [6, 6, 0, 0]);
    ctx.fill();
    ctx.stroke();

    // 2. Tall Golden Flagpole
    const poleGrad = ctx.createLinearGradient(f.x, 0, f.x + f.w, 0);
    poleGrad.addColorStop(0, '#ffd60a');
    poleGrad.addColorStop(0.5, '#fff9db');
    poleGrad.addColorStop(1, '#e5a500');
    ctx.fillStyle = poleGrad;
    ctx.fillRect(f.x, f.y, f.w, f.h);
    ctx.strokeRect(f.x, f.y, f.w, f.h);

    // 3. Top Sphere Orb
    ctx.fillStyle = '#ffbe0b';
    ctx.shadowColor = '#ffbe0b';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(f.x + f.w / 2, f.y, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // 4. Fluttering Star Flag
    const flagY = f.reached ? Math.min(f.y + 240, f.y + (f.flagSlideY += 5)) : f.y + 15;
    const wave = Math.sin(Date.now() * 0.008) * 6;

    ctx.fillStyle = '#ff007f';
    ctx.shadowColor = '#ff007f';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(f.x + f.w, flagY);
    ctx.quadraticCurveTo(f.x + f.w + 35, flagY + wave, f.x + f.w + 65, flagY + 12);
    ctx.lineTo(f.x + f.w + 65, flagY + 52);
    ctx.quadraticCurveTo(f.x + f.w + 35, flagY + 40 + wave, f.x + f.w, flagY + 52);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Star icon inside flag
    ctx.fillStyle = '#ffd60a';
    ctx.font = '20px sans-serif';
    ctx.fillText('★', f.x + f.w + 24, flagY + 36);

    ctx.restore();
  }

  // --- Weapon Chest & Projectiles Rendering ---

  drawWeaponChest(ctx) {
    const c = this.weaponChest;
    if (!c) return;
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

  drawEnergyGate(ctx) {
    if (!this.boss || !this.boss.alive) return;
    const gateX = this.flag.x - 70;
    const topY = 140;
    const botY = 480;

    ctx.save();

    // 1. Top Emitter Pylon
    ctx.fillStyle = '#334155';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.roundRect(gateX - 16, topY - 24, 32, 24, [6, 6, 2, 2]);
    ctx.fill();
    ctx.stroke();

    // Glowing Emitter Core Orb
    const orbPulse = Math.sin(Date.now() * 0.01) * 0.2 + 0.8;
    ctx.fillStyle = '#ff0054';
    ctx.shadowColor = '#ff0054';
    ctx.shadowBlur = 16 * orbPulse;
    ctx.beginPath();
    ctx.arc(gateX, topY - 12, 7 * orbPulse, 0, Math.PI * 2);
    ctx.fill();

    // 2. Bottom Ground Anchor
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(gateX - 22, botY, 44, 20, [4, 4, 0, 0]);
    ctx.fill();
    ctx.stroke();

    // 3. Electric Laser Energy Beams
    const laserAlpha = Math.sin(Date.now() * 0.015) * 0.2 + 0.75;
    ctx.shadowColor = '#ff0054';
    ctx.shadowBlur = 18;
    ctx.strokeStyle = `rgba(255, 0, 84, ${laserAlpha})`;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(gateX, topY);
    ctx.lineTo(gateX, botY);
    ctx.stroke();

    // White core hot beam
    ctx.strokeStyle = `rgba(255, 255, 255, ${laserAlpha * 0.9})`;
    ctx.lineWidth = 2.4;
    ctx.stroke();

    // Crackling horizontal lightning arcs
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    for (let ly = topY + 20; ly < botY - 20; ly += 45) {
      const jitter = (Math.random() - 0.5) * 14;
      ctx.moveTo(gateX - 10, ly);
      ctx.lineTo(gateX + jitter, ly + 8);
      ctx.lineTo(gateX + 10, ly + 16);
    }
    ctx.stroke();

    // 4. Floating Holographic "BOSS LOCKED" Badge
    const badgeY = (topY + botY) / 2 + Math.sin(Date.now() * 0.006) * 5;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.strokeStyle = '#ff0054';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#ff0054';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.roundRect(gateX - 58, badgeY - 16, 116, 32, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 0;
    ctx.font = '900 10px Orbitron, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🔒 BOSS LOCK', gateX, badgeY);

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

  drawBoss(ctx) {
    const b = this.boss;
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
    const dt = Math.min((currentTime - this.lastTime) / 1000, 0.1);
    this.lastTime = currentTime;

    this.update(dt);
    this.draw();

    requestAnimationFrame((t) => this.gameLoop(t));
  }
}

// Start Game Instance on Load
window.addEventListener('DOMContentLoaded', () => {
  window.gameInstance = new Game();
});
