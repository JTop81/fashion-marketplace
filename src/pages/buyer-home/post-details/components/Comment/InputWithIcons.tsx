import React, { forwardRef } from "react";
import { FaRegPaperPlane } from "react-icons/fa6";

interface InputWithIconsProps {
  bgColor?: string;
  icon1: React.ReactNode;
  icon2: React.ReactNode;
  type: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  onSubmit: () => void;
  disabled?: boolean;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const InputWithIcons = forwardRef<HTMLInputElement, InputWithIconsProps>(
  (
    {
      onChange,
      value,
      onSubmit,
      type = "comment",
      placeholder,
      icon1,
      icon2,
      bgColor = "bg-white",
      disabled,
      onKeyDown,
    },
    ref,
  ) => {
    return (
      <div
        className={`relative w-full rounded-xl border border-gray-200 hover:border-primary/20 focus-within:border-primary/20 transition-colors ${bgColor}`}
      >
        <div className="flex items-center min-h-[52px]">
          <input
            ref={ref}
            type="text"
            className="w-full px-4 py-3 text-sm text-gray-700 bg-transparent outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            disabled={disabled}
            onKeyDown={onKeyDown}
          />
          <div className="flex items-center gap-1 px-2">
            <button
              type="button"
              className="p-1.5 text-gray-400 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-400"
              onClick={() => {}}
              disabled={disabled}
            >
              {icon1}
            </button>
            <button
              type="button"
              className="p-1.5 text-gray-400 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-400"
              onClick={() => {}}
              disabled={disabled}
            >
              {icon2}
            </button>
            <button
              type="button"
              onClick={onSubmit}
              disabled={!value.trim() || disabled}
              className={`p-1.5 transition-colors ${
                value.trim() && !disabled
                  ? "text-primary hover:bg-primary/5"
                  : "text-gray-400 cursor-not-allowed"
              }`}
            >
              <FaRegPaperPlane size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  },
);

InputWithIcons.displayName = "InputWithIcons";

export default InputWithIcons;
