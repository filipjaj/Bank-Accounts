import useFiltering from "./useFilterStore";

const useAge = () => {
  const { updateFilter, getFilter } = useFiltering();
  const age = getFilter<number | undefined>("alder", undefined);
  const setAge = (value: number) => {
    updateFilter({
      key: "alder",
      value,
    });
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setAge(value);
  };

  return {
    age,
    handleAgeChange,
  };
};

export default useAge;
