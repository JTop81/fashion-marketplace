import React from "react";
import { Role } from "enums/role";
import { useAuthStore } from "setup/store/auth/authStore";

import BuyerFeeds from "../buyer-home/feeds";
import PublicFeeds from "../public-home";
import SellerFeeds from "../seller-home/posts";

const HomeSelector: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();

  // Extract the assigned role
  const role = user?.assigned_role?.role_name || Role.UNASSIGNED;

  // Check the token is exist
  if (!isAuthenticated) {
    return <PublicFeeds />;
  }

  // Render appropriate home component based on role
  switch (role) {
    case Role.SHOPPER:
      return <BuyerFeeds />;
    case Role.BOUTIQUE:
    case Role.BRAND:
    case Role.INFLUENCER:
    case Role.DESIGNER:
    case Role.ADMIN:
      return <SellerFeeds />;
    case Role.PUBLIC:
    case Role.UNASSIGNED:
    default:
      return <PublicFeeds />;
  }
};

export default HomeSelector;
