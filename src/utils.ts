import { ContentCategory, GeneratedIdea } from "./types";

export const STORAGE_KEY = "sound-alchemy-state-v2";

export type PersistedState = {
  categories: ContentCategory[];
  savedIdeas: GeneratedIdea[];
  currentIdea: GeneratedIdea | null;
  activeTab: "generator" | "library" | "arrays";
};

type ConceptPartKey = "theme" | "emotion" | "subject" | "action" | "target";

export function randomFrom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function createIdea(
  categories: ContentCategory[],
  previousIdea?: GeneratedIdea | null,
  singleKey?: string,
): GeneratedIdea {
  const fields = { ...(previousIdea?.fields ?? {}) };
  const locked = { ...(previousIdea?.locked ?? {}) };
  const selectedValues = (
    key: "instrumentation" | "flavor" | "mood" | "energy" | "vocalStyle",
  ) =>
    new Set(
      (fields[key] ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    );
  const selectedInstruments = selectedValues("instrumentation");
  const selectedFlavors = selectedValues("flavor");
  const selectedMoods = selectedValues("mood");
  const selectedEnergy = selectedValues("energy");
  const selectedVocals = selectedValues("vocalStyle");
  let instrumentOptions = [...(previousIdea?.instrumentOptions ?? [])];
  let flavorOptions = [...(previousIdea?.flavorOptions ?? [])];
  let moodOptions = [...(previousIdea?.moodOptions ?? [])];
  let energyOptions = [...(previousIdea?.energyOptions ?? [])];
  let vocalStyleOptions = [...(previousIdea?.vocalStyleOptions ?? [])];
  let referenceOptions = [...(previousIdea?.referenceOptions ?? [])];
  let fxSecondary = previousIdea?.fxSecondary ?? "";
  let fxPrimaryEnabled = previousIdea?.fxPrimaryEnabled ?? true;
  let fxSecondaryEnabled = previousIdea?.fxSecondaryEnabled ?? true;
  let conceptParts = previousIdea?.conceptParts ?? {
    theme: "",
    emotion: "",
    subject: "",
    action: "",
    target: "",
  };
  let conceptEnabled = previousIdea?.conceptEnabled ?? {
    theme: true,
    emotion: true,
    subject: true,
    action: true,
    target: true,
  };

  for (const category of categories) {
    const isLocked = Boolean(locked[category.key]);
    const isActive = category.enabled && category.items.length > 0;
    const isConceptPartReroll = Boolean(
      singleKey && singleKey.startsWith("concepts:") && category.key === "concepts",
    );
    const shouldUpdate = singleKey
      ? category.key === singleKey || isConceptPartReroll
      : !(previousIdea && isLocked);

    if (!isActive) {
      if (singleKey === category.key) {
        delete fields[category.key];
      }
      continue;
    }

    if (category.key === "flavor") {
      if (shouldUpdate) {
        const available = category.items.filter((item) => !selectedFlavors.has(item));
        const preserved = flavorOptions.filter((item) => selectedFlavors.has(item));
        const pool = [...available];
        const nextOptions = [...preserved];

        while (nextOptions.length < 4 && pool.length > 0) {
          const index = Math.floor(Math.random() * pool.length);
          const [picked] = pool.splice(index, 1);
          nextOptions.push(picked);
        }

        flavorOptions = nextOptions;
      }

      continue;
    }

    if (
      category.key === "mood" ||
      category.key === "energy" ||
      category.key === "vocalStyle"
    ) {
      const selectedSet =
        category.key === "mood"
          ? selectedMoods
          : category.key === "energy"
            ? selectedEnergy
            : selectedVocals;
      const existingOptions =
        category.key === "mood"
          ? moodOptions
          : category.key === "energy"
            ? energyOptions
            : vocalStyleOptions;

      if (shouldUpdate) {
        const available = category.items.filter((item) => !selectedSet.has(item));
        const preserved = existingOptions.filter((item) => selectedSet.has(item));
        const pool = [...available];
        const nextOptions = [...preserved];

        while (nextOptions.length < 4 && pool.length > 0) {
          const index = Math.floor(Math.random() * pool.length);
          const [picked] = pool.splice(index, 1);
          nextOptions.push(picked);
        }

        if (category.key === "mood") {
          moodOptions = nextOptions;
        } else if (category.key === "energy") {
          energyOptions = nextOptions;
        } else {
          vocalStyleOptions = nextOptions;
        }
      }

      continue;
    }

    if (category.key === "instrumentation") {
      if (shouldUpdate) {
        const available = category.items.filter((item) => !selectedInstruments.has(item));
        const preserved = instrumentOptions.filter((item) => selectedInstruments.has(item));
        const pool = [...available];
        const nextOptions = [...preserved];

        while (nextOptions.length < 4 && pool.length > 0) {
          const index = Math.floor(Math.random() * pool.length);
          const [picked] = pool.splice(index, 1);
          nextOptions.push(picked);
        }

        instrumentOptions = nextOptions;
      }

      continue;
    }

    if (category.key === "reference") {
      if (shouldUpdate) {
        const pool = [...category.items];
        const nextOptions: string[] = [];

        while (nextOptions.length < 3 && pool.length > 0) {
          const index = Math.floor(Math.random() * pool.length);
          const [picked] = pool.splice(index, 1);
          nextOptions.push(picked);
        }

        referenceOptions = nextOptions;
        if (!singleKey || singleKey === "reference") {
          fields.reference = nextOptions[0] ?? fields.reference;
        }
      }

      continue;
    }

    if (category.key === "fx") {
      if (shouldUpdate || singleKey === "fxSecondary") {
        const currentPrimary = fields[category.key] ?? randomFrom(category.items);

        if (singleKey === "fxSecondary") {
          const secondaryPool = category.items.filter((item) => item !== currentPrimary);
          fxSecondary = secondaryPool.length > 0 ? randomFrom(secondaryPool) : currentPrimary;
        } else if (singleKey === "fx") {
          const nextPrimary = randomFrom(category.items);
          fields[category.key] = nextPrimary;
        } else {
          const primary = randomFrom(category.items);
          const secondaryPool = category.items.filter((item) => item !== primary);
          fields[category.key] = primary;
          fxSecondary = secondaryPool.length > 0 ? randomFrom(secondaryPool) : primary;
        }

        fxPrimaryEnabled = previousIdea?.fxPrimaryEnabled ?? true;
        fxSecondaryEnabled = previousIdea?.fxSecondaryEnabled ?? true;
      }

      continue;
    }

    if (category.key === "concepts") {
      if (shouldUpdate) {
        const grouped = {
          theme: category.items.filter((item) => item.startsWith("theme:")),
          emotion: category.items.filter((item) => item.startsWith("emotion:")),
          subject: category.items.filter((item) => item.startsWith("subject:")),
          action: category.items.filter((item) => item.startsWith("action:")),
          target: category.items.filter((item) => item.startsWith("target:")),
        };

        const partKeys = Object.keys(grouped) as ConceptPartKey[];
        for (const partKey of partKeys) {
          const isSinglePartReroll = singleKey === `concepts:${partKey}`;
          if (singleKey && !isSinglePartReroll && singleKey !== "concepts") {
            continue;
          }
          if (singleKey === "concepts" && conceptEnabled[partKey] === false) {
            continue;
          }
          if (!singleKey && previousIdea && conceptEnabled[partKey] === false) {
            continue;
          }

          conceptParts = {
            ...conceptParts,
            [partKey]: randomFrom(grouped[partKey]).replace(`${partKey}:`, "").trim(),
          };
        }
      }

      fields[category.key] = (Object.keys(conceptParts) as ConceptPartKey[])
        .filter((partKey) => conceptEnabled[partKey])
        .map((partKey) => conceptParts[partKey])
        .filter(Boolean)
        .join(" | ");

      continue;
    }

    if (shouldUpdate) {
      fields[category.key] = randomFrom(category.items);
    }
  }

  const titleParts = [fields.genre, fields.mood, fields.texture].filter(Boolean);

  return {
    id: previousIdea?.id ?? crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    title: titleParts.length > 0 ? titleParts.join(" / ") : "Untitled sound idea",
    fields,
    locked,
    instrumentOptions,
    flavorOptions,
    moodOptions,
    energyOptions,
    vocalStyleOptions,
    referenceOptions,
    fxSecondary,
    fxPrimaryEnabled,
    fxSecondaryEnabled,
    conceptParts,
    conceptEnabled,
  };
}

export function toStandardPrompt(idea: GeneratedIdea): string {
  const sections = Object.entries(idea.fields).map(([key, value]) => {
    const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
    return `${label}: ${value}`;
  });

  return `Create a sound idea with the following direction:\n${sections.join("\n")}`;
}

export function toJsonPrompt(idea: GeneratedIdea): string {
  return JSON.stringify(
    {
      id: idea.id,
      title: idea.title,
      createdAt: idea.createdAt,
      ...idea.fields,
    },
    null,
    2,
  );
}

export function loadState(): PersistedState | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as PersistedState;
  } catch {
    return null;
  }
}

export function saveState(state: PersistedState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
