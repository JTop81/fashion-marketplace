import React from "react";
import { clsx } from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          "flex p-1.5 px-3.5 h-[27px] w-[337.5px] md:w-full",
          "items-start gap-2.5 self-stretch",
          "rounded-md border border-[#F3D8FD] outline-none",
          "placeholder:text-black/60 placeholder:font-display placeholder:text-xs placeholder:font-normal placeholder:leading-[150%]",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
