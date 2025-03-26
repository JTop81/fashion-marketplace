import React from "react";
import clsx from "clsx";

interface ErrorProps {
  children: React.ReactNode;
  className?: string;
}

export const Error: React.FC<ErrorProps> = ({ children, className }) => {
  return (
    <div className={clsx("text-red-500 text-xs font-poppins mt-1", className)}>
      {children}
    </div>
  );
};

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  containerClassName,
  labelClassName,
  inputClassName,
  errorClassName,
  ...props
}) => {
  const inputClasses = clsx(
    "w-full h-11",
    "text-sm text-gray-700 placeholder-gray-400",
    "border border-black/10 rounded-lg",
    "px-5",
    "focus:outline-none",
    "transition-colors duration-200",
    error
      ? "border-red-300 hover:border-red-400 focus:border-red-500"
      : "hover:border-primary/20",
    inputClassName,
  );

  return (
    <div className={clsx("space-y-1.5", containerClassName)}>
      {label && (
        <label
          className={clsx("text-sm font-medium text-gray-700", labelClassName)}
        >
          {label}
        </label>
      )}
      <div className="rounded w-full flex-col !items-start justify-start">
        <input className={inputClasses} {...props} />
        {error && <Error className={errorClassName}>{error}</Error>}
      </div>
    </div>
  );
};

export default InputField;
