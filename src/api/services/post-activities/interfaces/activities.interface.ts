import { IPostResponse } from "api/services/posts/interfaces/post-response.interface";

import { ActivityType } from "./activities-response.interface";

export interface IActivityId {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface IActivity extends IActivityId {
  creator_id: string;
  post_id: string;
  type: ActivityType;
  post: IPostResponse;
  details: IActivityDetails;
}

export interface IActivityDetails extends IActivityId {
  activity_id: string;
  reaction_type: string;
}
