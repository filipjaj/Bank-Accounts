"use client";
import { Badge } from "@/components/ui/badge";
import useAccountGroup from "@/hooks/useAccounGroup";
import { ChevronsDownUpIcon, ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const AccountGroupFilter = () => {
  const { groups } = useAccountGroup();
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Collapsible className=" flex flex-col gap-3" open={!collapsed}>
      <CollapsibleContent className=" flex gap-2 flex-wrap">
        {groups?.map((group) => (
          <Badge
            className="cursor-pointer"
            onClick={group.toggle}
            key={group.value}
            variant={group.selected ? "default" : "outline"}
          >
            {group.value}
          </Badge>
        ))}
      </CollapsibleContent>
      <CollapsibleTrigger
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center "
      >
        {collapsed ? (
          <ChevronsUpDownIcon className="w-4" />
        ) : (
          <ChevronsDownUpIcon className="w-4" />
        )}
        <p>{collapsed ? "Vis kontotyper" : "Skjul kontotyper"}</p>
      </CollapsibleTrigger>
    </Collapsible>
  );
};

export default AccountGroupFilter;
