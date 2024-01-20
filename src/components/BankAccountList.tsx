"use client";

import useAccounts from "@/hooks/useAccounts";
import BankAccountCard from "./BankAccountCard";

const BankAccountList = () => {
  const { data } = useAccounts();
  return (
    <div className=" flex gap-4 flex-col m-5 ">
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
