import { z } from "zod";
import { IncomingFiltersArraySchema } from "./formatting/filterItems";

export const getBankAccounts = async (
  filters?: z.infer<typeof IncomingFiltersArraySchema>
) => {
  const response = await fetch("/api/filters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filters: filters ?? [],
    }),
  });

  const data = await response.json();
  return data;
};
