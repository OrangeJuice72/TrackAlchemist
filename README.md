# Song Instrumental Generator

A React + Vite app for generating instrumental concepts, editing the generated fields, and exporting tailored prompts.

## Included

- Main genre dropdown
- Secondary genre blend with adjustable weight
- Generate Idea button
- Combinatorial generation for flavor, instrumentation, mood, and signature direction
- Lock individual generated fields before rerolling
- Prompt template selection
- Per-field prompt on/off switches directly on the related controls
- Favorite preset saving
- JSON and plain prompt copy actions

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

## Project notes

- `src/data.js` contains the genre source pools.
- `src/generator.js` handles seeded generation, weighted genre blending, and the combinatorial remix logic that expands variety without adding more visible sections.
- `src/App.jsx` renders the reduced-field UI and prompt composition logic.
- `src/styles.css` contains the app styling.
