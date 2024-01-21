"use client";
import useComparison from "@/hooks/useComparisonStore";
import formatMoney from "@/lib/formatting/fomrmatMoney";
import { ResponsiveLine } from "@nivo/line";

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { Button, buttonVariants } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Slider } from "./ui/slider";

const Comparison = () => {
  const {
    compareCompoundInterest,
    toggleComparison,
    savingYears,
    startingBalance,
    setSavingYears,
    setStartingBalance,
  } = useComparison();
  const [tempSaving, setTempSaving] = useState(startingBalance);
  const [tempYears, setTempYears] = useState(savingYears);
  const [max, setMax] = useState(100000);

  if (!compareCompoundInterest.length)
    return (
      <Card className="relative p-2 md:m-10 m-3 ">
        <CardHeader>
          <h2 className="text-xl font-semibold">Sammenlign bankkontoer</h2>
          <p className="text-sm text-muted-foreground">
            Velg bankkontoer du ønsker å sammenligne
          </p>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              Du har ikke valgt noen bankkontoer å sammenligne
            </p>
          </div>
          <Link
            href="/"
            className={`flex  items-center gap-2 ${buttonVariants({
              variant: "default",
            })} 
         `}
          >
            <ArrowLeftIcon className="w-4 h-4 text-zinc-white" />
            <p>Klikk her for å gå tilbake til forsiden</p>
          </Link>
        </CardContent>
      </Card>
    );

  return (
    <div className="md:p-10 p-3  mt-10 ">
      <h1 className="text-2xl font-semibold">Sammenligning</h1>
      <p className="text-sm text-muted-foreground">
        Sammenligning av utviklingen av bankkontoene du har valgt, basert på
        startbeløp og tidshorisont
      </p>
      <div className="aspect-[1] md:aspect-video mx-10">
        <ResponsiveLine
          data={compareCompoundInterest}
          margin={{ top: 10, right: 40, bottom: 40, left: 40 }}
          xScale={{
            type: "linear",
            min: "auto",
            max: "auto",
          }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 16,
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 5,
          }}
          curve="monotoneX"
          colors={["#2563eb", "#e11d48", "#10b981", "#f59e0b", "#3b82f6"]}
          pointSize={6}
          useMesh={true}
          gridYValues={6}
          theme={{
            tooltip: {
              chip: {
                borderRadius: "9999px",
              },
              container: {
                fontSize: "12px",
                textTransform: "capitalize",
                borderRadius: "6px",
              },
            },
            grid: {
              line: {
                stroke: "#f3f4f6",
              },
            },
          }}
          enableSlices="x"
        />
      </div>
      <Card className="relative p-2">
        <CardHeader>
          <h2 className="text-xl font-semibold">
            Endre sammenligningsgrunnlag
          </h2>
          <p className="text-sm text-muted-foreground">
            Oppdater startbeløp, og tidshorisont for å se hvordan det påvirker
            sparebeløpet ditt
          </p>
        </CardHeader>

        <CardContent>
          <div className="flex gap-4 flex-col">
            <div className="flex flex-col gap-2">
              <div className="flex  gap-2">
                <Slider
                  value={tempSaving}
                  onValueChange={setTempSaving}
                  max={max}
                  step={100}
                />
                <Button
                  className="align-self-end"
                  onClick={() => {
                    if (max === 1000000) {
                      setMax(100000);
                    } else {
                      setMax(1000000);
                    }
                  }}
                  variant="ghost"
                >
                  {max === 1000000 ? "Max 1 000 000" : "Max 100 000"}
                </Button>
              </div>

              <p>
                Startbeløp:{" "}
                <span className="font-semibold">
                  {formatMoney(tempSaving[0])}
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Slider value={tempYears} onValueChange={setTempYears} />
              <p>
                Tidshorisont:
                <span className="font-semibold">{tempYears[0]} år</span>
              </p>

              <Button
                onClick={() => {
                  setSavingYears(tempYears);
                  setStartingBalance(tempSaving);
                  toast.success("Sammenligningsgrunnlag oppdatert");
                }}
                variant="default"
              >
                Oppdater
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-10 mt-10">
        {compareCompoundInterest.map((data) => {
          console.log(data);
          return (
            <Card key={data.id} className={`relative p-2 border-2   `}>
              <Badge
                variant="destructive"
                className="absolute right-2 top-2 cursor-pointer"
                onClick={() => toggleComparison(data.allData)}
              >
                Fjern
              </Badge>
              <CardHeader>
                <CardTitle>{data.id}</CardTitle>
                <CardDescription>
                  {data.allData.interestRate[0]?.interest} % rente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={` flex gap-4 overflow-auto   `}>
                  {data.data.map((interestRate, i) => (
                    <Card key={`${interestRate}-${i}`}>
                      <CardHeader className="p-3 space-y-0">
                        <p className=" text-base  font-semibold">
                          {formatMoney(interestRate.y)}
                        </p>
                        <p className=" text-sm  text-muted-foreground  ">
                          {interestRate.x} år
                        </p>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
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
