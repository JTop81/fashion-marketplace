import ChatPopUpContainer from "common/components/Chat/ChatPopupContainer";
import { Role } from "enums/role";
import { useFlags } from "launchdarkly-react-client-sdk";
import { useBuyerProfileInfoStore } from "setup/store/profile/buyer/shopper";

import FollowingSellers from "./components/FollowingSellers";
import BuyerProfileHeader from "./components/ProfileHeader";
import { HeaderTabType } from "./components/ProfileHeader/types";
import BuyerSettings from "./components/Settings";

const Profile = () => {
  const { enabledChats } = useFlags();
  const { tab } = useBuyerProfileInfoStore();

  return (
    <div className="w-full h-screen">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col items-start">
          <div className="w-full flex flex-col md:flex-row gap-6 px-4 md:px-8 py-6">
            <BuyerProfileHeader />
          </div>
          <div className="w-full">
            <div className="w-full bg-gray">
              <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
                {tab === HeaderTabType.settings && <BuyerSettings />}
                {tab === HeaderTabType.following && <FollowingSellers />}
                {tab === HeaderTabType.review && <p>My Review</p>}
                {tab === HeaderTabType.orders && <p>Orders</p>}
                {tab === HeaderTabType.returns && <p>Returns/refunds</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
      {enabledChats && <ChatPopUpContainer role={Role.SHOPPER} />}
    </div>
  );
};

export default Profile;
