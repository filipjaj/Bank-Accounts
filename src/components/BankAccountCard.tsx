import { FormattedBankData } from "@/lib/formatting/dataFormatting";
import formatMoney from "@/lib/formatting/fomrmatMoney";
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

const BankAccountCard = ({
  bankAccount,
}: {
  bankAccount: FormattedBankData[number];
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{bankAccount.accountName}</CardTitle>
        <CardDescription>{bankAccount.bankName}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className=" flex gap-4">
          {bankAccount.interestRate?.map((interestRate, i) => (
            <Card key={`${interestRate}-${i}`}>
              <CardHeader>
                <CardTitle>{interestRate.interest} %</CardTitle>
                <CardDescription>
                  fra {formatMoney(interestRate.interestAmountLimit)}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="my-2">
          {bankAccount.membership?.map((membership) => (
            <Badge key={membership} className="mr-1">
              {membership}
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
