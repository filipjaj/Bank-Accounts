"use client";
import { buttonVariants } from "@/components/ui/button";
import useComparison from "@/hooks/useComparisonStore";
import { PiggyBankIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

import ComparisonCard from "./ComparisonCard";

const CompareModal = () => {
  const { count, comparison, toggleComparison } = useComparison();
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Drawer open={!collapsed} onOpenChange={(status) => setCollapsed(!status)}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Sammenlign bankkontoer</DrawerTitle>
        </DrawerHeader>
        {comparison.length !== 0 ? (
          <div className=" mx-auto flex flex-col overflow-auto p-4 rounded-t-[10px] items-center pb-28">
            <div className="flex flex-col mx-6 mb-4 gap-2 ">
              {comparison.map((compare) => (
                <ComparisonCard
                  key={`${compare.bankName}-${compare.accountName}-comparison-preview`}
                  compare={compare}
                  toggleComparison={toggleComparison}
                />
              ))}
            </div>
            <Link
              onClick={() => setCollapsed(!collapsed)}
              href="/compare"
              className={`${buttonVariants({
                variant: "default",
                size: "lg",
              })}  mx-10 mb-10 fixed bottom-4 shadow-xl`}
            >
              Full sammenligning
            </Link>
          </div>
        ) : (
          // Du har ikke lagt til noen bankkontoer for å sammenligne

          <Card className="p-4 rounded-t-[10px] items-center mb-28 mx-auto ">
            <CardHeader>
              <CardTitle className="text-base">
                Du har ikke valgt noen kontoer å sammenligne
              </CardTitle>
            </CardHeader>
          </Card>
        )}
      </DrawerContent>

      <DrawerTrigger className=" bg-rose-600 shadow-xl z-20  w-10 h-10 flex fixed bottom-6 right-8 items-center justify-center rounded-full">
        <span className="absolute -top-2 -right-1  rounded-full  bg-stone-950 w-5 shadow-md">
          <p className=" text-sm   text-white  ">{count}</p>
        </span>
        <PiggyBankIcon className=" text-pink-50" />
      </DrawerTrigger>
    </Drawer>
  );
};

export default CompareModal;
