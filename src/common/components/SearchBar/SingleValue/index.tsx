import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { SlMagnifier } from "react-icons/sl";
import clsx from "clsx";

interface SearchBarProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showLeftIcon?: boolean;
  leftIcon?: React.ReactNode;
  showButton?: boolean;
  submitButton?: React.ReactElement;
  handleSend?: () => void;
  isLoading?: boolean;
  showIcon?: boolean;
  hasHistory?: boolean;
  isGray?: boolean;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onChange,
  value,
  setValue,
  placeholder,
  onKeyDown,
  onBlur,
  showLeftIcon = true,
  leftIcon,
  showButton = false,
  submitButton,
  handleSend,
  isLoading,
  showIcon = true,
  className,
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend?.();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div
      className={clsx(
        "mt-4 mb-4 md:max-w-[883px] max-w-full w-full max-h-[46px]",
        className,
      )}
    >
      <div className="bg-transparent relative w-full flex items-center h-full justify-between border border-[#ccc] rounded-[30px] pl-5 gap-2.5">
        {showLeftIcon && leftIcon}
        <input
          disabled={isLoading}
          onKeyDown={onKeyDown || handleKeyPress}
          onBlur={onBlur || handleBlur}
          type="text"
          placeholder={placeholder}
          onChange={onChange || handleChange}
          value={value}
          className="w-full content-stretch md:content-normal md:max-w-full !h-[46px] flex-1 border-none outline-none leading-[150%] text-sm"
        />
        {showIcon && showLeftIcon && !leftIcon && (
          <SlMagnifier className="w-6 h-6 mr-5" />
        )}
        {showButton && submitButton
          ? React.cloneElement(submitButton, {
              onClick: handleSend,
            })
          : value !== "" && (
              <button
                onClick={() => setValue("")}
                className="flex items-center justify-center w-8 h-8 mr-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <AiOutlineClose className="w-4 h-4 text-gray-500" />
              </button>
            )}
      </div>
    </div>
  );
};

export default SearchBar;
