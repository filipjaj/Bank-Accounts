import { Badge } from "@/components/ui/badge";
import formatMoney from "@/lib/formatting/formatMoney";

import { CompoundComparisonType } from "@/hooks/useComparisonStore";
import { FormattedBankData } from "@/lib/formatting/dataFormatting";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const ComparisonCard = ({
  comparison,
  toggleComparison,
}: {
  comparison: CompoundComparisonType[number];
  toggleComparison: (compare: FormattedBankData[number]) => void;
}) => {
  return (
    <Card key={comparison.id} className={`relative p-2 border-2   `}>
      <Badge
        variant="destructive"
        className="absolute right-2 top-2 cursor-pointer"
        onClick={() => toggleComparison(comparison.allData)}
      >
        Fjern
      </Badge>
      <CardHeader>
        <CardTitle>{comparison.id}</CardTitle>
        <CardDescription>
          {comparison.allData.interestRate[0]?.interest} % rente
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={` flex gap-4 overflow-auto   `}>
          {comparison.data.map((interestRate, i) => (
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
};

export default ComparisonCard;
