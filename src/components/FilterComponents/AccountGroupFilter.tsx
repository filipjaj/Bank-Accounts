"use client";
import useAccountGroup from "@/hooks/useAccounGroup";
import { ChevronsDownUpIcon, ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import SelectableBadge from "../SelectableBadge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

type AccountFilterValues =
  | "BSU_AFTER_34"
  | "FAST01"
  | "SPAREKONTO_MED_BEGRENSNINGER"
  | "SPAREKONTO_UTEN_BEGRENSNINGER"
  | "PENSJONSSPARING"
  | "BSU"
  | "BRUKSKONTO"
  | "DEPOSITUMSKONTO"
  | "FAST23"
  | "FAST45";

const convertValueToLabel = (value: AccountFilterValues | string) => {
  switch (value) {
    case "BSU_AFTER_34":
      return "BSU etter fylte 34";
    case "FAST01":
      return "Fastrente 0 - 1 år";
    case "SPAREKONTO_MED_BEGRENSNINGER":
      return "Sparekonto med begrensninger";
    case "SPAREKONTO_UTEN_BEGRENSNINGER":
      return "Sparekonto uten begrensninger";
    case "PENSJONSSPARING":
      return "Pensjonssparing";
    case "BSU":
      return "BSU";
    case "BRUKSKONTO":
      return "Brukskonto";
    case "DEPOSITUMSKONTO":
      return "Depositumskonto";
    case "FAST23":
      return "Fastrente 2 - 3 år";
    case "FAST45":
      return "Fastrente 4 - 5 år";
    default:
      return value;
  }
};

const AccountGroupFilter = () => {
  const { groups } = useAccountGroup();
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Collapsible className=" flex flex-col gap-3 pt-4" open={!collapsed}>
      <CollapsibleTrigger
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center gap-1 "
      >
        {collapsed ? (
          <ChevronsUpDownIcon className="w-4    " />
        ) : (
          <ChevronsDownUpIcon className="w-4  " />
        )}
        <p className="  text-sm">
          {collapsed ? "Filtrer på konto type" : "Skjul kontotyper"}
        </p>
      </CollapsibleTrigger>
      <CollapsibleContent className=" flex gap-2 flex-wrap">
        {groups?.map((group) => (
          <SelectableBadge
            selected={group.selected}
            toggle={group.toggle}
            key={group.value}
          >
            {convertValueToLabel(group?.value)}
          </SelectableBadge>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default AccountGroupFilter;
