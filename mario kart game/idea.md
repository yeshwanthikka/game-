Project: "Star Runner" — 2D Platformer with Character Customization

Concept: A side-scrolling 2D runner/platformer where the player jumps across floating platforms, collects coins, avoids falling, and can design their own character on the home screen before playing (optional, one-time, persists across sessions).

Tech stack: HTML5 Canvas + vanilla JavaScript (or Phaser.js if you want a framework to lean on). No backend needed — everything runs client-side, character saved via localStorage.

Core features

1. Home screen

"Play" button → starts game with saved/default character
"Customize Character" button → opens character builder (optional, not forced every session)
Shows best score

2. Character builder

Swatch pickers for: skin tone, hat color, shirt color, pants color
Live preview canvas showing the character update in real time
"Save & Back" writes the chosen colors to localStorage as JSON
If no saved character exists yet, game falls back to sensible defaults

3. Core gameplay loop

Character auto-runs forward; camera scrolls with it
Tap/click/spacebar = jump (basic gravity + jump arc physics)
Procedurally generated platforms with randomized gaps and widths
Coins floating above/between platforms, collectible for score
3-heart lives system — falling into a gap costs a heart, not instant game over
Difficulty ramps: scroll speed increases gradually over time

4. Game states

menu → playing → dead → back to playing (retry) or reload for menu
Overlay UI for menu and game-over screens, showing score/best score

5. Visuals

Parallax background (gradient sky + simple mountain silhouette + stars)
Platform sprites drawn with simple layered rectangles (or swap in real sprite assets later)
Player rendered using the saved customization colors (hat/skin/shirt/pants as separate drawn rectangles or shapes)
Suggested file/data structure
index.html          → canvas + UI overlays
game.js             → game loop, physics, collision, spawning
character.js         → customization logic, localStorage read/write
style.css           → HUD, overlay, swatch styling
Data model
js
// stored in localStorage as "sr_character"
{ skin: "#ffd6a5", hat: "#3a86ff", shirt: "#ff6b6b", pants: "#2b2d42" }

// stored as "sr_best"
42
Stretch goals (once core loop works)
Power-ups (shield, magnet for coins, double-jump)
Obstacles to dodge, not just gaps
Unlockable cosmetic items (hats, outfits) earned via score milestones
Sound effects + background music
Mobile swipe gestures (jump/slide) instead of just tap

This is scoped to be buildable in a single focused session and gives you a genuinely playable, personalizable game at the end. Want me to also write out the physics/collision pseudocode so Antigravity has less to infer?
