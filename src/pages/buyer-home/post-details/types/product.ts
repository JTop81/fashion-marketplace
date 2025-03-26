import { Seller } from "./seller";

export type Product = {
  id: string;
  time?: number;
  title: string;
  seller: Seller;
  mainImage: string;
  images: Array<string>;
  price: string;
  status: string; // TODO: ENUM driven
  description: string;
  social: ProductSocialDetails;
};

export type ProductSocialDetails = {
  reactions: number;
  comments: number;
  newComments: number;
};
