import { useMemo, useState } from 'react';
import { GENRE_DATA } from './data.js';
import { generateIdea } from './generator.js';

const genreEntries = Object.entries(GENRE_DATA);
const favoritesStorageKey = 'trackalchemist-favorites';
const customPoolsStorageKey = 'trackalchemist-custom-pools';
const customPoolFields = [
  { key: 'flavorGenres', label: 'Custom Flavor Genres' },
  { key: 'signatureSounds', label: 'Custom Signature Sounds' },
  { key: 'moodTags', label: 'Custom Mood Tags' },
  { key: 'songStructures', label: 'Custom Song Structures' },
  { key: 'eras', label: 'Custom Eras' }
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
  'arrangement'
];

function createEmptyLocks() {
  return lockableFields.reduce((locks, field) => {
    locks[field] = false;
    return locks;
  }, {});
}

function createEmptyCustomPools() {
  return customPoolFields.reduce((pools, field) => {
    pools[field.key] = [];
    return pools;
  }, {});
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

function readCustomPools() {
  if (typeof window === 'undefined') {
    return createEmptyCustomPools();
  }

  try {
    return {
      ...createEmptyCustomPools(),
      ...JSON.parse(window.localStorage.getItem(customPoolsStorageKey) ?? '{}')
    };
  } catch {
    return createEmptyCustomPools();
  }
}

function persistFavorites(favorites) {
  window.localStorage.setItem(favoritesStorageKey, JSON.stringify(favorites));
}

function persistCustomPools(customPools) {
  window.localStorage.setItem(customPoolsStorageKey, JSON.stringify(customPools));
}

function buildPlainPrompt({ premise, referenceArtists, result }) {
  const referenceText = referenceArtists
    ? `Reference artists or producers: ${referenceArtists}. `
    : '';
  const moodText = result.moodTags.length > 0 ? `Mood tags: ${result.moodTags.join(', ')}. ` : '';
  const arrangementText = result.arrangement
    .map((item) => `${item.section}: ${item.note}`)
    .join(' ');

  return (
    `Create an original track concept. ` +
    `${premise ? `Premise: "${premise}". ` : ''}` +
    `${referenceText}` +
    `${result.mainGenre} genre blend, ${result.flavorGenre} flavor, ${result.bpm} BPM, ` +
    `${result.scale} scale, ${result.era} aesthetic, instrumentation palette of ${result.instrumentationPalette.join(', ')}, ` +
    `signature sound "${result.signatureSound}", energy feel "${result.energyFeel}", song structure "${result.songStructure}". ` +
    `${moodText}` +
    `Arrangement notes: ${arrangementText}`
  );
}

function App() {
  const [selectedGenre, setSelectedGenre] = useState(genreEntries[0][0]);
  const [secondaryGenre, setSecondaryGenre] = useState('');
  const [blendWeight, setBlendWeight] = useState(65);
  const [lockedFields, setLockedFields] = useState(createEmptyLocks);
  const [customPools, setCustomPools] = useState(readCustomPools);
  const [result, setResult] = useState(() =>
    generateIdea(genreEntries[0][0], '', {}, null, 65, readCustomPools())
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

  const plainPrompt = buildPlainPrompt({ premise, referenceArtists, result });

  const regenerate = (nextLocks = lockedFields, previousResult = null) =>
    generateIdea(
      selectedGenre,
      secondaryGenre,
      nextLocks,
      previousResult,
      blendWeight,
      customPools
    );

  const handleGenerate = () => {
    setResult((previousResult) => regenerate(lockedFields, previousResult));
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

  const handlePrimaryGenreChange = (event) => {
    const nextPrimaryGenre = event.target.value;
    const nextSecondaryGenre = nextPrimaryGenre === secondaryGenre ? '' : secondaryGenre;
    setSelectedGenre(nextPrimaryGenre);
    setSecondaryGenre(nextSecondaryGenre);
    setResult(generateIdea(nextPrimaryGenre, nextSecondaryGenre, {}, null, blendWeight, customPools));
  };

  const handleSecondaryGenreChange = (event) => {
    const nextSecondaryGenre = event.target.value;
    setSecondaryGenre(nextSecondaryGenre);
    setResult(generateIdea(selectedGenre, nextSecondaryGenre, {}, null, blendWeight, customPools));
  };

  const handleWeightChange = (event) => {
    const nextWeight = Number(event.target.value);
    setBlendWeight(nextWeight);
    setResult(generateIdea(selectedGenre, secondaryGenre, {}, null, nextWeight, customPools));
  };

  const handleCustomPoolChange = (field, value) => {
    const nextPools = {
      ...customPools,
      [field]: value
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean)
    };

    setCustomPools(nextPools);
    persistCustomPools(nextPools);
    setResult(generateIdea(selectedGenre, secondaryGenre, {}, null, blendWeight, nextPools));
  };

  const handleCopyJsonPrompt = async () => {
    const payload = {
      promptType: 'track-concept',
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
      lockedFields,
      premise,
      referenceArtists,
      customPools,
      generatedConcept: {
        mainGenre: result.mainGenre,
        flavorGenre: result.flavorGenre,
        bpm: result.bpm,
        scale: result.scale,
        era: result.era,
        moodTags: result.moodTags,
        instrumentationPalette: result.instrumentationPalette,
        signatureSound: result.signatureSound,
        energyFeel: result.energyFeel,
        songStructure: result.songStructure,
        arrangement: result.arrangement
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
        premise,
        referenceArtists,
        lockedFields,
        customPools,
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
    setPremise(favorite.premise);
    setReferenceArtists(favorite.referenceArtists);
    setLockedFields(favorite.lockedFields);
    setCustomPools(favorite.customPools ?? createEmptyCustomPools());
    persistCustomPools(favorite.customPools ?? createEmptyCustomPools());
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
          <div className="hero-topline">
            <p className="eyebrow">Track concept generator</p>
            <span className="hero-pill">Hybrid-ready</span>
          </div>
          <h1>TrackAlchemist</h1>
          <p className="subtitle">
            Blend genres by ratio, shape the concept with moods and section notes, save presets,
            and inject your own custom pools into the generator.
          </p>
          <div className="hero-stats">
            <HeroStat label="Main Genres" value="25" />
            <HeroStat label="Flavor Genres" value="100+" />
            <HeroStat label="Song Structures" value="36+" />
          </div>
        </header>

        <section className="panel controls-panel">
          <div className="controls-grid">
            <div className="field-group">
              <label htmlFor="genre-select">Primary Main Genre</label>
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
              <label htmlFor="premise-input">Premise</label>
              <textarea
                id="premise-input"
                className="result-input result-textarea"
                value={premise}
                onChange={(event) => setPremise(event.target.value)}
                placeholder="What is the track about?"
              />
            </div>

            <div className="field-group field-group-wide">
              <label htmlFor="reference-artists-input">Reference Artists / Producers</label>
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

          <div className="prompt-preview">
            <p className="result-label">Prompt Snapshot</p>
            <p>{plainPrompt}</p>
          </div>

          <div className="result-grid">
            <EditableResultCard
              title="Flavor Genre"
              value={result.flavorGenre}
              isLocked={lockedFields.flavorGenre}
              onToggleLock={() => toggleLock('flavorGenre')}
              onChange={(value) => updateResultField('flavorGenre', value)}
            />
            <EditableResultCard
              title="Scale"
              value={result.scale}
              isLocked={lockedFields.scale}
              onToggleLock={() => toggleLock('scale')}
              onChange={(value) => updateResultField('scale', value)}
            />
            <EditableResultCard
              title="Signature Sound"
              value={result.signatureSound}
              isLocked={lockedFields.signatureSound}
              onToggleLock={() => toggleLock('signatureSound')}
              onChange={(value) => updateResultField('signatureSound', value)}
              multiline
            />
            <EditableResultCard
              title="Era"
              value={result.era}
              isLocked={lockedFields.era}
              onToggleLock={() => toggleLock('era')}
              onChange={(value) => updateResultField('era', value)}
            />
            <EditableResultCard
              title="Mood Tags"
              value={result.moodTags.join(', ')}
              isLocked={lockedFields.moodTags}
              onToggleLock={() => toggleLock('moodTags')}
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
              onToggleLock={() => toggleLock('energyFeel')}
              onChange={(value) => updateResultField('energyFeel', value)}
            />
            <EditableResultCard
              title="Song Structure"
              value={result.songStructure}
              isLocked={lockedFields.songStructure}
              onToggleLock={() => toggleLock('songStructure')}
              onChange={(value) => updateResultField('songStructure', value)}
              multiline
            />
            <EditableResultCard
              title="BPM"
              value={String(result.bpm)}
              isLocked={lockedFields.bpm}
              onToggleLock={() => toggleLock('bpm')}
              onChange={(value) => updateResultField('bpm', value.replace(/[^\d]/g, ''))}
              inputMode="numeric"
            />
          </div>

          <div className="palette-card">
            <div className="card-heading">
              <h3>Instrumentation Palette</h3>
              <LockButton
                isLocked={lockedFields.instrumentationPalette}
                onClick={() => toggleLock('instrumentationPalette')}
              />
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
              <LockButton
                isLocked={lockedFields.arrangement}
                onClick={() => toggleLock('arrangement')}
              />
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

        <section className="panel favorites-panel">
          <div className="card-heading">
            <div>
              <p className="result-label">Custom Pools</p>
              <h3>Generator Add-Ons</h3>
            </div>
          </div>
          <div className="custom-pools-grid">
            {customPoolFields.map((field) => (
              <div key={field.key} className="arrangement-item">
                <strong>{field.label}</strong>
                <textarea
                  className="result-input result-textarea"
                  value={customPools[field.key].join('\n')}
                  onChange={(event) => handleCustomPoolChange(field.key, event.target.value)}
                  placeholder="One item per line"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function HeroStat({ label, value }) {
  return (
    <div className="hero-stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function EditableResultCard({
  title,
  value,
  isLocked,
  onToggleLock,
  onChange,
  multiline = false,
  inputMode
}) {
  return (
    <article className="result-card">
      <div className="card-heading">
        <p>{title}</p>
        <LockButton isLocked={isLocked} onClick={onToggleLock} />
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
