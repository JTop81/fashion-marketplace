import React from "react";
import ChatItem from "common/components/Chat/components/ChatView/ChatItem";
import { Chat } from "common/components/Chat/types/Chat";

const ChatsList = ({
  chats,
  handleChatClick,
  isPopUp,
}: {
  chats: Chat[];
  handleChatClick: (chatId: string) => void;
  isPopUp: boolean;
}) => {
  // TODO: Add virtual loading
  const handleMouseEnter = () => {
    if (isPopUp) {
      document.body.style.overflow = "hidden";
    }
  };

  const handleMouseLeave = () => {
    if (isPopUp) {
      document.body.style.overflow = "";
    }
  };
  return (
    <div
      className="grid grid-cols-1 w-full gap-2 h-full overflow-scroll"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {chats.map((chat: any) => {
        return (
          <ChatItem
            key={chat.id}
            chat={chat}
            handleChatClick={() => {
              handleChatClick(chat.id);
            }}
          />
        );
      })}
    </div>
  );
};

export default ChatsList;
