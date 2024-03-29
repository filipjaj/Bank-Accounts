import { z } from "zod";
import { IncomingFiltersArraySchema } from "./formatting/filterItems";

export const getBankAccounts = async (
  pageParam?: unknown,
  filters?: z.infer<typeof IncomingFiltersArraySchema>
) => {
  const response = await fetch("/api/filters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filters: filters ?? [],
      page: pageParam ?? 1,
    }),
  });

  const data = await response.json();
  return data;
};
