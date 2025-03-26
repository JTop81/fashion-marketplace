import { StoreWebsiteType } from "pages/seller-home/store-front/types";

export interface IStorefrontWebsiteResponse {
  id: string;
  address: string;
  type: StoreWebsiteType;
}
