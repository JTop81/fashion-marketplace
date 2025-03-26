import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import ChatView from "common/components/Chat/components/ChatView/ChatView";
import MessagesView from "common/components/Chat/components/MessagesView/MessagesView";
import { useIsMobile } from "common/hooks/useIsMobile";
import { Role } from "enums/role";
import { useFlags } from "launchdarkly-react-client-sdk";
import { useChatStore } from "setup/store/chat/chatStore";
import { initializeSocket } from "socket";

type ChatContainerProps = {
  role: Role;
};

// TODO: create useRole store
const ChatPopUpContainer = ({ role }: ChatContainerProps) => {
  const { currentChat, setCurrentChat } = useChatStore();
  const isMobile = useIsMobile(); // Use the useIsMobile hook
  const { enabledChats } = useFlags();

  const [minimized, setMinimized] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    setCurrentChat(null);
  }, [location, setCurrentChat]);

  useEffect(() => {
    if (enabledChats) {
      initializeSocket(true);
    }
  }, [enabledChats]);

  if (isMobile) {
    return null;
  }

  return (
    <>
      <div
        className={clsx(
          minimized ? "h-16 max-h-16" : "h-[40rem] z-[1500] ",
          "w-96 max-h-[50%] bg-stone-50 shadow fixed bottom-0 right-10  gap-0 flex flex-grow rounded-md overflow-hidden",
        )}
      >
        <ChatView
          role={role}
          isMinimized={minimized}
          setMinimized={setMinimized}
          isPopUp={true}
        />
      </div>
      {currentChat && (
        <div
          className={clsx(
            "h-[38rem] max-h-[38rem] w-[32rem] z-[1000] bg-stone-50 shadow fixed bottom-0 right-[28rem] gap-0 flex flex-grow rounded-md overflow-hidden",
          )}
        >
          <MessagesView role={role} isPopUp={true} />
        </div>
      )}
    </>
  );
};

export default ChatPopUpContainer;
