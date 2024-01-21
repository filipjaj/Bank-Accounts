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
    <Collapsible className="flex flex-col gap-3 py-2" open={!collapsed}>
      <CollapsibleTrigger
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center "
      >
        {collapsed ? (
          <ChevronsUpDownIcon className="w-4 " />
        ) : (
          <ChevronsDownUpIcon className="w-4 " />
        )}
        <p className="text-sm ">Medlem av organisasjon?</p>
      </CollapsibleTrigger>
      <CollapsibleContent className=" flex gap-2 flex-wrap">
        {memberships?.map((membership) => (
          <SelectableBadge
            key={membership.value}
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
