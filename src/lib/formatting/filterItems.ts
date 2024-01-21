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
]);

export const IncomingFiltersSchema = z.union([
  z.object({
    key: z.enum(["markedsomraade"]),
    value: z.string(),
  }),
  z.object({
    key: z.enum(["medlemskap", "gruppe"]),
    value: z.array(z.string()),
  }),
  z.object({
    key: z.enum(["frie_uttak", "alder", "sum", "manedlig_sparing"]),
    value: z.number(),
  }),
]);

export const IncomingFiltersArraySchema = z.array(IncomingFiltersSchema);

const removeEmptyFilters = (
  incomingFilters: z.infer<typeof IncomingFiltersArraySchema>
) => {
  const filteredFilters = incomingFilters.filter((filter) => {
    const { key, value } = filter;

    if (key === "medlemskap" || key === "gruppe") {
      return value.length > 0;
    }

    return !!value;
  });

  return filteredFilters;
};

const filterItems = (
  data: BankDataType,
  incomingFilters: z.infer<typeof IncomingFiltersArraySchema>
) => {
  const nonEmptyFilters = removeEmptyFilters(incomingFilters);
  const filters = IncomingFiltersArraySchema.parse(nonEmptyFilters);

  const filteredData = data.filter((item) => {
    return filters.every((filter) => {
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
