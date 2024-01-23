import useComparison from "@/hooks/useComparisonStore";
import formatMoney from "@/lib/formatting/formatMoney";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Slider } from "../ui/slider";

const ComparisonUpdater = () => {
  const { savingYears, startingBalance, setSavingYears, setStartingBalance } =
    useComparison();
  const [tempSaving, setTempSaving] = useState(startingBalance);
  const [tempYears, setTempYears] = useState(savingYears);
  const [max, setMax] = useState(100000);
  return (
    <Card className="relative p-2">
      <CardHeader>
        <h2 className="text-xl font-semibold">Endre sammenligningsgrunnlag</h2>
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
  );
};

export default ComparisonUpdater;
