import { useEffect, useState } from "react";
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";
import {
  getNotifications,
  markNotificationAsRead,
} from "api/services/notifications";
import { INotification } from "api/services/notifications/interfaces/notification.interface";
import { NotificationType } from "api/services/notifications/interfaces/notification-response.interface";

import { transformNotifications } from "../utils/helpers";
import { ITransformedNotifications } from "../utils/types";

const ITEMS_PER_PAGE = 5;

export const useNotifications = (
  activeType: NotificationType | null = null,
) => {
  const [allMessages, setAllMessages] =
    useState<ITransformedNotifications | null>(null);
  const [paginatedData, setPaginatedData] =
    useState<ITransformedNotifications | null>(null);

  const { data, isLoading, isSuccess, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery<
      INotification[],
      Error,
      InfiniteData<INotification[]>,
      [string, { type: NotificationType | null }],
      number
    >({
      queryKey: ["notifications", { type: activeType }],
      queryFn: async ({ pageParam }) => {
        const response = await getNotifications();
        // Simulate pagination since the API doesn't support it yet
        const start = (pageParam - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        return response.slice(start, end);
      },
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < ITEMS_PER_PAGE) return undefined;
        return allPages.length + 1;
      },
      initialPageParam: 1,
    });

  const { mutate: markAsRead } = useMutation({
    mutationKey: ["markNotificationAsRead"],
    mutationFn: (id: string) => markNotificationAsRead(id),
  });

  const handleMarkAllAsRead = () => {
    if (!allMessages) return;

    const updatedNotifications = Object.fromEntries(
      Object.entries(allMessages).map(([date, notifications]) => [
        date,
        notifications.map((notification) => ({
          ...notification,
          read: true,
        })),
      ]),
    );

    setAllMessages(updatedNotifications);
  };

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
    if (!allMessages) return;

    const updatedNotification = Object.fromEntries(
      Object.entries(allMessages).map(([date, notifications]) => [
        date,
        notifications.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification,
        ),
      ]),
    );
    setAllMessages(updatedNotification);
  };

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (data?.pages && isSuccess) {
      // Combine all pages
      const allNotifications = data.pages.flat();
      const transformed = transformNotifications(allNotifications);
      setAllMessages(transformed);

      // Filter by type if needed
      if (activeType) {
        const filtered = Object.fromEntries(
          Object.entries(transformed)
            .map(([date, notifications]) => [
              date,
              notifications.filter(
                (notification) => notification.notification_type === activeType,
              ),
            ])
            .filter(([_, notifications]) => notifications.length > 0),
        );
        setPaginatedData(filtered);
      } else {
        setPaginatedData(transformed);
      }
    }
  }, [data?.pages, isSuccess, activeType]);

  return {
    notifications: paginatedData,
    isLoading,
    isFetching,
    hasMore: hasNextPage,
    loadMore,
    handleMarkAllAsRead,
    handleMarkAsRead,
  };
};
