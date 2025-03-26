import {
  Bag,
  Document,
  Graph,
  Home,
  Message,
  Notification,
  Plus,
  Setting,
  User,
  Wallet,
} from "react-iconly";
import { BsShop, BsStarFill } from "react-icons/bs";
import { FiCompass, FiRefreshCw, FiUsers } from "react-icons/fi";
import { Role } from "enums/role";

import { IconWithCounter } from "./IconWithCounter";

export interface LinkItem {
  path: string;
  icon: React.ReactNode;
  title: string;
  nestedItems?: Array<{
    path: string;
    title: string;
    icon?: React.ReactNode;
    isModal?: boolean;
  }>;
}

// Dynamic link generator for seller links
const generateSellerLinks = (id: string): LinkItem[] => [
  {
    path: `/boutique/dashboard`,
    icon: <Graph />,
    title: "Dashboard",
  },
  {
    path: `/store-front/${id}`,
    icon: <BsShop className="w-[24px] h-[24px]" />,
    title: "My Store",
  },
  {
    path: `/boutique/posts`,
    icon: <IconWithCounter icon={<Document />} count={10} />,
    title: "My Posts",
  },
  {
    path: `/boutique/orders`,
    icon: <IconWithCounter icon={<Bag />} count={10} />,
    title: "Orders",
  },
  {
    path: `/notifications`,
    icon: <IconWithCounter icon={<Notification />} count={10} />,
    title: "Notifications",
  },
  {
    path: `/boutique/chat`,
    icon: <IconWithCounter icon={<Message />} count={10} />,
    title: "Chats",
  },
  {
    path: `/settings`,
    icon: <Setting />,
    title: "Settings",
    nestedItems: [
      {
        path: "/settings#profile",
        title: "Profile",
        icon: <User />,
      },
      {
        path: "/settings#following",
        title: "Following",
        icon: <FiUsers />,
      },
      {
        path: "/settings#orders",
        title: "My Orders",
        icon: <Bag />,
      },
      {
        path: "/settings#returns",
        title: "Returns/refunds",
        icon: <FiRefreshCw />,
      },
      {
        path: "/settings#reviews",
        title: "My Reviews",
        icon: <BsStarFill className="w-[24px] h-[24px]" />,
      },
    ],
  },
];

const buyerLinks: LinkItem[] = [
  {
    path: "/shopper/feeds",
    icon: <Home />,
    title: "Home",
    nestedItems: [
      {
        path: "/shopper/feeds",
        title: "Feeds",
        icon: <FiCompass />,
      },
      {
        path: "#",
        title: "Create Post",
        icon: <Plus />,
        isModal: true,
      },
    ],
  },
  {
    path: "/shopper/wallet/transactions",
    icon: <Wallet size={24} stroke="light" />,
    title: "My Orders",
  },
  {
    path: "/notifications",
    icon: <IconWithCounter icon={<Notification />} count={10} />,
    title: "Notifications",
  },
  {
    path: "/shopper/chat",
    icon: <IconWithCounter icon={<Message />} count={10} />,
    title: "Chats",
  },
  {
    path: `/settings`,
    icon: <Setting />,
    title: "Settings",
    nestedItems: [
      {
        path: "/settings#profile",
        title: "Profile",
        icon: <User />,
      },
      {
        path: "/settings#following",
        title: "Following",
        icon: <FiUsers />,
      },
      {
        path: "/settings#orders",
        title: "My Orders",
        icon: <Bag />,
      },
      {
        path: "/settings#returns",
        title: "Returns/refunds",
        icon: <FiRefreshCw />,
      },
      {
        path: "/settings#reviews",
        title: "My Reviews",
        icon: <BsStarFill className="w-[24px] h-[24px]" />,
      },
    ],
  },
];

const publicLinks = [
  {
    path: "/shopper/feeds",
    icon: <FiCompass className="w-[24px] h-[24px]" />,
    title: "Explore",
  },
];

export const roleBasedLinks = (role: Role, id: string) => {
  switch (role) {
    case "BOUTIQUE":
    case "BRAND":
    case "INFLUENCER":
    case "DESIGNER":
    case "ADMIN":
      return generateSellerLinks(id);
    case "SHOPPER":
      return buyerLinks;
    default:
      return publicLinks;
  }
};
