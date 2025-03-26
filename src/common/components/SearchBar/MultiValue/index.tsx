import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { SearchBar } from "../../../index";

import { MultiValueSearchBarProps } from "./models";
import { addValue } from "./utils";

export const MultiValueSearchBar: React.FC<MultiValueSearchBarProps> = ({
  placeholder,
  formik,
  updateState,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const tryAddValue = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length === 0) {
      addValue({ formik, inputValue, updateState, setInputValue });
    }
  };

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await tryAddValue();
    }
  };

  const handleBlur = async () => {
    await tryAddValue();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    formik.setFieldValue("value", value);
  };

  const removeSearchTerm = (index: number) => () => {
    const newList = formik.values.listValues.filter(
      (_: string, i: number) => i !== index,
    );
    formik.setFieldValue("listValues", newList);
    if (updateState) {
      updateState({ listValues: newList });
    }
  };

  return (
    <div className="w-full">
      <div className="p-2.5 max-w-[820px] flex flex-wrap items-start w-full">
        {formik.values.listValues.map((term: string, index: number) => (
          <div
            key={`searchTerm-${index.toString()}`}
            className="inline-flex items-center bg-primarySecondary rounded px-1.5 m-1.5 text-base"
          >
            {term}
            <div
              className="ml-1.5 cursor-pointer inline-flex items-center justify-center p-0.5 self-stretch rounded-r hover:bg-gray-300 transition-colors"
              onClick={removeSearchTerm(index)}
            >
              <AiOutlineClose />
            </div>
          </div>
        ))}
      </div>
      <SearchBar
        onChange={handleInputChange}
        value={inputValue}
        setValue={setInputValue}
        placeholder={placeholder}
        onKeyDown={handleKeyPress}
        onBlur={handleBlur}
        showIcon={false}
        hasHistory={false}
      />
      <p className="text-[0.95rem] font-light text-customTextPink opacity-50 pl-2.5 mt-px">
        comma separate multiple invites
      </p>
    </div>
  );
};
