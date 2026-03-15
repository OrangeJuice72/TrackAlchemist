import { useMemo, useState } from 'react';
import { GENRE_DATA } from './data.js';
import { generateIdea } from './generator.js';

const genreEntries = Object.entries(GENRE_DATA);
const lockableFields = [
  'flavorGenre',
  'bpm',
  'scale',
  'era',
  'signatureSound',
  'energyFeel',
  'songStructure',
  'instrumentationPalette'
];

function createEmptyLocks() {
  return lockableFields.reduce((locks, field) => {
    locks[field] = false;
    return locks;
  }, {});
}

function App() {
  const [selectedGenre, setSelectedGenre] = useState(genreEntries[0][0]);
  const [secondaryGenre, setSecondaryGenre] = useState('');
  const [lockedFields, setLockedFields] = useState(createEmptyLocks);
  const [result, setResult] = useState(() => generateIdea(genreEntries[0][0], ''));
  const [premise, setPremise] = useState('');
  const [copyState, setCopyState] = useState('idle');

  const genreLabel = useMemo(() => {
    const primaryLabel = GENRE_DATA[selectedGenre].label;
    return secondaryGenre ? `${primaryLabel} x ${GENRE_DATA[secondaryGenre].label}` : primaryLabel;
  }, [secondaryGenre, selectedGenre]);

  const handleGenerate = () => {
    setResult((previousResult) =>
      generateIdea(selectedGenre, secondaryGenre, lockedFields, previousResult)
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

  const handlePrimaryGenreChange = (event) => {
    const nextPrimaryGenre = event.target.value;
    const nextSecondaryGenre = nextPrimaryGenre === secondaryGenre ? '' : secondaryGenre;
    setSelectedGenre(nextPrimaryGenre);
    setSecondaryGenre(nextSecondaryGenre);
    setResult(generateIdea(nextPrimaryGenre, nextSecondaryGenre));
  };

  const handleSecondaryGenreChange = (event) => {
    const nextSecondaryGenre = event.target.value;
    setSecondaryGenre(nextSecondaryGenre);
    setResult(generateIdea(selectedGenre, nextSecondaryGenre));
  };

  const handleCopyPrompt = async () => {
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
      lockedFields,
      premise,
      generatedConcept: {
        mainGenre: result.mainGenre,
        flavorGenre: result.flavorGenre,
        bpm: result.bpm,
        scale: result.scale,
        era: result.era,
        instrumentationPalette: result.instrumentationPalette,
        signatureSound: result.signatureSound,
        energyFeel: result.energyFeel,
        songStructure: result.songStructure
      },
      prompt:
        `Create an original track concept using the following parameters: ` +
        `${premise ? `Premise: "${premise}". ` : ''}` +
        `${result.mainGenre} main genre blend, ${result.flavorGenre} flavor, ${result.bpm} BPM, ` +
        `${result.scale} scale, ${result.era} aesthetic, instrumentation palette of ${result.instrumentationPalette.join(', ')}, ` +
        `signature sound "${result.signatureSound}", energy feel "${result.energyFeel}", and song structure "${result.songStructure}".`
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 2000);
    } catch {
      setCopyState('failed');
    }
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
            Blend up to two main genres, reroll concepts, edit any result, and lock the parts you
            want to keep.
          </p>
          <div className="hero-stats">
            <HeroStat label="Main Genres" value="25" />
            <HeroStat label="Flavor Genres" value="100" />
            <HeroStat label="Song Structures" value="36" />
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
                placeholder="What is the song about?"
              />
            </div>
          </div>

          <button className="generate-button" onClick={handleGenerate}>
            Generate Idea
          </button>
        </section>

        <section className="panel results-panel">
          <div className="result-header">
            <div>
              <p className="result-label">Current concept</p>
              <h2>{genreLabel}</h2>
            </div>
            <div className="result-actions">
              <span className="badge">{result.bpm} BPM</span>
              <button type="button" className="copy-button" onClick={handleCopyPrompt}>
                Copy JSON Prompt
              </button>
            </div>
          </div>

          {copyState !== 'idle' ? (
            <p className={`copy-status${copyState === 'failed' ? ' is-error' : ''}`}>
              {copyState === 'copied'
                ? 'JSON prompt copied to clipboard.'
                : 'Clipboard copy failed. Try again in a secure browser tab.'}
            </p>
          ) : null}

          <div className="prompt-preview">
            <p className="result-label">Prompt Snapshot</p>
            <p>
              {premise ? `${premise} ` : ''}
              {result.era} {result.flavorGenre.toLowerCase()} energy at {result.bpm} BPM with{' '}
              {result.signatureSound.toLowerCase()}.
            </p>
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
