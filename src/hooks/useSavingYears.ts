"use client";
import { create } from "zustand";

type SavingYearsType = {
  savingYears: number[];
  setSavingYears: (savingYears: number[]) => void;
};
const useSavingYears = create<SavingYearsType>((set) => ({
  savingYears: [0],
  setSavingYears: (savingYears: number[]) => set({ savingYears: savingYears }),
}));

export default useSavingYears;
