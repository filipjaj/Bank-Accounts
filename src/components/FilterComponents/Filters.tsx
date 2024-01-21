"use client";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { PanelBottomCloseIcon, SlidersHorizontalIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "../ui/drawer";
import AccountGroupFilter from "./AccountGroupFilter";
import AgeFilter from "./AgeFilter";
import BanksFiltering from "./BanksFiltering";
import MemberShipFilter from "./MemberShipFilter";
import MoneyFilter from "./MoneyFilter";
const Filters = () => {
  const isDesktop = useMediaQuery("(min-width: 768px");

  if (isDesktop) {
    return <DesktopFilters />;
  }

  return <MobileFilters />;
};

const DesktopFilters = () => {
  return (
    <>
      <div className={`md:mx-20 md:flex gap-4 flex-col my-10 `}>
        <Card>
          <CardHeader>
            <CardTitle>Filter</CardTitle>
            <CardDescription>
              Bruk filterene under for å finne bankkontoer som passer deg
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AgeFilter />
            <MoneyFilter />
            <BanksFiltering />
            <p className="text-sm text-muted-foreground">Avanserte filter</p>
            <AccountGroupFilter />
            <MemberShipFilter />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

const MobileFilters = () => {
  return (
    <Drawer>
      <DrawerTrigger className=" items-center  rounded-full p-3 z-10    bg-zinc-900  fixed right-6 top-6  shadow-lg flex gap-4">
        <p className=" text-zinc-100 text-sm font-semibold">Filter</p>
        <SlidersHorizontalIcon className=" text-zinc-100 w-3" />
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
