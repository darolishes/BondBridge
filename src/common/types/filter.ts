import { CardStatus } from "./card";

/**
 * Represents the available filter options for cards
 */
export interface FilterType {
  /** Search query string */
  searchQuery: string;
  /** Category filter */
  category: string;
  /** Status filter */
  cardStatus: CardStatus;
  /** Difficulty range [min, max] */
  difficultyRange: [number, number];
  /** Card set IDs to include */
  cardSetIds: string[];
  /** Sort field */
  sortBy: "name" | "date" | "difficulty";
}

/**
 * Context type for the filter state and its operations
 */
export interface FilterContextType {
  /** Current filter state */
  filter: FilterType;
  /** Set the entire filter state */
  setFilter: (filter: FilterType) => void;
  /** Update a specific filter value */
  setFilterValue: <K extends keyof FilterType>(
    key: K,
    value: FilterType[K]
  ) => void;
  /** Set search query */
  setSearchQuery: (query: string) => void;
  /** Set category filter */
  setCategory: (category: string) => void;
  /** Set card status filter */
  setCardStatus: (status: CardStatus) => void;
  /** Set difficulty range */
  setDifficultyRange: (range: [number, number]) => void;
  /** Set card set filters */
  setCardSetIds: (ids: string[]) => void;
  /** Set sort field */
  setSortBy: (sortBy: FilterType["sortBy"]) => void;
  /** Reset filters to default values */
  resetFilters: () => void;
}

/**
 * Default filter values
 */
export const DEFAULT_FILTER: FilterType = {
  searchQuery: "",
  category: "",
  cardStatus: "unseen",
  difficultyRange: [1, 5],
  cardSetIds: [],
  sortBy: "date",
} as const;
