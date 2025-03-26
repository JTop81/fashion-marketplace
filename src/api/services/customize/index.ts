import { getAxiosInstance } from "api/axios";
import { GET_ALL_PREFERENCES } from "api/constants/endpoints.constants";

import { categoriesAdapter } from "./adapters/categories.adapter";
import { ICategoriesResponse } from "./interfaces/categories.interface";

export const getCategories = async (): Promise<ICategoriesResponse[]> => {
  const api = await getAxiosInstance();
  const response = await api.get<ICategoriesResponse[]>(GET_ALL_PREFERENCES);
  return categoriesAdapter(response?.data);
};
