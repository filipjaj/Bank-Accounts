import { FormattedBankData } from "@/lib/formatting/dataFormatting";
import { Badge } from "../ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const ComparisonCard = ({
  compare,
  toggleComparison,
}: {
  compare: FormattedBankData[number];
  toggleComparison: (compare: FormattedBankData[number]) => void;
}) => {
  return (
    <Card
      key={compare.accountName}
      className=" flex flex-row items-center justify-between px-5 relative py-5"
    >
      <Badge
        variant="destructive"
        className="absolute right-1 top-1 cursor-pointer"
        onClick={() => toggleComparison(compare)}
      >
        Fjern
      </Badge>
      <CardHeader>
        <CardTitle className="text-base">{compare.accountName}</CardTitle>
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
  );
};

export default ComparisonCard;
