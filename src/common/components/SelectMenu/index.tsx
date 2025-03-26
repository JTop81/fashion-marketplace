import { GoCheckbox } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

import { Category } from "pages/seller-home/store-front/types";

export interface SelectItem {
  label: string;
  value: string | number;
}

type SelectMenu = {
  inputNameAtt?: string;
  buttonLabel?: string;
  buttonLabelClasses?: string;
  customSelectButton?: React.ReactNode;
  isButtonWrapperFullWidth?: boolean;
  // single option customization
  optionSelectedClasses?: string;
  optionHoverClasses?: string;
  optionClasses?: string;
  selectedCategories: Category[];
  options: SelectItem[];
  selectedOption: SelectItem;
  handleOptionChange: (ev: SelectItem) => void;
};

export default function SelectMenu({
  inputNameAtt,
  options,
  selectedOption,
  selectedCategories,
  handleOptionChange,
}: SelectMenu) {
  return (
    <Listbox
      value={selectedOption}
      onChange={handleOptionChange}
      name={inputNameAtt || ""}
    >
      <Label className="block leading-6 text-gray-900">{"Categories"}</Label>
      <div className="relative mt-2">
        <ListboxButton className="relative w-full leading-10 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-10">
          <span className="block truncate">{selectedOption.value}</span>
          {options.length > 0 ? "Select Categories" : "No Category"}
          {/* Display selected option */}
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <IoIosArrowDown
              aria-hidden="true"
              className="h-5 w-5 text-gray-400"
            />
          </span>
        </ListboxButton>
        {options.length > 0 && (
          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-56 w-full overflow-y-scroll scrollbar-thin  rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            {options.map((item) => (
              <ListboxOption
                key={item.value} // Use value as key for uniqueness
                value={item}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-card data-[focus]:text-black"
              >
                {/* Wrapping div for option content */}
                <div className="flex items-center">
                  <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                    {item.label}
                  </span>
                  {selectedCategories.find(
                    (cat) => cat.option_value === item.value,
                  ) && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[selected]:text-white [.group:not([data-selected])_&]:hidden">
                      <GoCheckbox aria-hidden="true" className="h-5 w-5" />
                    </span>
                  )}
                </div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        )}
      </div>
    </Listbox>
  );
}
