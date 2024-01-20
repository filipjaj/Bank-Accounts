import BankAccountList from "@/components/BankAccountList";
import Filters from "@/components/Filters";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export const getBankAccounts = async () => {
  const response = await fetch("/api/all");
  const data = await response.json();
  return data;
};

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["accounts"],
    queryFn: getBankAccounts,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Filters />
      <BankAccountList />
    </HydrationBoundary>
  );
}
