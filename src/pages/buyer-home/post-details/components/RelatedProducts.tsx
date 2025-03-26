import { Product } from "../types/product";

import { ProductWithOverlay } from "./ProductOverlay";

type RelatedProductsProps = {
  products: Array<Product>;
};

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-4">
      {products.map((product, index) => (
        <ProductWithOverlay
          key={`product-${index.toString()}`}
          product={product}
          className="h-52 mx-auto"
        />
      ))}
    </div>
  );
};

export { RelatedProducts };
