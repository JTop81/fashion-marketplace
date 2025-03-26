import { IStorefrontWebsite } from "api/services/store-front/interfaces/storefront-website.interface";
import { IStorefrontWebsiteResponse } from "api/services/store-front/interfaces/storefront-website-response.interface";

export const storefrontWebsiteAdapter = (
  storefrontWebsiteResponse: IStorefrontWebsiteResponse,
): IStorefrontWebsite => {
  const { id, address, type } = storefrontWebsiteResponse;
  return { id, address, type };
};
