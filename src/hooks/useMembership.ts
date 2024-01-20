import { useState } from "react";
import useFilters from "./useFilters";

const useMembership = () => {
  const { data } = useFilters();
  const [memberships, setMemberships] = useState<string[]>([]);

  const isSelected = (membership: string) => {
    return memberships.includes(membership);
  };

  const toggleMembership = (membership: string) => {
    if (isSelected(membership)) {
      setMemberships(memberships.filter((m) => m !== membership));
    } else {
      setMemberships([...memberships, membership]);
    }
  };

  const membershipsWithFunctions =
    data?.membership?.values.map((membership) => {
      return {
        value: membership,
        label: membership,
        selected: isSelected(membership),
        toggle: () => toggleMembership(membership),
      };
    }) ?? [];

  return {
    memberships: membershipsWithFunctions,
  };
};

export default useMembership;
