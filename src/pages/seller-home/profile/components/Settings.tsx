import { useState } from "react";
import ProfileCategories from "common/components/ProfileCategories";
import TabSelection, { TabOption } from "common/components/TabSelection";

import AccountSettings from "./AccountSettings/AccountSettings";
import SellerInfo from "./SellerInfo";

const tabOptions: TabOption[] = [
  { title: "Seller's Info", value: "0" },
  { title: "Seller's Categories", value: "1" },
  { title: "Account Settings", value: "2" },
];

export const SellerSettings = () => {
  const [selectedTab, setSelectedTab] = useState<TabOption>(tabOptions[0]);

  return (
    <div className="w-full max-w-full">
      <p className="text-[20px] text-black font-semibold leading-[30px] mt-[16px] mb-[24px]">
        Settings
      </p>
      <div className="flex flex-col gap-[24px]">
        <TabSelection
          options={tabOptions}
          selected={selectedTab}
          onSelect={setSelectedTab}
          className="overflow-auto"
        />
        {selectedTab.value === "0" && <SellerInfo />}
        {selectedTab.value === "1" && <ProfileCategories />}
        {selectedTab.value === "2" && <AccountSettings />}
      </div>
    </div>
  );
};
