import React, { useState } from "react";
import { NotificationType } from "api/services/notifications/interfaces/notification-response.interface";
import {
  MenuItems,
  MenuItemsType,
} from "common/components/NotificationModal/constants";
import { Bell, MessageSquare, Settings, Shield } from "lucide-react";

import { NotificationsList } from "../features/notifications/components/NotificationsList";
import { useNotifications } from "../features/notifications/hooks/useNotifications";

const TABS = [
  { icon: Bell, label: MenuItems.ALL, value: null },
  {
    icon: MessageSquare,
    label: MenuItems.CHATS,
    value: NotificationType.USER_CHAT,
  },
  {
    icon: Settings,
    label: MenuItems.POSTS,
    value: NotificationType.POST_REPLY,
  },
  {
    icon: Shield,
    label: MenuItems.COMMENTS,
    value: NotificationType.COMMENT_REPLY,
  },
] as const;

export const NotificationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MenuItemsType>({
    label: MenuItems.ALL,
    value: null,
  });

  const {
    notifications,
    isLoading,
    isFetching,
    hasMore,
    loadMore,
    handleMarkAllAsRead,
    handleMarkAsRead,
  } = useNotifications(activeTab.value);

  return (
    <div className="max-w-6xl mx-auto py-8 px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">
            Notifications
          </h1>
          <p className="text-text-secondary text-base mt-2">
            Stay updated with your groups and account activity
          </p>
        </div>
        <button
          onClick={handleMarkAllAsRead}
          className="px-6 py-2.5 text-sm font-medium text-text-secondary border border-border hover:border-primary hover:text-primary rounded-lg transition-all duration-200"
        >
          Mark all as read
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-background-secondary backdrop-blur-sm rounded-t-2xl border border-border">
        <div className="flex items-center space-x-8 px-6">
          {TABS.map(({ icon: Icon, label, value }) => (
            <button
              key={label}
              onClick={() => setActiveTab({ label, value })}
              className={`flex items-center gap-2 px-2 py-5 text-sm font-medium border-b-2 transition-all relative ${
                activeTab.value === value
                  ? "border-primary text-primary"
                  : "border-transparent text-text-secondary hover:text-text-primary"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
              {activeTab.value === value && (
                <span className="absolute -bottom-px left-0 w-full h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <NotificationsList
        notifications={notifications}
        isLoading={isLoading}
        isFetching={isFetching}
        hasMore={hasMore}
        onMarkAsRead={handleMarkAsRead}
        onLoadMore={loadMore}
      />
    </div>
  );
};
