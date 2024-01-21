import useAge from "@/hooks/useAge";
import { Input } from "../ui/input";

const AgeFilter = () => {
  const { age, handleAgeChange } = useAge();
  return (
    <div className=" flex items-center gap-2">
      <Input
        type="number"
        placeholder="Alder"
        className=" w-20 text-base"
        value={age}
        onChange={handleAgeChange}
      />
      <p>år</p>
    </div>
  );
};

export default AgeFilter;
