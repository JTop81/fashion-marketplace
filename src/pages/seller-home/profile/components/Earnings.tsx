import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfileEarning } from "api/services/profile/seller";

import { SellerProfileEarning } from "../types";
const initialEarningData: SellerProfileEarning = {
  earning: {
    amount: 0,
    currency: "USD",
  },
  spending: {
    amount: 0,
    currency: "USD",
  },
};
const Earnings = () => {
  const [earningData, setEarningData] =
    useState<SellerProfileEarning>(initialEarningData);

  const { data } = useQuery<SellerProfileEarning>({
    queryKey: ["getProfileEarning"],
    queryFn: getProfileEarning,
    retry: 1,
  });

  useEffect(() => {
    if (data) {
      setEarningData(data);
    }
  }, [data]);

  return (
    <div className="w-full md:w-3/5 flex flex-col gap-[16px]">
      <p className="text-[20px] text-black font-semibold leading-[30px]">
        Earnings & spendings
      </p>
      <div className="h-full flex flex-col md:flex-row gap-4 md:gap-[140px] bg-stone-50 rounded px-[32px] py-[36px]">
        <div className="flex flex-col gap-[16px]">
          <h3 className="text-zinc-600 text-base font-medium font-['Poppins'] leading-normal">
            Earnings to date
          </h3>
          <p className="text-black text-3xl font-semibold font-['Poppins'] leading-10">
            $ {earningData?.earning.amount}
          </p>
          <p className="text-zinc-600 text-sm font-normal font-['Poppins'] leading-tight">
            Your earnings since
          </p>
        </div>
        <div className="flex flex-col gap-[16px]">
          <h3 className="text-zinc-600 text-base font-medium font-['Poppins'] leading-normal">
            Spendings to date
          </h3>
          <p className="text-black text-3xl font-semibold font-['Poppins'] leading-10">
            $ {earningData?.spending.amount}
          </p>
          <p className="text-zinc-600 text-sm font-normal font-['Poppins'] leading-tight">
            Your Spendings since joining
          </p>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
