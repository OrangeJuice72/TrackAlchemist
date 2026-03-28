import { useEffect, useMemo, useState } from "react";
import { initialCategories, subGenreByGenre } from "./data";
import { ContentCategory, GeneratedIdea, CategoryKey } from "./types";
import {
  createIdea,
  loadState,
  PersistedState,
  saveState,
  toJsonPrompt,
  toStandardPrompt,
} from "./utils";

type OutputMode = "standard" | "json";
type TabMode = "generator" | "library" | "arrays";
type ConceptPartKey = "theme" | "emotion" | "subject" | "action" | "target";

function toDisplayLabel(key: string): string {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}

function parseTempoValue(value?: string): number {
  const match = value?.match(/\d+/)?.[0];
  return match ? Number(match) : 124;
}

function splitValues(value?: string): string[] {
  return (value ?? "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function mergeCategories(stored?: ContentCategory[] | null): ContentCategory[] {
  if (!stored || stored.length === 0) {
    return initialCategories;
  }

  return initialCategories.map((initialCategory) => {
    const savedCategory = stored.find((category) => category.key === initialCategory.key);
    if (!savedCategory) {
      return initialCategory;
    }

    if (
      initialCategory.key === "genre" ||
      initialCategory.key === "subGenre" ||
      initialCategory.key === "flavor" ||
      initialCategory.key === "concepts" ||
      initialCategory.key === "energy" ||
      initialCategory.key === "mood" ||
      initialCategory.key === "structure" ||
      initialCategory.key === "vocalStyle" ||
      initialCategory.key === "instrumentation" ||
      initialCategory.key === "fx" ||
      initialCategory.key === "reference"
    ) {
      return {
        ...savedCategory,
        items: initialCategory.items,
      };
    }

    return savedCategory;
  });
}

function App() {
  const hydrated = loadState();
  const startingCategories = mergeCategories(hydrated?.categories);
  const [categories, setCategories] = useState<ContentCategory[]>(
    startingCategories,
  );
  const [savedIdeas, setSavedIdeas] = useState<GeneratedIdea[]>(hydrated?.savedIdeas ?? []);
  const [currentIdea, setCurrentIdea] = useState<GeneratedIdea | null>(
    hydrated?.currentIdea ?? createIdea(startingCategories),
  );
  const [outputMode, setOutputMode] = useState<OutputMode>("standard");
  const [activeTab, setActiveTab] = useState<TabMode>(hydrated?.activeTab ?? "generator");
  const [copyStatus, setCopyStatus] = useState<string>("");

  useEffect(() => {
    const state: PersistedState = {
      categories,
      savedIdeas,
      currentIdea,
      activeTab,
    };
    saveState(state);
  }, [activeTab, categories, currentIdea, savedIdeas]);

  useEffect(() => {
    setCurrentIdea((previous) => {
      if (!previous) {
        return previous;
      }

      const genre = previous.fields.genre ?? "Hip-Hop";
      const subGenres = subGenreByGenre[genre] ?? [];
      const subGenre = previous.fields.subGenre ?? "";

      if (subGenres.length === 0 || subGenres.includes(subGenre)) {
        return previous;
      }

      return {
        ...previous,
        fields: {
          ...previous.fields,
          subGenre: subGenres[0],
        },
      };
    });
  }, [currentIdea?.fields.genre]);

  useEffect(() => {
    setCurrentIdea((previous) => {
      if (!previous) {
        return previous;
      }

      const needsSelectorOptions =
        !previous.instrumentOptions ||
        previous.instrumentOptions.length === 0 ||
        !previous.flavorOptions ||
        previous.flavorOptions.length === 0 ||
        !previous.moodOptions ||
        previous.moodOptions.length === 0 ||
        !previous.energyOptions ||
        previous.energyOptions.length === 0 ||
        !previous.vocalStyleOptions ||
        previous.vocalStyleOptions.length === 0;

      if (!needsSelectorOptions) {
        return previous;
      }

      return createIdea(categories, previous);
    });
  }, [categories]);

  useEffect(() => {
    setCurrentIdea((previous) => {
      if (!previous) {
        return previous;
      }

      const conceptCategory = categories.find((category) => category.key === "concepts");
      const allowedThemes = new Set(
        (conceptCategory?.items ?? [])
          .filter((item) => item.startsWith("theme:"))
          .map((item) => item.replace("theme:", "").trim()),
      );
      const allowedEmotions = new Set(
        (conceptCategory?.items ?? [])
          .filter((item) => item.startsWith("emotion:"))
          .map((item) => item.replace("emotion:", "").trim()),
      );

      const missingConceptParts =
        !previous.conceptParts ||
        !previous.conceptParts.theme ||
        !previous.conceptParts.emotion;
      const invalidTheme =
        !!previous.conceptParts?.theme && !allowedThemes.has(previous.conceptParts.theme);
      const invalidEmotion =
        !!previous.conceptParts?.emotion && !allowedEmotions.has(previous.conceptParts.emotion);

      if (!missingConceptParts && !invalidTheme && !invalidEmotion) {
        return previous;
      }

      return createIdea(categories, previous, "concepts");
    });
  }, [categories]);

  const output = useMemo(() => {
    if (!currentIdea) {
      return "";
    }

    return outputMode === "standard"
      ? toStandardPrompt(currentIdea)
      : toJsonPrompt(currentIdea);
  }, [currentIdea, outputMode]);

  function handleGenerateAll() {
    setCurrentIdea((previous) => createIdea(categories, previous));
  }

  function handleRerollField(key: CategoryKey) {
    setCurrentIdea((previous) => createIdea(categories, previous, key));
  }

  function handleToggleCategory(key: CategoryKey) {
    const toggledCategory = categories.find((category) => category.key === key);
    if (!toggledCategory) {
      return;
    }

    const nextEnabled = !toggledCategory.enabled;
    const nextCategories = categories.map((category) =>
      category.key === key ? { ...category, enabled: nextEnabled } : category,
    );
    setCategories(nextCategories);
    setCurrentIdea((previous) => {
      if (!previous) {
        return createIdea(nextCategories, undefined, nextEnabled ? key : undefined);
      }

      const nextFields = { ...previous.fields };
      const nextLocked = { ...previous.locked };

      if (!nextEnabled) {
        delete nextFields[key];
        delete nextLocked[key];

        return {
          ...previous,
          fields: nextFields,
          locked: nextLocked,
        };
      }

      return createIdea(nextCategories, previous, key);
    });
  }

  function handleToggleLock(key: CategoryKey) {
    setCurrentIdea((previous) => {
      if (!previous) {
        return previous;
      }

      return {
        ...previous,
        locked: {
          ...previous.locked,
          [key]: !previous.locked[key],
        },
      };
    });
  }

  function handleEditField(key: CategoryKey, value: string) {
    setCurrentIdea((previous) => {
      if (!previous) {
        return previous;
      }

      return {
        ...previous,
        fields: {
          ...previous.fields,
          [key]: value,
        },
      };
    });
  }

  function handleEditCategoryItem(
    categoryKey: CategoryKey,
    itemIndex: number,
    value: string,
  ) {
    setCategories((previous) =>
      previous.map((category) =>
        category.key !== categoryKey
          ? category
          : {
              ...category,
              items: category.items.map((item, index) => (index === itemIndex ? value : item)),
            },
      ),
    );
  }

  function handleAddCategoryItem(categoryKey: CategoryKey) {
    setCategories((previous) =>
      previous.map((category) =>
        category.key !== categoryKey
          ? category
          : {
              ...category,
              items: [...category.items, "New option"],
            },
      ),
    );
  }

  function handleSaveCurrent() {
    if (!currentIdea) {
      return;
    }

    setSavedIdeas((previous) => [
      {
        ...currentIdea,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      },
      ...previous,
    ]);
  }

  function handleLoadIdea(idea: GeneratedIdea) {
    setCurrentIdea(idea);
    setActiveTab("generator");
  }

  function handleDeleteIdea(id: string) {
    setSavedIdeas((previous) => previous.filter((idea) => idea.id !== id));
  }

  async function handleCopySelectedPrompt() {
    if (!output) {
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      setCopyStatus(`Copied ${outputMode === "json" ? "JSON" : "standard"} prompt`);
      window.setTimeout(() => setCopyStatus(""), 2000);
    } catch {
      setCopyStatus("Clipboard copy failed");
      window.setTimeout(() => setCopyStatus(""), 2000);
    }
  }

  function handleTempoChange(value: number) {
    handleEditField("tempo", `${value} BPM`);
  }

  function handleGenreChange(value: string) {
    handleEditField("genre", value);

    const nextSubGenres = subGenreByGenre[value] ?? [];
    setCurrentIdea((previous) => {
      if (!previous) {
        return previous;
      }

      const currentSubGenre = previous.fields.subGenre;
      const nextSubGenre = nextSubGenres.includes(currentSubGenre ?? "")
        ? currentSubGenre
        : nextSubGenres[0] ?? "";

      return {
        ...previous,
        fields: {
          ...previous.fields,
          genre: value,
          subGenre: nextSubGenre,
        },
      };
    });
  }

  function handleToggleInstrument(item: string) {
    handleToggleMultiValue("instrumentation", item);
  }

  function handleToggleFlavor(item: string) {
    handleToggleMultiValue("flavor", item);
  }

  function handleToggleMultiValue(
    key: "instrumentation" | "flavor" | "mood" | "energy" | "vocalStyle",
    item: string,
  ) {
    setCurrentIdea((previous) => {
      if (!previous) {
        return previous;
      }

      const current = new Set(splitValues(previous.fields[key]));

      if (current.has(item)) {
        current.delete(item);
      } else if (current.size < 4) {
        current.add(item);
      } else {
        return previous;
      }

      return {
        ...previous,
        fields: {
          ...previous.fields,
          [key]: Array.from(current).join(", "),
        },
        locked: {
          ...previous.locked,
          [key]: current.size > 0,
        },
      };
    });
  }

  function handleToggleFxChain(chain: "primary" | "secondary") {
    setCurrentIdea((previous) => {
      if (!previous) {
        return previous;
      }

      return {
        ...previous,
        fxPrimaryEnabled:
          chain === "primary" ? !previous.fxPrimaryEnabled : previous.fxPrimaryEnabled,
        fxSecondaryEnabled:
          chain === "secondary" ? !previous.fxSecondaryEnabled : previous.fxSecondaryEnabled,
      };
    });
  }

  function handleRerollFxChain(chain: "primary" | "secondary") {
    setCurrentIdea((previous) =>
      createIdea(categories, previous, chain === "primary" ? "fx" : "fxSecondary"),
    );
  }

  function handleToggleConceptPart(part: ConceptPartKey) {
    setCurrentIdea((previous) => {
      if (!previous) {
        return previous;
      }

      return {
        ...previous,
        conceptEnabled: {
          theme: previous.conceptEnabled?.theme ?? true,
          emotion: previous.conceptEnabled?.emotion ?? true,
          subject: previous.conceptEnabled?.subject ?? true,
          action: previous.conceptEnabled?.action ?? true,
          target: previous.conceptEnabled?.target ?? true,
          [part]: !(previous.conceptEnabled?.[part] ?? true),
        },
      };
    });
  }

  function handleRerollConceptPart(part: ConceptPartKey) {
    setCurrentIdea((previous) => createIdea(categories, previous, `concepts:${part}`));
  }

  const generatorOrder: CategoryKey[] = [
    "concepts",
    "tempo",
    "energy",
    "mood",
    "structure",
    "vocalStyle",
    "instrumentation",
    "fx",
    "reference",
  ];
  const selectedGenre = currentIdea?.fields.genre ?? "Hip-Hop";
  const currentSubGenreOptions = subGenreByGenre[selectedGenre] ?? [];

  return (
    <div className="app-shell obsidian-shell">
      <div className="background-glow background-glow-left" />
      <div className="background-glow background-glow-right" />
      <div className="mobile-frame">
        <header className="topbar">
          <div className="brand">
            <span className="brand-mark">|||</span>
            <span className="brand-name">ETHEREAL ECHO</span>
          </div>
          <button className="menu-button" aria-label="App menu">
            ≡
          </button>
        </header>

        <section className="headline">
          <p className="headline-title">
            SONIC <span>OBSIDIAN</span>
          </p>
          <p className="headline-copy">
            Sculpt unique sound concepts using editorial-grade frequency parameters.
            Enable modules to define your sonic landscape.
          </p>
        </section>

        {activeTab === "generator" ? (
          <main className="generator-stack">
            <section className="genre-block">
              <p className="micro-label">Main Genre Architecture</p>
              <div className="genre-select-wrap">
                <select
                  className="genre-select"
                  value={currentIdea?.fields.genre ?? ""}
                  onChange={(event) => handleGenreChange(event.target.value)}
                >
                  {categories
                    .find((category) => category.key === "genre")
                    ?.items.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                  ))}
                </select>
              </div>
              <div className="genre-select-wrap">
                <p className="micro-label subgenre-label">Sub Genre Refinement</p>
                <select
                  className="genre-select"
                  value={currentIdea?.fields.subGenre ?? ""}
                  onChange={(event) => handleEditField("subGenre", event.target.value)}
                >
                  {currentSubGenreOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="genre-select-wrap">
                <div className="inline-section-header">
                  <p className="micro-label subgenre-label">Flavor Selection</p>
                  <button
                    className="icon-button"
                    onClick={() => setCurrentIdea((previous) => createIdea(categories, previous, "flavor"))}
                  >
                    ⟳
                  </button>
                </div>
                <div className="selection-grid">
                  {(currentIdea?.flavorOptions ?? []).map((item) => (
                    <button
                      type="button"
                      key={item}
                      className={
                        splitValues(currentIdea?.fields.flavor).includes(item)
                          ? "selection-tile active"
                          : "selection-tile"
                      }
                      onClick={() => handleToggleFlavor(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <div className="module-stack">
              {generatorOrder
                .map((key) => categories.find((category) => category.key === key))
                .filter((category): category is ContentCategory => Boolean(category))
                .map((category, index) => (
                  <article
                    className={`module-card ${index % 2 === 0 ? "accent-cyan" : "accent-magenta"}`}
                    key={category.key}
                  >
                    <div className="module-header">
                      <div>
                        <h2>{category.label}</h2>
                        <p className="micro-label">{toDisplayLabel(category.key)} Module</p>
                      </div>
                      <div className="module-controls">
                        <button className="icon-button" onClick={() => handleRerollField(category.key)}>
                          ⟳
                        </button>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={category.enabled}
                            onChange={() => handleToggleCategory(category.key)}
                          />
                          <span className="switch-track" />
                        </label>
                      </div>
                    </div>

                    {category.key === "tempo" ? (
                      <div className="tempo-block">
                        <input
                          className="tempo-slider"
                          type="range"
                          min="60"
                          max="200"
                          step="1"
                          value={parseTempoValue(currentIdea?.fields.tempo)}
                          onChange={(event) => handleTempoChange(Number(event.target.value))}
                        />
                        <div className="tempo-bar">
                          <span
                            className="tempo-fill"
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(
                                  0,
                                  ((parseTempoValue(currentIdea?.fields.tempo) - 60) / 140) * 100,
                                ),
                              )}%`,
                            }}
                          />
                        </div>
                        <div className="tempo-scale">
                          <span>60 BPM</span>
                          <strong>{currentIdea?.fields.tempo ?? "124 BPM"}</strong>
                          <span>200 BPM</span>
                        </div>
                      </div>
                    ) : category.key === "fx" ? (
                      <div className="list-lines">
                        <div>
                          <span>Primary chain</span>
                          <div className="inline-chain">
                            <button
                              type="button"
                              className="icon-button"
                              onClick={() => handleRerollFxChain("primary")}
                            >
                              ⟳
                            </button>
                            <strong>
                              {currentIdea?.fxPrimaryEnabled ? currentIdea?.fields.fx ?? "" : "OFF"}
                            </strong>
                            <button
                              className={currentIdea?.fxPrimaryEnabled ? "tag-pill active" : "tag-pill"}
                              onClick={() => handleToggleFxChain("primary")}
                            >
                              {currentIdea?.fxPrimaryEnabled ? "On" : "Off"}
                            </button>
                          </div>
                        </div>
                        <div>
                          <span>Secondary chain</span>
                          <div className="inline-chain">
                            <button
                              type="button"
                              className="icon-button"
                              onClick={() => handleRerollFxChain("secondary")}
                            >
                              ⟳
                            </button>
                            <strong>
                              {currentIdea?.fxSecondaryEnabled ? currentIdea?.fxSecondary ?? "" : "OFF"}
                            </strong>
                            <button
                              className={currentIdea?.fxSecondaryEnabled ? "tag-pill active" : "tag-pill"}
                              onClick={() => handleToggleFxChain("secondary")}
                            >
                              {currentIdea?.fxSecondaryEnabled ? "On" : "Off"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : category.key === "structure" ? (
                      <div className="tag-row">
                        {(currentIdea?.fields.structure ?? "")
                          .split(",")
                          .flatMap((part) => part.split(" into "))
                          .slice(0, 3)
                          .filter(Boolean)
                          .map((part) => (
                            <span className="tag-pill" key={part}>
                              {part.trim()}
                            </span>
                          ))}
                      </div>
                    ) : category.key === "instrumentation" ? (
                      <div className="selection-grid">
                        {(currentIdea?.instrumentOptions ?? [])
                          .map((item) => (
                            <button
                              type="button"
                              key={item}
                              className={
                                splitValues(currentIdea?.fields.instrumentation).includes(item)
                                  ? "selection-tile active"
                                  : "selection-tile"
                              }
                              onClick={() => handleToggleInstrument(item)}
                            >
                              {item}
                            </button>
                          ))}
                      </div>
                    ) : category.key === "mood" ? (
                      <div className="selection-grid">
                        {(currentIdea?.moodOptions ?? []).map((item) => (
                          <button
                            type="button"
                            key={item}
                            className={
                              splitValues(currentIdea?.fields.mood).includes(item)
                                ? "selection-tile active"
                                : "selection-tile"
                            }
                            onClick={() => handleToggleMultiValue("mood", item)}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    ) : category.key === "energy" ? (
                      <div className="selection-grid">
                        {(currentIdea?.energyOptions ?? []).map((item) => (
                          <button
                            type="button"
                            key={item}
                            className={
                              splitValues(currentIdea?.fields.energy).includes(item)
                                ? "selection-tile active"
                                : "selection-tile"
                            }
                            onClick={() => handleToggleMultiValue("energy", item)}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    ) : category.key === "vocalStyle" ? (
                      <div className="selection-grid">
                        {(currentIdea?.vocalStyleOptions ?? []).map((item) => (
                          <button
                            type="button"
                            key={item}
                            className={
                              splitValues(currentIdea?.fields.vocalStyle).includes(item)
                                ? "selection-tile active"
                                : "selection-tile"
                            }
                            onClick={() => handleToggleMultiValue("vocalStyle", item)}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    ) : category.key === "concepts" ? (
                      <div className="concept-block">
                        {(
                          [
                            "theme",
                            "emotion",
                            "subject",
                            "action",
                            "target",
                          ] as ConceptPartKey[]
                        ).map((part) => (
                          <div className="concept-line" key={part}>
                            <div className="concept-copy">
                              <span className="micro-label">{part}</span>
                              <strong>
                                {currentIdea?.conceptEnabled?.[part] === false
                                  ? "OFF"
                                  : currentIdea?.conceptParts?.[part] ?? ""}
                              </strong>
                            </div>
                            <div className="concept-actions">
                              <button
                                className="icon-button"
                                onClick={() => handleRerollConceptPart(part)}
                              >
                                ⟳
                              </button>
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  checked={currentIdea?.conceptEnabled?.[part] ?? true}
                                  onChange={() => handleToggleConceptPart(part)}
                                />
                                <span className="switch-track" />
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="module-body">
                        <textarea
                          value={currentIdea?.fields[category.key] ?? ""}
                          onChange={(event) => handleEditField(category.key, event.target.value)}
                          rows={3}
                        />
                      </div>
                    )}

                    {category.key !== "tempo" &&
                    category.key !== "instrumentation" &&
                    category.key !== "mood" &&
                    category.key !== "energy" &&
                    category.key !== "vocalStyle" &&
                    category.key !== "fx" &&
                    category.key !== "concepts" &&
                    category.key !== "structure" ? (
                        <div className="tag-row">
                          {(category.key === "reference"
                            ? currentIdea?.referenceOptions ?? []
                            : category.items.slice(0, 3)
                          ).map((item) => (
                            <button
                              type="button"
                              key={item}
                              className={
                                currentIdea?.fields[category.key] === item ? "tag-pill active" : "tag-pill"
                              }
                            onClick={() => handleEditField(category.key, item)}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </article>
                ))}
            </div>

            <section className="result-card">
              <div className="result-icon">✦</div>
              <h2>Sonic Concept Ready</h2>
              <p>
                The generative engine has finalized your architectural prompt based on
                the active obsidian modules.
              </p>
              <div className="result-actions">
                <button
                  className={outputMode === "standard" ? "primary-button wide" : "secondary-button wide"}
                  onClick={() => setOutputMode("standard")}
                >
                  Standard
                </button>
                <button
                  className={outputMode === "json" ? "primary-button wide" : "secondary-button wide"}
                  onClick={() => setOutputMode("json")}
                >
                  JSON
                </button>
              </div>
              <div className="result-actions">
                <button className="primary-button wide" onClick={handleCopySelectedPrompt}>
                  Copy Selected Prompt
                </button>
              </div>
              <div className="result-actions">
                <button className="secondary-button wide" onClick={handleGenerateAll}>
                  Generate
                </button>
                <button className="ghost-button wide" onClick={handleSaveCurrent}>
                  Save
                </button>
              </div>
              {copyStatus ? <p className="copy-status">{copyStatus}</p> : null}
              <div className="output-panel obsidian-output">
                <pre>{output}</pre>
              </div>
            </section>
          </main>
        ) : null}

        {activeTab === "library" ? (
          <main className="panel stack-gap flat-panel">
            <div className="section-heading">
              <p className="micro-label">Saved concepts</p>
              <h2>Recall and reuse</h2>
            </div>
            <div className="saved-list">
              {savedIdeas.length === 0 ? (
                <div className="empty-state">
                  <h3>No saved ideas yet</h3>
                  <p>Generate and save a concept to build a reusable library.</p>
                </div>
              ) : (
                savedIdeas.map((idea) => (
                  <article className="saved-card compact-saved" key={idea.id}>
                    <div>
                      <p className="saved-date">{new Date(idea.createdAt).toLocaleString()}</p>
                      <h3>{idea.title}</h3>
                      <p className="saved-preview">{toStandardPrompt(idea)}</p>
                    </div>
                    <div className="saved-actions">
                      <button className="secondary-button" onClick={() => handleLoadIdea(idea)}>
                        Load
                      </button>
                      <button className="ghost-button" onClick={() => handleDeleteIdea(idea.id)}>
                        Delete
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </main>
        ) : null}

        {activeTab === "arrays" ? (
          <main className="panel stack-gap flat-panel">
            <div className="section-heading">
              <p className="micro-label">Content arrays</p>
              <h2>Edit source material</h2>
            </div>
            <div className="category-list">
              {categories
                .filter(
                  (category) =>
                    category.key !== "environment" &&
                    category.key !== "rhythm" &&
                    category.key !== "texture",
                )
                .map((category) => (
                <article className="category-card obsidian-card" key={category.key}>
                  <div className="category-header">
                    <div>
                      <h3>{category.label}</h3>
                      <p>{category.items.length} options</p>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={category.enabled}
                        onChange={() => handleToggleCategory(category.key)}
                      />
                      <span className="switch-track" />
                    </label>
                  </div>
                  <div className="array-editor">
                    {category.items.map((item, index) => (
                      <input
                        key={`${category.key}-${index}`}
                        value={item}
                        onChange={(event) =>
                          handleEditCategoryItem(category.key, index, event.target.value)
                        }
                      />
                    ))}
                    <button className="ghost-button" onClick={() => handleAddCategoryItem(category.key)}>
                      Add option
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </main>
        ) : null}

        <nav className="bottom-nav" aria-label="Main navigation">
          <button
            className={activeTab === "generator" ? "nav-item active" : "nav-item"}
            onClick={() => setActiveTab("generator")}
          >
            <span>⚡</span>
            <span>GEN</span>
          </button>
          <button
            className={activeTab === "library" ? "nav-item active" : "nav-item"}
            onClick={() => setActiveTab("library")}
          >
            <span>◫</span>
            <span>LOG</span>
          </button>
          <button
            className={activeTab === "arrays" ? "nav-item active" : "nav-item"}
            onClick={() => setActiveTab("arrays")}
          >
            <span>✧</span>
            <span>SET</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default App;
