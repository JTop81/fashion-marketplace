import { CiBookmarkMinus } from "react-icons/ci";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { LiaReplySolid } from "react-icons/lia";
import { PiChatCircleDotsLight } from "react-icons/pi";
import { INotification } from "api/services/notifications/interfaces/notification.interface";
import { NotificationType } from "api/services/notifications/interfaces/notification-response.interface";

export enum MenuItems {
  ALL = "All",
  CHATS = "Chats",
  POSTS = "Posts",
  COMMENTS = "Comments",
  TAGS = "Tags",
}

export type MenuItemsType = {
  label: MenuItems;
  value: NotificationType | null;
};

export const menu: MenuItemsType[] = [
  {
    label: MenuItems.ALL,
    value: null,
  },
  {
    label: MenuItems.CHATS,
    value: NotificationType.USER_CHAT,
  },
  {
    label: MenuItems.POSTS,
    value: NotificationType.POST_REPLY,
  },
  {
    label: MenuItems.COMMENTS,
    value: NotificationType.COMMENT_REPLY,
  },
  {
    label: MenuItems.TAGS,
    value: NotificationType.USER_TAG,
  },
];

export const getNotificationIcon = (notificationType: NotificationType) => {
  switch (notificationType) {
    case NotificationType.USER_CHAT:
      return <HiOutlineEnvelope size={24} />;
    case NotificationType.POST_REPLY:
      return <LiaReplySolid size={24} />;
    case NotificationType.COMMENT_REPLY:
      return <PiChatCircleDotsLight size={24} />;
    case NotificationType.USER_TAG:
      return <CiBookmarkMinus size={24} />;

    default:
      break;
  }
};

export const formatDate = (dateIso: string) => {
  const date = new Date(dateIso);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  return `${day} ${month} ${year} - ${hours}:${minutes}`;
};

const formatNotificationObjectDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export interface ITransformedNotifications {
  [date: string]: INotification[];
}

export const transformNotifications = (
  notifications: INotification[],
): ITransformedNotifications => {
  const today = formatNotificationObjectDate(new Date().toISOString());

  const message: { [key: string]: INotification[] } = {};
  const dateKeys = new Set<string>();

  notifications.forEach((notification) => {
    const notificationDate = formatNotificationObjectDate(
      notification.created_at,
    );

    if (!message[notificationDate]) {
      message[notificationDate] = [];
    }

    message[notificationDate].push(notification);
    dateKeys.add(notificationDate);
  });

  if (message[today]) {
    message[""] = message[today];
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete message[today];
  }

  const sortedDates = Array.from(dateKeys).sort((a, b) => {
    const [dayA, monthA, yearA] = a.split(" ").map(Number);
    const [dayB, monthB, yearB] = b.split(" ").map(Number);
    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);
    return dateB.getTime() - dateA.getTime();
  });

  const sortedMessages: { [key: string]: INotification[] } = {};
  sortedDates.forEach((date) => {
    sortedMessages[date] = message[date];
  });

  return sortedMessages;
};
