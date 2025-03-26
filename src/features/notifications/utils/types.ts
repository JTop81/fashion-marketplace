import { INotification } from "api/services/notifications/interfaces/notification.interface";

export interface ITransformedNotifications {
  [date: string]: INotification[];
}

export interface NotificationGroup {
  date: string;
  notifications: INotification[];
}
