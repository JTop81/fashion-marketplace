import {
  IBoutiqueDetails,
  IBrandDetails,
} from "api/services/posts/interfaces/post-response.interface";
import { IUser } from "api/services/users/interfaces/user.interface";
import { IRoleResponse } from "api/services/users/interfaces/user-response.interface";
export interface IStoreFrontInfoDetailItem {
  id: string;
  user_id: string;
  role_id: string;
  role: IRoleResponse;
  assigned_date: string;
  status: string;
  details: IBoutiqueDetails | IBrandDetails;
  updated_at: string;
  created_at: string;
  user: IUser;
}
export interface IStoreFrontInfoDetailResponse {
  cursor: string;
  items: IStoreFrontInfoDetailItem[];
  limit: number;
  total_count: number;
}
