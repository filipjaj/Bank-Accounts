import useFiltering from "./useFilterStore";
import useFilters from "./useFilters";

const useBanks = () => {
  const { updateFilter, getFilter } = useFiltering();
  const banks = getFilter<string[]>("bank", []);
  const setBanks = (value: string[]) => {
    updateFilter({
      key: "bank",
      value,
    });
  };

  const { data } = useFilters();

  const isSelected = (bank: string) => {
    return banks.includes(bank);
  };

  const togglebank = (bank: string) => {
    if (isSelected(bank)) {
      setBanks(banks.filter((m) => m !== bank));
    } else {
      setBanks([...banks, bank]);
    }
  };

  const banksWithFunctions =
    data?.bank?.values.map((bank) => {
      return {
        value: bank,
        label: bank,
      };
    }) ?? [];

  return {
    banks: banksWithFunctions,
    changeFunction: setBanks,
    selected: banks,
  };
};

export default useBanks;
