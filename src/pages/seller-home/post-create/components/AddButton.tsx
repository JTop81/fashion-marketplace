import { FaPlus } from "react-icons/fa6";
import clsx from "clsx";

type AddButtonProps = React.HTMLAttributes<HTMLButtonElement>;

export const AddButton = ({ children, className, ...rest }: AddButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(
        "border-2 border-stone-300 border-dotted rounded-full flex h-10 items-center gap-x-5 px-6",
        className,
      )}
      {...rest}
    >
      <FaPlus />
      Add {children}
    </button>
  );
};
