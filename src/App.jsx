import { useMemo, useState } from 'react';
import logoImage from '../logo.png';
import { GENRE_DATA } from './data.js';
import { generateIdea } from './generator.js';

const genreEntries = Object.entries(GENRE_DATA);
const favoritesStorageKey = 'trackalchemist-favorites';
const promptTemplates = [
  { key: 'generic', label: 'Generic Prompt' },
  { key: 'chatgpt', label: 'ChatGPT Brief' },
  { key: 'suno', label: 'Suno Prompt' },
  { key: 'udio', label: 'Udio Prompt' },
  { key: 'producer', label: 'Producer Brief' }
];
const lockableFields = [
  'flavorGenre',
  'bpm',
  'scale',
  'era',
  'signatureSound',
  'energyFeel',
  'songStructure',
  'instrumentationPalette',
  'moodTags',
  'arrangement',
  'chordProgression',
  'keyCenter',
  'intensityMap'
];

const promptFieldDefinitions = [
  { key: 'premise', label: 'Premise' },
  { key: 'referenceArtists', label: 'References' },
  { key: 'mainGenre', label: 'Main Genre' },
  { key: 'flavorGenre', label: 'Flavor Genre' },
  { key: 'bpm', label: 'BPM' },
  { key: 'scale', label: 'Scale' },
  { key: 'keyCenter', label: 'Key Center' },
  { key: 'chordProgression', label: 'Chord Progression' },
  { key: 'era', label: 'Era' },
  { key: 'moodTags', label: 'Mood Tags' },
  { key: 'energyFeel', label: 'Energy Feel' },
  { key: 'songStructure', label: 'Song Structure' },
  { key: 'instrumentationPalette', label: 'Instrumentation' },
  { key: 'signatureSound', label: 'Signature Sound' },
  { key: 'arrangement', label: 'Arrangement' },
  { key: 'intensityMap', label: 'Intensity Map' },
  { key: 'seed', label: 'Seed' }
];

function createEmptyLocks() {
  return lockableFields.reduce((locks, field) => {
    locks[field] = false;
    return locks;
  }, {});
}

function createPromptInclusions() {
  return promptFieldDefinitions.reduce((inclusions, field) => {
    inclusions[field.key] = true;
    return inclusions;
  }, {});
}

function createRandomSeed() {
  return `TA-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
}

function readFavorites() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    return JSON.parse(window.localStorage.getItem(favoritesStorageKey) ?? '[]');
  } catch {
    return [];
  }
}

function persistFavorites(favorites) {
  window.localStorage.setItem(favoritesStorageKey, JSON.stringify(favorites));
}

function buildIntensityText(intensityMap) {
  return intensityMap.map((item) => `${item.section} ${item.level}/10`).join(', ');
}

function buildArrangementText(arrangement) {
  return arrangement.map((item) => `${item.section}: ${item.note}`).join(' ');
}

function buildPrompt({
  premise,
  referenceArtists,
  result,
  promptTemplate,
  seedInput,
  promptInclusions
}) {
  const isIncluded = (field) => promptInclusions[field] !== false;
  const intensityText = buildIntensityText(result.intensityMap);
  const arrangementText = buildArrangementText(result.arrangement);
  const moodText = result.moodTags.length > 0 ? result.moodTags.join(', ') : '';
  const instrumentationText = result.instrumentationPalette.join(', ');
  const baseContext = [];

  if (isIncluded('premise') && premise) {
    baseContext.push(`Premise: "${premise}".`);
  }

  if (isIncluded('referenceArtists') && referenceArtists) {
    baseContext.push(`Reference artists or producers: ${referenceArtists}.`);
  }

  switch (promptTemplate) {
    case 'chatgpt': {
      const parts = ['Create a polished song brief and production plan.', ...baseContext];
      if (isIncluded('mainGenre')) parts.push(`Genre blend: ${result.mainGenre}.`);
      if (isIncluded('flavorGenre')) parts.push(`Flavor genre: ${result.flavorGenre}.`);
      if (isIncluded('bpm')) parts.push(`Tempo: ${result.bpm} BPM.`);
      if (isIncluded('keyCenter')) parts.push(`Key center: ${result.keyCenter}.`);
      if (isIncluded('scale')) parts.push(`Scale: ${result.scale}.`);
      if (isIncluded('chordProgression')) parts.push(`Chord progression: ${result.chordProgression}.`);
      if (isIncluded('era')) parts.push(`Era: ${result.era}.`);
      if (isIncluded('moodTags') && moodText) parts.push(`Mood tags: ${moodText}.`);
      if (isIncluded('energyFeel')) parts.push(`Energy feel: ${result.energyFeel}.`);
      if (isIncluded('instrumentationPalette')) {
        parts.push(`Instrumentation palette: ${instrumentationText}.`);
      }
      if (isIncluded('signatureSound')) parts.push(`Signature sound: ${result.signatureSound}.`);
      if (isIncluded('songStructure')) parts.push(`Song structure: ${result.songStructure}.`);
      if (isIncluded('intensityMap')) parts.push(`Intensity map: ${intensityText}.`);
      if (isIncluded('arrangement')) parts.push(`Arrangement notes: ${arrangementText}.`);
      if (isIncluded('seed')) parts.push(`Seed: ${seedInput}.`);
      return parts.join(' ');
    }
    case 'suno': {
      const fragments = [...baseContext];
      if (isIncluded('mainGenre')) fragments.push(result.mainGenre);
      if (isIncluded('flavorGenre')) fragments.push(result.flavorGenre);
      if (isIncluded('era')) fragments.push(result.era);
      if (isIncluded('energyFeel')) fragments.push(result.energyFeel);
      if (isIncluded('bpm')) fragments.push(`${result.bpm} BPM`);
      if (isIncluded('keyCenter')) fragments.push(result.keyCenter);
      if (isIncluded('scale')) fragments.push(`${result.scale} scale`);
      if (isIncluded('chordProgression')) fragments.push(`chord progression ${result.chordProgression}`);
      if (isIncluded('moodTags') && moodText) fragments.push(`moods ${moodText}`);
      if (isIncluded('signatureSound')) fragments.push(`signature sound ${result.signatureSound}`);
      if (isIncluded('instrumentationPalette')) {
        fragments.push(`instrumentation ${instrumentationText}`);
      }

      const parts = [];
      if (fragments.length > 0) parts.push(`${fragments.join(', ')}.`);
      if (isIncluded('songStructure')) parts.push(`Structure: ${result.songStructure}.`);
      if (isIncluded('intensityMap')) parts.push(`Intensity: ${intensityText}.`);
      if (isIncluded('arrangement')) parts.push(`Arrangement: ${arrangementText}.`);
      if (isIncluded('seed')) parts.push(`Seed: ${seedInput}.`);
      return parts.join(' ');
    }
    case 'udio': {
      const parts = ['Song prompt:', ...baseContext];
      if (isIncluded('mainGenre') && isIncluded('flavorGenre')) {
        parts.push(`${result.mainGenre} blend with ${result.flavorGenre} flavor.`);
      } else if (isIncluded('mainGenre')) {
        parts.push(`${result.mainGenre} blend.`);
      } else if (isIncluded('flavorGenre')) {
        parts.push(`${result.flavorGenre} flavor.`);
      }
      if (isIncluded('era')) parts.push(`${result.era} tone.`);
      if (isIncluded('bpm') && isIncluded('keyCenter')) {
        parts.push(`${result.bpm} BPM in ${result.keyCenter}.`);
      } else if (isIncluded('bpm')) {
        parts.push(`${result.bpm} BPM.`);
      } else if (isIncluded('keyCenter')) {
        parts.push(`Key center ${result.keyCenter}.`);
      }
      if (isIncluded('scale')) parts.push(`Scale ${result.scale}.`);
      if (isIncluded('chordProgression')) parts.push(`Progression ${result.chordProgression}.`);
      if (isIncluded('instrumentationPalette') && isIncluded('signatureSound')) {
        parts.push(`Use ${instrumentationText} with ${result.signatureSound}.`);
      } else if (isIncluded('instrumentationPalette')) {
        parts.push(`Use ${instrumentationText}.`);
      } else if (isIncluded('signatureSound')) {
        parts.push(`Feature ${result.signatureSound}.`);
      }
      if (isIncluded('moodTags') && moodText) parts.push(`Moods: ${moodText}.`);
      if (isIncluded('energyFeel')) parts.push(`Energy: ${result.energyFeel}.`);
      if (isIncluded('songStructure')) parts.push(`Structure ${result.songStructure}.`);
      if (isIncluded('intensityMap')) parts.push(`Intensity map ${intensityText}.`);
      if (isIncluded('arrangement')) parts.push(`Arrangement ${arrangementText}.`);
      if (isIncluded('seed')) parts.push(`Seed ${seedInput}.`);
      return parts.join(' ');
    }
    case 'producer': {
      const parts = ['Producer brief.', ...baseContext];
      if (isIncluded('mainGenre')) parts.push(`Blend ${result.mainGenre}.`);
      if (isIncluded('flavorGenre')) parts.push(`Flavor ${result.flavorGenre}.`);
      if (isIncluded('keyCenter')) parts.push(`Key ${result.keyCenter}.`);
      if (isIncluded('scale')) parts.push(`Scale ${result.scale}.`);
      if (isIncluded('chordProgression')) parts.push(`Progression ${result.chordProgression}.`);
      if (isIncluded('bpm')) parts.push(`Tempo ${result.bpm}.`);
      if (isIncluded('era')) parts.push(`Era ${result.era}.`);
      if (isIncluded('moodTags') && moodText) parts.push(`Moods ${moodText}.`);
      if (isIncluded('energyFeel')) parts.push(`Energy ${result.energyFeel}.`);
      if (isIncluded('signatureSound')) parts.push(`Signature ${result.signatureSound}.`);
      if (isIncluded('instrumentationPalette')) parts.push(`Palette ${instrumentationText}.`);
      if (isIncluded('songStructure')) parts.push(`Structure ${result.songStructure}.`);
      if (isIncluded('intensityMap')) parts.push(`Intensity ${intensityText}.`);
      if (isIncluded('arrangement')) parts.push(`Arrangement ${arrangementText}.`);
      if (isIncluded('seed')) parts.push(`Seed ${seedInput}.`);
      return parts.join(' ');
    }
    default: {
      const parts = ['Create an original track concept.', ...baseContext];
      if (isIncluded('mainGenre')) parts.push(`${result.mainGenre} genre blend.`);
      if (isIncluded('flavorGenre')) parts.push(`${result.flavorGenre} flavor.`);
      if (isIncluded('bpm')) parts.push(`${result.bpm} BPM.`);
      if (isIncluded('keyCenter')) parts.push(`${result.keyCenter}.`);
      if (isIncluded('scale')) parts.push(`${result.scale} scale.`);
      if (isIncluded('chordProgression')) parts.push(`Chord progression ${result.chordProgression}.`);
      if (isIncluded('era')) parts.push(`${result.era} aesthetic.`);
      if (isIncluded('instrumentationPalette')) {
        parts.push(`Instrumentation palette of ${instrumentationText}.`);
      }
      if (isIncluded('signatureSound')) parts.push(`Signature sound "${result.signatureSound}".`);
      if (isIncluded('energyFeel')) parts.push(`Energy feel "${result.energyFeel}".`);
      if (isIncluded('songStructure')) parts.push(`Song structure "${result.songStructure}".`);
      if (isIncluded('moodTags') && moodText) parts.push(`Mood tags: ${moodText}.`);
      if (isIncluded('intensityMap')) parts.push(`Intensity map: ${intensityText}.`);
      if (isIncluded('arrangement')) parts.push(`Arrangement notes: ${arrangementText}.`);
      if (isIncluded('seed')) parts.push(`Seed: ${seedInput}.`);
      return parts.join(' ');
    }
  }
}

function App() {
  const initialSeed = useMemo(() => createRandomSeed(), []);
  const [selectedGenre, setSelectedGenre] = useState(genreEntries[0][0]);
  const [secondaryGenre, setSecondaryGenre] = useState('');
  const [blendWeight, setBlendWeight] = useState(65);
  const [seedInput, setSeedInput] = useState(initialSeed);
  const [seedLocked, setSeedLocked] = useState(false);
  const [promptTemplate, setPromptTemplate] = useState('generic');
  const [lockedFields, setLockedFields] = useState(createEmptyLocks);
  const [promptInclusions, setPromptInclusions] = useState(createPromptInclusions);
  const [result, setResult] = useState(() =>
    generateIdea(genreEntries[0][0], '', {}, null, 65, {}, initialSeed)
  );
  const [premise, setPremise] = useState('');
  const [referenceArtists, setReferenceArtists] = useState('');
  const [copyState, setCopyState] = useState('idle');
  const [favorites, setFavorites] = useState(readFavorites);

  const genreLabel = useMemo(() => {
    const primaryLabel = GENRE_DATA[selectedGenre].label;
    return secondaryGenre ? `${primaryLabel} x ${GENRE_DATA[secondaryGenre].label}` : primaryLabel;
  }, [secondaryGenre, selectedGenre]);

  const blendSummary = secondaryGenre
    ? `${blendWeight}% ${GENRE_DATA[selectedGenre].label} / ${100 - blendWeight}% ${GENRE_DATA[secondaryGenre].label}`
    : `${GENRE_DATA[selectedGenre].label} only`;

  const plainPrompt = buildPrompt({
    premise,
    referenceArtists,
    result,
    promptTemplate,
    seedInput,
    promptInclusions
  });

  const generateWithState = ({
    nextPrimaryGenre = selectedGenre,
    nextSecondaryGenre = secondaryGenre,
    nextLocks = lockedFields,
    previousResult = null,
    nextWeight = blendWeight,
    nextSeed = seedInput,
    useRandomSeed = false
  } = {}) => {
    const resolvedSeed = useRandomSeed ? createRandomSeed() : nextSeed || createRandomSeed();
    setSeedInput(resolvedSeed);
    return generateIdea(
      nextPrimaryGenre,
      nextSecondaryGenre,
      nextLocks,
      previousResult,
      nextWeight,
      {},
      resolvedSeed
    );
  };

  const handleGenerate = () => {
    setResult((previousResult) =>
      generateWithState({
        previousResult,
        useRandomSeed: !seedLocked
      })
    );
  };

  const updateResultField = (field, value) => {
    setResult((currentResult) => ({
      ...currentResult,
      [field]: value
    }));
  };

  const toggleLock = (field) => {
    setLockedFields((currentLocks) => ({
      ...currentLocks,
      [field]: !currentLocks[field]
    }));
  };

  const togglePromptInclusion = (field) => {
    setPromptInclusions((currentInclusions) => ({
      ...currentInclusions,
      [field]: !currentInclusions[field]
    }));
  };

  const handlePrimaryGenreChange = (event) => {
    const nextPrimaryGenre = event.target.value;
    const nextSecondaryGenre = nextPrimaryGenre === secondaryGenre ? '' : secondaryGenre;
    const resetLocks = createEmptyLocks();
    setSelectedGenre(nextPrimaryGenre);
    setSecondaryGenre(nextSecondaryGenre);
    setLockedFields(resetLocks);
    setResult(
      generateWithState({
        nextPrimaryGenre,
        nextSecondaryGenre,
        nextLocks: resetLocks,
        useRandomSeed: !seedLocked
      })
    );
  };

  const handleSecondaryGenreChange = (event) => {
    const nextSecondaryGenre = event.target.value;
    const resetLocks = createEmptyLocks();
    setSecondaryGenre(nextSecondaryGenre);
    setLockedFields(resetLocks);
    setResult(
      generateWithState({
        nextSecondaryGenre,
        nextLocks: resetLocks,
        useRandomSeed: !seedLocked
      })
    );
  };

  const handleWeightChange = (event) => {
    const nextWeight = Number(event.target.value);
    const resetLocks = createEmptyLocks();
    setBlendWeight(nextWeight);
    setLockedFields(resetLocks);
    setResult(
      generateWithState({
        nextWeight,
        nextLocks: resetLocks,
        useRandomSeed: !seedLocked
      })
    );
  };

  const handleSeedChange = (event) => {
    setSeedInput(event.target.value);
  };

  const handleCopyJsonPrompt = async () => {
    const payload = {
      promptType: 'track-concept',
      promptTemplate,
      generationSeed: seedInput,
      primaryGenre: {
        key: selectedGenre,
        label: GENRE_DATA[selectedGenre].label
      },
      secondaryGenre: secondaryGenre
        ? {
            key: secondaryGenre,
            label: GENRE_DATA[secondaryGenre].label
          }
        : null,
      blendWeight,
      seedLocked,
      lockedFields,
      promptInclusions,
      premise,
      referenceArtists,
      generatedConcept: {
        mainGenre: result.mainGenre,
        flavorGenre: result.flavorGenre,
        bpm: result.bpm,
        scale: result.scale,
        keyCenter: result.keyCenter,
        chordProgression: result.chordProgression,
        era: result.era,
        moodTags: result.moodTags,
        instrumentationPalette: result.instrumentationPalette,
        signatureSound: result.signatureSound,
        energyFeel: result.energyFeel,
        songStructure: result.songStructure,
        arrangement: result.arrangement,
        intensityMap: result.intensityMap
      },
      prompt: plainPrompt
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      setCopyState('json');
      window.setTimeout(() => setCopyState('idle'), 2000);
    } catch {
      setCopyState('failed');
    }
  };

  const handleCopyPlainPrompt = async () => {
    try {
      await navigator.clipboard.writeText(plainPrompt);
      setCopyState('plain');
      window.setTimeout(() => setCopyState('idle'), 2000);
    } catch {
      setCopyState('failed');
    }
  };

  const handleSaveFavorite = () => {
    const nextFavorites = [
      {
        id: Date.now(),
        title: premise || `${result.mainGenre} / ${result.flavorGenre}`,
        selectedGenre,
        secondaryGenre,
        blendWeight,
        seedInput,
        seedLocked,
        promptTemplate,
        premise,
        referenceArtists,
        lockedFields,
        promptInclusions,
        result
      },
      ...favorites
    ].slice(0, 20);

    setFavorites(nextFavorites);
    persistFavorites(nextFavorites);
  };

  const handleLoadFavorite = (favorite) => {
    setSelectedGenre(favorite.selectedGenre);
    setSecondaryGenre(favorite.secondaryGenre);
    setBlendWeight(favorite.blendWeight);
    setSeedInput(favorite.seedInput ?? createRandomSeed());
    setSeedLocked(Boolean(favorite.seedLocked));
    setPromptTemplate(favorite.promptTemplate ?? 'generic');
    setPremise(favorite.premise);
    setReferenceArtists(favorite.referenceArtists);
    setLockedFields(favorite.lockedFields ?? createEmptyLocks());
    setPromptInclusions(favorite.promptInclusions ?? createPromptInclusions());
    setResult(favorite.result);
  };

  const handleDeleteFavorite = (favoriteId) => {
    const nextFavorites = favorites.filter((favorite) => favorite.id !== favoriteId);
    setFavorites(nextFavorites);
    persistFavorites(nextFavorites);
  };

  return (
    <div className="app-shell">
      <div className="background-orb background-orb-one" aria-hidden="true" />
      <div className="background-orb background-orb-two" aria-hidden="true" />
      <div className="background-grid" aria-hidden="true" />
      <div className="container">
        <header className="hero-card">
          <div className="hero-brand">
            <div className="hero-logo-shell">
              <img className="hero-logo" src={logoImage} alt="TrackAlchemist logo" />
            </div>
            <div className="hero-copy">
              <p className="eyebrow">TRACK GENERATOR</p>
              <h1>TrackAlchemist</h1>
            </div>
          </div>
        </header>

        <section className="panel controls-panel">
          <div className="controls-grid">
            <div className="field-group">
              <div className="label-row">
                <label htmlFor="genre-select">Primary Main Genre</label>
                <PromptSwitch
                  isEnabled={promptInclusions.mainGenre}
                  onClick={() => togglePromptInclusion('mainGenre')}
                />
              </div>
              <select id="genre-select" value={selectedGenre} onChange={handlePrimaryGenreChange}>
                {genreEntries.map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="secondary-genre-select">Secondary Main Genre</label>
              <select
                id="secondary-genre-select"
                value={secondaryGenre}
                onChange={handleSecondaryGenreChange}
              >
                <option value="">None</option>
                {genreEntries
                  .filter(([key]) => key !== selectedGenre)
                  .map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.label}
                    </option>
                  ))}
              </select>
            </div>

            <div className="field-group field-group-wide">
              <div className="label-row">
                <label htmlFor="premise-input">Premise</label>
                <PromptSwitch
                  isEnabled={promptInclusions.premise}
                  onClick={() => togglePromptInclusion('premise')}
                />
              </div>
              <textarea
                id="premise-input"
                className="result-input result-textarea"
                value={premise}
                onChange={(event) => setPremise(event.target.value)}
                placeholder="What is the track about?"
              />
            </div>

            <div className="field-group field-group-wide">
              <div className="label-row">
                <label htmlFor="reference-artists-input">Reference Artists / Producers</label>
                <PromptSwitch
                  isEnabled={promptInclusions.referenceArtists}
                  onClick={() => togglePromptInclusion('referenceArtists')}
                />
              </div>
              <input
                id="reference-artists-input"
                className="result-input"
                value={referenceArtists}
                onChange={(event) => setReferenceArtists(event.target.value)}
                placeholder="Example: Metro Boomin, Kaytranada, Hans Zimmer"
              />
            </div>

            <div className="field-group field-group-wide">
              <label htmlFor="blend-weight">
                Hybrid Weight
                <span className="inline-note">{blendSummary}</span>
              </label>
              <input
                id="blend-weight"
                className="blend-slider"
                type="range"
                min="0"
                max="100"
                value={secondaryGenre ? blendWeight : 100}
                disabled={!secondaryGenre}
                onChange={handleWeightChange}
              />
            </div>
          </div>

          <div className="button-stack">
            <button className="generate-button" onClick={handleGenerate}>
              Generate Idea
            </button>
            <button type="button" className="copy-button" onClick={handleSaveFavorite}>
              Save Favorite
            </button>
          </div>
        </section>

        <section className="panel results-panel">
          <div className="result-header">
            <div>
              <p className="result-label">Current concept</p>
              <h2>{genreLabel}</h2>
            </div>
            <div className="result-actions">
              <span className="badge">{result.bpm} BPM</span>
              <span className="badge">Seed {seedInput}</span>
              <button type="button" className="copy-button" onClick={handleCopyJsonPrompt}>
                Copy JSON Prompt
              </button>
              <button type="button" className="copy-button" onClick={handleCopyPlainPrompt}>
                Copy Plain Prompt
              </button>
            </div>
          </div>

          {copyState !== 'idle' ? (
            <p className={`copy-status${copyState === 'failed' ? ' is-error' : ''}`}>
              {copyState === 'json' && 'JSON prompt copied to clipboard.'}
              {copyState === 'plain' && 'Plain prompt copied to clipboard.'}
              {copyState === 'failed' && 'Clipboard copy failed. Try again in a secure browser tab.'}
            </p>
          ) : null}

          <div className="meta-grid">
            <div className="field-group">
              <div className="label-row">
                <label htmlFor="seed-input">Generation Seed</label>
                <PromptSwitch
                  isEnabled={promptInclusions.seed}
                  onClick={() => togglePromptInclusion('seed')}
                />
              </div>
              <div className="seed-field">
                <input
                  id="seed-input"
                  className="result-input"
                  value={seedInput}
                  onChange={handleSeedChange}
                  placeholder="Type a repeatable seed"
                />
                <button
                  type="button"
                  className={`lock-button${seedLocked ? ' is-locked' : ''}`}
                  onClick={() => setSeedLocked((currentValue) => !currentValue)}
                >
                  {seedLocked ? 'Seed Locked' : 'Seed Random'}
                </button>
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="prompt-template">Prompt Template</label>
              <select
                id="prompt-template"
                value={promptTemplate}
                onChange={(event) => setPromptTemplate(event.target.value)}
              >
                {promptTemplates.map((template) => (
                  <option key={template.key} value={template.key}>
                    {template.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="prompt-preview">
            <p className="result-label">Prompt Snapshot</p>
            <p>{plainPrompt}</p>
          </div>

          <div className="result-grid">
            <EditableResultCard
              title="Flavor Genre"
              value={result.flavorGenre}
              isLocked={lockedFields.flavorGenre}
              isPromptEnabled={promptInclusions.flavorGenre}
              onToggleLock={() => toggleLock('flavorGenre')}
              onTogglePrompt={() => togglePromptInclusion('flavorGenre')}
              onChange={(value) => updateResultField('flavorGenre', value)}
            />
            <EditableResultCard
              title="Scale"
              value={result.scale}
              isLocked={lockedFields.scale}
              isPromptEnabled={promptInclusions.scale}
              onToggleLock={() => toggleLock('scale')}
              onTogglePrompt={() => togglePromptInclusion('scale')}
              onChange={(value) => updateResultField('scale', value)}
            />
            <EditableResultCard
              title="Key Center"
              value={result.keyCenter}
              isLocked={lockedFields.keyCenter}
              isPromptEnabled={promptInclusions.keyCenter}
              onToggleLock={() => toggleLock('keyCenter')}
              onTogglePrompt={() => togglePromptInclusion('keyCenter')}
              onChange={(value) => updateResultField('keyCenter', value)}
            />
            <EditableResultCard
              title="Chord Progression"
              value={result.chordProgression}
              isLocked={lockedFields.chordProgression}
              isPromptEnabled={promptInclusions.chordProgression}
              onToggleLock={() => toggleLock('chordProgression')}
              onTogglePrompt={() => togglePromptInclusion('chordProgression')}
              onChange={(value) => updateResultField('chordProgression', value)}
            />
            <EditableResultCard
              title="Signature Sound"
              value={result.signatureSound}
              isLocked={lockedFields.signatureSound}
              isPromptEnabled={promptInclusions.signatureSound}
              onToggleLock={() => toggleLock('signatureSound')}
              onTogglePrompt={() => togglePromptInclusion('signatureSound')}
              onChange={(value) => updateResultField('signatureSound', value)}
              multiline
            />
            <EditableResultCard
              title="Era"
              value={result.era}
              isLocked={lockedFields.era}
              isPromptEnabled={promptInclusions.era}
              onToggleLock={() => toggleLock('era')}
              onTogglePrompt={() => togglePromptInclusion('era')}
              onChange={(value) => updateResultField('era', value)}
            />
            <EditableResultCard
              title="Mood Tags"
              value={result.moodTags.join(', ')}
              isLocked={lockedFields.moodTags}
              isPromptEnabled={promptInclusions.moodTags}
              onToggleLock={() => toggleLock('moodTags')}
              onTogglePrompt={() => togglePromptInclusion('moodTags')}
              onChange={(value) =>
                updateResultField(
                  'moodTags',
                  value
                    .split(',')
                    .map((item) => item.trim())
                    .filter(Boolean)
                )
              }
              multiline
            />
            <EditableResultCard
              title="Energy Feel"
              value={result.energyFeel}
              isLocked={lockedFields.energyFeel}
              isPromptEnabled={promptInclusions.energyFeel}
              onToggleLock={() => toggleLock('energyFeel')}
              onTogglePrompt={() => togglePromptInclusion('energyFeel')}
              onChange={(value) => updateResultField('energyFeel', value)}
            />
            <EditableResultCard
              title="Song Structure"
              value={result.songStructure}
              isLocked={lockedFields.songStructure}
              isPromptEnabled={promptInclusions.songStructure}
              onToggleLock={() => toggleLock('songStructure')}
              onTogglePrompt={() => togglePromptInclusion('songStructure')}
              onChange={(value) => updateResultField('songStructure', value)}
              multiline
            />
            <EditableResultCard
              title="BPM"
              value={String(result.bpm)}
              isLocked={lockedFields.bpm}
              isPromptEnabled={promptInclusions.bpm}
              onToggleLock={() => toggleLock('bpm')}
              onTogglePrompt={() => togglePromptInclusion('bpm')}
              onChange={(value) => updateResultField('bpm', value.replace(/[^\d]/g, ''))}
              inputMode="numeric"
            />
          </div>

          <div className="palette-card">
            <div className="card-heading">
              <h3>Instrumentation Palette</h3>
              <div className="card-heading-actions">
                <PromptSwitch
                  isEnabled={promptInclusions.instrumentationPalette}
                  onClick={() => togglePromptInclusion('instrumentationPalette')}
                />
                <LockButton
                  isLocked={lockedFields.instrumentationPalette}
                  onClick={() => toggleLock('instrumentationPalette')}
                />
              </div>
            </div>
            <textarea
              className="result-input result-textarea"
              value={result.instrumentationPalette.join(', ')}
              onChange={(event) =>
                updateResultField(
                  'instrumentationPalette',
                  event.target.value
                    .split(',')
                    .map((item) => item.trim())
                    .filter(Boolean)
                )
              }
            />
          </div>

          <div className="palette-card">
            <div className="card-heading">
              <h3>Section Arrangement</h3>
              <div className="card-heading-actions">
                <PromptSwitch
                  isEnabled={promptInclusions.arrangement}
                  onClick={() => togglePromptInclusion('arrangement')}
                />
                <LockButton
                  isLocked={lockedFields.arrangement}
                  onClick={() => toggleLock('arrangement')}
                />
              </div>
            </div>
            <div className="arrangement-list">
              {result.arrangement.map((item, index) => (
                <div key={`${item.section}-${index}`} className="arrangement-item">
                  <strong>{item.section}</strong>
                  <textarea
                    className="result-input result-textarea"
                    value={item.note}
                    onChange={(event) =>
                      updateResultField(
                        'arrangement',
                        result.arrangement.map((entry, entryIndex) =>
                          entryIndex === index ? { ...entry, note: event.target.value } : entry
                        )
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="palette-card">
            <div className="card-heading">
              <h3>Intensity Map</h3>
              <div className="card-heading-actions">
                <PromptSwitch
                  isEnabled={promptInclusions.intensityMap}
                  onClick={() => togglePromptInclusion('intensityMap')}
                />
                <LockButton
                  isLocked={lockedFields.intensityMap}
                  onClick={() => toggleLock('intensityMap')}
                />
              </div>
            </div>
            <div className="arrangement-list">
              {result.intensityMap.map((item, index) => (
                <div key={`${item.section}-intensity-${index}`} className="arrangement-item">
                  <strong>{item.section}</strong>
                  <input
                    className="result-input"
                    inputMode="numeric"
                    value={String(item.level)}
                    onChange={(event) =>
                      updateResultField(
                        'intensityMap',
                        result.intensityMap.map((entry, entryIndex) =>
                          entryIndex === index
                            ? {
                                ...entry,
                                level: Math.min(
                                  10,
                                  Math.max(1, Number(event.target.value.replace(/[^\d]/g, '')) || 1)
                                )
                              }
                            : entry
                        )
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="panel favorites-panel">
          <div className="card-heading">
            <div>
              <p className="result-label">Saved Presets</p>
              <h3>Favorites</h3>
            </div>
          </div>
          {favorites.length === 0 ? (
            <p className="empty-state">Save a strong concept and it will appear here.</p>
          ) : (
            <div className="favorites-list">
              {favorites.map((favorite) => (
                <article key={favorite.id} className="favorite-card">
                  <div>
                    <strong>{favorite.title}</strong>
                    <p>{favorite.result.mainGenre}</p>
                  </div>
                  <div className="favorite-actions">
                    <button
                      type="button"
                      className="copy-button"
                      onClick={() => handleLoadFavorite(favorite)}
                    >
                      Load
                    </button>
                    <button
                      type="button"
                      className="lock-button"
                      onClick={() => handleDeleteFavorite(favorite.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function EditableResultCard({
  title,
  value,
  isLocked,
  isPromptEnabled,
  onToggleLock,
  onTogglePrompt,
  onChange,
  multiline = false,
  inputMode
}) {
  return (
    <article className="result-card">
      <div className="card-heading">
        <p>{title}</p>
        <div className="card-heading-actions">
          <PromptSwitch isEnabled={isPromptEnabled} onClick={onTogglePrompt} />
          <LockButton isLocked={isLocked} onClick={onToggleLock} />
        </div>
      </div>
      {multiline ? (
        <textarea
          className="result-input result-textarea"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          className="result-input"
          value={value}
          inputMode={inputMode}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </article>
  );
}

function PromptSwitch({ isEnabled, onClick }) {
  return (
    <button
      type="button"
      className={`prompt-switch${isEnabled ? ' is-enabled' : ''}`}
      onClick={onClick}
    >
      {isEnabled ? 'Prompt On' : 'Prompt Off'}
    </button>
  );
}

function LockButton({ isLocked, onClick }) {
  return (
    <button
      type="button"
      className={`lock-button${isLocked ? ' is-locked' : ''}`}
      onClick={onClick}
    >
      {isLocked ? 'Locked' : 'Lock'}
    </button>
  );
}

export default App;
