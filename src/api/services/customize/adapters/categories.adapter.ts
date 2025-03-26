import { ICategoriesResponse } from "../interfaces/categories.interface";

// TODO: Rewrite response properly
export const categoriesAdapter = (
  categories: ICategoriesResponse[], // Accepts an array of ICategoriesResponse
): ICategoriesResponse[] => {
  return categories.map(
    ({ id, created_at, options, updated_at, preference_name }) => ({
      id,
      created_at,
      options,
      updated_at,
      preference_name,
    }),
  );
};
