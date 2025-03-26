import React from "react";
import { clsx } from "clsx";

interface CloseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const CloseButton = React.forwardRef<
  HTMLButtonElement,
  CloseButtonProps
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={clsx(
        "p-2 hover:bg-gray-100 rounded-full transition-colors border-none outline-none",
        className,
      )}
      {...props}
    />
  );
});

CloseButton.displayName = "CloseButton";
