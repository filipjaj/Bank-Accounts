import bankData from "@/lib/bank-data";
import formatData from "@/lib/formatting/dataFormatting";

export async function GET() {
  const data = formatData(bankData.feed.entry);
  return new Response(JSON.stringify(data, null, 4), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}
