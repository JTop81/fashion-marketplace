import {
  IBoutiqueDetails,
  IBrandDetails,
  IShopperDetails,
} from "api/services/posts/interfaces/post-response.interface";
import { Role } from "enums/role";

import { IAsset } from "../../assets/interfaces/asset.interface";

interface IRole {
  id: string;
  role_name: Role;
  created_at: string;
  updated_at: string;
}
interface IUserRole {
  id: string;
  user_id: string;
  role_id: string;
  assigned_date: string;
  status: string;
  updated_at: string;
  created_at: string;
  details: IShopperDetails | IBrandDetails | IBoutiqueDetails;
}

export interface IUser {
  username: string;
  phone: string;
  avatar_id?: string;
  id: string;
  email: string;
  auth0_user_id: string;
  assigned_role: IRole;
  user_role: IUserRole;
  status: string;
  last_login: string;
  created_at: string;
  updated_at: string;
  avatar: IAsset;
}

export interface IUserAttachOption {
  categories: string[];
  free_text: string;
}

export interface IUpdateUser {
  username: string;
  phone: string;
  avatar_id: string | null;
  status: string;
}
export interface IUserOptions {
  items: any;
  total_count: number;
  limit: number;
  cursor: string;
}
