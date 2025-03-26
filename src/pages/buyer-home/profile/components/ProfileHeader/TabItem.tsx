import React from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import { HeaderTabType } from "./types";

interface TabItemProps {
  label: HeaderTabType;
  active: boolean;
  onClick: () => void;
}

const TabItem: React.FC<TabItemProps> = ({ label, active, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick();
    // Map tab types to hash values
    const hashMap: Record<HeaderTabType, string> = {
      [HeaderTabType.settings]: "profile",
      [HeaderTabType.following]: "following",
      [HeaderTabType.orders]: "orders",
      [HeaderTabType.returns]: "returns",
      [HeaderTabType.review]: "reviews",
    };
    navigate(`/settings#${hashMap[label]}`);
  };

  return (
    <button
      className={clsx(
        "w-[160px] md:w-[180px] h-[33px] flex justify-center items-center px-4 py-[6px] rounded-[30px] text-[14px] leading-[21px]",
        active
          ? "bg-[#F3D8FD] text-black font-medium"
          : "bg-transparent text-customTextGray font-normal",
      )}
      onClick={handleClick}
    >
      <span className="w-full truncate text-center">{label}</span>
    </button>
  );
};

export default TabItem;
