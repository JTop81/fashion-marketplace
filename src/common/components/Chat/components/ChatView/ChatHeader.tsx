import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { PiNotePencil } from "react-icons/pi";
import ChatHeaderLayout from "common/components/Chat/components/ChatHeaderLayout";

const ChatHeader = ({
  isPopUp = false,
  isMinimized,
  setMinimized,
}: {
  isPopUp: boolean;
  isMinimized?: boolean;
  setMinimized?: any;
}) => {
  const handleMinimizeClick = () => {
    setMinimized((prev: boolean) => !prev);
  };
  return (
    <ChatHeaderLayout>
      <h3 className="text-black text-xl font-semibold font-['Poppins'] leading-loose">
        Messages
      </h3>
      <div className="flex gap-4">
        <button className="w-9 h-9 relative bg-blue-500 rounded-full flex justify-center items-center">
          <PiNotePencil size={18} color="white" />
        </button>
        {isPopUp && (
          <button onClick={handleMinimizeClick}>
            {isMinimized ? (
              <IoIosArrowDown size={24} />
            ) : (
              <IoIosArrowUp size={24} />
            )}
          </button>
        )}
      </div>
    </ChatHeaderLayout>
  );
};

export default ChatHeader;
