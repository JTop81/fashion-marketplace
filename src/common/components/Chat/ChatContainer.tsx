import React from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import ChatView from "common/components/Chat/components/ChatView/ChatView";
import MessagesView from "common/components/Chat/components/MessagesView/MessagesView";
import { useIsMobile } from "common/hooks/useIsMobile";
import { Role } from "enums/role";

type ChatContainerProps = {
  role: Role;
};

// TODO: create useRole store
const ChatContainer = ({ role }: ChatContainerProps) => {
  const isMobile = useIsMobile();
  const { chatId } = useParams();

  return (
    <div
      className={clsx(
        "w-full  h-[calc(100vh-6rem)] bg-stone-50 gap-0 flex flex-grow rounded-md overflow-hidden",
      )}
    >
      {isMobile ? (
        chatId ? (
          <MessagesView role={role} />
        ) : (
          <ChatView role={role} />
        )
      ) : (
        <>
          <ChatView role={role} />
          <MessagesView role={role} />
        </>
      )}
    </div>
  );
};

export default ChatContainer;
