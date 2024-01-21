"use client";
import useComparison from "@/hooks/useComparisonStore";
import formatMoney from "@/lib/formatting/fomrmatMoney";
import { ResponsiveLine } from "@nivo/line";

import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";

const Comparison = () => {
  const { compareCompoundInterest, toggleComparison } = useComparison();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold">Sammenligning</h1>
      <div className="aspect-[4/5] md:aspect-video">
        <ResponsiveLine
          data={compareCompoundInterest}
          margin={{ top: 10, right: 40, bottom: 40, left: 40 }}
          xScale={{
            type: "point",
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
            tickPadding: 16,
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
      <div className="flex flex-col gap-10 mt-10">
        {compareCompoundInterest.map((data) => {
          return (
            <Card key={data.id} className="relative p-2">
              <Badge
                variant="destructive"
                className="absolute right-2 top-2 cursor-pointer"
                onClick={() => toggleComparison(data.allData)}
              >
                Fjern
              </Badge>
              <CardHeader>{data.id} </CardHeader>
              <CardContent>
                <div className=" flex gap-4 overflow-auto ">
                  {data.data.map((interestRate, i) => (
                    <Card key={`${interestRate}-${i}`}>
                      <CardHeader className="p-3 space-y-0">
                        <p className=" text-base  font-semibold">
                          {formatMoney(interestRate.y)}
                        </p>
                        <p className=" text-sm  text-muted-foreground  ">
                          {interestRate.x} år{" "}
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
    </div>
  );
};

export default Comparison;
