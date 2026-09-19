# Project Brief: Hostile Planet Survival Game

## One-line pitch
A browser-based 3D survival-action game built with three.js: you crash-land on a
hostile alien planet, must fight/avoid procedurally-spawned alien creatures,
scavenge resources, and survive long enough to reach an extraction point.

## Context
This is a full-stack web development semester project, built by a 3-person team.
It must demonstrate both frontend (3D rendering, game logic) and backend
(persistence, data, auth) skills — not just be a visual demo.

## Core concept
- Player crash-lands on a procedurally generated alien planet with minimal
  starting gear (basic weapon/tool, limited health, limited resources).
- The planet has hostile alien creatures with different behavior types.
- Player explores the terrain, fights or avoids creatures, and gathers
  resources (weapons, ammo, health items, upgrade materials).
- A day/night cycle increases difficulty at night (more creatures, more
  aggressive behavior).
- Goal: survive and gather enough resources to repair the ship / reach an
  extraction point. Clear win condition (extraction) and lose condition
  (death) — this is a proper game with a start and end, not an open sandbox.

## Why this scope (keep in mind while building)
- NOT a true infinite open world — a large but BOUNDED, procedurally
  generated map (e.g. one planet "zone" of fixed size).
- 2–3 creature types max:
  1. **Swarm type** — weak, fast, appears in groups (use `InstancedMesh` for
     performance).
  2. **Stalker type** — single, dangerous, actively hunts the player.
  3. **Passive type** — harmless unless attacked, drops resources when killed.
- Combat and creature AI (simple state machine: idle → alert → attack →
  flee) are the core gameplay/programming showcase — prioritize this over
  visual fidelity.
- Procedural terrain (noise-based heightmap) avoids needing large amounts of
  hand-made assets.

## Player loop (moment to moment)
1. Spawn at crash site with starting loadout.
2. Explore terrain, encounter creatures and resource nodes.
3. Fight/avoid/scavenge — pick up materials, weapons, health.
4. Day/night cycle raises stakes over time.
5. Progress toward extraction goal (e.g. repair ship parts found in the
   world, or survive N in-game days).
6. Run ends in success (extraction) or failure (death) — result is logged.

## Full-stack / backend requirements
The backend is not optional polish — it's a required part of the grade. It
should support:
- **Player accounts / auth** (simple email+password or similar is fine).
- **Run history**: each playthrough ("run") logs survival time, creatures
  killed, cause of death (or success), resources collected.
- **Leaderboard**: fastest extraction, longest survival, most kills.
- **Bestiary**: per-player and/or global log of creatures encountered/killed,
  with kill counts and a simple "danger rating".
- **Optional stretch**: server-stored loadout/upgrade choices that carry
  between runs.

## Explicitly out of scope (do not build)
- Real-time multiplayer / networked play.
- Infinite procedural world generation.
- Unity/Unreal — this is three.js (WebGL) only, in-browser.
- Large hand-crafted 3D asset libraries — prefer low-poly/simple geometry or
  a small number of free glTF assets (e.g. Kenney.nl, Sketchfab CC assets).
- Complex physics simulation — basic gravity/collision only (e.g. via
  `cannon-es`), not a full physics engine feature set.

## Success criteria for the semester deliverable
- A playable browser build: player can move through a 3D terrain, encounter
  and fight/avoid at least 2 creature types, collect resources, and reach a
  win or lose state.
- A working backend that persists runs and displays a leaderboard.
- Reasonable performance (playable frame rate) achieved via basic
  optimization: instancing, limited draw distance, fog to mask pop-in.
