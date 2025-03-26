import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";

export interface SelectItem {
  label: string;
  value: string | number;
}

type GeneralSelect = {
  inputNameAtt?: string;
  buttonLabel?: string;
  buttonLabelClasses?: string;
  customSelectButton?: React.ReactNode;
  isButtonWrapperFullWidth?: boolean;
  // single option customization
  optionSelectedClasses?: string;
  optionHoverClasses?: string;
  optionClasses?: string;

  options: SelectItem[];
  selectedOption: SelectItem;
  handleOptionChange: (ev: SelectItem) => void;
};

export default function GeneralSelect({
  inputNameAtt,
  buttonLabel,
  buttonLabelClasses,
  customSelectButton,
  optionSelectedClasses,
  optionClasses,
  optionHoverClasses,
  options,
  selectedOption,
  isButtonWrapperFullWidth = false,
  handleOptionChange,
}: GeneralSelect) {
  return (
    <Listbox
      value={selectedOption}
      onChange={handleOptionChange}
      name={inputNameAtt || ""}
    >
      <Listbox.Button
        className={`${customSelectButton ? "" : buttonLabelClasses} ${isButtonWrapperFullWidth && "w-full"}`}
      >
        {customSelectButton || buttonLabel || ""}
      </Listbox.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Listbox.Options className="py-2 shadow-lg rounded-md">
          {options.map((item) => (
            <Listbox.Option key={item.label} value={item} as={Fragment}>
              {({ selected }) => (
                <li
                  className={clsx(
                    optionClasses || "px-4 py-2 cursor-pointer",
                    optionHoverClasses || "hover:bg-card",
                    selected && (optionSelectedClasses || "bg-card"),
                  )}
                >
                  {item.label}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}
