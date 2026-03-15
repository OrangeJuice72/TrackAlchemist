import { useMemo, useState } from 'react';
import { GENRE_DATA } from './data.js';
import { generateIdea } from './generator.js';

const genreEntries = Object.entries(GENRE_DATA);

function App() {
  const [selectedGenre, setSelectedGenre] = useState(genreEntries[0][0]);
  const [result, setResult] = useState(() => generateIdea(genreEntries[0][0]));

  const genreLabel = useMemo(() => GENRE_DATA[selectedGenre].label, [selectedGenre]);

  const handleGenerate = () => {
    setResult(generateIdea(selectedGenre));
  };

  return (
    <div className="app-shell">
      <div className="container">
        <header className="hero-card">
          <p className="eyebrow">React starter</p>
          <h1>Song Instrumental Generator</h1>
          <p className="subtitle">
            Choose a main genre, then generate a fresh production concept with a flavor genre,
            instrumentation palette, BPM, scale, signature sound, and energy feel.
          </p>
        </header>

        <section className="panel controls-panel">
          <div className="field-group">
            <label htmlFor="genre-select">Main Genre</label>
            <select
              id="genre-select"
              value={selectedGenre}
              onChange={(event) => setSelectedGenre(event.target.value)}
            >
              {genreEntries.map(([key, value]) => (
                <option key={key} value={key}>
                  {value.label}
                </option>
              ))}
            </select>
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
            <ResultCard title="Flavor Genre" value={result.flavorGenre} />
            <ResultCard title="Scale" value={result.scale} />
            <ResultCard title="Signature Sound" value={result.signatureSound} />
            <ResultCard title="Energy Feel" value={result.energyFeel} />
          </div>

          <div className="palette-card">
            <h3>Instrumentation Palette</h3>
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

function ResultCard({ title, value }) {
  return (
    <article className="result-card">
      <p>{title}</p>
      <h3>{value}</h3>
    </article>
  );
}

export default App;
