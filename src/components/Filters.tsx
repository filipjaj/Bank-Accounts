"use client";
import useAge from "@/hooks/useAge";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import useMoney from "@/hooks/useMoney";
import useSavingYears from "@/hooks/useSavingYears";
import { SlidersHorizontalIcon } from "lucide-react";
import MemberShipFilter from "./MemberShipFilter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Input } from "./ui/input";

const Filters = () => {
  const isDesktop = useMediaQuery("(min-width: 768px");

  if (isDesktop) {
    return <DesktopFilters />;
  }

  return <MobileFilters />;
};

const DesktopFilters = () => {
  const { age, handleAgeChange } = useAge();
  const { money, handleMoneyChange } = useMoney();
  const { savingYears, setSavingYears } = useSavingYears();

  return (
    <>
      <div className={`mx-20 md:flex gap-4 flex-col my-10 `}>
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
    </>
  );
};

const MobileFilters = () => {
  return (
    <Drawer>
      <DrawerTrigger className="  rounded-full p-5    bg-zinc-900  fixed left-6 bottom-6  shadow-lg">
        <SlidersHorizontalIcon className=" text-zinc-100" />
      </DrawerTrigger>

      <DrawerContent>
        <DesktopFilters />
      </DrawerContent>
    </Drawer>
  );
};

export default Filters;
