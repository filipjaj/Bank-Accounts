"use client";

import useAccounts from "@/hooks/useAccounts";
import { useInView } from "react-intersection-observer";
import BankAccountCard from "./BankAccountCard";
import BankAccountSkeleton from "./BankAccountSkeleton";
import EmptyResultState from "./EmptyResultState";

const BankAccountList = () => {
  const { data, fetchNextPage, isLoading } = useAccounts();

  const { ref } = useInView({
    threshold: 0,
    rootMargin: "300px",
    onChange: (inView) => {
      if (inView) {
        fetchNextPage();
      }
    },
  });
  if (isLoading)
    return (
      <div className=" flex gap-4 flex-col m-5 ">
        <BankAccountSkeleton />
        <BankAccountSkeleton />
        <BankAccountSkeleton />
      </div>
    );

  if (!data || data.length === 0) return <EmptyResultState />;
  return (
    <>
      <div className=" flex gap-4 flex-col m-5 ">
        {data?.map((bankAccount) => (
          <BankAccountCard
            key={`${bankAccount.accountName}-${bankAccount.bankName}-listing`}
            bankAccount={bankAccount}
          />
        ))}
      </div>
      <div ref={ref} />
    </>
  );
};

export default BankAccountList;
