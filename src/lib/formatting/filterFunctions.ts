import { z } from "zod";
import { BankDataType } from "../bank-data";
import { FiltersSchema } from "./filterItems";
import {
  compareStringValues,
  numberIsBelow,
  numberIsBetween,
} from "./filterUtils";

const filterGroup = (data: BankDataType[number], filterValue: string[]) => {
  if (filterValue?.length === 0) return true;

  const groupIsIncluded = filterValue.includes(data.gruppe);

  return groupIsIncluded;
};

const filterFreeWithdrawal = (
  data: BankDataType[number],
  filterValue: number
) => {
  return numberIsBelow(filterValue, data.frie_uttak);
};

const filterMarketArea = (data: BankDataType[number], filterValue: string) => {
  return compareStringValues(data.markedsomraade, filterValue);
};

const filterAge = (data: BankDataType[number], filterValue: number) => {
  return numberIsBetween(filterValue, data.min_alder, data.maks_alder);
};

const filterSum = (data: BankDataType[number], filterValue: number) => {
  return numberIsBetween(filterValue, data.min_belop, data.maks_belop);
};

const filterMonthlySaving = (
  data: BankDataType[number],
  filterValue: number
) => {
  return numberIsBetween(
    filterValue,
    data.manedlig_sparing_min_belop,
    data.manedlig_sparing_maks_belop
  );
};

const filterMembership = (
  data: BankDataType[number],
  filterValue: string[]
) => {
  if (filterValue?.length === 0) return data.medlemskap_tekst === "";
  const membership = data.medlemskap_tekst
    .split(",")
    .map((item) => item.trim());

  const membershipSet = new Set(membership);
  const membershipArray = Array.from(membershipSet);

  const membershipIsIncluded = filterValue.some((item) =>
    membershipArray.includes(item)
  );

  return membershipIsIncluded;
};

const filterBank = (data: BankDataType[number], filterValue: string[]) => {
  if (filterValue?.length === 0) return true;
//TODO: fix this logic
  const bankIsIncluded = filterValue.includes(data.leverandor_tekst);

  return bankIsIncluded;
};

type FilterFunctionString = (
  item: BankDataType[number],
  value: string
) => boolean;
type FilterFunctionNumber = (
  item: BankDataType[number],
  value: number
) => boolean;
type FilterFunctionStringArray = (
  item: BankDataType[number],
  value: string[]
) => boolean;

export const getFilterFunction = (filter: z.infer<typeof FiltersSchema>) => {
  const validatedFilter = FiltersSchema.parse(filter);

  if (validatedFilter === "medlemskap") {
    return filterMembership as FilterFunctionStringArray;
  }

  if (validatedFilter === "gruppe") {
    return filterGroup as FilterFunctionStringArray;
  }

  if (validatedFilter === "markedsomraade") {
    return filterMarketArea as FilterFunctionString;
  }

  if (validatedFilter === "frie_uttak") {
    return filterFreeWithdrawal as FilterFunctionNumber;
  }

  if (validatedFilter === "alder") {
    return filterAge as FilterFunctionNumber;
  }

  if (validatedFilter === "bank") {
    return filterBank as FilterFunctionStringArray;
  }

  if (validatedFilter === "sum") {
    return filterSum as FilterFunctionNumber;
  }

  if (validatedFilter === "manedlig_sparing") {
    return filterMonthlySaving as FilterFunctionNumber;
  }

  return () => true;
};
