"use client";
import useMembership from "@/hooks/useMembership";
import { ChevronsDownUpIcon, ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import SelectableBadge from "../SelectableBadge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

const MemberShipFilter = () => {
  const { memberships } = useMembership();
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Collapsible className="flex flex-col gap-3 py-4" open={!collapsed}>
      <CollapsibleTrigger
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center "
      >
        {collapsed ? (
          <ChevronsUpDownIcon className="w-4 text-muted-foreground" />
        ) : (
          <ChevronsDownUpIcon className="w-4 text-muted-foreground" />
        )}
        <p className="text-sm text-muted-foreground">Medlem av organisasjon?</p>
      </CollapsibleTrigger>
      <CollapsibleContent className=" flex gap-2 flex-wrap">
        {memberships?.map((membership) => (
          <SelectableBadge
            selected={membership.selected}
            toggle={membership.toggle}
          >
            {membership.value}
          </SelectableBadge>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default MemberShipFilter;
