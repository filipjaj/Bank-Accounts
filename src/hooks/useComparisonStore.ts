"use client";

import { FormattedBankData } from "@/lib/formatting/dataFormatting";

import _ from "lodash";
import { useMemo } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Persist in local storage

const generatCompoundInterest = (
  initialAmount: number,
  interestRate: number,
  years: number
) => {
  console.log(initialAmount, interestRate, years);
  const interest = interestRate / 100;
  const values = Array.from({ length: years }, (_, i) => i + 1);

  const compoundInterest = values.map((year) => {
    const amount = initialAmount * Math.pow(1 + interest, year);
    return {
      x: year,
      y: amount,
    };
  });

  return compoundInterest;
};

export type ComparisonStoreType = {
  comparison: FormattedBankData;
  addToComparison: (bank: FormattedBankData[number]) => void;
  removeFromComparison: (bank: FormattedBankData[number]) => void;
  clearComparison: () => void;
  savingYears: number[];
  setSavingYears: (savingYears: number[]) => void;
  startingBalance: number[];
  setStartingBalance: (startingBalance: number[]) => void;
};

const useComparisonStore = create(
  persist<ComparisonStoreType>(
    (set) => ({
      comparison: [],
      addToComparison: (bank: FormattedBankData[number]) =>
        set((state) => ({ comparison: [...state.comparison, bank] })),

      removeFromComparison: (bank: FormattedBankData[number]) =>
        set((state) => ({
          comparison: state.comparison.filter((f) => !_.isEqual(f, bank)),
        })),

      clearComparison: () => set({ comparison: [] }),
      savingYears: [10],
      setSavingYears: (savingYears: number[]) =>
        set({ savingYears: savingYears }),
      startingBalance: [10000],
      setStartingBalance: (startingBalance: number[]) =>
        set({ startingBalance: startingBalance }),
    }),
    {
      name: "comparison-storage",
    }
  )
);

const useComparison = () => {
  const comparison = useComparisonStore((state) => state.comparison);
  const addToComparison = useComparisonStore((state) => state.addToComparison);
  const removeFromComparison = useComparisonStore(
    (state) => state.removeFromComparison
  );
  const clearComparison = useComparisonStore((state) => state.clearComparison);
  const savingYears = useComparisonStore((state) => state.savingYears);
  const setSavingYears = useComparisonStore((state) => state.setSavingYears);
  const startingBalance = useComparisonStore((state) => state.startingBalance);
  const setStartingBalance = useComparisonStore(
    (state) => state.setStartingBalance
  );

  const toggleComparison = (bank: FormattedBankData[number]) => {
    if (comparison.find((f) => _.isEqual(f, bank))) {
      removeFromComparison(bank);
    } else {
      addToComparison(bank);
    }
  };

  const isInComparison = (bank: FormattedBankData[number]) => {
    return !!comparison.find((f) => _.isEqual(f, bank));
  };

  const compareCompoundInterest = useMemo(() => {
    const data = comparison.map((bank) => {
      const compoundInterest = generatCompoundInterest(
        startingBalance[0],
        +bank?.interestRate?.[0]?.interest ?? 0,
        savingYears[0]
      );
      return {
        id: bank.bankName + " - " + bank.accountName,
        data: compoundInterest,
        allData: bank,
      };
    });
    return data;
  }, [comparison, savingYears, startingBalance]);

  return {
    comparison,
    toggleComparison,
    clearComparison,
    isInComparison,
    compareCompoundInterest,
    count: comparison.length,
    savingYears,
    setSavingYears,
    startingBalance,
    setStartingBalance,
  };
};

export default useComparison;
