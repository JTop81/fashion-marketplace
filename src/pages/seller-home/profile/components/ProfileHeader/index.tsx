import { useEffect } from "react";
import { FiUser } from "react-icons/fi";
import TabSelection, { TabOption } from "common/components/TabSelection";
import { useAuthStore } from "setup/store/auth/authStore";
import { useSellerProfileInfoStore } from "setup/store/profile/seller/seller";

export enum HeaderTabType {
  settings = "settings",
  earnings = "earnings",
  availableFunds = "availableFunds",
}

const tabOptions: TabOption[] = [
  { title: "Settings", value: HeaderTabType.settings },
  { title: "Earnings", value: HeaderTabType.earnings },
  { title: "Available Funds", value: HeaderTabType.availableFunds },
];

const SellerProfileHeader = () => {
  const { brandInfo, sellerInfo, tab, setTab } = useSellerProfileInfoStore();
  const { user } = useAuthStore();
  const initialProfileInfoFromAuth = useSellerProfileInfoStore(
    (state) => state.initialProfileInfoFromAuth,
  );

  useEffect(() => {
    if (user) {
      initialProfileInfoFromAuth(user);
    }
  }, [user, initialProfileInfoFromAuth]);

  const selectedTab =
    tabOptions.find((option) => option.value === tab) || tabOptions[0];

  return (
    <div className="w-full flex flex-col md:flex-row justify-between bg-gray rounded-[4px] gap-6 px-[24px] py-[20px]">
      <div className="flex flex-col gap-[38px]">
        <div className="flex flex-row gap-[16px]">
          {brandInfo.brandLogo ? (
            <img
              className="w-[56px] h-[56px] flex-shrink-0 rounded-[156px] bg-lightGray/50 bg-cover bg-no-repeat"
              src={brandInfo.brandLogo}
            />
          ) : (
            <div className="relative flex justify-center h-[72px] w-[72px] items-center bg-[#FF9085] rounded-full">
              <FiUser
                className="w-[24px] h-[24px] flex-shrink-0"
                color="#CC736A"
              />
            </div>
          )}

          <div className="flex flex-col gap-[6px]">
            <p>{brandInfo.name || sellerInfo.username}</p>
            <div className="flex flex-row gap-1">
              <p>
                {brandInfo.city}, {brandInfo.country}
              </p>
            </div>
          </div>
        </div>
        <TabSelection
          options={tabOptions}
          selected={selectedTab}
          onSelect={(option) => setTab(option.value as HeaderTabType)}
          className="overflow-auto"
        />
      </div>
    </div>
  );
};

export default SellerProfileHeader;
