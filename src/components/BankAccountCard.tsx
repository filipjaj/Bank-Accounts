import useSavingYears from "@/hooks/useSavingYears";
import { FormattedBankData } from "@/lib/formatting/dataFormatting";
import formatMoney from "@/lib/formatting/fomrmatMoney";
import { ResponsiveLine } from "@nivo/line";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const generatCompoundInterest = (
  initialAmount: number,
  interestRate: number,
  years: number
) => {
  console.log(initialAmount, interestRate, years);
  const interest = interestRate / 100;
  const values = Array.from({ length: years }, (_, i) => i + 1);

  const compoundInterest = values.map((year) => {
    const amount = initialAmount * Math.pow(1 + interest, year);
    return {
      x: year,
      y: amount,
    };
  });

  return compoundInterest;
};

const Chart = ({ interestRate, ...props }: { interestRate: number }) => {
  const { savingYears } = useSavingYears();
  console.log(savingYears);
  console.log(interestRate);
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Din bankkonto",
            data: generatCompoundInterest(10000, 0.5, savingYears[0]),
          },
          {
            id: "Beste bankkonto",
            data: generatCompoundInterest(10000, interestRate, savingYears[0]),
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
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
        role="application"
      />
    </div>
  );
};

const BankAccountCard = ({
  bankAccount,
}: {
  bankAccount: FormattedBankData[number];
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="break-all  text-wrap text-xl">
          {bankAccount.accountName}
        </CardTitle>
        <CardDescription>{bankAccount.bankName}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className=" flex gap-4 overflow-auto">
          {bankAccount.interestRate?.map((interestRate, i) => (
            <Card key={`${interestRate}-${i}`}>
              <CardHeader className="p-3 space-y-0">
                <CardTitle className=" text-base">
                  {interestRate.interest} %
                </CardTitle>
                <CardDescription>
                  fra {formatMoney(interestRate.interestAmountLimit)}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="my-2">
          {bankAccount.membership?.map((membership) => (
            <Badge key={membership} className="mr-1 max-w-full">
              <p className="text-nowrap overflow-clip text-ellipsis">
                {membership}
              </p>
            </Badge>
          ))}
        </div>

        <Collapsible>
          <CollapsibleTrigger className="text-sm text-muted-foreground">
            Vilkår
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-6 border-l-2 pl-6 italic">
            {bankAccount.terms}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default BankAccountCard;
