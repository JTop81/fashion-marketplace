// Using tailwindcss, create a button component with a few variants.
// The variants are "outlined", "contained", and "text".
// You should be able to pass in a color and size to the button.
// The button should inherit all of the other functionality of a button.

import React, { ComponentPropsWithRef } from "react";
import clsx from "clsx";

type ButtonProps = {
  variant?: "outlined" | "contained" | "text";
} & ComponentPropsWithRef<"button">;

const Button: React.FC<ButtonProps> = ({
  variant = "contained",
  className,
  children,
  ...rest
}) => {
  const variants = {
    outlined: "border border-primary text-primary font-medium bg-white",
    contained: "bg-primary text-white font-medium",
    text: "",
  };

  return (
    <button
      {...rest}
      className={clsx("px-4 py-3 rounded-md", variants[variant], className)}
    >
      {children}
    </button>
  );
};

export default Button;
