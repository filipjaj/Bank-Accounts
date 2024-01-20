import { AllFilters } from "@/lib/formatting/getAllFilters";
import { useQuery } from "@tanstack/react-query";

const getFilters = async () => {
  const response = await fetch("/api/filters");
  const data = await response.json();
  return data;
};

const useFilters = () => {
  const { data, isLoading, isError } = useQuery<AllFilters>({
    queryKey: ["filters"],
    queryFn: getFilters,
  });

  return {
    data,
    isLoading,
    isError,
  };
};

export default useFilters;
