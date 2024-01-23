import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

const ComparisonFallback = () => {
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
};

export default ComparisonFallback;
