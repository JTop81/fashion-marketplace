import { ComponentProps } from "react";
import { FaPlus } from "react-icons/fa6";
import clsx from "clsx";

type AddMoreButtonProps = ComponentProps<"button">;

export const AddMoreButton = ({
  className,
  children,
  ...rest
}: AddMoreButtonProps) => {
  return (
    <button
      className={clsx(
        "h-11 px-6 border border-black/10 bg-white text-gray-700 rounded-md text-sm font-medium",
        "hover:bg-gray-50 transition-colors flex items-center gap-2",
        className,
      )}
      {...rest}
    >
      <FaPlus className="w-3.5 h-3.5" />
      {children}
    </button>
  );
};
