import { getAxiosInstance } from "api/axios";
import { NOTIFICATIONS_URL } from "api/constants/endpoints.constants";

import { notificationAdapter } from "./adapters/notification.adapter";
import { INotification } from "./interfaces/notification.interface";
import { INotificationResponseWrapper } from "./interfaces/notification-response.interface";

export const getNotifications = async (): Promise<INotification[]> => {
  const api = await getAxiosInstance();
  const response =
    await api.get<INotificationResponseWrapper>(NOTIFICATIONS_URL);
  return response.data.items.map(notificationAdapter);
};

export const markNotificationAsRead = async (
  notificationId: string,
): Promise<INotification[]> => {
  const api = await getAxiosInstance();
  const response = await api.put<INotificationResponseWrapper>(
    `${NOTIFICATIONS_URL}/${notificationId}/read`,
  );
  return response.data.items.map(notificationAdapter);
};
