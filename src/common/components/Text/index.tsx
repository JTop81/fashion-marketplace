import React from "react";
import { clsx } from "clsx";

type TextVariant =
  | "p2-regular"
  | "p2-semibold"
  | "p3-regular-white"
  | "about"
  | "p4-regular"
  | "p4-regular-light"
  | "h3-semibold"
  | "time"
  | "button"
  | "p2-semibold-white"
  | "p1-medium"
  | "p4-medium-white"
  | "p4-medium-black"
  | "inter"
  | "h3-semibold-popup"
  | "comment-send"
  | "comment-view-name"
  | "comment-view-time"
  | "comment-view-comment"
  | "comment-view-reply"
  | "field-title"
  | "comment-popup"
  | "number"
  | "highlighted"
  | "popup-shipping"
  | "popup-preferred";

interface TextProps {
  variant: TextVariant;
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const variantStyles: Record<TextVariant, string> = {
  "p2-regular": "font-display text-base font-normal text-text-primary",
  "p2-semibold": "font-display text-base font-semibold text-text-primary",
  "p3-regular-white": "font-display text-sm font-normal text-white text-center",
  about: "font-display text-lg font-semibold text-text-primary",
  "p4-regular": "font-display text-lg font-semibold text-text-primary",
  "p4-regular-light": "font-display text-xs font-normal text-text-primary",
  "h3-semibold": "font-display text-2xl font-semibold text-text-primary",
  time: "font-display text-sm font-normal text-customTextPink text-center",
  button: "font-display text-base font-semibold text-white text-center",
  "p2-semibold-white":
    "font-display text-base font-semibold text-white text-center sm:block hidden",
  "p1-medium": "font-display text-lg font-medium text-text-primary",
  "p4-medium-white": "font-display text-xs font-medium text-white text-center",
  "p4-medium-black": "font-display text-xs font-medium text-text-primary",
  inter: "font-inter text-xs font-normal text-text-primary",
  "h3-semibold-popup":
    "font-display text-2xl font-semibold text-text-primary text-center",
  "comment-send": "font-display text-xs font-normal text-white text-center",
  "comment-view-name": "font-display text-sm font-medium text-text-primary",
  "comment-view-time": "font-display text-xs font-normal text-text-secondary",
  "comment-view-comment": "font-display text-xs font-normal text-text-primary",
  "comment-view-reply": "font-display text-xs font-normal text-customTextPink",
  "field-title": "font-display text-sm font-normal text-text-primary",
  "comment-popup": "font-display text-sm font-normal text-text-secondary",
  number: "font-display text-xs font-normal text-text-primary",
  highlighted:
    "font-display text-lg font-medium text-text-primary lg:text-base",
  "popup-shipping":
    "font-display text-base font-normal text-text-primary opacity-50",
  "popup-preferred": "font-display text-base font-normal text-text-primary",
};

export const Text = ({ variant, children, className, as = "p" }: TextProps) => {
  const Component = as;

  return (
    <Component className={clsx(variantStyles[variant], "m-0 p-0", className)}>
      {children}
    </Component>
  );
};

export default Text;
