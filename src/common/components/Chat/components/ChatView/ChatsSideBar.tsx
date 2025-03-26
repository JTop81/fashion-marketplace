import React, { useState } from "react";
import ChatsList from "common/components/Chat/components/ChatView/ChatsList";
import ChatNavBar from "common/components/Chat/components/ChatView/Navigation/ChatNavBar";
import ChatNavItem from "common/components/Chat/components/ChatView/Navigation/ChatNavItem";
import { ChatCategory } from "common/components/Chat/enums";
import { Chat } from "common/components/Chat/types/Chat";
import { UnreadMessagesCategoriesType } from "common/components/Chat/types/UnreadMessagesCategories";
import SearchBar from "common/components/SearchBar/SingleValue";
import { Role } from "enums/role";
import { v4 } from "uuid";

const chatStatusLabels = [
  ChatCategory.ALL,
  ChatCategory.ARCHIEVED,
  ChatCategory.BLOCKED,
  ChatCategory.UNREAD,
];

const ChatsSideBar = ({
  role,
  chats,
  handleChatClick,
  handleNavItemClick,
  selectedCategory,
  unreadMessagesCategories,
  isPopUp,
}: {
  role: Role;
  chats: Chat[];
  handleChatClick: (chatId: string) => void;
  handleNavItemClick: (category: ChatCategory) => void;
  selectedCategory: ChatCategory;
  unreadMessagesCategories: UnreadMessagesCategoriesType;
  isPopUp: boolean;
}) => {
  const roleToShow = role === Role.BOUTIQUE ? Role.SHOPPER : Role.BOUTIQUE;
  const [searchValue, setSearchValue] = useState("");

  const handleItemClick = (category: ChatCategory) => {
    handleNavItemClick(category);
  };

  return (
    <div>
      <ChatNavBar>
        {chatStatusLabels.map((chatLabel) => (
          <ChatNavItem
            key={v4()}
            active={selectedCategory === chatLabel}
            hasUnreadMessages={unreadMessagesCategories[chatLabel]}
            handleClick={handleItemClick}
            categoryName={chatLabel}
          />
        ))}
      </ChatNavBar>
      <SearchBar
        placeholder={`Search ${roleToShow}`}
        hasHistory={false}
        isGray={false}
        value={searchValue}
        setValue={setSearchValue}
      />
      <ChatsList
        chats={chats}
        handleChatClick={handleChatClick}
        isPopUp={isPopUp}
      />
    </div>
  );
};

export default ChatsSideBar;
