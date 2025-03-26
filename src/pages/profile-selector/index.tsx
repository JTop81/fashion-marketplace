import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Role } from "enums/role";
import { useAuthStore } from "setup/store/auth/authStore";
import { useBuyerProfileInfoStore } from "setup/store/profile/buyer/shopper";

import { BuyerProfile } from "pages/buyer-home/components";
import { HeaderTabType } from "pages/buyer-home/profile/components/ProfileHeader/types";
import { SellerProfile } from "pages/seller-home";

const SettingSelector: React.FC = () => {
  const { user } = useAuthStore();
  const location = useLocation();
  const { setTab } = useBuyerProfileInfoStore();

  // Extract the assigned role
  const role = user?.assigned_role?.role_name || Role.UNASSIGNED;

  useEffect(() => {
    const hash = location.hash.replace("#", "").toLowerCase();
    switch (hash) {
      case "profile":
        setTab(HeaderTabType.settings);
        break;
      case "following":
        setTab(HeaderTabType.following);
        break;
      case "orders":
        setTab(HeaderTabType.orders);
        break;
      case "returns":
        setTab(HeaderTabType.returns);
        break;
      case "reviews":
        setTab(HeaderTabType.review);
        break;
      default:
        setTab(HeaderTabType.settings);
    }
  }, [location.hash, setTab]);

  const roleToComponentMap: Partial<Record<Role, JSX.Element>> = {
    [Role.SHOPPER]: <BuyerProfile />,
    [Role.PUBLIC]: <BuyerProfile />,
    [Role.BOUTIQUE]: <SellerProfile />,
    [Role.BRAND]: <SellerProfile />,
    [Role.INFLUENCER]: <SellerProfile />,
    [Role.DESIGNER]: <SellerProfile />,
    [Role.ADMIN]: (
      <>
        <SellerProfile />
        <BuyerProfile />
      </>
    ),
  };

  // Render the appropriate component based on the user's role or a fallback
  return (
    roleToComponentMap[role] || <div>No profile available for this role.</div>
  );
};

export default SettingSelector;
