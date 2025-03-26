import { useState } from "react";

interface CategoryItemType {
  label: string;
  click?: () => void;
  isAdd?: boolean;
  isActive?: boolean;
}

const CategoryItem = ({
  label,
  click,
  isAdd = false,
  isActive = false,
}: CategoryItemType) => {
  const [active, setActive] = useState(isActive);

  const handleClick = () => {
    if (isAdd) {
      setActive(!active);
    }
    if (click) {
      click();
    }
  };

  return (
    <div
      className={`w-fit h-[37px] px-2 md:px-[16px] py-[8px] flex flex-row gap-[8px] whitespace-nowrap border-[2px]  rounded-[30px] items-center ${isAdd && "cursor-pointer"} ${active ? "border-primary bg-[#FAEBFF]" : "border-[#ECECEC] bg-white"}`}
      onClick={handleClick}
    >
      <p className="text-[14px] text-black font-normal leading-[21px]">
        {label}
      </p>
    </div>
  );
};

export default CategoryItem;
