import React, { createContext, useContext, useState, useEffect } from "react";
import type { FilterType } from "../types";
import storage from "../../common/utils/storage";

interface FilterContextType {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setStatus: (status: "all" | "active" | "completed") => void;
  setSortBy: (sortBy: "name" | "date" | "priority") => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType>({} as FilterContextType);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [filter, setFilter] = useState<FilterType>({
    searchQuery: "",
    category: "",
    status: "all",
    sortBy: "name",
  });

  useEffect(() => {
    const loadFilter = async () => {
      try {
        const savedFilter = await storage.getItem("filter");
        if (savedFilter) {
          const parsedFilter = JSON.parse(savedFilter);
          if (typeof parsedFilter === "object") {
            setFilter(parsedFilter);
          }
        }
      } catch (error) {
        console.error("Error loading filter from storage:", error);
      }
    };
    loadFilter();
  }, []);

  const updateFilter = (updates: Partial<FilterType>) => {
    const newFilter = {
      ...filter,
      ...updates,
    };
    setFilter(newFilter);
    storage.setItem("filter", JSON.stringify(newFilter));
  };

  const setSearchQuery = (query: string) =>
    updateFilter({ searchQuery: query });
  const setCategory = (category: string) => updateFilter({ category });
  const setStatus = (status: "all" | "active" | "completed") =>
    updateFilter({ status });
  const setSortBy = (sortBy: "name" | "date" | "priority") =>
    updateFilter({ sortBy });

  const resetFilters = () => {
    const defaultFilter: FilterType = {
      searchQuery: "",
      category: "",
      status: "all",
      sortBy: "name",
    };
    setFilter(defaultFilter);
    storage.setItem("filter", JSON.stringify(defaultFilter));
  };

  return (
    <FilterContext.Provider
      value={{
        filter,
        setFilter,
        setSearchQuery,
        setCategory,
        setStatus,
        setSortBy,
        resetFilters,
      }}
      children={children}
    />
  );
};

export const useFilter = () => useContext(FilterContext);
