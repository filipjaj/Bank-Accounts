import { BankDataType } from "../bank-data";

import {
  BankDataKeys,
  getArrayFromString,
  getNumberSpan,
  getUniqueStringValues,
} from "./filterUtils";

const getAllFilters = (data: BankDataType) => {
  const group = getUniqueStringValues(data, "gruppe");
  const freeWithdrawalSpan = getNumberSpan(data, "frie_uttak");
  const marketArea = getUniqueStringValues(data, "markedsomraade");
  const age = getNumberSpanTwoKeys(data, "min_alder", "maks_alder");
  const sum = getNumberSpanTwoKeys(data, "min_belop", "maks_belop");
  const bank = getUniqueStringValues(data, "leverandor_tekst");
  const monthlySaving = getNumberSpanTwoKeys(
    data,
    "manedlig_sparing_min_belop",
    "manedlig_sparing_maks_belop"
  );
  const membership = getArrayFromString(data, "medlemskap_tekst");
  const isMonthlySaving = getBooleanValues(data, "manedlig_sparing");

  return {
    group,
    freeWithdrawalSpan,
    marketArea,
    age,
    sum,
    monthlySaving,
    isMonthlySaving,
    membership,
    bank,
  };
};

export type AllFilters = ReturnType<typeof getAllFilters>;

const getNumberSpanTwoKeys = (
  data: BankDataType,
  fromKey: BankDataKeys,
  toKey: BankDataKeys
) => {
  const fromSpan = getNumberSpan(data, fromKey);
  const toSpan = getNumberSpan(data, toKey);

  const min = Math.min(fromSpan.min, toSpan.min);
  const max = Math.max(fromSpan.max, toSpan.max);

  return {
    min,
    max,
    type: "numberSpan",
  };
};

const getBooleanValues = (data: BankDataType, key: BankDataKeys) => {
  return {
    type: "boolean",
    values: [true, false],
  };
};

export default getAllFilters;
