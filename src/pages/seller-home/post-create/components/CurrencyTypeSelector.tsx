import React from "react";
import clsx from "clsx";

type CurrencyTypeSelectorProps = {
  value: string;
  onChange: (value: string) => void;
} & React.HTMLAttributes<HTMLSelectElement>;

export const CurrencyTypeSelector: React.FC<CurrencyTypeSelectorProps> = ({
  className,
  ...rest
}) => (
  <div className="border-r px-2 border-stone-300">
    <select
      className={clsx(
        "focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-3 pr-1 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md",
        className,
      )}
      {...rest}
    >
      <option value="$">$</option>
      <option value="€">€</option>
      <option value="£">£</option>
    </select>
  </div>
);
