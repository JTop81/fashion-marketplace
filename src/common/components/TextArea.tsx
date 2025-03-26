import React from "react";
import clsx from "clsx";

import { Error } from "./InputField";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  textareaClassName?: string;
  errorClassName?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  containerClassName,
  labelClassName,
  textareaClassName,
  errorClassName,
  ...props
}) => {
  const textareaClasses = clsx(
    "w-full min-h-[120px]",
    "text-sm text-gray-700 placeholder-gray-400",
    "border border-black/10 rounded-lg",
    "px-5 py-4",
    "focus:outline-none",
    "transition-colors duration-200",
    "resize-none",
    error
      ? "border-red-300 hover:border-red-400 focus:border-red-500"
      : "hover:border-primary/20",
    textareaClassName,
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
        <textarea className={textareaClasses} {...props} />
        {error && <Error className={errorClassName}>{error}</Error>}
      </div>
    </div>
  );
};

export default TextArea;
