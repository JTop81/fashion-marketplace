import {
  FileType,
  IAsset,
} from "api/services/assets/interfaces/asset.interface";
import { ActivityType } from "api/services/post-activities/interfaces/activities-response.interface";
import { Role } from "enums/role";

import { IPost } from "./post.interface";
import { IPostStatisticsResponse } from "./post-statistics-response.interface";

// Define the IPostResponseWrapper interface
export interface IPostResponseWrapper {
  items: IPostResponse[];
  total_count: number;
  limit: number;
  cursor: string;
}
export interface IPostData {
  items: IPost[];
  total_count: number;
  limit: number;
  cursor: string;
}

export interface IPostActivitiesResponseWrapper {
  items: IPostActivitiesResponse[];
  total_count: number;
  limit: number;
  cursor: string;
}

// Define the IPostResponse interface
export interface IPostResponse {
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
  statistics: IPostStatisticsResponse;
  preferences: IPreferenceOption[];
  created_at: string;
  updated_at: string;
}

export interface IPostActivitiesResponse {
  id: string;
  creator_id: string;
  target_id: string;
  target_type: PostActivitiesType;
  type: ActivityType;
  created_at: string;
  updated_at: string;
  parent_comment: IParentComment;
  creator: IUserRoleResponse;
  details: IReactionOut | ISaveOut | ICommentOut;
  post: IPostResponse;
  statistics: IPostStatisticsResponse;
}

export interface IParentComment {
  type: PostActivitiesType.COMMENT;
  id: string;
  activity_id: string;
  content: string;
  tagged_user_role_ids: any;
  created_at: string;
  updated_at: string;
}
export interface IReactionOut {
  id: string;
  activity_id: string;
  reaction_type: string; // "like"
  type: PostActivitiesType.REACTION;
  created_at: string;
  updated_at: string;
}
export interface ISaveOut {
  id: string;
  activity_id: string;
  type: PostActivitiesType.SAVE;
  created_at: string;
  updated_at: string;
}

export interface ICommentReplyOut {
  id: string;
  activity_id: string;
  content: string;
  tagged_user_role_ids: any;
  creator: IUserRoleResponse;
  created_at: string;
  updated_at: string;
  statistics: IPostStatisticsResponse;
}

export interface ICommentOut {
  id: string;
  type: PostActivitiesType.COMMENT;
  activity_id: string;
  content: string;
  parent_comment_id: string;
  parent_comment: IParentComment;
  tagged_user_role_ids: any;
  replies: ICommentReplyOut[];
  created_at: string;
  updated_at: string;
}
// Define the IProductDetails interface
export interface IProductDetails {
  parent_comment_id: any;
  content: string;
  id: string;
  post_id: string;
  title: string;
  description: string;
  price: number;
  discount?: number | null;
  replies: ICommentReplyOut[];
  created_at?: string;
  updated_at?: string;
}

// Define the ICustomRequestDetails interface
export interface ICustomRequestDetails {
  id: string;
  post_id: string;
  title: string;
  description: string;
  price: number;
}

// Define the IDiscussionDetails interface
export interface IDiscussionDetails {
  id: string;
  post_id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface IExternalDetails {
  id: string;
  post_id: string;
  title: string;
  url: string;
  platform: PlatformType;
  description: string;
  price: number;
  availability: boolean;
  external_product_id: string;
  external_variant_id: string;
  inventory_item_id: string;
  replies: ICommentReplyOut[];
  discount: string;
  created_at: string;
  updated_at: string;
}

// Define the IPostAsset interface
export interface IPostAssetResponse {
  id: string;
  related_id: string;
  asset_type: AssetType;
  file_type: FileType;
  url: string;
  created_at?: string;
  updated_at?: string;
}

// Define the IUserRoleResponse interface
export interface IUserRoleResponse {
  id: string;
  user_id: string;
  role_id: string;
  role: IRoleResponse;
  assigned_date: string;
  status: RoleStatus;
  updated_at: string;
  created_at: string;
  details: IShopperDetails | IBoutiqueDetails | IBrandDetails | null;
  user: IUserResponse;
}

// Define the IUserResponse interface
export interface IUserResponse {
  id: string;
  username: string;
  phone?: string;
  avatar?: IAsset;
  email: string;
  auth0_user_id: string;
  status: UserStatus;
  last_login?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  assigned_role?: IRoleResponse | null;
  user_role?: IUserRoleResponse | null;
}

export interface IPreferenceOption {
  id: string;
  option_value: string;
  preference_id: string;
  requires_more_context: boolean;
}

// Define the IRoleResponse interface
export interface IRoleResponse {
  id: string;
  name: Role;
}

// Define enums for PostType, PostStatus, AssetType, RoleStatus, and UserStatus
export enum PostType {
  PRODUCT = "product",
  CUSTOM_REQUEST = "custom_request",
  DISCUSSION = "discussion",
  REFERRAL = "referral",
  EXTERNAL = "external",
}

export enum PostActivitiesType {
  REACTION = "reaction",
  SAVE = "save",
  COMMENT = "comment",
}

export enum PlatformType {
  SHOPIFY = "shopify",
  ETSY = "etsy",
}

export enum PostStatus {
  DRAFTED = "drafted",
  LIVE = "live",
  UNAVAILABLE = "unavailable",
  ARCHIVED = "archived",
}

export enum AssetType {
  MP4 = "mp4",
  JPEG = "jpeg",
  PNG = "png",
}

export enum RoleStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  APPROVED = "APPROVED",
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

// Define interfaces for details in UserRoleResponse
export interface IShopperDetails {
  id: string;
  user_role_id: string;
  geo_location_enabled: boolean;
  notifications_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface IRequest {
  type: PostType;
  title: string;
  description: string;
}

export interface IProductBody extends IRequest {
  price: number;
  discount?: number | null;
}

export type IPostBody = IProductBody;

export interface IBoutiqueDetails {
  id: string;
  user_role_id: string;
  name: string;
  address1: string;
  address2?: string | null;
  city: string;
  state: string;
  websites: string[];
  country: string;
  zipcode: string;
  bio?: string | null;
  created_at: string;
  updated_at: string;
}

export interface IBrandDetails {
  id: string;
  user_role_id: string;
  name: string;
  address1: string;
  address2?: string | null;
  city: string;
  state: string;
  websites: [];
  country: string;
  zipcode: string;
  bio?: string | null;
  created_at: string;
  updated_at: string;
}

export interface IInfluenceDetails {
  id: string;
  urser_role_id: string;
  websties: [];
  bio: string;
}
