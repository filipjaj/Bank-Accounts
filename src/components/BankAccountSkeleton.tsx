import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const BankAccountSkeleton = () => {
  return (
    <Card className="relative z-0">
      <CardHeader>
        <CardTitle className="break-all  text-wrap text-xl">
          <Skeleton className="w-1/2 h-6" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="w-1/4 h-4" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className=" flex gap-4 overflow-auto">
          <Card>
            <CardHeader className="p-3 space-y-0">
              <CardTitle className=" text-base">
                <Skeleton className="w-full h-6" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="w-10 h-2 mt-1" />
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="p-3 space-y-0">
              <CardTitle className=" text-base">
                <Skeleton className="w-full h-6" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="w-10 h-2 mt-1" />
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="my-2"></div>

        <Collapsible>
          <CollapsibleTrigger className="text-sm text-muted-foreground">
            <Skeleton className="w-1/4 h-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-6 border-l-2 pl-6 italic"></CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default BankAccountSkeleton;
