import ChatPopUpContainer from "common/components/Chat/ChatPopupContainer";
import { Role } from "enums/role";
import { useFlags } from "launchdarkly-react-client-sdk";
import { useSellerProfileInfoStore } from "setup/store/profile/seller/seller";

import { AvailibleFunds } from "./components/AvailibleFunds";
import Earnings from "./components/Earnings";
import SellerProfileHeader, { HeaderTabType } from "./components/ProfileHeader";
import { SellerSettings } from "./components/Settings";

const Profile = () => {
  const { enabledChats } = useFlags();
  const { tab } = useSellerProfileInfoStore();

  return (
    <div className="w-full h-screen">
      <div className="flex flex-col items-start gap-6 px-4 md:px-[32px] py-[24px]">
        <div className="w-full flex flex-row justify-between">
          <p className="text-[24px] text-black font-semibold leading-[36px]">
            My Profile
          </p>
        </div>
        <SellerProfileHeader />
        <div className="w-full">
          {tab === HeaderTabType.settings && <SellerSettings />}
          {tab === HeaderTabType.earnings && <Earnings />}
          {tab === HeaderTabType.availableFunds && <AvailibleFunds />}
        </div>
      </div>
      {enabledChats && <ChatPopUpContainer role={Role.BOUTIQUE} />}
    </div>
  );
};

export default Profile;
