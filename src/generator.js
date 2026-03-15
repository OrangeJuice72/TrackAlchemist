import { GENRE_DATA, SONG_STRUCTURES } from './data.js';

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function uniqueByValue(items) {
  return [...new Set(items.map((item) => JSON.stringify(item)))].map((item) => JSON.parse(item));
}

function combineArrays(primary, secondary, key) {
  if (!secondary) {
    return primary[key];
  }

  return uniqueByValue([...primary[key], ...secondary[key]]);
}

function combineGenres(primaryGenreKey, secondaryGenreKey) {
  const primary = GENRE_DATA[primaryGenreKey];
  const secondary = secondaryGenreKey ? GENRE_DATA[secondaryGenreKey] : null;

  if (!primary) {
    throw new Error(`Unknown genre: ${primaryGenreKey}`);
  }

  if (secondaryGenreKey && !secondary) {
    throw new Error(`Unknown genre: ${secondaryGenreKey}`);
  }

  return {
    label: secondary ? `${primary.label} x ${secondary.label}` : primary.label,
    flavorGenres: combineArrays(primary, secondary, 'flavorGenres'),
    bpmRanges: combineArrays(primary, secondary, 'bpmRanges'),
    scales: combineArrays(primary, secondary, 'scales'),
    instrumentationPalettes: combineArrays(primary, secondary, 'instrumentationPalettes'),
    signatureSounds: combineArrays(primary, secondary, 'signatureSounds'),
    energyFeels: combineArrays(primary, secondary, 'energyFeels')
  };
}

export function generateIdea(primaryGenreKey, secondaryGenreKey, locks = {}, previousResult = null) {
  const genre = combineGenres(primaryGenreKey, secondaryGenreKey);

  const nextRange = pick(genre.bpmRanges);
  const nextPalette = pick(genre.instrumentationPalettes);

  return {
    mainGenre: genre.label,
    flavorGenre: locks.flavorGenre && previousResult ? previousResult.flavorGenre : pick(genre.flavorGenres),
    bpm: locks.bpm && previousResult ? previousResult.bpm : randomInt(nextRange[0], nextRange[1]),
    scale: locks.scale && previousResult ? previousResult.scale : pick(genre.scales),
    instrumentationPalette:
      locks.instrumentationPalette && previousResult
        ? previousResult.instrumentationPalette
        : nextPalette,
    signatureSound:
      locks.signatureSound && previousResult
        ? previousResult.signatureSound
        : pick(genre.signatureSounds),
    energyFeel: locks.energyFeel && previousResult ? previousResult.energyFeel : pick(genre.energyFeels),
    songStructure:
      locks.songStructure && previousResult ? previousResult.songStructure : pick(SONG_STRUCTURES)
  };
}
