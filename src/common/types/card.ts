export type CardCategory =
  | "icebreakers"
  | "confessions"
  | "personality"
  | "deepThoughts"
  | "intimacy"
  | "growth";

export interface CardStyle {
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
  backgroundActive: string;
  backgroundError: string;
  borderActive: string;
  borderError: string;
  borderWidth: number;
  borderColor: string;
  borderStyle?: string;
}

export interface Card {
  id: string;
  question: string;
  category: CardCategory;
  difficulty: number;
  followUpQuestions?: string[];
  tags?: string[];
  created: string;
  lastModified: string;
}

export interface CardSet {
  id: string;
  name: string;
  description: string;
  version: string;
  author?: string;
  created: string;
  lastModified: string;
  cards: Card[];
  metadata?: {
    totalCards: number;
    categories: string[];
    difficultyRange: {
      min: number;
      max: number;
    };
    tags?: string[];
  };
}

export interface CardSetImportProgress {
  total: number;
  current: number;
  status: "parsing" | "validating" | "importing" | "complete" | "error";
  error?: string;
}

export interface CardSetStats {
  totalCards: number;
  categoryCounts: Record<string, number>;
  averageDifficulty: number;
  difficultyDistribution: Record<number, number>;
  tagsCount?: Record<string, number>;
}
