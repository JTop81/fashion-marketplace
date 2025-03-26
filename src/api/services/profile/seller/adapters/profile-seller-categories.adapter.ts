import { IProfileSellerCategoriesResponse } from "../interfaces/profile-seller-categories.interface";
import { IProfileSellerCategories } from "../interfaces/profile-seller-categories-response.interface";

export const profileSellerCategoriesAdapter = (
  profileSellerCategoriesResponse: IProfileSellerCategoriesResponse,
): IProfileSellerCategories => {
  return profileSellerCategoriesResponse;
};
