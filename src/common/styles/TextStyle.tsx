import React from "react";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

interface TextProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const TextH3Semibold: React.FC<TextProps> = ({
  children,
  className,
  as = "h3",
}) => {
  const Component = as;
  return (
    <Component
      className={clsx(
        "text-2xl font-semibold text-text-primary font-display",
        className,
      )}
    >
      {children}
    </Component>
  );
};

export const TextHighlighted: React.FC<TextProps> = ({
  children,
  className,
  as = "span",
}) => {
  const Component = as;
  return (
    <Component
      className={clsx(
        "text-lg font-medium text-text-primary lg:text-base",
        className,
      )}
    >
      {children}
    </Component>
  );
};

export const TextP1Medium: React.FC<TextProps> = ({
  children,
  className,
  as = "p",
}) => {
  const Component = as;
  return (
    <Component
      className={clsx("text-lg font-medium text-text-primary", className)}
    >
      {children}
    </Component>
  );
};

export const ButtonText1: React.FC<ButtonProps | TextProps> = (props) => {
  const { children, className } = props;

  if ("type" in props) {
    return (
      <button
        {...props}
        className={clsx("text-base font-semibold text-white", className)}
      >
        {children}
      </button>
    );
  }

  const { as: Component = "span" } = props as TextProps;
  return (
    <Component
      className={clsx("text-base font-semibold text-white", className)}
    >
      {children}
    </Component>
  );
};
