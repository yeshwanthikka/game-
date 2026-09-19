# Build Roadmap

Suggested phase order. Each phase should end in something visibly working —
avoid building all systems halfway in parallel.

## Phase 0 — Setup
- Initialize repo, frontend build tool (Vite recommended), basic three.js
  scene with a camera, light, and a ground plane.
- Initialize backend project (Express) with a health-check route and DB
  connection.

## Phase 1 — World & Movement
- Procedural terrain generation from noise (start with a single fixed seed).
- Skybox/fog/lighting pass for atmosphere.
- Player controller: movement, camera, gravity/collision on the terrain.
- Milestone: you can walk around a 3D alien landscape.

## Phase 2 — Creatures & AI (core gameplay)
- Implement one creature type first (recommend: passive type — simplest).
- Build the state machine framework (idle/alert/attack/flee) so it's
  reusable for the other two types.
- Add stalker type (hunts player) and swarm type (InstancedMesh, group
  behavior).
- Milestone: creatures exist in the world and react to the player.

## Phase 3 — Combat & Resources
- Hit detection, damage, death, loot drops.
- Resource nodes and inventory system.
- Milestone: you can fight creatures and collect resources.

## Phase 4 — Day/Night Cycle & Difficulty
- Timer-driven lighting changes.
- Spawn rate/aggression scaling at night.
- Milestone: night is meaningfully more dangerous than day.

## Phase 5 — Win/Lose & Run Summary
- Extraction goal tracking, death state, result screen.
- Milestone: a full playthrough is possible start to finish.

## Phase 6 — Backend Integration
- Auth (register/login).
- Submit run results on win/lose.
- Leaderboard and bestiary screens (can be simple HTML/UI, doesn't need to
  be fancy).
- Milestone: runs persist and a leaderboard is visible.

## Phase 7 — Polish & Performance Pass
- Cap creature counts, verify frame rate under load.
- Tune fog/draw distance.
- Bug pass, edge cases (e.g. player falling through terrain, stuck states).

## Notes for whoever is building this in Antigravity
- Build vertically (one thin working slice through all layers) before
  building horizontally (fully completing one system before starting the
  next) wherever possible — it keeps the project demoable at every stage,
  which matters for a semester project with checkpoints/demos.
- Keep creature count and world size small during early development and
  scale up once the core loop is fun and performant.
