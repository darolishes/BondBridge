/**
 * Represents the available filter options for the application
 */
export interface FilterType {
  /** Search query string */
  searchQuery: string;
  /** Category filter */
  category: string;
  /** Status filter */
  status: "all" | "active" | "completed";
  /** Sort field */
  sortBy: "name" | "date" | "priority";
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
  /** Set status filter */
  setStatus: (status: FilterType["status"]) => void;
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
  status: "all",
  sortBy: "name",
} as const;
