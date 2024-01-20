"use client";
import { getBankAccounts } from "@/app/page";
import { FormattedBankData } from "@/lib/formatting/dataFormatting";
import { useQuery } from "@tanstack/react-query";
import BankAccountCard from "./BankAccountCard";

const BankAccountList = () => {
  const { data, isLoading, isError } = useQuery<FormattedBankData>({
    queryKey: ["accounts"],
    queryFn: getBankAccounts,
  });
  return (
    <div className="mx-20 flex gap-4 flex-col my-10">
      {data?.map((bankAccount) => (
        <BankAccountCard
          key={bankAccount.accountName}
          bankAccount={bankAccount}
        />
      ))}
    </div>
  );
};

export default BankAccountList;
