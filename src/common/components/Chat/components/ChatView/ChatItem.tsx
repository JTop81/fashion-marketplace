import React, { useEffect, useMemo, useState } from "react";
import { IoMdMore } from "react-icons/io";
import clsx from "clsx";
import DeleteChatModal from "common/components/Chat/components/Modals/DeleteChatModal";
import OptionsList from "common/components/Chat/components/Options/OptionsList";
import { Chat } from "common/components/Chat/types/Chat";
import { Message } from "common/components/Chat/types/Message";
import GeneralPopover from "common/components/GeneralPopover";
import { useIsMobile } from "common/hooks/useIsMobile";
import { useChatStore } from "setup/store/chat/chatStore";
import { getSocket } from "socket";

const UnreadMessagesMarker = ({ messagesCount }: { messagesCount: number }) => {
  if (messagesCount === 0) {
    return null;
  }

  return (
    <div className="w-6 h-6 rounded-full flex bg-purple-700 items-center justify-center">
      <div className="text-white text-[0.5rem] md:text-xs font-medium font-['Poppins'] leading-none">
        {messagesCount}
      </div>
    </div>
  );
};

const ChatItem = ({
  chat,
  handleChatClick,
}: {
  chat: Chat;
  handleChatClick: (chatId: string) => void;
}) => {
  const { currentChat } = useChatStore();

  const isMobile = useIsMobile();

  const [lastMessage, setLastMessage] = useState<Message | null>(
    chat.lastMessage,
  );

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const memoizedIsCurrentChat = useMemo(
    () => currentChat && currentChat.id === chat.id,
    [chat.id, currentChat],
  );

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const handleDeleteChat = (chatId?: string) => {
    // When use chatId, must remove console
    console.log("will remove", chatId);
    setIsDeleteModalOpen((prev) => !prev);
  };

  const handleClick = (event: React.MouseEvent, chatId: string) => {
    event.preventDefault();

    if (event.type === "click") {
      handleChatClick(chatId);
    }
  };

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleMessageReceive = (message: Message) => {
      if (message.chatId === chat.id) {
        setLastMessage(message);
      }
    };

    socket.on("message:receive", handleMessageReceive);
    return () => {
      socket.off("message:receive", handleMessageReceive);
    };
  });

  // TODO: Use auth to get current user
  const currentUser = "You";

  // TODO: Proper date format
  let dateSent = null;
  if (lastMessage) {
    dateSent = new Date(lastMessage.timeSent).toDateString();
  }

  const optionsMenuItems = [
    { name: "Unarchive", icon: "" },
    {
      name: "Delete Chat",
      icon: "",
      onClick: () => handleDeleteChat(chat.id),
    },
    { name: "Block User", icon: "" },
    { name: "Report User", icon: "" },
  ];

  return (
    <button
      className={clsx(
        "flex h-20 px-2 items-center gap-2 py-2 w-full pointer hover:bg-neutral-100",
        memoizedIsCurrentChat && "bg-neutral-100",
      )}
      onContextMenu={(event: any) => {
        handleClick(event, chat.id);
      }}
      onClick={(event: React.MouseEvent) => {
        event.preventDefault();
        handleClick(event, chat.id);
      }}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <img
        className="h-8 w-8 md:h-11 md:w-11 rounded-full"
        src={chat.avatarSrc}
        alt={"ProfileAvatar"}
      />
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h3 className="text-black text-sm md:text-base font-semibold font-['Poppins'] leading-normal">
            {chat.author}
          </h3>
          <p className="opacity-50 text-black text-[0.5rem] md:text-xs font-light font-['Poppins']">
            {dateSent ?? ""}
          </p>
        </div>
        <div className="flex justify-between w-full">
          <p className="w-[200px] text-start text-black text-xs md:text-sm font-normal font-['Poppins'] overflow-hidden inline-block text-ellipsis whitespace-nowrap">
            {!lastMessage && <p>No messages yet</p>}
            {lastMessage?.author.name === currentUser && (
              <span className="font-semibold leading-tight">You: </span>
            )}
            {lastMessage?.messageText}
          </p>
          <div className="flex">
            {(!isHovered || isMobile) && (
              <UnreadMessagesMarker messagesCount={chat.unreadMessagesCount} />
            )}
            <GeneralPopover
              location="bottom end"
              customPopoverBotton={
                <IoMdMore
                  size={20}
                  className={clsx(
                    !isMobile && !isHovered && "hidden",
                    "color-black z-100",
                  )}
                />
              }
              customMenuStyles={clsx(
                "z-[100000] w-40 h-max py-4 bg-white rounded-xl shadow flex-col justify-center items-start gap-2 inline-flex",
              )}
              menuItems={<OptionsList options={optionsMenuItems} />}
            />
          </div>
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteChatModal setIsDeleteModalOpen={setIsDeleteModalOpen} />
      )}
    </button>
  );
};

export default ChatItem;
