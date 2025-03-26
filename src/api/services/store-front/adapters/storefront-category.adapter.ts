import { IStoreFrontCategory } from "api/services/store-front/interfaces/storefront-category.interface";
import { IStoreFrontCategoryResponse } from "api/services/store-front/interfaces/storefront-category-response.interface";

export const storefrontCategoryAdapter = (
  storefrontCategoryResponse: IStoreFrontCategoryResponse,
): IStoreFrontCategory => {
  const { id, title, imgUrl } = storefrontCategoryResponse;
  return { id, title, imgUrl };
};
