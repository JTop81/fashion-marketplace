import { IStoreFrontAnalytics } from "./storefront-analytics.interface";
import { IStoreFrontCategory } from "./storefront-category.interface";
import { IStorefrontWebsite } from "./storefront-website.interface";

export interface IStoreFrontInfoDetail {
  id: string;
  storeAddress: string;
  storeAvatar: string;
  storeDescription: string;
  storeName: string;
  storeWebsites: IStorefrontWebsite[];
  analytics: IStoreFrontAnalytics[];
  categories: IStoreFrontCategory[];
}
