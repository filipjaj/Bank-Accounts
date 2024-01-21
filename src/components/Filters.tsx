"use client";
import useAge from "@/hooks/useAge";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import useMoney from "@/hooks/useMoney";
import { PanelBottomCloseIcon, SlidersHorizontalIcon } from "lucide-react";

import AccountGroupFilter from "./AccountGroupFIlter";
import MemberShipFilter from "./MemberShipFilter";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "./ui/drawer";
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

  return (
    <>
      <div className={`md:mx-20 md:flex gap-4 flex-col my-10 `}>
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
                className=" w-20 text-base"
                value={age}
                onChange={handleAgeChange}
              />
              <p>år</p>
            </div>

            <div className=" mt-6 flex flex-col gap-3">
              <p> Hvor mye penger har du på kontoen din?</p>
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

            <Collapsible>
              <CollapsibleTrigger className="mt-6 text-sm text-muted-foreground">
                Avanserte filter
              </CollapsibleTrigger>

              <CollapsibleContent className="mt-6  italic">
                <div className="mt-6 flex flex-col gap-3">
                  <AccountGroupFilter />
                  <MemberShipFilter />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </>
  );
};

const MobileFilters = () => {
  return (
    <Drawer>
      <DrawerTrigger className=" items-center  rounded-full p-5 z-10    bg-zinc-900  fixed left-6 bottom-6  shadow-lg flex gap-4">
        <p className=" text-zinc-100 text-lg font-semibold">Filter</p>
        <SlidersHorizontalIcon className=" text-zinc-100" />
      </DrawerTrigger>

      <DrawerContent>
        <div className="max-w-md w-full mx-auto flex flex-col overflow-auto p-4 rounded-t-[10px]">
          <DesktopFilters />
        </div>
        <DrawerFooter>
          <DrawerClose className="rounded-full p-5 z-10  flex gap-4   items-center justify-center   bg-zinc-900   shadow-lg">
            <p className=" text-zinc-100 text-lg font-semibold">Steng filter</p>
            <PanelBottomCloseIcon className=" text-zinc-100" />
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Filters;
