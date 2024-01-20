import { z } from "zod";
import { BankDataType } from "../bank-data";
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
const IncomingFiltersSchema = z.union([
  z.object({
    key: z.enum(["gruppe", "markedsomraade"]),
    value: z.string(),
  }),
  z.object({
    key: z.enum(["medlemskap"]),
    value: z.array(z.string()),
  }),
  z.object({
    key: z.enum(["frie_uttak", "alder", "sum", "manedlig_sparing"]),
    value: z.number(),
  }),
]);
const IncomingFiltersArraySchema = z.array(IncomingFiltersSchema);

const filterItems = (
  data: BankDataType,
  incomingFilters: z.infer<typeof IncomingFiltersArraySchema>
) => {
  const filters = IncomingFiltersArraySchema.parse(incomingFilters);

  const filteredData = data.filter((item) => {
    return filters.every((filter) => {
      const { key, value } = filter;

      const filterFunction = getFilterFunction(filter.key);
      // @ts-ignore
      return filterFunction(item, filter.value);
    });
  });

  return filteredData;
};

export default filterItems;
