import React from "react";

interface DetailsProps {
  detail: number | string;
  children: React.ReactNode;
  onClick?: any;
}

const ProductIcons: React.FC<DetailsProps> = ({
  children,
  detail,
  onClick,
}) => {
  return (
    <div>
      <div
        className="bg-[#E8E8E8] rounded-full w-9 h-9 mx-auto flex justify-center items-center cursor-pointer"
        onClick={onClick}
      >
        {children}
      </div>
      <p className="mt-[6px] text-center font-medium">{detail}</p>
    </div>
  );
};

export default ProductIcons;
