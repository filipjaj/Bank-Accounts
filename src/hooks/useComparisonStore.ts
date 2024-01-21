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
    }),
    {
      name: "comparison-storage",
    }
  )
);

const useComparison = () => {
  const { comparison, addToComparison, removeFromComparison, clearComparison } =
    useComparisonStore();

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
        10000,
        +bank?.interestRate?.[0]?.interest ?? 0,
        10
      );
      return {
        id: bank.bankName + " - " + bank.accountName,
        data: compoundInterest,
        allData: bank,
      };
    });
    return data;
  }, [comparison]);

  return {
    comparison,
    toggleComparison,
    clearComparison,
    isInComparison,
    compareCompoundInterest,
    count: comparison.length,
  };
};

export default useComparison;
