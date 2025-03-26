import { useState } from "react";
import { MdOutlineCalendarMonth } from "react-icons/md";
import GeneralDatePicker from "common/components/GeneralDatePicker";
import GeneralRating from "common/components/GeneralRating";
import GeneralRangeSlider from "common/components/GeneralSlider";
import { format } from "date-fns";

import { OrderTimeRange } from "../orders-page.types";

type OrderFilterWrapperProps = {
  priceRange: number[];
  orderTimeRange: OrderTimeRange;
  rating: number;
  handleTimeRangeChange: (dates: OrderTimeRange) => void;
  handlePriceRangeChange: (values: number[]) => void;
  handleRatingChange: (rating: number) => void;
  handleSubmit: () => void;
  handleToggle: () => void;
  handleFormReset: () => void;
};

export default function OrderFilterForm({
  priceRange,
  orderTimeRange,
  rating,
  handleTimeRangeChange,
  handlePriceRangeChange,
  handleRatingChange,
  handleSubmit,
  handleToggle,
  handleFormReset,
}: OrderFilterWrapperProps) {
  const [open, setOpen] = useState(false);

  return (
    <form
      className="w-full lg:w-[360px]"
      onSubmit={(ev) => {
        ev.preventDefault();
        handleSubmit();
        handleToggle();
      }}
    >
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">Filters</h1>
        <button
          onClick={handleFormReset}
          type="button"
          className="text-sm opacity-50"
        >
          Clear Filters
        </button>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="w-full px-4 py-[10px] bg-card rounded-full flex items-center justify-between"
        >
          <div>
            {orderTimeRange.startDate &&
              format(orderTimeRange.startDate, "dd MMM, yy")}
            {orderTimeRange.endDate && (
              <span className="ml-2">
                <span className="mr-2">-</span>
                {format(orderTimeRange.endDate, "dd MMM, yy")}
              </span>
            )}
          </div>
          <div className="text-xl">
            <MdOutlineCalendarMonth />
          </div>
        </button>

        {open && (
          <div className="mt-4">
            <GeneralDatePicker
              startDate={orderTimeRange.startDate}
              endDate={orderTimeRange.endDate}
              stateUpdater={handleTimeRangeChange}
              isDoublePicker
            />
          </div>
        )}
      </div>

      <div className="h-[1px] w-full bg-card mt-4" />

      <div className="mt-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm">Price range</h2>
          <p className="text-primary text-sm">
            <span className="mr-1">${priceRange[0]}</span>
            <span>-</span>
            <span className="ml-1">${priceRange[1]}</span>
          </p>
        </div>
        <div className="mt-12">
          <GeneralRangeSlider
            min={10}
            max={1000}
            currentValues={priceRange}
            handleValuesChange={handlePriceRangeChange}
          />

          <div className="flex items-center justify-between mt-[6px]">
            <span className="text-[10px]">${10}</span>
            <span className="text-[10px]">${1000}</span>
          </div>
        </div>
      </div>

      <div className="h-[1px] w-full bg-card mt-10" />

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">By Reviwes</span>
          <span className="text-sm text-primary">{rating}.0</span>
        </div>
        <div className="mt-6 mb-4">
          <GeneralRating
            rating={rating}
            spaceBetweenStars={6}
            starSize={30}
            handleRatingChange={handleRatingChange}
            starsColor="#9F00D9"
          />
        </div>
      </div>

      <div className="h-[1px] w-full bg-card mt-6" />

      <div className="w-full mt-6 flex justify-center">
        <button className="py-3 px-6 bg-secondary text-white rounded-md font-semibold">
          Apply
        </button>
      </div>
    </form>
  );
}
