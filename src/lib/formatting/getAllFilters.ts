import console from "console";
import { BankDataType } from "../bank-data";

const getAllAccountGroups = (data: BankDataType) => {
  const accountGroups = data.map((bank) => bank.gruppe);
  const uniqueAccountGroupsSet = new Set(accountGroups);
  const uniqueAccountGroups = Array.from(uniqueAccountGroupsSet);
  return uniqueAccountGroups;
};

const isNumber = (unknownType: any): unknownType is number => {
  return typeof unknownType === "number";
};

const getFreeWithdrawalSpan = (data: BankDataType) => {
  const freeWithdrawalSpan = data.map((bank) => {
    return isNumber(bank.frie_uttak)
      ? bank.frie_uttak
      : convertEmptyStringToZero(bank.frie_uttak);
  });
  const uniqueFreeWithdrawalSpanSet = new Set(freeWithdrawalSpan);
  const uniqueFreeWithdrawalSpan = Array.from(uniqueFreeWithdrawalSpanSet);
  const minFreeWithdrawalSpan = Math.min(...uniqueFreeWithdrawalSpan);
  const maxFreeWithdrawalSpan = Math.max(...uniqueFreeWithdrawalSpan);

  return {
    min: minFreeWithdrawalSpan,
    max: maxFreeWithdrawalSpan,
  };
};

const getMaximumAge = (data: BankDataType) => {
  const maximumAge = data.map((bank) => {
    return bank.maks_alder;
  });
  const uniqueMaximumAgeSet = new Set(maximumAge);
  const uniqueMaximumAge = Array.from(uniqueMaximumAgeSet);
  const minMaximumAge = Math.min(...uniqueMaximumAge);
  const maxMaximumAge = Math.max(...uniqueMaximumAge);

  return {
    min: minMaximumAge,
    max: maxMaximumAge,
  };
};

type BankDataKeys = keyof BankDataType[number];

const convertEmptyStringToZero = (
  stringOrNumberOrBoolean: string | number | boolean
): number => {
  if (isNumber(stringOrNumberOrBoolean)) {
    return stringOrNumberOrBoolean;
  }

  if (typeof stringOrNumberOrBoolean === "boolean") {
    return 0;
  }

  const isNotANumber = isNaN(parseInt(stringOrNumberOrBoolean));
  if (isNotANumber) {
    return 0;
  }
  return parseInt(stringOrNumberOrBoolean);
};

const getNumberSpan = (data: BankDataType, key: BankDataKeys) => {
  const uniqueNumberSpanSet = getUniqueValues(data, key);
  const numberSpan = uniqueNumberSpanSet.map((value) => {
    return convertEmptyStringToZero(value);
  });
  const numberSpanWithoutNull = numberSpan.filter(
    (number) => typeof number === "number"
  );

  const minNumberSpan = Math.min(...numberSpan);
  const maxNumberSpan = Math.max(...numberSpan);

  return {
    min: minNumberSpan,
    max: maxNumberSpan,
    type: "numberSpan",
  };
};

const getUniqueValues = (data: BankDataType, key: BankDataKeys) => {
  const uniqueValues = data.map((bank) => {
    return bank[key];
  });

  const uniqueValuesSet = new Set(uniqueValues);
  const uniqueValuesArray = Array.from(uniqueValuesSet);

  return uniqueValuesArray;
};

const isString = (value: any): value is string => {
  return typeof value === "string";
};

const onlyStrings = (value: any) => {
  return isString(value) ? value : "";
};

const getUniqueStringValues = (data: BankDataType, key: BankDataKeys) => {
  const uniqueValues = getUniqueValues(data, key);
  const uniqueValuesArray = uniqueValues.map(onlyStrings);

  return {
    type: "string",
    values: uniqueValuesArray,
  };
};

const getArrayFromString = (data: BankDataType, key: BankDataKeys) => {
  const uniqueValues = getUniqueStringValues(data, key);

  const uniqueValuesArray = uniqueValues?.values
    .map((value) => {
      return value.split(",").map((item) => item.trim());
    })
    .flat()
    .filter((item) => item !== "");

  const uniqueValuesSet = new Set(uniqueValuesArray);
  const uniqueValuesArray2 = Array.from(uniqueValuesSet);

  console.log(uniqueValuesArray2);

  return {
    type: "array",
    values: uniqueValuesArray2,
  };
};

const getAllFilters = (data: BankDataType) => {
  const group = getUniqueStringValues(data, "gruppe");
  const freeWithdrawalSpan = getNumberSpan(data, "frie_uttak");
  const marketArea = getUniqueStringValues(data, "markedsomraade");
  const age = getNumberSpanTwoKeys(data, "min_alder", "maks_alder");
  const sum = getNumberSpanTwoKeys(data, "min_belop", "maks_belop");
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
