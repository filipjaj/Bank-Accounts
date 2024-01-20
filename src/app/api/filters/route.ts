import bankData from "@/lib/bank-data";
import { FormattedBankData } from "@/lib/formatting/dataFormatting";
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

  const page = body.page ?? 1;
  const pageSize = body.pageSize ?? 10;

  const resultFull = filterItems(bankData.feed.entry, body.filters);

  const result = resultFull.slice(
    (page - 1) * pageSize,
    (page - 1) * pageSize + pageSize
  );

  return new Response(
    JSON.stringify(
      {
        result,
        page,
        pageSize,
        numberOfPages: Math.ceil(result.length / pageSize),
        total: result.length,
      },
      null,
      4
    ),
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );
}

export type APIResponse = {
  result: FormattedBankData[];
  page: number;
  pageSize: number;
  numberOfPages: number;
  total: number;
};
