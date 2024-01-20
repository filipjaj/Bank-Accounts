import { Badge } from "@/components/ui/badge";
import useMembership from "@/hooks/useMembership";

const MemberShipFilter = () => {
  const { memberships } = useMembership();
  return (
    <div className=" mt-6 flex flex-col gap-3">
      <p> Er du medlem av noen av disse?</p>
      <div className=" flex gap-2 flex-wrap">
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
      </div>
    </div>
  );
};

export default MemberShipFilter;
