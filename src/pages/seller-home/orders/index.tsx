import { useState } from "react";
import ChatPopUpContainer from "common/components/Chat/ChatPopupContainer";
import { SelectItem } from "common/components/GeneralSelect";
import { Role } from "enums/role";
import { useFlags } from "launchdarkly-react-client-sdk";

import {
  OrderFilterState,
  OrderTimeRange,
} from "pages/seller-home/orders/orders-page.types";

import { filterInitialState } from "./constants";
import OrdersFilter from "./OrdersFilter";
import OrdersStatus from "./OrdersStatus";

export default function SellerOrders() {
  const { enabledChats } = useFlags();
  const [filter, setFilter] = useState<OrderFilterState>(filterInitialState);

  const handleOrderStatusChange = (ev: SelectItem) => {
    // @ts-ignore
    setFilter((prev) => ({ ...prev, orderStatus: ev }));
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
    const { value, name } = ev.target;

    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeRangeChange = (dates: OrderTimeRange) => {
    setFilter((prev) => ({ ...prev, orderTimeRange: dates }));
  };

  const handlePriceRangeChange = (values: number[]) => {
    setFilter((prev) => ({ ...prev, priceRange: values }));
  };

  const handleRatingChange = (rating: number) => {
    setFilter((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = () => {
    return;
  };

  const handleFormReset = () => {
    setFilter(filterInitialState);
  };

  return (
    <div className="w-full h-screen">
      <div className="mt-4 lg:mt-10">
        <h1 className="text-xl font-semibold">Orders</h1>
      </div>

      <OrdersStatus />

      <div className="w-full h-[1.5px] bg-black opacity-5 mt-8" />

      <OrdersFilter
        handleFormReset={handleFormReset}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleOrderStatusChange={handleOrderStatusChange}
        handleTimeRangeChange={handleTimeRangeChange}
        handlePriceRangeChange={handlePriceRangeChange}
        handleRatingChange={handleRatingChange}
        filter={filter}
      />
      {enabledChats && <ChatPopUpContainer role={Role.BOUTIQUE} />}
    </div>
  );
}
