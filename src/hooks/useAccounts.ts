import { FormattedBankData } from "@/lib/formatting/dataFormatting";
import { getBankAccounts } from "@/lib/serverFunctions";
import { useQuery } from "@tanstack/react-query";
import useFiltering from "./useFilterStore";

const useAccounts = () => {
  const { activeFilters } = useFiltering();
  const { data, isLoading, isError } = useQuery<FormattedBankData>({
    queryKey: ["accounts", activeFilters.filter((f) => !!f.value)],
    queryFn: () => getBankAccounts(activeFilters),
  });

  return {
    data,
    isLoading,
    isError,
  };
};

export default useAccounts;
