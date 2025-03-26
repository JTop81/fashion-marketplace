import React from "react";
import clsx from "clsx";

export interface TabOption {
  title: string;
  value: string;
}

interface TabSelectionProps {
  options: TabOption[];
  selected: TabOption;
  onSelect: (option: TabOption) => void;
  className?: string;
}

const TabSelection: React.FC<TabSelectionProps> = ({
  options,
  selected,
  onSelect,
  className,
}) => {
  return (
    <div className={clsx("flex items-center space-x-2", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          className={clsx(
            "text-sm px-4 py-[6px] rounded-full transition-colors",
            selected.value === option.value
              ? "bg-primary/10 text-primary font-medium"
              : "hover:bg-gray-100 text-gray-700",
          )}
          onClick={() => onSelect(option)}
        >
          {option.title}
        </button>
      ))}
    </div>
  );
};

export default TabSelection;
