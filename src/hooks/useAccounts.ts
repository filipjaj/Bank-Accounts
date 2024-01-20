import { APIResponse } from "@/app/api/filters/route";
import { getBankAccounts } from "@/lib/serverFunctions";
import { useInfiniteQuery } from "@tanstack/react-query";
import useFiltering from "./useFilterStore";

const useAccounts = () => {
  const { activeFilters } = useFiltering();
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery<APIResponse>({
      queryKey: ["accounts", activeFilters.filter((f) => !!f.value)],
      queryFn: ({ pageParam = 1 }) => getBankAccounts(pageParam, activeFilters),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.page + 1,
    });

  return {
    data: data?.pages.flatMap((page) => page.result).flat() ?? [],
    isLoading,
    isError,
    fetchNextPage,
  };
};

export default useAccounts;
