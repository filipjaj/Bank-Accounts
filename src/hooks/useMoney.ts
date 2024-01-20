import useFiltering from "./useFilterStore";

const useMoney = () => {
  const { updateFilter, getFilter } = useFiltering();
  const money = getFilter<number | undefined>("sum", undefined);
  const setMoney = (value: number) => {
    updateFilter({
      key: "sum",
      value,
    });
  };

  const handleMoneyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setMoney(value);
  };

  return {
    money,
    handleMoneyChange,
  };
};

export default useMoney;
