import { IPost } from "api/services/posts/interfaces/post.interface";

import { SenderType } from "./ai-search.interface";

export interface IUserSessionResponse {
  id: string;
  user_role_id: string;
  created_at: string;
  updated_at: string;
}

export interface IPostMessageResponse {
  id: string;
  session_id: string;
  sender: SenderType; // user, system
  message: string;
  created_at: string;
  updated_at: string;
  feeds: IFeedsResponse | null;
}

export interface IMessagesResponse {
  items: IPostMessageResponse[] | [];
  limit: number;
  cursor: string;
}

export interface IFeedResponse {
  id: string;
  ai_search_message_id: string;
  post: IPost;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface IFeedsResponse {
  items: IFeedResponse[] | [];
  limit: number;
  cursor: string;
}

export interface IHistoricalSearchResponse {
  message: string;
  session_id: string;
  created_at: string;
}
