import { NotificationType } from "./notification-response.interface";

export interface INotification {
  id: string;
  sender_id: number;
  receiver_id: number;
  message: string;
  notification_type: NotificationType;
  read: boolean;
  created_at: string;
  updated_at: string;
}
