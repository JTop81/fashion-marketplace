import React, { FC } from "react";
import { ReactComponent as ArrowDown } from "assets/images/Icon/light/arrow/ArrowDown.svg";
import DropDownProps from "types/dropdown";

const DropDownSelection: FC<
  DropDownProps & { style?: React.CSSProperties }
> = ({ name, label, options, value, onChange, error, style }) => {
  return (
    <div
      className="w-full relative flex flex-wrap items-stretch mb-3"
      style={style}
    >
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border border-[#0D6CAF] rounded-md py-2.5 px-6 appearance-none text-black font-poppins text-base font-normal leading-6"
      >
        <option value="" disabled label={label}>
          {label}
        </option>
        {options.map((option, index) => (
          <option
            key={`selectOption-${index.toString()}`}
            value={option}
            label={option}
          >
            {option}
          </option>
        ))}
      </select>
      <div className="absolute right-6 top-3">
        <ArrowDown />
      </div>
      {error && <div className="text-red-500 text-xs">{error}</div>}
    </div>
  );
};

export default DropDownSelection;
