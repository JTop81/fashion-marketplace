import { useState } from "react";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { GeneralModal } from "common/components/GeneralModal";
import GeneralPopover from "common/components/GeneralPopover";

import { OrderTimeRange } from "../orders-page.types";

import OrderFilterForm from "./OrderFilterForm";

type OrderFilterWrapperProps = {
  priceRange: number[];
  orderTimeRange: OrderTimeRange;
  rating: number;
  handleTimeRangeChange: (dates: OrderTimeRange) => void;
  handlePriceRangeChange: (values: number[]) => void;
  handleRatingChange: (rating: number) => void;
  handleSubmit: () => void;
  handleFormReset: () => void;
};

export default function OrderFilterWrapper({
  priceRange,
  orderTimeRange,
  rating,
  handleTimeRangeChange,
  handlePriceRangeChange,
  handleRatingChange,
  handleSubmit,
  handleFormReset,
}: OrderFilterWrapperProps) {
  const [open, setOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  // When use popoverOpen, must remove console
  console.log("will remove", popoverOpen);

  const handleToggle = () => setPopoverOpen((prev) => !prev);
  const handleMobileToggle = () => setOpen((prev) => !prev);

  const renderFilterBtn = (
    <div className="flex items-center rounded-full bg-card p-2 lg:p-[10px] lg:pr-4">
      <span className="hidden lg:block mr-6 text-sm px-2">Filters</span>
      <HiMiniAdjustmentsHorizontal className="text-lg" />
    </div>
  );

  return (
    <>
      <button onClick={() => setOpen(true)} className="block lg:hidden">
        {renderFilterBtn}
      </button>

      <div className="block lg:hidden">
        <GeneralModal isOpen={open} closeModal={() => setOpen(false)}>
          <div
            style={{ maxHeight: "calc(100vh - 75px)" }}
            className="overflow-scroll h-screen"
          >
            <OrderFilterForm
              handleFormReset={handleFormReset}
              handleToggle={handleMobileToggle}
              handleSubmit={handleSubmit}
              rating={rating}
              handleTimeRangeChange={handleTimeRangeChange}
              handlePriceRangeChange={handlePriceRangeChange}
              handleRatingChange={handleRatingChange}
              orderTimeRange={orderTimeRange}
              priceRange={priceRange}
            />
          </div>
        </GeneralModal>
      </div>

      <div className="hidden lg:block">
        <GeneralPopover
          location="bottom end"
          customPopoverBotton={renderFilterBtn}
          popoverPanelClasses="!top-[16px]"
          menuItems={() => (
            <OrderFilterForm
              handleFormReset={handleFormReset}
              handleToggle={handleToggle}
              handleSubmit={handleSubmit}
              rating={rating}
              handleTimeRangeChange={handleTimeRangeChange}
              handlePriceRangeChange={handlePriceRangeChange}
              handleRatingChange={handleRatingChange}
              orderTimeRange={orderTimeRange}
              priceRange={priceRange}
            />
          )}
        />
      </div>
    </>
  );
}
