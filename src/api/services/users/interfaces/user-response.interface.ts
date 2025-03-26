import {
  AssetType,
  FileType,
} from "api/services/assets/interfaces/asset.interface";
import {
  IBoutiqueDetails,
  IBrandDetails,
  IShopperDetails,
} from "api/services/posts/interfaces/post-response.interface";
import { Role } from "enums/role";

import { IAssetResponse } from "../../assets/interfaces/asset-response.interface";

export interface IRoleResponse {
  id: string;
  role_name: Role;
  created_at: string;
  updated_at: string;
}

export interface IRolesResponse {
  items: IRoleResponse[];
  total_count: number;
  limit: number;
  cursor: any;
}
interface IUserRoleResponse {
  id: string;
  user_id: string;
  role_id: string;
  assigned_date: string;
  status: string;
  updated_at: string;
  created_at: string;
  details: IShopperDetails | IBrandDetails | IBoutiqueDetails;
}

export interface IUserResponse {
  username: string;
  phone: string;
  avatar_id?: string;
  id: string;
  email: string;
  auth0_user_id: string;
  assigned_role: IRoleResponse;
  user_role: IUserRoleResponse;
  status: string;
  last_login: string;
  created_at: string;
  updated_at: string;
  avatar: IAssetResponse;
}

interface IPresignedUrlFields {
  "Content-Type": string;
  key: string;
  AWSAccessKeyId: string;
  policy: string;
  signature: string;
}
export interface IPresignedUrlResponse {
  url: string;
  fields: IPresignedUrlFields;
}

export interface IRecordAssetResponse {
  id: string;
  related_id: string;
  asset_type: AssetType;
  file_type: FileType;
  url: string;
  created_at: string;
  updated_at: string;
}
