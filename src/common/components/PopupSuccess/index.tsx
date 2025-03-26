import React from "react";
import { clsx } from "clsx";

interface PopupSuccessProps {
  children: React.ReactNode;
  className?: string;
}

export const PopupSuccess = {
  Container: ({ children, className }: PopupSuccessProps) => (
    <div
      className={clsx(
        "flex w-[648px] h-[338px] p-8 px-11",
        "flex-col justify-center items-center gap-6",
        "flex-shrink-0 rounded-xl bg-white",
        className,
      )}
    >
      {children}
    </div>
  ),

  MessageContainer: ({ children, className }: PopupSuccessProps) => (
    <div className={clsx("flex items-center p-2.5 gap-5", className)}>
      {children}
    </div>
  ),

  SuccessIcon: ({ children, className }: PopupSuccessProps) => (
    <div className={clsx("w-[81px] h-[82px] flex-shrink-0", className)}>
      {children}
    </div>
  ),
};

export default PopupSuccess;
