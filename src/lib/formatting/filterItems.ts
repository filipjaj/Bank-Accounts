import { z } from "zod";
import { BankDataType } from "../bank-data";
import formatData from "./dataFormatting";
import { getFilterFunction } from "./filterFunctions";

export const FiltersSchema = z.enum([
  "gruppe",
  "frie_uttak",
  "markedsomraade",
  "alder",
  "sum",
  "manedlig_sparing",
  "medlemskap",
  "bank",
]);

export const IncomingFiltersSchema = z.union([
  z.object({
    key: z.enum(["markedsomraade"]),
    value: z.string(),
  }),
  z.object({
    key: z.enum(["medlemskap", "gruppe", "bank"]),
    value: z.array(z.string()),
  }),
  z.object({
    key: z.enum(["frie_uttak", "alder", "sum", "manedlig_sparing"]),
    value: z.number(),
  }),
]);

// TODO: fix the filter function so that it also works when certain filters are not included
const defaultFilters = [
  {
    key: "medlemskap",
    value: [],
  },
];
export const IncomingFiltersArraySchema = z.array(IncomingFiltersSchema);

const removeEmptyFilters = (
  incomingFilters: z.infer<typeof IncomingFiltersArraySchema>
) => {
  const filteredFilters = incomingFilters.filter((filter) => {
    const { key, value } = filter;

    return !!value;
  });

  const filteredeDefaults = defaultFilters.filter((filter) => {
    const { key } = filter;

    const findFilter = filteredFilters.find((f) => f.key === key);

    return !findFilter;
  });

  return [...filteredFilters, ...filteredeDefaults];
};

const filterItems = (
  data: BankDataType,
  incomingFilters: z.infer<typeof IncomingFiltersArraySchema>
) => {
  const nonEmptyFilters = removeEmptyFilters(incomingFilters);
  const filters = IncomingFiltersArraySchema.safeParse(nonEmptyFilters);
  if (!filters.success) {
    return filters.error;
  }

  const filteredData = data.filter((item) => {
    return filters.data.every((filter) => {
      const { key, value } = filter;

      const filterFunction = getFilterFunction(key);
      // @ts-ignore
      const result = filterFunction(item, value);

      return result;
    });
  });

  return formatData(filteredData);
};

export default filterItems;
