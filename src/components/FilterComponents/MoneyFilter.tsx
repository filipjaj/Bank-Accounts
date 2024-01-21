import useMoney from "@/hooks/useMoney";
import { Input } from "../ui/input";

const MoneyFilter = () => {
  const { money, handleMoneyChange } = useMoney();
  return (
    <div className=" mt-6 flex flex-col gap-2">
      <p className="text-sm  ml-2">Hvor mye penger har du på kontoen din?</p>
      <div className=" flex items-center gap-2">
        <Input
          type="number"
          placeholder="Beløp"
          className=" w-30 text-base"
          value={money}
          onChange={handleMoneyChange}
        />
        <p>kr</p>
      </div>
    </div>
  );
};

export default MoneyFilter;
