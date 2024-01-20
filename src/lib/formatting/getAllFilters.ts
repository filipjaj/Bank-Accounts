import console from "console";
import { BankDataType } from "../bank-data";

const isNumber = (unknownType: any): unknownType is number => {
  return typeof unknownType === "number";
};

export type BankDataKeys = keyof BankDataType[number];

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
    values: {
      min: minNumberSpan,
      max: maxNumberSpan,
    },
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
    key,
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
    key,
  };
};

const getMatchingString = (
  data: BankDataType,
  key: BankDataKeys,
  string: unknown
) => {
  if (isString(string)) {
    return data.filter((bank) => {
      return bank[key] === string;
    });
  }
  if (!string) {
    return data;
  }
  return [];
};

const getNumbersInSpan = (
  data: BankDataType,
  fromKey: BankDataKeys,
  toKey: BankDataKeys,
  number: unknown
) => {
  if (isNumber(number)) {
    const filteredData = data.filter((bank) => {
      const fromNumber = convertEmptyStringToZero(bank[fromKey]);
      const toNumber = convertEmptyStringToZero(bank[toKey]);

      return fromNumber <= number && toNumber >= number;
    });
    return filteredData;
  }
  if (!number) {
    return data;
  }
  return [];
};

const getMoreThanOrEqualToInput = (
  data: BankDataType,
  key: BankDataKeys,
  number: unknown
) => {
  if (isNumber(number)) {
    const filteredData = data.filter((bank) => {
      const bankNumber = convertEmptyStringToZero(bank[key]);
      return bankNumber >= number;
    });
    return filteredData;
  }
  if (!number) {
    return data;
  }
  return [];
};

const getLessThanOrEqualToInput = (
  data: BankDataType,
  key: BankDataKeys,
  number: unknown
) => {
  if (isNumber(number)) {
    const filteredData = data.filter((bank) => {
      const bankNumber = convertEmptyStringToZero(bank[key]);
      return bankNumber <= number;
    });
    return filteredData;
  }

  if (!number) {
    return data;
  }
  return [];
};

const createGroupFilter = (data: BankDataType) => {
  const group = getUniqueStringValues(data, "gruppe");
  const find = (string: unknown) => getMatchingString(data, "gruppe", string);

  return {
    data: group,
    find,
  };
};

const createFreeWithdrawalSpan = (data: BankDataType) => {
  const freeWithdrawalSpan = getNumberSpan(data, "frie_uttak");
  const find = (number: unknown) =>
    getMoreThanOrEqualToInput(data, "frie_uttak", number);

  return {
    data: freeWithdrawalSpan,
    find,
  };
};

const createMarketArea = (data: BankDataType) => {
  const marketArea = getUniqueStringValues(data, "markedsomraade");
  const find = (string: unknown) =>
    getMatchingString(data, "markedsomraade", string);

  return {
    data: marketArea,
    find,
  };
};

const createAgeSpan = (data: BankDataType) => {
  const age = getNumberSpanTwoKeys(data, "min_alder", "maks_alder");
  const find = (number: unknown) =>
    getNumbersInSpan(data, "min_alder", "maks_alder", number);

  return {
    data: age,
    find,
  };
};

const createSumSpan = (data: BankDataType) => {
  const sum = getNumberSpanTwoKeys(data, "min_belop", "maks_belop");
  const find = (number: unknown) =>
    getNumbersInSpan(data, "min_belop", "maks_belop", number);

  return {
    data: sum,
    find,
  };
};

const createMonthlySavingSpan = (data: BankDataType) => {
  const monthlySaving = getNumberSpanTwoKeys(
    data,
    "manedlig_sparing_min_belop",
    "manedlig_sparing_maks_belop"
  );
  const find = (number: unknown) =>
    getNumbersInSpan(
      data,
      "manedlig_sparing_min_belop",
      "manedlig_sparing_maks_belop",
      number
    );

  return {
    data: monthlySaving,
    find,
  };
};

const trimAllStringsInArray = (array: string[]) => {
  return array.map((string) => string.trim());
};

const getAnyStringInArray = (
  data: BankDataType,
  key: BankDataKeys,
  strings: unknown
) => {
  if (!strings) {
    return data;
  }
  if (Array.isArray(strings) && strings.length === 0) {
    return data;
  }
  if (
    Array.isArray(strings) &&
    strings.filter((string) => isString(string)).length > 0
  ) {
    const filteredData = data.filter((bank) => {
      const bankString = bank[key];
      const bankStringArray = isString(bankString)
        ? trimAllStringsInArray(bankString.split(","))
        : [];

      const hasAnyString = strings.some((string) =>
        bankStringArray.includes(string)
      );
      return hasAnyString;
    });
    return filteredData;
  }
  return [];
};

const createMembership = (data: BankDataType) => {
  const membership = getArrayFromString(data, "medlemskap_tekst");
  const find = (strings: unknown) =>
    getAnyStringInArray(data, "medlemskap_tekst", strings);

  return {
    data: membership,
    find,
  };
};

const createMonthlySaving = (data: BankDataType) => {
  const monthlySaving = getBooleanValues(data, "manedlig_sparing");
  const find = (boolean: unknown) =>
    data.filter((bank) => bank.manedlig_sparing === boolean);

  return {
    data: monthlySaving,
    find,
  };
};

const getAllFilters = (data: BankDataType) => {
  const group = createGroupFilter(data);
  const freeWithdrawalSpan = createFreeWithdrawalSpan(data);
  const marketArea = createMarketArea(data);
  const age = createAgeSpan(data);
  const sum = createSumSpan(data);
  const monthlySaving = createMonthlySavingSpan(data);
  const membership = createMembership(data);
  const isMonthlySaving = createMonthlySaving(data);

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

export const getAllFilterValues = (data: BankDataType) => {
  const allFilters = getAllFilters(data);

  const allFilterValues = Object.values(allFilters).map((filter) => {
    return filter.data;
  });

  return allFilterValues;
};

type FilerValueTypes = string[] | NumberSpan | boolean[];

type NumberSpan = {
  min: number;
  max: number;
};

export type AllFilters = ReturnType<typeof getAllFilters>;

const getNumberSpanTwoKeys = (
  data: BankDataType,
  fromKey: BankDataKeys,
  toKey: BankDataKeys
) => {
  const fromSpan = getNumberSpan(data, fromKey);
  const toSpan = getNumberSpan(data, toKey);

  const min = Math.min(fromSpan.values.min, toSpan.values.min);
  const max = Math.max(fromSpan.values.max, toSpan.values.max);

  return {
    values: {
      min,
      max,
    },

    type: "numberSpan",
  };
};

const getBooleanValues = (data: BankDataType, key: BankDataKeys) => {
  return {
    type: "boolean",
    values: [true, false],
    key,
  };
};

type IncomingFilter = Partial<{
  [key in keyof AllFilters]: {
    value: string | number | boolean | string[] | number[];
  };
}>;

const isNumberSpan = (filter: FilerValueTypes): filter is NumberSpan => {
  return (
    typeof filter === "object" &&
    filter.hasOwnProperty("min") &&
    filter.hasOwnProperty("max")
  );
};

const validateNumberSpan = (filterValues: FilerValueTypes) => {
  if (isNumberSpan(filterValues)) {
    const min = filterValues.min;
    const max = filterValues.max;

    const isNumberSpan = isNumber(filterValue);
    if (!isNumberSpan) {
      return false;
    }

    const isWithinRange = filterValue >= min && filterValue <= max;
    return isWithinRange;
  }
};

const filterData = (data: IncomingFilter, rawData: BankDataType) => {
  const filters = getAllFilters(rawData);

  const group = filters?.group?.find(data?.group);
  const freeWithdrawalSpan = filters?.freeWithdrawalSpan?.find(
    data?.freeWithdrawalSpan
  );
  const marketArea = filters?.marketArea?.find(data?.marketArea);
  const age = filters?.age?.find(data?.age);
  const sum = filters?.sum?.find(data?.sum);
  const monthlySaving = filters?.monthlySaving?.find(data?.monthlySaving);
  const isMonthlySaving = filters?.isMonthlySaving?.find(data?.isMonthlySaving);
  const membership = filters?.membership?.find(data?.membership);

  const filteredData = [
    group,
    freeWithdrawalSpan,
    marketArea,
    age,
    sum,
    monthlySaving,
    isMonthlySaving,
    membership,
  ].flat();
};

const filterGroup = (data: BankDataType[number], group: string) => {
  return data.gruppe === group;
};

type FilterFunction = (data: BankDataType) => BankDataType;

export default getAllFilters;
