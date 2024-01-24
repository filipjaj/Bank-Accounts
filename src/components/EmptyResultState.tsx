import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const EmptyResultState = () => {
  return (
    <div className=" flex gap-4 flex-col m-5 ">
      <Card className="relative z-0">
        <CardHeader>
          <CardTitle className="break-all  text-wrap text-xl">
            Ingen resultater
          </CardTitle>
          <CardDescription>
            Prøv å endre søket ditt, eller legg til flere banker
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
};

export default EmptyResultState;
