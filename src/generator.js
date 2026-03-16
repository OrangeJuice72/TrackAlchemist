import { ERAS, GENRE_DATA, MOOD_TAGS, SONG_STRUCTURES } from './data.js';

const SIGNATURE_ACTIONS = [
  'Build around',
  'Lean on',
  'Feature',
  'Center the track on',
  'Push forward',
  'Anchor the record with'
];

const SIGNATURE_FINISHES = [
  'with sharp transitions',
  'with cinematic spacing',
  'with a polished stereo image',
  'with rough edges left in',
  'with subtle ear candy in the gaps',
  'with movement between sections',
  'with contrast between sparse and full moments',
  'with details that keep evolving'
];

const TEXTURE_MODIFIERS = [
  'gritty',
  'glossy',
  'dusty',
  'wide',
  'saturated',
  'minimal',
  'expansive',
  'forward',
  'punchy',
  'immersive'
];

const FLAVOR_JOINERS = ['leaning', 'with touches of', 'cut with', 'pushed toward'];
const ROLE_TARGETS = ['rhythm', 'bass', 'lead', 'harmony', 'texture'];
const ROLE_KEYWORDS = {
  rhythm: [
    'kick',
    'snare',
    'clap',
    'hat',
    'drum',
    'perc',
    'rim',
    'tom',
    'shaker',
    'tambourine',
    'cymbal',
    'brush',
    'claps'
  ],
  bass: ['808', 'sub', 'bass', 'low end', 'growl'],
  lead: [
    'lead',
    'bell',
    'pluck',
    'guitar',
    'piano',
    'keys',
    'rhodes',
    'wurlitzer',
    'clavinet',
    'violin',
    'cello',
    'mandolin',
    'banjo',
    'hook',
    'motif',
    'synth'
  ],
  harmony: [
    'chord',
    'pad',
    'organ',
    'choir',
    'strings',
    'stack',
    'piano',
    'keys',
    'rhodes',
    'wurlitzer',
    'guitar',
    'synth',
    'ambient'
  ],
  texture: [
    'fx',
    'noise',
    'texture',
    'crackle',
    'delay',
    'reverb',
    'atmosphere',
    'atmospheric',
    'sweep',
    'reverse',
    'riser',
    'impact',
    'ambience',
    'room',
    'verb',
    'candy'
  ]
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

function unique(items) {
  return [...new Set(items)];
}

function uniqueByValue(items) {
  return [...new Set(items.map((item) => JSON.stringify(item)))].map((item) => JSON.parse(item));
}

function sampleOne(items, random) {
  return items[Math.floor(random() * items.length)];
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

function pickUnique(pool, count, random, fallback = []) {
  const source = [...pool];
  const picked = [];

  while (picked.length < count && source.length > 0) {
    const value = pick(source, random);
    picked.push(value);
    source.splice(source.indexOf(value), 1);
  }

  if (picked.length < count) {
    for (const item of fallback) {
      if (picked.length >= count) {
        break;
      }

      if (!picked.includes(item)) {
        picked.push(item);
      }
    }
  }

  return picked;
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

function buildFlavorGenre(flavorGenres, random) {
  const primaryFlavor = pick(flavorGenres, random);

  if (flavorGenres.length < 2 || random() < 0.58) {
    return primaryFlavor;
  }

  const secondaryFlavorPool = flavorGenres.filter((item) => item !== primaryFlavor);
  const secondaryFlavor = pick(secondaryFlavorPool, random);
  return `${primaryFlavor} ${pick(FLAVOR_JOINERS, random)} ${secondaryFlavor}`;
}

function buildInstrumentationPalette(instrumentationPalettes, random) {
  const localItems = unique(instrumentationPalettes.flat());
  const globalItems = unique(Object.values(GENRE_DATA).flatMap((genre) => genre.instrumentationPalettes.flat()));
  const weightedPool = [
    ...localItems,
    ...localItems,
    ...localItems,
    ...globalItems.filter((item) => !localItems.includes(item))
  ];
  const used = new Set();
  const palette = [];

  const matchesRole = (item, role) => {
    const normalized = item.toLowerCase();
    return ROLE_KEYWORDS[role].some((keyword) => normalized.includes(keyword));
  };

  const takeForRole = (role) => {
    const candidates = unique(weightedPool).filter((item) => !used.has(item) && matchesRole(item, role));

    if (candidates.length === 0) {
      return;
    }

    const choice = sampleOne(candidates, random);
    used.add(choice);
    palette.push(choice);
  };

  for (const role of ROLE_TARGETS) {
    takeForRole(role);
  }

  const desiredCount = randomInt(5, 7, random);
  const wildcardPool = unique(weightedPool).filter((item) => !used.has(item));

  while (palette.length < desiredCount && wildcardPool.length > 0) {
    const index = Math.floor(random() * wildcardPool.length);
    const choice = wildcardPool[index];
    wildcardPool.splice(index, 1);
    used.add(choice);
    palette.push(choice);
  }

  return palette;
}

function buildSignatureSound(signatureSounds, instrumentationPalette, energyFeels, moodTags, random) {
  const phrase = pick(signatureSounds, random);
  const texture = pick(TEXTURE_MODIFIERS, random);
  const focalElement = pick(instrumentationPalette, random).toLowerCase();
  const emotionalColor = pick(unique([...energyFeels, ...moodTags]), random).toLowerCase();

  const variants = [
    `${pick(SIGNATURE_ACTIONS, random)} ${phrase.toLowerCase()} ${pick(SIGNATURE_FINISHES, random)}.`,
    `${pick(SIGNATURE_ACTIONS, random)} ${texture} ${focalElement} around ${phrase.toLowerCase()}.`,
    `${pick(SIGNATURE_ACTIONS, random)} ${phrase.toLowerCase()} for a ${emotionalColor} payoff.`,
    `${pick(SIGNATURE_ACTIONS, random)} ${texture} ${focalElement} and ${phrase.toLowerCase()}.`
  ];

  return pick(variants, random);
}

function pickMoodTags(source, energyFeels, random) {
  const pool = unique([...source, ...energyFeels]);
  const count = randomInt(3, 5, random);
  return pickUnique(pool, count, random);
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
  const nextInstrumentation =
    locks.instrumentationPalette && previousResult
      ? previousResult.instrumentationPalette
      : buildInstrumentationPalette(genre.instrumentationPalettes, random);
  const nextMoodTags =
    locks.moodTags && previousResult
      ? previousResult.moodTags
      : pickMoodTags(moodTagsSource, genre.energyFeels, random);

  return {
    generationSeed: seedValue,
    mainGenre: genre.label,
    flavorGenre:
      locks.flavorGenre && previousResult
        ? previousResult.flavorGenre
        : buildFlavorGenre(flavorGenres, random),
    bpm: locks.bpm && previousResult ? previousResult.bpm : randomInt(nextRange[0], nextRange[1], random),
    scale: nextScale,
    instrumentationPalette: nextInstrumentation,
    signatureSound:
      locks.signatureSound && previousResult
        ? previousResult.signatureSound
        : buildSignatureSound(signatureSounds, nextInstrumentation, genre.energyFeels, nextMoodTags, random),
    era: locks.era && previousResult ? previousResult.era : pick(eras, random),
    moodTags: nextMoodTags,
    songStructure: nextSongStructure,
    intensityMap:
      locks.intensityMap && previousResult
        ? previousResult.intensityMap
        : buildIntensityMap(nextSongStructure, random)
  };
}
