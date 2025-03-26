import React from "react";
interface SelectProps {
  data?: any;
  selectedOption: string;
  handleOptionClick: (option: string) => void;
}
const Select: React.FC<SelectProps> = ({
  data,
  selectedOption,
  handleOptionClick,
}) => {
  return (
    <div className="w-full flex flex-nowrap md:flex-wrap gap-[10px] mt-[30px] overflow-x-auto">
      {[{ preference_name: "All" }, ...data]?.map(
        (option: any, index: number) => (
          <div
            key={`preference-${index.toString()}`}
            onClick={() => handleOptionClick(option.preference_name)}
            className={`flex justify-center items-center ${selectedOption === option.preference_name ? "bg-[#F3D8FD] hover:bg-[#F3D8FD]" : "hover:bg-[#F3D8FD]"} px-[10px] py-[5px] cursor-pointer rounded-[30px] whitespace-nowrap`}
          >
            {option.preference_name
              .toLowerCase()
              .replace(/_/g, " ")
              .replace(/\b\w/g, (char: string) => char.toUpperCase())}
          </div>
        ),
      )}
    </div>
  );
};

export default Select;
