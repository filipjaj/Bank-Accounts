import bankData from "@/lib/bank-data";
import { getAllFilterValues } from "@/lib/formatting/getAllFilters";

export async function GET() {
  const filters = getAllFilterValues(bankData.feed.entry);

  return new Response(JSON.stringify(filters, null, 4), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}
