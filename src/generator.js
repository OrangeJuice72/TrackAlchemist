import {
  ARRANGEMENT_NOTES,
  ERAS,
  GENRE_DATA,
  MOOD_TAGS,
  SONG_STRUCTURES
} from './data.js';

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

function buildArrangement(songStructure) {
  return songStructure.split(' - ').map((section) => ({
    section,
    note: pick(ARRANGEMENT_NOTES[section] ?? ['Keep this section cohesive with the overall track mood'])
  }));
}

function pickMoodTags(source = MOOD_TAGS) {
  const pool = [...source];
  const count = randomInt(2, 4);
  const tags = [];

  while (tags.length < count && pool.length > 0) {
    const tag = pick(pool);
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
  customPools = {}
) {
  const genre = combineGenres(primaryGenreKey, secondaryGenreKey, primaryWeight);
  const nextRange = pick(genre.bpmRanges);
  const nextPalette = pick(genre.instrumentationPalettes);
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
  const nextSongStructure =
    locks.songStructure && previousResult ? previousResult.songStructure : pick(songStructures);

  return {
    mainGenre: genre.label,
    flavorGenre:
      locks.flavorGenre && previousResult ? previousResult.flavorGenre : pick(flavorGenres),
    bpm: locks.bpm && previousResult ? previousResult.bpm : randomInt(nextRange[0], nextRange[1]),
    scale: locks.scale && previousResult ? previousResult.scale : pick(genre.scales),
    instrumentationPalette:
      locks.instrumentationPalette && previousResult
        ? previousResult.instrumentationPalette
        : nextPalette,
    signatureSound:
      locks.signatureSound && previousResult
        ? previousResult.signatureSound
        : pick(signatureSounds),
    energyFeel:
      locks.energyFeel && previousResult ? previousResult.energyFeel : pick(genre.energyFeels),
    era: locks.era && previousResult ? previousResult.era : pick(eras),
    moodTags:
      locks.moodTags && previousResult ? previousResult.moodTags : pickMoodTags(moodTagsSource),
    songStructure: nextSongStructure,
    arrangement:
      locks.arrangement && previousResult
        ? previousResult.arrangement
        : buildArrangement(nextSongStructure)
  };
}
