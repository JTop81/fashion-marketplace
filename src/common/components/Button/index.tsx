import React from "react";
import { clsx } from "clsx";

type ButtonVariant = "primary" | "close" | "add-cart" | "send-comment";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "flex items-start gap-2 px-6 py-3 rounded-md bg-primary text-white",
  close:
    "flex justify-center items-center gap-2 px-6 py-1.5 rounded bg-primary",
  "add-cart":
    "flex justify-center items-center h-9 px-6 py-3 gap-2 rounded-md bg-primary",
  "send-comment":
    "flex justify-center items-center h-[34px] px-6 py-3 gap-2 rounded-md bg-primary",
};

export const Button = ({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        variantStyles[variant],
        "hover:bg-primary/90 transition-colors",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
