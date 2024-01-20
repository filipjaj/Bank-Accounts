import bankData from "@/lib/bank-data";
import filterItems from "@/lib/formatting/filterItems";
import getAllFilters from "@/lib/formatting/getAllFilters";
export async function GET() {
  const filters = getAllFilters(bankData.feed.entry);

  return new Response(JSON.stringify(filters, null, 4), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  console.log("body", body);

  const result = filterItems(bankData.feed.entry, body.filters);

  return new Response(JSON.stringify(result, null, 4), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}
