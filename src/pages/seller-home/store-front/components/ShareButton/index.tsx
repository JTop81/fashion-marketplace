import { IoShareSocialOutline } from "react-icons/io5";
import GeneralPopover, {
  IPopoverClose,
} from "common/components/GeneralPopover";

import SocialMediaBtns from "./SocialMediaBtns";

type ShareButtonProps = {
  pinterestMediaImg: string;
};

export default function ShareButton(props: ShareButtonProps) {
  const { pinterestMediaImg } = props;

  return (
    <div>
      <GeneralPopover
        location="bottom end"
        popoverPanelClasses="mb-4 z-50 p-2 bg-white rounded-lg shadow-2xl"
        customPopoverBotton={
          <button
            type="button"
            className="bg-card p-[10px] rounded-full cursor-pointer"
          >
            <IoShareSocialOutline size={24} />
          </button>
        }
        menuItems={({ close }: IPopoverClose) => (
          <SocialMediaBtns
            pinterestMediaImg={pinterestMediaImg}
            close={close}
          />
        )}
      />
    </div>
  );
}
