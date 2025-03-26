import React from "react";
import clsx from "clsx";
import Option from "common/components/Chat/components/Options/Option";
import { v4 } from "uuid";
type OptionsProps = {
  name: string;
  icon?: any;
  onClick?: () => void;
};
type OptionsListProps = {
  options: OptionsProps[];
};
const OptionsList = ({ options }: OptionsListProps) => {
  return (
    <ul className={clsx("list-none w-full gap-1 m-0 p-0 w-full")}>
      {options.map((option) => (
        <Option
          key={v4()}
          text={option.name}
          icon={option.icon}
          onClick={option.onClick}
        />
      ))}
    </ul>
  );
};

export default OptionsList;
