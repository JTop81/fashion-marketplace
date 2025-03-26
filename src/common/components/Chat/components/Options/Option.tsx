import React from "react";

// TODO: Search for proper icons
const Option = ({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon?: any;
  onClick?: () => void;
}) => {
  return (
    <li
      className="w-full flex items-center  gap-2 p-2 px-4 text-align-start hover:bg-stone-100"
      onClick={onClick}
    >
      {icon && icon} <p>{text}</p>
    </li>
  );
};

export default Option;
