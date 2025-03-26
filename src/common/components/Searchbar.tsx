import React from "react";
import { CiSearch } from "react-icons/ci";
import clsx from "clsx";

interface SearchbarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  iconClassName?: string;
}

const Searchbar: React.FC<SearchbarProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className,
  inputClassName,
  iconClassName,
}) => {
  return (
    <div className={clsx("relative", className)}>
      <input
        className={clsx(
          "w-full h-[40px] bg-white rounded-full",
          "pl-4 pr-10 text-sm",
          "border border-black/10",
          "focus:outline-none focus:border-primary",
          "transition-colors",
          inputClassName,
        )}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={({ target }) => onChange(target.value)}
      />
      <CiSearch
        className={clsx(
          "absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400",
          iconClassName,
        )}
        size={20}
      />
    </div>
  );
};

export default Searchbar;
