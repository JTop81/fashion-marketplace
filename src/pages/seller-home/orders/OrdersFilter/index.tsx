import { SelectItem } from "common/components/GeneralSelect";

import { OrderFilterState, OrderTimeRange } from "../orders-page.types";

import OrderFilterWrapper from "./OrderFilterWrapper";
import OrderSearchBox from "./OrderSearchBox";
import OrderStatusSelect from "./OrderStatusSelect";

type OrdersFilterProps = {
  filter: OrderFilterState;
  handleOrderStatusChange: (ev: SelectItem) => void;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleTimeRangeChange: (dates: OrderTimeRange) => void;
  handlePriceRangeChange: (values: number[]) => void;
  handleRatingChange: (rating: number) => void;
  handleSubmit: () => void;
  handleFormReset: () => void;
};

export default function OrdersFilter({
  filter,
  handleOrderStatusChange,
  handleTimeRangeChange,
  handlePriceRangeChange,
  handleChange,
  handleRatingChange,
  handleSubmit,
  handleFormReset,
}: OrdersFilterProps) {
  return (
    <section className="w-full mt-6 lg:mt-10">
      <div className="lg:hidden">
        <OrderSearchBox
          searchText={filter.searchText}
          handleChange={handleChange}
        />
      </div>
      <div className="w-full flex items-start justify-between mt-3">
        <OrderStatusSelect
          orderStatus={filter.orderStatus}
          handleOrderStatusChange={handleOrderStatusChange}
        />
        <div className="flex items-center">
          <div className="hidden lg:block mr-2">
            <OrderSearchBox
              searchText={filter.searchText}
              handleChange={handleChange}
            />
          </div>
          <OrderFilterWrapper
            handleFormReset={handleFormReset}
            handleSubmit={handleSubmit}
            rating={filter.rating}
            priceRange={filter.priceRange}
            handleTimeRangeChange={handleTimeRangeChange}
            handlePriceRangeChange={handlePriceRangeChange}
            handleRatingChange={handleRatingChange}
            orderTimeRange={filter.orderTimeRange}
          />
        </div>
      </div>
    </section>
  );
}
