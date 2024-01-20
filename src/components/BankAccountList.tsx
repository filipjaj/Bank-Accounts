"use client";

import useAccounts from "@/hooks/useAccounts";
import { useInView } from "react-intersection-observer";
import BankAccountCard from "./BankAccountCard";

const BankAccountList = () => {
  const { data, fetchNextPage } = useAccounts();
  const { inView, ref } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView) {
        fetchNextPage();
      }
    },
  });
  return (
    <>
      <div className=" flex gap-4 flex-col m-5 ">
        {data?.map((bankAccount) => (
          <BankAccountCard
            key={bankAccount.accountName}
            bankAccount={bankAccount}
          />
        ))}
      </div>
      <div ref={ref} />
    </>
  );
};

export default BankAccountList;
