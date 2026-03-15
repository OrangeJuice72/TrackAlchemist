import {
  ARRANGEMENT_NOTES,
  ERAS,
  GENRE_DATA,
  MOOD_TAGS,
  SONG_STRUCTURES
} from './data.js';

const ROOT_NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const CHORD_PROGRESSION_POOLS = {
  major: ['I - V - vi - IV', 'I - IV - vi - V', 'I - vi - IV - V', 'IV - I - V - vi'],
  minor: ['i - VI - III - VII', 'i - iv - VI - V', 'i - VII - VI - VII', 'i - v - VI - iv'],
  modal: ['i - II - VII - i', 'I - II - v - I', 'i - bII - i - VII', 'I - VII - IV - I'],
  pentatonic: ['I - bVII - IV - I', 'i - bVI - bVII - i', 'I - IV - I - V', 'i - iv - i - bVII']
};

function xmur3(seed) {
  let hash = 1779033703 ^ seed.length;

  for (let index = 0; index < seed.length; index += 1) {
    hash = Math.imul(hash ^ seed.charCodeAt(index), 3432918353);
    hash = (hash << 13) | (hash >>> 19);
  }

  return function seedGenerator() {
    hash = Math.imul(hash ^ (hash >>> 16), 2246822507);
    hash = Math.imul(hash ^ (hash >>> 13), 3266489909);
    return (hash ^= hash >>> 16) >>> 0;
  };
}

function mulberry32(seed) {
  return function random() {
    let next = (seed += 0x6d2b79f5);
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

function createRandomizer(seedValue) {
  const seedFactory = xmur3(seedValue);
  return mulberry32(seedFactory());
}

function pick(arr, random) {
  return arr[Math.floor(random() * arr.length)];
}

function randomInt(min, max, random) {
  return Math.floor(random() * (max - min + 1)) + min;
}

function uniqueByValue(items) {
  return [...new Set(items.map((item) => JSON.stringify(item)))].map((item) => JSON.parse(item));
}

function mergeWeighted(primaryItems, secondaryItems = [], primaryWeight = 50) {
  const primaryCopies = Math.max(1, Math.round(primaryWeight / 20));
  const secondaryCopies = Math.max(1, Math.round((100 - primaryWeight) / 20));
  const weighted = [];

  for (let index = 0; index < primaryCopies; index += 1) {
    weighted.push(...primaryItems);
  }

  for (let index = 0; index < secondaryCopies; index += 1) {
    weighted.push(...secondaryItems);
  }

  return weighted.length > 0 ? weighted : primaryItems;
}

function combineGenres(primaryGenreKey, secondaryGenreKey, primaryWeight = 50) {
  const primary = GENRE_DATA[primaryGenreKey];
  const secondary = secondaryGenreKey ? GENRE_DATA[secondaryGenreKey] : null;

  if (!primary) {
    throw new Error(`Unknown genre: ${primaryGenreKey}`);
  }

  if (secondaryGenreKey && !secondary) {
    throw new Error(`Unknown genre: ${secondaryGenreKey}`);
  }

  const label = secondary
    ? `${primary.label} ${primaryWeight}/${100 - primaryWeight} ${secondary.label}`
    : primary.label;

  return {
    label,
    flavorGenres: mergeWeighted(primary.flavorGenres, secondary?.flavorGenres, primaryWeight),
    bpmRanges: mergeWeighted(primary.bpmRanges, secondary?.bpmRanges, primaryWeight),
    scales: mergeWeighted(primary.scales, secondary?.scales, primaryWeight),
    instrumentationPalettes: uniqueByValue(
      mergeWeighted(primary.instrumentationPalettes, secondary?.instrumentationPalettes, primaryWeight)
    ),
    signatureSounds: mergeWeighted(primary.signatureSounds, secondary?.signatureSounds, primaryWeight),
    energyFeels: mergeWeighted(primary.energyFeels, secondary?.energyFeels, primaryWeight)
  };
}

function classifyScale(scale) {
  const normalized = scale.toLowerCase();

  if (normalized.includes('pentatonic') || normalized.includes('blues')) {
    return 'pentatonic';
  }

  if (
    normalized.includes('dorian') ||
    normalized.includes('phrygian') ||
    normalized.includes('mixolydian') ||
    normalized.includes('lydian') ||
    normalized.includes('locrian') ||
    normalized.includes('whole tone')
  ) {
    return 'modal';
  }

  if (normalized.includes('major')) {
    return 'major';
  }

  return 'minor';
}

function buildArrangement(songStructure, random) {
  return songStructure.split(' - ').map((section) => ({
    section,
    note: pick(
      ARRANGEMENT_NOTES[section] ?? ['Keep this section cohesive with the overall track mood'],
      random
    )
  }));
}

function buildIntensityMap(songStructure, random) {
  const sections = songStructure.split(' - ');

  return sections.map((section, index) => {
    const midpoint = sections.length / 2;
    const base =
      index === 0 ? 2 : index >= midpoint && index < sections.length - 1 ? 7 : index === sections.length - 1 ? 3 : 5;

    return {
      section,
      level: Math.min(10, Math.max(1, base + randomInt(-1, 2, random)))
    };
  });
}

function pickMoodTags(source, random) {
  const pool = [...source];
  const count = randomInt(2, 4, random);
  const tags = [];

  while (tags.length < count && pool.length > 0) {
    const tag = pick(pool, random);
    tags.push(tag);
    pool.splice(pool.indexOf(tag), 1);
  }

  return tags;
}

export function generateIdea(
  primaryGenreKey,
  secondaryGenreKey,
  locks = {},
  previousResult = null,
  primaryWeight = 50,
  customPools = {},
  seedValue = 'TA-001'
) {
  const random = createRandomizer(seedValue);
  const genre = combineGenres(primaryGenreKey, secondaryGenreKey, primaryWeight);
  const nextRange = pick(genre.bpmRanges, random);
  const nextPalette = pick(genre.instrumentationPalettes, random);
  const flavorGenres =
    customPools.flavorGenres?.length > 0
      ? [...genre.flavorGenres, ...customPools.flavorGenres]
      : genre.flavorGenres;
  const signatureSounds =
    customPools.signatureSounds?.length > 0
      ? [...genre.signatureSounds, ...customPools.signatureSounds]
      : genre.signatureSounds;
  const eras = customPools.eras?.length > 0 ? [...ERAS, ...customPools.eras] : ERAS;
  const moodTagsSource =
    customPools.moodTags?.length > 0 ? [...MOOD_TAGS, ...customPools.moodTags] : MOOD_TAGS;
  const songStructures =
    customPools.songStructures?.length > 0
      ? [...SONG_STRUCTURES, ...customPools.songStructures]
      : SONG_STRUCTURES;
  const nextScale = locks.scale && previousResult ? previousResult.scale : pick(genre.scales, random);
  const nextSongStructure =
    locks.songStructure && previousResult ? previousResult.songStructure : pick(songStructures, random);
  const nextKeyCenter =
    locks.keyCenter && previousResult
      ? previousResult.keyCenter
      : `${pick(ROOT_NOTES, random)} ${nextScale}`;
  const nextChordProgression =
    locks.chordProgression && previousResult
      ? previousResult.chordProgression
      : pick(CHORD_PROGRESSION_POOLS[classifyScale(nextScale)], random);

  return {
    generationSeed: seedValue,
    mainGenre: genre.label,
    flavorGenre:
      locks.flavorGenre && previousResult ? previousResult.flavorGenre : pick(flavorGenres, random),
    bpm: locks.bpm && previousResult ? previousResult.bpm : randomInt(nextRange[0], nextRange[1], random),
    scale: nextScale,
    keyCenter: nextKeyCenter,
    chordProgression: nextChordProgression,
    instrumentationPalette:
      locks.instrumentationPalette && previousResult
        ? previousResult.instrumentationPalette
        : nextPalette,
    signatureSound:
      locks.signatureSound && previousResult
        ? previousResult.signatureSound
        : pick(signatureSounds, random),
    energyFeel:
      locks.energyFeel && previousResult ? previousResult.energyFeel : pick(genre.energyFeels, random),
    era: locks.era && previousResult ? previousResult.era : pick(eras, random),
    moodTags:
      locks.moodTags && previousResult
        ? previousResult.moodTags
        : pickMoodTags(moodTagsSource, random),
    songStructure: nextSongStructure,
    arrangement:
      locks.arrangement && previousResult
        ? previousResult.arrangement
        : buildArrangement(nextSongStructure, random),
    intensityMap:
      locks.intensityMap && previousResult
        ? previousResult.intensityMap
        : buildIntensityMap(nextSongStructure, random)
  };
}
