import { useEffect, useState } from "react";

import { ProductSocialDetails } from "../types/product";

export const useProductSocialDetails = (productId: string) => {
  // When use productId, must remove console
  console.log("will remove", productId);
  const [productDetails, setProductDetails] =
    useState<ProductSocialDetails | null>();

  useEffect(() => {
    // TODO replace with your call with productId
    setProductDetails({
      comments: 100,
      reactions: 200,
      newComments: 10,
    });
  }, []);

  return productDetails;
};
