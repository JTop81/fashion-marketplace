import { IUserRoleOut } from "pages/seller-home/store-front/types";

export interface IBuyerFollowerResponse {
  items: IBuyerFollower[];
  limit: number;
  cursor: string;
}

export interface IBuyerFollower {
  id: string;
  follower_id: string;
  followed_id: string;
  created_at: string;
  updated_at: string;
  follower: IUserRoleOut;
  followed: IUserRoleOut;
}
