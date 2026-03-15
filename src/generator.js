import { GENRE_DATA } from './data.js';

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateIdea(mainGenreKey) {
  const genre = GENRE_DATA[mainGenreKey];

  if (!genre) {
    throw new Error(`Unknown genre: ${mainGenreKey}`);
  }

  const range = pick(genre.bpmRanges);
  const palette = pick(genre.instrumentationPalettes);

  return {
    mainGenre: genre.label,
    flavorGenre: pick(genre.flavorGenres),
    bpm: randomInt(range[0], range[1]),
    scale: pick(genre.scales),
    instrumentationPalette: palette,
    signatureSound: pick(genre.signatureSounds),
    energyFeel: pick(genre.energyFeels)
  };
}
