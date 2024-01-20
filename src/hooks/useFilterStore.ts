import { BankDataType } from "@/lib/bank-data";
import { BankDataKeys } from "@/lib/formatting/getAllFilters";
import { useMutation } from "@tanstack/react-query";
import { create } from "zustand";

type CustomFilterType = {
  rente: number;
  sum: number;
};

type FilterType = {
  name: BankDataKeys & keyof CustomFilterType;
  value: string | number | boolean | string[] | number[];
};

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
        if (f.name === filter.name) {
          return filter;
        }
        return f;
      }),
    })),
}));

const useFiltering = (data: BankDataType) => {
  const {
    activeFilters,
    addFilter,
    removeFilter,
    clearFilters,
    updateSingleFilter,
  } = useFilterStore();

  const updateFilter = (filter: FilterType) => {
    if (activeFilters.find((f) => f.name === filter.name)) {
      updateSingleFilter(filter);
    } else {
      addFilter(filter);
    }
  };

  return {
    activeFilters,
    updateFilter,
    removeFilter,
    clearFilters,
  };
};

const useFilterMutation = () => {
  const filterMutation = useMutation({
    mutationFn: (data: BankDataType, filters: FilterType[]) => {
        
  });
};

export default useFiltering;
