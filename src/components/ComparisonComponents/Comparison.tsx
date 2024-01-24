"use client";
import useComparison from "@/hooks/useComparisonStore";

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import ComparisonFallback from "../ComparionFallback";
import ComparisonCard from "./ComparisonCard";
import ComparisonsGraph from "./ComparisonGraph";
import ComparisonUpdater from "./ComparisonUpdater";

const Comparison = () => {
  const { compareCompoundInterest, toggleComparison } = useComparison();

  if (!compareCompoundInterest.length) return <ComparisonFallback />;

  return (
    <div className="md:p-10 p-3  mt-10 ">
      <h1 className="text-2xl font-semibold">Sammenligning</h1>
      <p className="text-sm text-muted-foreground">
        Sammenligning av utviklingen av bankkontoene du har valgt, basert på
        startbeløp og tidshorisont
      </p>

      <ComparisonsGraph compoundData={compareCompoundInterest} />
      <ComparisonUpdater />

      <div className="flex flex-col gap-10 mt-10">
        {compareCompoundInterest.map((data) => {
          return (
            <ComparisonCard
              key={data.id}
              comparison={data}
              toggleComparison={toggleComparison}
            />
          );
        })}
      </div>

      <Link
        href="/"
        className=" items-center  rounded-full p-5 z-10    bg-zinc-900  fixed left-6 bottom-6  shadow-lg flex gap-4"
      >
        <ArrowLeftIcon className=" text-zinc-100" />
      </Link>
    </div>
  );
};

export default Comparison;
