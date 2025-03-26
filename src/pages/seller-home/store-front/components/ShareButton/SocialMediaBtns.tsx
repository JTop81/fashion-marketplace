import { MdContentCopy } from "react-icons/md";
import {
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import FBIcon from "assets/Icons/social-media/facebook.svg";
import PinterestIcon from "assets/Icons/social-media/pinterest.svg";
import TwitterIcon from "assets/Icons/social-media/twitter.svg";
import WAIcon from "assets/Icons/social-media/whatsapp.png";

type SocialMediaBtnsProps = {
  pinterestMediaImg: string;
  close: any;
};

export default function SocialMediaBtns(props: SocialMediaBtnsProps) {
  const { pinterestMediaImg, close } = props;

  const url = window.location.href;
  const title = "Check out this awesome website!"; // TODO: micro copy

  const closeModal = () => close();

  const handleCopyClick = () => {
    navigator.clipboard.writeText(url); // TODO: toast/notification system
    close();
  };

  return (
    <div className="flex flex-col space-y-3 w-[200px]">
      <FacebookShareButton url={url} onClick={closeModal}>
        <button className="flex items-center p-2 w-full">
          <img
            className="mr-3"
            src={FBIcon}
            height={24}
            width={24}
            alt="Facebook"
          />
          <span className="text-sm">Facebook</span>
        </button>
      </FacebookShareButton>
      <PinterestShareButton
        onClick={closeModal}
        url={url}
        media={pinterestMediaImg}
      >
        <div className="flex items-center p-2">
          <img
            className="mr-3"
            src={PinterestIcon}
            height={24}
            width={24}
            alt="Pinterest"
          />
          <span className="text-sm">Pinterest</span>
        </div>
      </PinterestShareButton>
      <TwitterShareButton onClick={closeModal} url={url} title={title}>
        <div className="flex items-center p-2">
          <img
            className="mr-3"
            src={TwitterIcon}
            height={24}
            width={24}
            alt="Twitter"
          />
          <span className="text-sm">Twitter</span>
        </div>
      </TwitterShareButton>
      <WhatsappShareButton onClick={closeModal} url={url} title={title}>
        <div className="flex items-center p-2">
          <img
            className="mr-3"
            src={WAIcon}
            height={24}
            width={24}
            alt="Whatsapp"
          />
          <span className="text-sm">Whatsapp</span>
        </div>
      </WhatsappShareButton>
      <button onClick={handleCopyClick} className="flex items-center p-2">
        <MdContentCopy className="mr-3" size={24} />
        <span className="text-sm">Copy link</span>
      </button>
    </div>
  );
}
