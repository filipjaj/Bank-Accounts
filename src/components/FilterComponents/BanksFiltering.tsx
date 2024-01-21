"use client";
import useBanks from "@/hooks/useBanks";
import { MultiSelect } from "../ui/multi-select";

const BanksFilter = () => {
  const { banks, selected, changeFunction } = useBanks();

  return (
    <div className=" flex flex-col my-2 gap-2 ">
      <p className="text-sm  ml-2">Hvilke banker vil du se?</p>
      <MultiSelect
        className="w-full"
        options={banks}
        selected={selected}
        // @ts-ignore
        onChange={changeFunction}
      />
    </div>
  );
};

export default BanksFilter;
