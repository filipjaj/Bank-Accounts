"use client";

import useAccounts from "@/hooks/useAccounts";
import BankAccountCard from "./BankAccountCard";

const BankAccountList = () => {
  const { data } = useAccounts();
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
