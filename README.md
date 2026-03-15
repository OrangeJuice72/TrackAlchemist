# Song Instrumental Generator (React Starter)

A small React + Vite starter for generating instrumental ideas from a selected main genre.

## Included

- Main genre dropdown
- Generate Idea button
- Randomized output for:
  - Flavor Genre
  - BPM
  - Scale
  - Instrumentation Palette
  - Signature Sound
  - Energy Feel
- Expandable data structure in `src/data.js`
- Generator logic in `src/generator.js`

## Run locally

```bash
npm install
npm run dev
```

## Project structure

- `src/data.js` — your large genre arrays live here
- `src/generator.js` — random selection logic
- `src/App.jsx` — UI layout and rendering
- `src/styles.css` — styling

## Good next upgrades

- Lock individual fields and reroll the others
- Add weighted randomness
- Save favorite ideas
- Add copy/export preset button
- Split genre data into multiple files if it gets very large
