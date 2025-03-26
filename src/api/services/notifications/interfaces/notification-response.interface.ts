export interface INotificationResponse {
  id: string;
  sender_id: number;
  receiver_id: number;
  message: string;
  notification_type: NotificationType;
  read: boolean;
  created_at: string;
  updated_at: string;
}

// Define the INotificationResponseWrapper interface
export interface INotificationResponseWrapper {
  items: INotificationResponse[];
  total_count: number;
  limit: number;
  cursor: string;
}

export enum NotificationType {
  USER_CHAT = "user_chat",
  POST_REPLY = "post_reply",
  COMMENT_REPLY = "comment_reply",
  USER_TAG = "user_tag",
}
