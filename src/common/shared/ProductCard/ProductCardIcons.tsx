import { FC } from "react";
interface DetailsProps {
  primaryBg?: boolean;
  secondaryBg?: boolean;
  detail: number | string;
  children: React.ReactNode;
  onClick?: any;
}

const ProductIcons: FC<DetailsProps> = ({
  children,
  detail,
  primaryBg,
  secondaryBg,
  onClick,
}) => {
  return (
    <div>
      <div
        className={`rounded-full w-9 h-9 mx-auto flex justify-center items-center cursor-pointer ${
          (primaryBg && "bg-primary shadow-md") ||
          (secondaryBg && "bg-secondary shadow-md") ||
          "bg-[#E8E8E8]"
        }`}
        onClick={onClick}
      >
        {children}
      </div>
      <p className="mt-[6px] text-center font-medium whitespace-nowrap text-sm">
        {detail}
      </p>
    </div>
  );
};

export default ProductIcons;
