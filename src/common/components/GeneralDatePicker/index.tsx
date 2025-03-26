import DatePicker from "react-datepicker";

import { OrderTimeRange } from "pages/seller-home/orders/orders-page.types";

import "react-datepicker/dist/react-datepicker.css";
import "./custom-datepicker.css";

type GeneralDatePickerProps = {
  startDate: Date | null;
  endDate: Date | null;
  stateUpdater: (dates: OrderTimeRange) => void;
  isDoublePicker?: boolean;
};

export default function GeneralDatePicker(props: GeneralDatePickerProps) {
  const { startDate, endDate, stateUpdater, isDoublePicker = false } = props;

  const handleChange = (date: [Date | null, Date | null]) => {
    stateUpdater({ startDate: date[0], endDate: date[1] });
  };

  return (
    <DatePicker
      className="w-full"
      selected={startDate}
      onChange={handleChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange={isDoublePicker} // selectesRange - to use 2 date pickers in 1 box
      inline // used to show natural Date Picker without a call to action button
    />
  );
}
