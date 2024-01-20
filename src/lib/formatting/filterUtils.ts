import { BankDataType } from "../bank-data";

export const isNumber = (unknownType: any): unknownType is number => {
  return typeof unknownType === "number";
};

export type BankDataKeys = keyof BankDataType[number];

export const convertEmptyStringToZero = (
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

export const getNumberSpan = (data: BankDataType, key: BankDataKeys) => {
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

export const getUniqueValues = (data: BankDataType, key: BankDataKeys) => {
  const uniqueValues = data.map((bank) => {
    return bank[key];
  });

  const uniqueValuesSet = new Set(uniqueValues);
  const uniqueValuesArray = Array.from(uniqueValuesSet);

  return uniqueValuesArray;
};

export const isString = (value: any): value is string => {
  return typeof value === "string";
};

export const onlyStrings = (value: any) => {
  return isString(value) ? value : "";
};

export const getUniqueStringValues = (
  data: BankDataType,
  key: BankDataKeys
) => {
  const uniqueValues = getUniqueValues(data, key);
  const uniqueValuesArray = uniqueValues.map(onlyStrings);

  return {
    type: "string",
    values: uniqueValuesArray,
  };
};

export const getArrayFromString = (data: BankDataType, key: BankDataKeys) => {
  const uniqueValues = getUniqueStringValues(data, key);

  const uniqueValuesArray = uniqueValues?.values
    .map((value) => {
      return value.split(",").map((item) => item.trim());
    })
    .flat()
    .filter((item) => item !== "");

  const uniqueValuesSet = new Set(uniqueValuesArray);
  const uniqueValuesArray2 = Array.from(uniqueValuesSet);

  return {
    type: "array",
    values: uniqueValuesArray2,
  };
};

export const compareStringValues = (itemValue: string, filterValue: string) => {
  return itemValue === filterValue;
};

export const numberIsBetween = (
  number: number,
  min: number | string,
  max: number | string
) => {
  if (typeof min === "string" || typeof max === "string") {
    return false;
  }
  if (min === 0 && max === 0) {
    return true;
  }
  return number >= min && number <= max;
};

export const numberIsBelow = (number: number, max: number | string) => {
  if (typeof max === "string") {
    return false;
  }
  return number <= max;
};

export const compareStringArrayWithArray = (
  itemValue: string,
  filterValue: string[]
) => {
  const itemValueArray = itemValue.split(",").map((item) => item.trim());
  return filterValue.some((value) => itemValueArray.includes(value));
};
