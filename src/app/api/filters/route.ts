import bankData from "@/lib/bank-data";
import { FormattedBankData } from "@/lib/formatting/dataFormatting";
import filterItems from "@/lib/formatting/filterItems";
import getAllFilters from "@/lib/formatting/getAllFilters";
import { convertToPagination } from "@/lib/utils";
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

  const pageInput = body.page ?? 1;
  const pageSize = body.pageSize ?? 10;

  const resultFull = filterItems(bankData.feed.entry, body.filters);

  const { result, numberOfPages, page, total } = convertToPagination(
    resultFull,
    pageInput,
    pageSize
  );

  return new Response(
    JSON.stringify(
      {
        result,
        page,
        pageSize,
        numberOfPages,
        total,
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
