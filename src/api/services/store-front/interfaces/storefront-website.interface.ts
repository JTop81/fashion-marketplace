import { StoreWebsiteType } from "pages/seller-home/store-front/types";

export interface IStorefrontWebsite {
  id: string;
  address: string;
  type: StoreWebsiteType;
}
