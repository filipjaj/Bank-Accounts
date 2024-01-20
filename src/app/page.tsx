import BankAccountList from "@/components/BankAccountList";
import Filters from "@/components/Filters";
import { buttonVariants } from "@/components/ui/button";
import { getBankAccounts } from "@/lib/serverFunctions";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Link from "next/link";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["accounts"],
    queryFn: () => getBankAccounts(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Filters />
      <BankAccountList />
    </HydrationBoundary>
  );
}
