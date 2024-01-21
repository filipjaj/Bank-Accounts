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
          <ChevronsUpDownIcon className="w-4    text-muted-foreground " />
        ) : (
          <ChevronsDownUpIcon className="w-4  text-muted-foreground" />
        )}
        <p className=" text-muted-foreground text-sm">
          {collapsed ? "Vis kontotyper" : "Skjul kontotyper"}
        </p>
      </CollapsibleTrigger>
      <CollapsibleContent className=" flex gap-2 flex-wrap">
        {groups?.map((group) => (
          <SelectableBadge
            selected={group.selected}
            toggle={group.toggle}
            key={group.value}
          >
            {group.value}
          </SelectableBadge>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default AccountGroupFilter;
