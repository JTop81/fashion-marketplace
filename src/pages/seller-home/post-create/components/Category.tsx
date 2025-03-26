import React from "react";
import clsx from "clsx";

type CategoryButtonProps = {
  category: string;
  handleSelect?: () => void;
} & React.HTMLAttributes<HTMLButtonElement>;

const Category = ({
  handleSelect,
  className,
  category: currentCategory,
  ...rest
}: CategoryButtonProps) => {
  if (!currentCategory) return <></>;
  return (
    <button
      className={clsx("flex gap-x-3 items-center h-full w-full", className)}
      type="button"
      onClick={handleSelect}
      {...rest}
    >
      {currentCategory}
    </button>
  );
};

export default Category;
