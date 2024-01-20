"use client";
import { IncomingFiltersSchema } from "@/lib/formatting/filterItems";
import { z } from "zod";

import { create } from "zustand";

type CustomFilterType = {
  rente: number;
  sum: number;
};

type FilterType = z.infer<typeof IncomingFiltersSchema>;

export type FilterStoreType = {
  activeFilters: FilterType[];
  addFilter: (filter: FilterType) => void;
  removeFilter: (filter: FilterType) => void;
  clearFilters: () => void;
  updateSingleFilter: (filter: FilterType) => void;
};

const useFilterStore = create<FilterStoreType>((set) => ({
  activeFilters: [],
  addFilter: (filter) =>
    set((state) => ({ activeFilters: [...state.activeFilters, filter] })),
  removeFilter: (filter) =>
    set((state) => ({
      activeFilters: state.activeFilters.filter((f) => f !== filter),
    })),
  clearFilters: () => set({ activeFilters: [] }),
  updateSingleFilter: (filter) =>
    set((state) => ({
      activeFilters: state.activeFilters.map((f) => {
        if (f.key === filter.key) {
          return filter;
        }
        return f;
      }),
    })),
}));

const useFiltering = () => {
  const {
    activeFilters,
    addFilter,
    removeFilter,
    clearFilters,
    updateSingleFilter,
  } = useFilterStore();

  const updateFilter = (filter: FilterType) => {
    if (activeFilters.find((f) => f.key === filter.key)) {
      updateSingleFilter(filter);
    } else {
      addFilter(filter);
    }
  };

  const getFilter = <T>(filter: FilterType["key"], fallback: T) => {
    const foundFilter = activeFilters.find((f) => f.key === filter);
    if (foundFilter) {
      return foundFilter.value as T;
    }
    return fallback;
  };

  return {
    activeFilters,
    updateFilter,
    removeFilter,
    clearFilters,
    getFilter,
  };
};

export default useFiltering;
