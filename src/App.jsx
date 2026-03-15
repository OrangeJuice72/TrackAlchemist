import { useMemo, useState } from 'react';
import { GENRE_DATA } from './data.js';
import { generateIdea } from './generator.js';

const genreEntries = Object.entries(GENRE_DATA);
const lockableFields = [
  'flavorGenre',
  'bpm',
  'scale',
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

  const genreLabel = useMemo(() => {
    const primaryLabel = GENRE_DATA[selectedGenre].label;

    if (!secondaryGenre) {
      return primaryLabel;
    }

    return `${primaryLabel} x ${GENRE_DATA[secondaryGenre].label}`;
  }, [secondaryGenre, selectedGenre]);

  const handleGenerate = () => {
    setResult((previousResult) =>
      generateIdea(selectedGenre, secondaryGenre, lockedFields, previousResult)
    );
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

  return (
    <div className="app-shell">
      <div className="container">
        <header className="hero-card">
          <p className="eyebrow">Track concept generator</p>
          <h1>Song Instrumental Generator</h1>
          <p className="subtitle">
            Blend up to two main genres, reroll concepts, and lock any field you want to keep
            while the rest of the idea keeps evolving.
          </p>
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
            <span className="badge">{result.bpm} BPM</span>
          </div>

          <div className="result-grid">
            <LockableResultCard
              title="Flavor Genre"
              value={result.flavorGenre}
              isLocked={lockedFields.flavorGenre}
              onToggleLock={() => toggleLock('flavorGenre')}
            />
            <LockableResultCard
              title="Scale"
              value={result.scale}
              isLocked={lockedFields.scale}
              onToggleLock={() => toggleLock('scale')}
            />
            <LockableResultCard
              title="Signature Sound"
              value={result.signatureSound}
              isLocked={lockedFields.signatureSound}
              onToggleLock={() => toggleLock('signatureSound')}
            />
            <LockableResultCard
              title="Energy Feel"
              value={result.energyFeel}
              isLocked={lockedFields.energyFeel}
              onToggleLock={() => toggleLock('energyFeel')}
            />
            <LockableResultCard
              title="Song Structure"
              value={result.songStructure}
              isLocked={lockedFields.songStructure}
              onToggleLock={() => toggleLock('songStructure')}
            />
            <LockableResultCard
              title="BPM"
              value={`${result.bpm} BPM`}
              isLocked={lockedFields.bpm}
              onToggleLock={() => toggleLock('bpm')}
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
            <ul>
              {result.instrumentationPalette.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

function LockableResultCard({ title, value, isLocked, onToggleLock }) {
  return (
    <article className="result-card">
      <div className="card-heading">
        <p>{title}</p>
        <LockButton isLocked={isLocked} onClick={onToggleLock} />
      </div>
      <h3>{value}</h3>
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
