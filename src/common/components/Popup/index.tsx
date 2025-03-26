import React from "react";
import { clsx } from "clsx";

interface PopupProps {
  children: React.ReactNode;
  className?: string;
}

export const Popup = ({ children, className }: PopupProps) => {
  return (
    <div
      className={clsx(
        "fixed inset-0 bg-black/50 flex justify-center items-center z-[9999] overflow-y-auto",
        className,
      )}
    >
      {children}
    </div>
  );
};

interface SendOfferProps {
  children: React.ReactNode;
  className?: string;
}

export const SendOfferSection = {
  Root: ({ children, className }: SendOfferProps) => (
    <div className={clsx("flex flex-col gap-4", className)}>{children}</div>
  ),

  Topic: ({ children, className }: SendOfferProps) => (
    <div
      className={clsx(
        "flex justify-between items-center self-stretch text-center justify-center",
        className,
      )}
    >
      {children}
    </div>
  ),

  ButtonContainer: ({ children, className }: SendOfferProps) => (
    <div
      className={clsx(
        "flex justify-center items-center gap-2.5 self-stretch",
        className,
      )}
    >
      {children}
    </div>
  ),

  DetailContainer: ({ children, className }: SendOfferProps) => (
    <div
      className={clsx(
        "flex p-3.5 items-start gap-2.5 flex-1 self-stretch",
        "bg-gradient-to-b from-white via-[#FCF5FF] to-[#F0CCFD]",
        className,
      )}
    >
      {children}
    </div>
  ),

  DetailSubContainer: ({ children, className }: SendOfferProps) => (
    <div
      className={clsx("flex items-start gap-6 flex-1 self-stretch", className)}
    >
      {children}
    </div>
  ),

  LeftContainer: ({ children, className }: SendOfferProps) => (
    <div
      className={clsx(
        "flex flex-col items-start gap-7 flex-1 self-stretch",
        className,
      )}
    >
      {children}
    </div>
  ),

  RightContainer: ({ children, className }: SendOfferProps) => (
    <div
      className={clsx(
        "flex flex-col items-start gap-4 flex-1 self-stretch",
        className,
      )}
    >
      {children}
    </div>
  ),

  LeftTopContainer: ({ children, className }: SendOfferProps) => (
    <div className={clsx("flex flex-col items-start gap-2.5", className)}>
      {children}
    </div>
  ),

  LeftTopDetailContainer: ({ children, className }: SendOfferProps) => (
    <div
      className={clsx(
        "flex p-2.5 items-center gap-3.5 self-stretch rounded-md",
        "bg-white shadow-[0px_2px_24px_0px_rgba(0,0,0,0.08)]",
        className,
      )}
    >
      {children}
    </div>
  ),

  LeftTopDetailWrapper: ({ children, className }: SendOfferProps) => (
    <div className={clsx("flex flex-col items-start gap-0.5", className)}>
      {children}
    </div>
  ),

  LeftLowerWrapper: ({ children, className }: SendOfferProps) => (
    <div
      className={clsx(
        "flex flex-col items-start gap-3.5 self-stretch",
        className,
      )}
    >
      {children}
    </div>
  ),

  RightDetailContainer: ({ children, className }: SendOfferProps) => (
    <div
      className={clsx(
        "flex flex-col items-start gap-3.5 flex-1 self-stretch",
        className,
      )}
    >
      {children}
    </div>
  ),

  RightDetailContainer2: ({ children, className }: SendOfferProps) => (
    <div
      className={clsx(
        "flex p-1.5 px-2 justify-center items-center gap-2.5 rounded-md bg-white",
        className,
      )}
    >
      {children}
    </div>
  ),
};

export default Popup;
