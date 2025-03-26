import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfileAvailableFunds } from "api/services/profile/seller";

import { SellerProfileAvailableFunds } from "../types";

const initialAvilableFundsData: SellerProfileAvailableFunds = {
  amount: 0,
  currency: "USD",
};

export const AvailibleFunds = () => {
  const [availableFundsData, setAvailableFundsData] =
    useState<SellerProfileAvailableFunds>(initialAvilableFundsData);

  const { data } = useQuery<SellerProfileAvailableFunds>({
    queryKey: ["getProfileAvailableFunds"],
    queryFn: getProfileAvailableFunds,
    retry: 1,
  });

  useEffect(() => {
    if (data) {
      setAvailableFundsData(data);
    }
  }, [data]);
  return (
    <div className="w-full md:w-2/5 flex flex-col gap-[16px]">
      <p className="text-[20px] text-black font-semibold leading-[30px]">
        Availible funds
      </p>
      <div className="bg-stone-50 rounded flex flex-col gap-[16px] px-[32px] py-[36px]">
        <h3 className="text-zinc-600 text-base font-medium font-['Poppins'] leading-normal">
          Balance availible to withdraw
        </h3>
        <p className="text-black text-3xl font-semibold font-['Poppins'] leading-10">
          $ {availableFundsData.amount}
        </p>
        <div className="flex flex-row gap-[32px] flex-wrap">
          <button className="w-44 h-12 px-6 py-3 whitespace-nowrap bg-blue-500 rounded-md justify-start items-start gap-2 inline-flex text-center text-white text-base font-semibold font-['Poppins'] leading-normal">
            Withdraw funds
          </button>{" "}
          <button className="text-purple-700 text-base font-medium font-['Poppins'] underline leading-normal whitespace-nowrap">
            Payment Methods
          </button>{" "}
        </div>
      </div>
    </div>
  );
};
