import { IoIosArrowDown } from "react-icons/io";
import clsx from "clsx";
import GeneralSelect, { SelectItem } from "common/components/GeneralSelect";

import { ordersStatusBtns } from "../constants";
import { OrderStatusVal } from "../orders-page.types";

type OrderStatusSelectProps = {
  orderStatus: OrderStatusVal;
  handleOrderStatusChange: (ev: SelectItem) => void;
};

export default function OrderStatusSelect({
  orderStatus,
  handleOrderStatusChange,
}: OrderStatusSelectProps) {
  return (
    <div>
      <div className="xl:hidden">
        <GeneralSelect
          options={ordersStatusBtns}
          optionClasses="px-4 py-2 cursor-pointer border-b border-slate-200"
          buttonLabel={orderStatus.label}
          customSelectButton={
            <div className="flex items-center bg-card rounded-3xl py-[6px] lg:py-2 px-[12px]">
              <span className="mr-6 text-sm lg:text-base">
                {orderStatus.label}
              </span>
              <IoIosArrowDown />
            </div>
          }
          selectedOption={orderStatus}
          handleOptionChange={handleOrderStatusChange}
        />
      </div>
      <div className="hidden xl:block space-x-2">
        {ordersStatusBtns.map((item) => {
          return (
            <button
              key={item.value}
              onClick={() => handleOrderStatusChange(item)}
              className={clsx(
                "py-[6px] px-4 text-sm rounded-2xl",
                orderStatus.value === item.value && "bg-[#F3D8FD]",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
