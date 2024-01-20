"use client";
import useAge from "@/hooks/useAge";
import useMoney from "@/hooks/useMoney";
import MemberShipFilter from "./MemberShipFilter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";

const Filters = () => {
  const { age, handleAgeChange } = useAge();
  const { money, handleMoneyChange } = useMoney();
  return (
    <div className="mx-20 flex gap-4 flex-col my-10">
      <Card>
        <CardHeader>
          <CardTitle>Beste bankkonto for deg</CardTitle>
          <CardDescription>
            Svar på noen spørsmål og finn ut hvilken bankkonto som passer best
            for deg
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className=" flex items-center gap-2">
            <Input
              type="number"
              placeholder="Alder"
              className=" w-20"
              value={age}
              onChange={handleAgeChange}
            />
            <p>år</p>
          </div>

          <MemberShipFilter />

          <div className=" mt-6 flex flex-col gap-3">
            <p> Hvor mye penger har du på kontoen din?</p>
            <div className=" flex items-center gap-2">
              <Input
                type="number"
                placeholder="Beløp"
                className=" w-30"
                value={money}
                onChange={handleMoneyChange}
              />
              <p>kr</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Filters;
