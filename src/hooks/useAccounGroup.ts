import useFiltering from "./useFilterStore";
import useFilters from "./useFilters";

const useAccountGroup = () => {
  const { updateFilter, getFilter } = useFiltering();
  const groups = getFilter<string[]>("gruppe", []);
  const setGroups = (value: string[]) => {
    updateFilter({
      key: "gruppe",
      value,
    });
  };

  const { data } = useFilters();

  const isSelected = (group: string) => {
    return groups.includes(group);
  };

  const togglegroup = (group: string) => {
    if (isSelected(group)) {
      setGroups(groups.filter((m) => m !== group));
    } else {
      setGroups([...groups, group]);
    }
  };

  const groupsWithFunctions =
    data?.group?.values.map((group) => {
      return {
        value: group,
        label: group,
        selected: isSelected(group),
        toggle: () => togglegroup(group),
      };
    }) ?? [];

  return {
    groups: groupsWithFunctions,
  };
};

export default useAccountGroup;
