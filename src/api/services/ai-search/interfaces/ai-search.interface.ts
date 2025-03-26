import { IPost } from "api/services/posts/interfaces/post.interface";

export interface PostMessageData {
  session_id: string;
  sender: SenderType.USER; // user
  message: string;
}

export interface IPostMessage {
  id: string;
  session_id: string;
  sender: SenderType; // user, system
  message: string;
  created_at: string;
  updated_at: string;
  feeds: IFeeds | null;
}

export interface IFeeds {
  items: IFeed[] | [];
  limit: number;
  cursor: string;
}

export interface IFeed {
  id: string;
  message_id: string;
  post: IPost;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface IMessages {
  items: IPostMessage[];
  limit: number;
  cursor: string;
}

export enum SenderType {
  USER = "user",
  SYSTEM = "system",
}
