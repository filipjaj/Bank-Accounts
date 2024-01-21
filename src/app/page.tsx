import BankAccountList from "@/components/BankAccountList";
import Filters from "@/components/FilterComponents/Filters";
import { getBankAccounts } from "@/lib/serverFunctions";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { SlidersHorizontalIcon } from "lucide-react";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["accounts"],
    queryFn: () => getBankAccounts(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Filters />
      <div className=" ml-6">
        <h2 className="text-3xl font-bold  text-primary">
          Sammenlign bankkontoer
        </h2>
        <div className="flex items-center  gap-2">
          <SlidersHorizontalIcon className="w-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Bruk filterne til å finne en bank som passer deg
          </p>
        </div>
      </div>
      <BankAccountList />
    </HydrationBoundary>
  );
}
