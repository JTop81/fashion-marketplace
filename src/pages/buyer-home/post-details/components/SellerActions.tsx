import { FaRegEnvelope, FaRegPaperPlane } from "react-icons/fa6";
import clsx from "clsx";
import { useFlags } from "launchdarkly-react-client-sdk";

import Button from "./Button";

type ComponentProps = {
  className?: string;
};

const SellerActions = ({ className }: ComponentProps) => {
  const { enabledChats } = useFlags();

  return (
    <div className={clsx("flex flex-row items-center", className)}>
      <span className="flex md:hidden">Contact the seller</span>
      <div className="flex flex-row gap-x-2 ml-auto md:w-full md:flex-col md:gap-y-2 md:mx-auto">
        {enabledChats && (
          <Button
            className="flex justify-center items-center gap-x-2 h-14 md:h-fit"
            variant="contained"
          >
            <span className="text-xl">
              <FaRegEnvelope />
            </span>
            <span className="hidden md:flex">Chat with Seller</span>
          </Button>
        )}
        <Button
          variant="contained"
          className="flex justify-center h-14 md:h-fit items-center gap-x-2 border border-gray-300 !bg-card border-lightGray !text-black"
        >
          <span className="text-xl">
            <FaRegPaperPlane />
          </span>
          <span className="hidden md:flex">Send an SMS</span>
        </Button>
      </div>
    </div>
  );
};

export { SellerActions };
