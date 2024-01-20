"use client";
import useAge from "@/hooks/useAge";
import useMoney from "@/hooks/useMoney";
import useSavingYears from "@/hooks/useSavingYears";
import MemberShipFilter from "./MemberShipFilter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";

const Filters = ({ hideOnMobile = true }: { hideOnMobile?: boolean }) => {
  const { age, handleAgeChange } = useAge();
  const { money, handleMoneyChange } = useMoney();
  const { savingYears, setSavingYears } = useSavingYears();
  return (
    <div
      className={`mx-20 md:flex gap-4 flex-col my-10 ${
        hideOnMobile ? "hidden" : ""
      }`}
    >
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

          {!!money && (
            <div className=" mt-6 flex flex-col gap-3">
              <p> Hvor lenge har du tenkt å spare?</p>
              <div className=" flex items-center gap-2 w-60">
                <Slider
                  value={savingYears}
                  onValueChange={setSavingYears}
                  max={50}
                />
                <p>{savingYears} år</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const MobileFilters = () => {
  return;
};

export default Filters;
