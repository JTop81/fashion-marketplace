export interface IActivityBody {
  target_id: string;
  target_type: TargetActivityType;
  details:
    | IActivityDetails
    | IReactionActivityDetails
    | ICommentActivityDetails;
}

export enum ActivityType {
  REACTION = "reaction",
  SHARE = "share",
  SAVE = "save",
  COMMENT = "comment",
  ASSET = "asset",
}

export enum TargetActivityType {
  POST = "post",
  COMMENT = "comment",
  ASSET = "asset",
}

export interface IActivityDetails {
  type: ActivityType;
}
export interface IReactionActivityDetails extends IActivityDetails {
  reaction_type: string;
}

export interface ICommentActivityDetails extends IActivityDetails {
  content: string;
  parent_comment_id?: string;
  tagged_user_role_ids?: string;
}
