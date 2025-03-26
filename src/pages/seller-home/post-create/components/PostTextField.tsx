import { ComponentProps } from "react";
import clsx from "clsx";

type PostTextFieldProps = ComponentProps<"input">;

export const PostTextField = ({ className, ...rest }: PostTextFieldProps) => {
  return (
    <input
      className={clsx(
        "border border-black/10 rounded-md h-12 px-4 py-2 w-full",
        "focus:border-primary-light focus:ring-1 focus:ring-primary-light outline-none transition-all",
        className,
      )}
      {...rest}
    />
  );
};
