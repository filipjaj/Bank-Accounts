"use client";
import { buttonVariants } from "@/components/ui/button";
import useComparison from "@/hooks/useComparisonStore";
import { PiggyBankIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

const CompareModal = () => {
  const { count, comparison } = useComparison();
  return (
    <Drawer>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Sammenlign bankkontoer</DrawerTitle>
        </DrawerHeader>
        <div className="max-w-md w-full mx-auto flex flex-col overflow-auto p-4 rounded-t-[10px] items-center pb-28">
          <div className="flex flex-col mx-6 mb-4 gap-2 ">
            {comparison.map((compare) => (
              <Card
                key={compare.accountName}
                className=" flex flex-row items-center justify-between px-2"
              >
                <CardHeader>
                  <CardTitle className="text-base">
                    {compare.accountName}
                  </CardTitle>
                  <CardDescription>{compare.bankName}</CardDescription>
                </CardHeader>
                <Card className="flex h-min">
                  <CardHeader>
                    <CardTitle className="text-sm  text-nowrap">
                      {compare.interestRate[0].interest} %
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Card>
            ))}
          </div>
          <Link
            href="/compare"
            className={`${buttonVariants({
              variant: "default",
              size: "lg",
            })}  mx-10 mb-10 fixed bottom-4 shadow-xl`}
          >
            Full sammenligning
          </Link>
        </div>
      </DrawerContent>

      <DrawerTrigger className=" bg-rose-600 shadow-xl z-20  w-10 h-10 flex fixed top-6 right-8 items-center justify-center rounded-full">
        <span className="absolute -top-2 -right-1  rounded-full  bg-stone-950 w-5 shadow-md">
          <p className=" text-sm   text-white  ">{count}</p>
        </span>
        <PiggyBankIcon className=" text-pink-50" />
      </DrawerTrigger>
    </Drawer>
  );
};

export default CompareModal;
