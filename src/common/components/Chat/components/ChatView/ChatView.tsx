import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatHeader from "common/components/Chat/components/ChatView/ChatHeader";
import ChatsSideBar from "common/components/Chat/components/ChatView/ChatsSideBar";
import { ChatCategory, ChatStatus } from "common/components/Chat/enums";
import { Chat } from "common/components/Chat/types/Chat";
import { Message } from "common/components/Chat/types/Message";
import { UnreadMessagesCategoriesType } from "common/components/Chat/types/UnreadMessagesCategories";
import { Role } from "enums/role";
import { useChatStore } from "setup/store/chat/chatStore";
import { useMessagesStore } from "setup/store/chat/messagesStore";
import { getSocket } from "socket";

const filterChatsByCategory = (category: ChatCategory, chats: Chat[]) => {
  if (category === ChatCategory.ALL) {
    return chats;
  }

  if (category === ChatCategory.UNREAD) {
    return chats.filter((chat: Chat) => chat.unreadMessagesCount > 0);
  }

  if (category === ChatCategory.ARCHIEVED) {
    return chats.filter((chat: Chat) => {
      chat.status === ChatStatus.ARCHIEVED;
    });
  }

  if (category === ChatCategory.BLOCKED) {
    return chats.filter((chat: Chat) => {
      chat.status === ChatStatus.BLOCKED;
    });
  }
  return [];
};

const unreadMessagesInitialState = {
  [ChatCategory.ALL]: false,
  [ChatCategory.ARCHIEVED]: false,
  [ChatCategory.BLOCKED]: false,
  [ChatCategory.UNREAD]: false,
};

const ChatView = ({
  role,
  isPopUp = false,
  isMinimized,
  setMinimized,
}: {
  role: Role;
  isPopUp?: boolean;
  isMinimized?: boolean;
  setMinimized?: any;
}) => {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<ChatCategory>(
    ChatCategory.ALL,
  );

  const [unreadMessagesCategories, setUnreadMessagesCategories] =
    useState<UnreadMessagesCategoriesType>(unreadMessagesInitialState);

  const { fetchChats, chats, currentChat, fetchChatById, setCurrentChat } =
    useChatStore();

  const { fetchMessages, seeMessage, addMessage } = useMessagesStore();

  useEffect(() => {
    fetchChats(ChatCategory.ALL);
  }, [fetchChats]);

  useEffect(() => {
    const unreadMessages = {
      [ChatCategory.ALL]:
        filterChatsByCategory(ChatCategory.ALL, chats).filter(
          (chat) => chat.unreadMessagesCount > 0,
        ).length > 0,
      [ChatCategory.ARCHIEVED]:
        filterChatsByCategory(ChatCategory.ARCHIEVED, chats).filter(
          (chat) => chat.unreadMessagesCount > 0,
        ).length > 0,
      [ChatCategory.BLOCKED]:
        filterChatsByCategory(ChatCategory.BLOCKED, chats).filter(
          (chat) => chat.unreadMessagesCount > 0,
        ).length > 0,
      [ChatCategory.UNREAD]:
        filterChatsByCategory(ChatCategory.UNREAD, chats).filter(
          (chat) => chat.unreadMessagesCount > 0,
        ).length > 0,
    };
    setUnreadMessagesCategories(unreadMessages);
  }, [chats]);

  const handleMessageReceive = (message: Message) => {
    if (message.chatId) {
      fetchChatById(message.chatId);
      addMessage(message);
    }
  };

  const handleChatClick = async (chatId: string) => {
    if (currentChat && chatId === currentChat?.id) {
      return;
    } else {
      await fetchMessages(chatId);
      setCurrentChat(chatId);
      seeMessage(chatId);
      await fetchChatById(chatId);
    }

    if (!isPopUp) {
      navigate(chatId);
    }
  };

  const handleNavItemClick = (category: ChatCategory) => {
    setSelectedCategory(category);
    fetchChats(category);
  };

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on("message:receive", (event: any) => {
      handleMessageReceive(event);
    });

    return () => {
      socket.off("message:read");
      socket.off("message:receive");
      socket.off("chat:created");
      socket.off("users:online");
    };
  });

  return (
    <div className="flex-1 w-full md:border-r-2 md:border-stone-100">
      <div className="py-2 ">
        <ChatHeader
          isPopUp={isPopUp}
          isMinimized={isMinimized}
          setMinimized={setMinimized}
        />
      </div>
      {!isMinimized && (
        <div className="p-2">
          <ChatsSideBar
            role={role}
            chats={filterChatsByCategory(selectedCategory, chats)}
            handleChatClick={handleChatClick}
            handleNavItemClick={handleNavItemClick}
            selectedCategory={selectedCategory}
            unreadMessagesCategories={unreadMessagesCategories}
            isPopUp={isPopUp}
          />
        </div>
      )}
    </div>
  );
};

export default ChatView;
