import { IProfileCategoryList } from "../interfaces/profile-category-list";
import { IProfileCategoryListResponse } from "../interfaces/profile-category-list-response";

export const profileCategoryListAdapter = (
  profileCategoryListResponse: IProfileCategoryListResponse,
): IProfileCategoryList => {
  return profileCategoryListResponse;
};
