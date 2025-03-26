import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Field, Input, Label } from "@headlessui/react";
interface FieldInputProps {
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: any;
  type?: string;
  icon?: boolean;
  isRequired?: boolean;
}

const FieldInput: React.FC<FieldInputProps> = ({
  placeholder,
  label,
  value,
  onChange,
  type,
  icon,
  isRequired,
}) => {
  const [inputType, setInputType] = useState<string | undefined>(type);

  return (
    <Field className={"w-full flex flex-col"}>
      <Label
        className={
          "text-sm/7 w-full font-Poppins font-medium text-customTextGray text-sm"
        }
      >
        {label}
      </Label>
      <div className="relative w-full flex items-center justify-center">
        <Input
          className={
            "border w-full border-customBorderGray px-[18px] py-4 rounded-md focus:border-customBorderGray active:border-customBorderGray"
          }
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          type={inputType}
          required={isRequired}
        />
        {icon &&
          (inputType === "password" ? (
            <FiEye
              className="absolute inline-block right-[14px] w-[24px] h-[24px] cursor-pointer"
              onClick={() => setInputType("text")}
            />
          ) : (
            <FiEyeOff
              className="absolute inline-block right-[14px] w-[24px] h-[24px] cursor-pointer"
              onClick={() => setInputType("password")}
            />
          ))}
      </div>
    </Field>
  );
};

export default FieldInput;
