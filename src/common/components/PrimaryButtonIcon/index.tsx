import React, { ReactNode } from "react";
import clsx from "clsx";

interface PrimaryButtonIconProps {
  onClick?: () => void;
  text?: string;
  icon?: ReactNode;
  className?: string;
}

const PrimaryButtonIcon: React.FC<PrimaryButtonIconProps> = ({
  onClick,
  text,
  icon,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-primary text-white",
        className,
      )}
    >
      <span className="text-white text-base font-semibold font-display leading-[150%]">
        {text}
      </span>
      {icon}
    </button>
  );
};

export default PrimaryButtonIcon;
