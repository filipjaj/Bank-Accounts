"use client";
import useAge from "@/hooks/useAge";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import useMoney from "@/hooks/useMoney";
import { SlidersHorizontalIcon } from "lucide-react";
import Link from "next/link";
import MemberShipFilter from "./MemberShipFilter";
import { buttonVariants } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
            <MemberShipFilter />
          </CardContent>
          <CardFooter>
            <Link
              href="/compare"
              className={buttonVariants({ variant: "outline" })}
            >
              Sammenlign bankkontoer
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

const MobileFilters = () => {
  return (
    <Drawer>
      <DrawerTrigger className="  rounded-full p-5 z-10    bg-zinc-900  fixed left-6 bottom-6  shadow-lg">
        <SlidersHorizontalIcon className=" text-zinc-100" />
      </DrawerTrigger>

      <DrawerContent>
        <DesktopFilters />
      </DrawerContent>
    </Drawer>
  );
};

export default Filters;
