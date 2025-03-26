import React, { useState } from "react";
import ProfileCategories from "common/components/ProfileCategories";
import TabSelection, { TabOption } from "common/components/TabSelection";

import AccountSettings from "./AccountSettings";
import ShopperInfo from "./ShopperInfo";

const tabOptions: TabOption[] = [
  { title: "Shopper's Info", value: "0" },
  { title: "Preferences", value: "1" },
  { title: "Account Settings", value: "2" },
];

function BuyerSettings() {
  const [selectedTab, setSelectedTab] = useState<TabOption>(tabOptions[0]);

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <p className="text-[20px] text-black font-semibold leading-[30px] mb-6">
        Profile
      </p>
      <div className="flex flex-col w-full gap-6">
        <TabSelection
          options={tabOptions}
          selected={selectedTab}
          onSelect={setSelectedTab}
          className="overflow-auto"
        />
        <div className="w-full rounded-lg p-6">
          {selectedTab.value === "0" && <ShopperInfo />}
          {selectedTab.value === "1" && <ProfileCategories />}
          {selectedTab.value === "2" && <AccountSettings />}
        </div>
      </div>
    </div>
  );
}

export default BuyerSettings;
