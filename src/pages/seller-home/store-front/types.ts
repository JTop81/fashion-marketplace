import {
  IBoutiqueDetails,
  IBrandDetails,
  IInfluenceDetails,
  IShopperDetails,
} from "api/services/posts/interfaces/post-response.interface";
import { IUser } from "api/services/users/interfaces/user.interface";
import { Role } from "enums/role";

export interface Category {
  id: string;
  imgUrl: string;
  option_value: string;
  preference_id: string;
}

export type StoreWebsiteType = "website" | "link";

interface RoleOut {
  id: string;
  role_name: Role;
  created_at: string;
  updated_at: string;
}

export interface IUserRoleOut {
  id: any;
  user_id: string;
  role_id: string;
  role: RoleOut;
  details:
    | IBrandDetails
    | IBoutiqueDetails
    | IShopperDetails
    | IInfluenceDetails;
  assigned_date: string;
  status: string;
  updated_at: string;
  created_at: string;
  user: IUser;
}

export interface StoreFrontPostsOption {
  title: string;
  value: string;
}

export interface StoreFrontInfoForm {
  storeName: string;
  storeDescription: string;
  storeAddress: string;
  selectedCategories: Category[];
  storeWebsites: string[];
}
