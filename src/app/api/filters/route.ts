import bankData from "@/lib/bank-data";
import getAllFilters from "@/lib/formatting/getAllFilters";

export async function GET() {
  const filters = getAllFilters(bankData.feed.entry);

  return new Response(JSON.stringify(filters, null, 4), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}
