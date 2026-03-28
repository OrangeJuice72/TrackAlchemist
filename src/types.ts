export type CategoryKey =
  | "genre"
  | "subGenre"
  | "flavor"
  | "mood"
  | "tempo"
  | "energy"
  | "texture"
  | "instrumentation"
  | "fx"
  | "structure"
  | "vocalStyle"
  | "concepts"
  | "environment"
  | "rhythm"
  | "reference";

export type ContentCategory = {
  key: CategoryKey;
  label: string;
  enabled: boolean;
  items: string[];
};

export type GeneratedIdea = {
  id: string;
  createdAt: string;
  title: string;
  fields: Partial<Record<CategoryKey, string>>;
  locked: Partial<Record<CategoryKey, boolean>>;
  instrumentOptions?: string[];
  flavorOptions?: string[];
  moodOptions?: string[];
  energyOptions?: string[];
  vocalStyleOptions?: string[];
  referenceOptions?: string[];
  fxSecondary?: string;
  fxPrimaryEnabled?: boolean;
  fxSecondaryEnabled?: boolean;
  conceptParts?: {
    theme: string;
    emotion: string;
    subject: string;
    action: string;
    target: string;
  };
  conceptEnabled?: {
    theme: boolean;
    emotion: boolean;
    subject: boolean;
    action: boolean;
    target: boolean;
  };
};
