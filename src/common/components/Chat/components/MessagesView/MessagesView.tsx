import React from "react";
import MessagesBox from "common/components/Chat/components/MessagesView/MessagesBox";
import ProfileHeader from "common/components/Chat/components/MessagesView/Profile/ProfileHeader";
import { Role } from "enums/role";
import { useChatStore } from "setup/store/chat/chatStore";

const MessagesView = ({
  role,
  isPopUp = false,
}: {
  role: Role;
  isPopUp?: boolean;
}) => {
  const { currentChat } = useChatStore();

  return (
    <div className="flex-[3_3_0] flex flex-col max-h-screen">
      <div className="py-2 m-0">
        <ProfileHeader
          currentChat={currentChat}
          role={role}
          isPopUp={isPopUp}
        />
      </div>
      <div className=" w-full grow flex flex-col overflow-hidden">
        {!currentChat && (
          <p className="self-center justify-center text-center text-zinc-700">
            No chats selected
          </p>
        )}
        {currentChat && <MessagesBox isPopUp={isPopUp} />}
      </div>
    </div>
  );
};

export default MessagesView;
