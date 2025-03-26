import React from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { LuBellOff } from "react-icons/lu";
import { PiChecksBold } from "react-icons/pi";
import { INotification } from "api/services/notifications/interfaces/notification.interface";
import { clsx } from "clsx";
import GeneralPopover from "common/components/GeneralPopover";
import { formatDate } from "common/components/NotificationModal/constants";
import { AlertCircle, Check, Info } from "lucide-react";

interface NotificationItemProps {
  notificationItem: INotification;
  onMarkAsRead: () => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  onMarkAsRead,
  notificationItem,
}) => {
  const { created_at, message, notification_type, read } = notificationItem;

  const getTypeIcon = () => {
    switch (notification_type) {
      case "user_chat":
        return <Info className="h-5 w-5 text-primary" />;
      case "post_reply":
        return <Check className="h-5 w-5 text-status-success" />;
      case "comment_reply":
        return <AlertCircle className="h-5 w-5 text-status-warning" />;
      default:
        return <Info className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div
      className={clsx(
        "group px-6 py-4 hover:bg-background-secondary transition-all duration-200",
        !read && "bg-primary/5 hover:bg-primary/10",
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={clsx(
            "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
            !read
              ? "bg-primary/10"
              : "bg-background-secondary group-hover:bg-background-tertiary",
          )}
        >
          {getTypeIcon()}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                className={clsx(
                  "text-sm leading-relaxed",
                  !read
                    ? "text-text-primary font-medium"
                    : "text-text-secondary",
                )}
              >
                {message}
              </p>
              <p className="text-xs text-text-secondary mt-1.5">
                {formatDate(created_at)}
              </p>
            </div>

            <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={onMarkAsRead}
                className="px-3 py-1.5 text-xs font-medium text-primary bg-primary/5 hover:bg-primary/10 rounded-full transition-colors"
              >
                View Details
              </button>
              <GeneralPopover
                location="bottom end"
                customPopoverBotton={
                  <button className="p-1.5 hover:bg-background-tertiary rounded-full transition-all">
                    <HiEllipsisVertical
                      size={18}
                      className="text-text-secondary"
                    />
                  </button>
                }
                customMenuStyles="z-[100000] min-w-[180px] p-1.5 bg-white rounded-lg shadow-dropdown border border-border"
                menuItems={({ close }) => (
                  <>
                    <button
                      className="flex items-center w-full gap-2.5 px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary/5 rounded-md transition-all"
                      onClick={() => {
                        onMarkAsRead();
                        close && close();
                      }}
                    >
                      <PiChecksBold size={18} />
                      <span>Mark as read</span>
                    </button>
                    <button
                      className="flex items-center w-full gap-2.5 px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary/5 rounded-md transition-all"
                      onClick={close}
                    >
                      <LuBellOff size={18} />
                      <span>Turn off notifications</span>
                    </button>
                  </>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
