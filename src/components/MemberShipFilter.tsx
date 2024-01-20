"use client";
import { Badge } from "@/components/ui/badge";
import useMembership from "@/hooks/useMembership";
import { ChevronsDownUpIcon, ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const MemberShipFilter = () => {
  const { memberships } = useMembership();
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Collapsible className=" mt-6 flex flex-col gap-3" open={!collapsed}>
      <CollapsibleContent className=" flex gap-2 flex-wrap">
        {memberships?.map((membership) => (
          <Badge
            className="cursor-pointer"
            onClick={membership.toggle}
            key={membership.value}
            variant={membership.selected ? "default" : "outline"}
          >
            {membership.value}
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
        <p>Medlem av organisasjon?</p>
      </CollapsibleTrigger>
    </Collapsible>
  );
};

export default MemberShipFilter;
