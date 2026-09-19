# Technical Architecture

## Stack
- **Rendering**: three.js (WebGL)
- **Physics**: cannon-es (lightweight, sufficient for gravity + collision —
  avoid ammo.js unless a specific need arises)
- **Frontend framework**: plain JS/TS with Vite, OR React + @react-three/fiber
  if the team prefers a component model. Pick one and stay consistent.
- **Backend**: Node.js + Express
- **Database**: any relational or document DB the team is comfortable with
  (e.g. PostgreSQL or MongoDB) — used for accounts, runs, bestiary data
- **Auth**: simple session or JWT-based auth; does not need to be elaborate
- **Asset format**: glTF (.glb) for any modeled creatures/props, loaded via
  `GLTFLoader`

## High-level modules

### 1. Terrain / World Generation
- Heightmap-based terrain using `PlaneGeometry` with vertex displacement
  driven by a noise function (Simplex/Perlin — e.g. via a small library like
  `simplex-noise`).
- Fixed, bounded world size (not infinite/streaming) — e.g. a single large
  tile, or a small grid of chunks generated once at run start from a seed.
- Skybox/cubemap or procedural sky shader for atmosphere.
- `THREE.Fog` used both for atmosphere and to mask limited draw distance.
- Directional light as "sun", with position/intensity driven by the
  day/night cycle timer.

### 2. Player / Character Controller
- First- or third-person camera rig (pick one).
- Movement: WASD + mouse look, basic gravity and ground collision via
  cannon-es.
- Health, stamina (optional), and inventory state held client-side during a
  run, synced to backend at run end (or at checkpoints).

### 3. Creature AI
- Each creature is an entity with a simple finite state machine:
  `idle → alert → attack → flee` (flee optional per type).
- Three creature archetypes (see Project Brief): swarm, stalker, passive.
- Swarm-type creatures should be rendered with `InstancedMesh` for
  performance since there will be many at once.
- Spawn logic: creatures spawn based on proximity to player, time of day
  (more/stronger at night), and a max active-creature cap to protect
  performance.

### 4. Combat
- Simple hit-detection (raycasting for ranged, distance/box check for melee)
  is sufficient — no need for a full physics-based combat system.
- Damage, death, and loot-drop logic per creature type.

### 5. Day/Night Cycle
- A simple timer driving sun position, light color/intensity, and ambient
  light — plus a multiplier on creature spawn rate/aggression at night.

### 6. Resource & Inventory System
- Resource nodes placed in the world at generation time (or spawned
  periodically).
- Simple inventory (array/object of item counts) — no need for a complex
  crafting-grid UI unless the team wants to add it as a stretch goal.

### 7. Win/Lose State
- Track progress toward the extraction goal (e.g. count of ship parts
  collected, or survival timer reaching a target).
- On win or death: freeze gameplay, show result screen, submit run summary
  to backend.

## Backend API (minimum viable)
- `POST /auth/register`, `POST /auth/login`
- `POST /runs` — submit a completed run (outcome, survival time, kills,
  resources collected)
- `GET /leaderboard` — top runs by category (fastest extraction, longest
  survival, most kills)
- `GET /bestiary` — creature encounter/kill data (global and/or per-player)
- `GET /me/runs` — a player's own run history

## Performance guidelines (important — flag if violated)
- Cap total active creatures in the scene at once (e.g. ~30–50 depending on
  target hardware).
- Use `InstancedMesh` for any repeated geometry (swarm creatures, rocks,
  vegetation).
- Use frustum culling (three.js does this by default — don't disable it) and
  keep draw distance limited, hidden behind fog.
- Avoid re-creating geometries/materials per frame; instantiate once and
  reuse.
- Level-of-detail (LOD) is a nice-to-have, not required for MVP.

## Suggested repo structure
```
/src
  /world       -- terrain generation, sky, lighting, day-night cycle
  /entities    -- player controller, creature classes + AI state machines
  /combat      -- hit detection, damage, loot
  /ui          -- HUD, inventory UI, result screen
  /net         -- API client (calls to backend)
  main.js      -- app entry point, scene/game loop setup
/server
  /routes      -- auth, runs, leaderboard, bestiary
  /models      -- DB schema/models
  /middleware  -- auth middleware
  index.js     -- server entry point
```
