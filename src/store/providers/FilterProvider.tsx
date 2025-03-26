import React, { createContext, useContext, useState, useEffect } from "react";
import {
  FilterContextType,
  FilterType,
  DEFAULT_FILTER,
} from "@common/types/filter";
import { getData, storeData } from "@common/utils/storage";

/**
 * Context for managing global filter state
 * @internal
 */
const FilterContext = createContext<FilterContextType | undefined>(undefined);

/**
 * Provider component for managing global filter state
 * Handles persistence and provides filter operations
 */
export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filter, setFilter] = useState<FilterType>(DEFAULT_FILTER);

  // Load saved filter state on mount
  useEffect(() => {
    const loadFilter = async () => {
      try {
        const savedFilter = await getData("filter");
        if (savedFilter) {
          const parsedFilter = JSON.parse(savedFilter);
          if (typeof parsedFilter === "object" && parsedFilter !== null) {
            // Ensure all required fields are present
            setFilter({
              ...DEFAULT_FILTER,
              ...parsedFilter,
            });
          }
        }
      } catch (error) {
        console.error("Error loading filter from storage:", error);
      }
    };
    loadFilter();
  }, []);

  /**
   * Updates filter state and persists to storage
   */
  const updateFilter = async (updates: Partial<FilterType>) => {
    const newFilter = {
      ...filter,
      ...updates,
    };
    setFilter(newFilter);
    try {
      await storeData("filter", JSON.stringify(newFilter));
    } catch (error) {
      console.error("Error saving filter to storage:", error);
    }
  };

  /**
   * Updates a single filter value
   */
  const setFilterValue = <K extends keyof FilterType>(
    key: K,
    value: FilterType[K]
  ) => {
    updateFilter({ [key]: value });
  };

  /**
   * Updates search query filter
   */
  const setSearchQuery = (query: string) =>
    setFilterValue("searchQuery", query);

  /**
   * Updates category filter
   */
  const setCategory = (category: string) =>
    setFilterValue("category", category);

  /**
   * Updates status filter
   */
  const setStatus = (status: FilterType["status"]) =>
    setFilterValue("status", status);

  /**
   * Updates sort field
   */
  const setSortBy = (sortBy: FilterType["sortBy"]) =>
    setFilterValue("sortBy", sortBy);

  /**
   * Resets all filters to default values
   */
  const resetFilters = async () => {
    setFilter(DEFAULT_FILTER);
    try {
      await storeData("filter", JSON.stringify(DEFAULT_FILTER));
    } catch (error) {
      console.error("Error saving default filter to storage:", error);
    }
  };

  return (
    <FilterContext.Provider
      value={{
        filter,
        setFilter,
        setFilterValue,
        setSearchQuery,
        setCategory,
        setStatus,
        setSortBy,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

/**
 * Hook to access filter context
 * @throws {Error} If used outside of FilterProvider
 */
export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
