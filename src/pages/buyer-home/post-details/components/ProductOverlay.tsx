import { ComponentProps } from "react";
import { FaRegHeart } from "react-icons/fa6";
import clsx from "clsx";

import { useProductSocialDetails } from "../hooks/details";
import { Product } from "../types/product";

import { ProductThumbnail } from "./ProductThumbnail";

type ProductOverlayProps = {
  likes: number;
} & ComponentProps<"div">;

type ProductWithOverlayProps = {
  product: Product;
} & ComponentProps<"div">;

export const ProductWithOverlay = ({
  product,
  ...props
}: ProductWithOverlayProps) => {
  const details = useProductSocialDetails(product.id);

  return (
    <ProductOverlay {...props} likes={details?.reactions ?? 0}>
      <ProductThumbnail product={product} className="h-52" />
    </ProductOverlay>
  );
};

export const ProductOverlay = ({
  likes,
  children,
  className,
}: ProductOverlayProps) => {
  return (
    <div className={clsx("relative w-fit", className)}>
      <div className="absolute gap-x-1 text-xs bottom-2 left-2 flex flex-row items-center z-20 text-white">
        <div className="bg-gray-700 p-1 rounded-full bg-opacity-50 text-white">
          <FaRegHeart />
        </div>
        {likes}
      </div>
      <span>{children}</span>
    </div>
  );
};
