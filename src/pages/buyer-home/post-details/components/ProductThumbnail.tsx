import React, { ComponentProps } from "react";
import clsx from "clsx";

import { Product } from "../types/product";

import Image from "./Image";

type ProductThumbnailProps = {
  product: Product;
} & ComponentProps<"img">;

// TODO: not currently used
const ProductThumbnail = React.memo(
  ({ product, className }: ProductThumbnailProps) => {
    return (
      <Image
        className={clsx("rounded overflow-hidden", className)}
        src={product.mainImage}
        alt={product.title}
      />
    );
  },
);

export { ProductThumbnail };
