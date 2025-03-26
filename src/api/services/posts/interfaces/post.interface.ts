import {
  ICommentOut,
  ICustomRequestDetails,
  IDiscussionDetails,
  IExternalDetails,
  IPostAssetResponse,
  IPreferenceOption,
  IProductDetails,
  IReactionOut,
  ISaveOut,
  IUserRoleResponse,
  PostActivitiesType,
  PostStatus,
  PostType,
} from "./post-response.interface";
import { IStatistics } from "./post-statistics.interface";

// Define the IPostResponse interface
export interface IPost {
  id: string;
  type: PostType;
  creator_id: string;
  creator: IUserRoleResponse;
  status: PostStatus;
  details?:
    | IProductDetails
    | ICustomRequestDetails
    | IDiscussionDetails
    | IExternalDetails;
  assets: IPostAssetResponse[];
  statistics: IStatistics;
  preferences: IPreferenceOption[];
  created_at: string;
  updated_at: string;
}

export interface IPostActivities {
  id: string;
  target_id: string;
  post: IPost;
  target_type: PostActivitiesType;
  details: IReactionOut | ISaveOut | ICommentOut;
  creator: IUserRoleResponse;
  created_at: string;
  updated_at: string;
}

export interface IProductCreateData {
  id?: string;
  type: PostType.PRODUCT;
  title: string;
  description: string;
  price: number;
  discount: string | number;
}

export interface ICustomCreateData {
  type: PostType.CUSTOM_REQUEST;
  title: string;
  description: string;
  budget: number;
}

export interface IDiscussiongCreateDate {
  type: PostType.DISCUSSION;
  title: string;
  description: string;
}

export interface IExternalCreateData {
  id?: string;
  type: PostType.EXTERNAL;
  title: string;
  url: string;
  platform?: string;
  description: string;
  price: number;
  discount: string | number;
  availability?: boolean;
}

export interface SellerUserType {
  name: string;
  avatar?: string;
}
