import { Badge, BadgeProps } from "./ui/badge";

export interface SelectableBadgeProps extends BadgeProps {
  selected: boolean;
  toggle: () => void;
}

const SelectableBadge = ({
  selected,
  toggle,
  ...props
}: SelectableBadgeProps) => (
  <Badge
    role="checkbox"
    data-state={selected ? "checked" : "unchecked"}
    tabIndex={0}
    className="cursor-pointer"
    onClick={toggle}
    variant={selected ? "default" : "outline"}
    onKeyDown={(e) => {
      if (e.code === "Space") {
        toggle();
      }
    }}
    {...props}
  />
);

export default SelectableBadge;
