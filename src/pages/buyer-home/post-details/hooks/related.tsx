import { useEffect, useState } from "react";

import { defaultProducts } from "../assets/product";
import { Product } from "../types/product";

/**
 * Get related products for a given product
 * @param productId The id of the product to get related products for
 * @returns An array of related products
 */
export const useRelated = (productId: string): Array<Product> => {
  // When use productId, must remove console
  console.log("will remove", productId);
  const [related, setRelated] = useState<Array<Product>>([]);

  useEffect(() => {
    // TODO replace with your call with productId
    setRelated(defaultProducts.slice(1));
  }, []);

  return related;
};
