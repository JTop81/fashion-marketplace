import { INotification } from "../interfaces/notification.interface";
import { INotificationResponse } from "../interfaces/notification-response.interface";

export const notificationAdapter = (
  notificationResponse: INotificationResponse,
): INotification => {
  return notificationResponse;
};
