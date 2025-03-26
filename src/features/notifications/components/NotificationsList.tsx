import React from "react";
import Loading from "common/components/Loader";
import { ITransformedNotifications } from "common/components/NotificationModal/constants";
import { Bell } from "lucide-react";

import { NotificationItem } from "./NotificationItem";

interface NotificationsListProps {
  notifications: ITransformedNotifications | null;
  isLoading: boolean;
  isFetching: boolean;
  hasMore: boolean;
  onMarkAsRead: (id: string) => void;
  onLoadMore: () => void;
}

export const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  isLoading,
  isFetching,
  hasMore,
  onMarkAsRead,
  onLoadMore,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loading height="auto" />
      </div>
    );
  }

  if (!notifications || Object.keys(notifications).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-background-secondary flex items-center justify-center">
          <Bell className="h-8 w-8 text-text-secondary" />
        </div>
        <p className="text-text-primary text-lg font-medium">
          No notifications
        </p>
        <p className="text-text-secondary text-sm mt-2">
          You&apos;re all caught up!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border-x border-b border-border rounded-b-2xl divide-y divide-border">
      {Object.entries(notifications).map(([date, items]) => (
        <div key={date} className="first:rounded-t-2xl last:rounded-b-2xl">
          {date && (
            <div className="flex items-center gap-3 px-6 py-4 bg-background-secondary/50">
              <div className="h-px flex-grow bg-border" />
              <div className="text-xs font-medium text-text-secondary whitespace-nowrap px-3">
                {date}
              </div>
              <div className="h-px flex-grow bg-border" />
            </div>
          )}
          <div>
            {items.map((item) => (
              <NotificationItem
                key={item.id}
                notificationItem={item}
                onMarkAsRead={() => onMarkAsRead(item.id)}
              />
            ))}
          </div>
        </div>
      ))}

      {hasMore && (
        <div className="p-4 text-center">
          <button
            onClick={onLoadMore}
            disabled={isFetching}
            className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
          >
            {isFetching ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};
