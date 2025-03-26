import React from "react";
import { PhoneInput, PhoneInputProps } from "react-international-phone";

import "react-international-phone/style.css";
import "./custom.css";
interface CustomPhoneInputProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

const CustomPhoneInput: React.FC<CustomPhoneInputProps & PhoneInputProps> = ({
  name,
  value,
  onChange,
  placeholder = "+1 272 42 423",
  autoFocus = false,
  ...rest
}) => {
  return (
    <PhoneInput
      inputProps={{
        name,
        autoFocus,
      }}
      className="w-full h-[57px] rounded-[6px] border-[#BFBFBF]"
      value={value}
      placeholder={placeholder}
      inputStyle={{
        width: "inherit",
        height: "inherit",
      }}
      countrySelectorStyleProps={{
        style: {
          height: "57px",
        },
      }}
      inputClassName="w-inherit h-inherit focus:border-blue-500 focus:border-2"
      onChange={onChange}
      {...rest}
    />
  );
};

export default CustomPhoneInput;
