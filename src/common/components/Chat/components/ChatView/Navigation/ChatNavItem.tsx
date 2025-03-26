import React from "react";
import clsx from "clsx";
import { ChatCategory } from "common/components/Chat/enums";

type ChatNavItemProps = {
  active: boolean;
  hasUnreadMessages: boolean;
  categoryName: ChatCategory;
  handleClick: (category: ChatCategory) => void;
};

const RoundUnreadMessagesMarker = () => (
  <div className="w-2 h-2 bg-purple-700 rounded-full absolute right-0 " />
);

const ChatNavItem = ({
  active,
  hasUnreadMessages = true,
  categoryName,
  handleClick,
}: ChatNavItemProps) => {
  return (
    <button
      className={clsx(
        'text-sm font-medium  relative text-black  capitalize font-["Poppins"] leading-tight p-2 text-zinc',
        active && "border-b-2 border-purple-700",
      )}
      onClick={() => {
        handleClick(categoryName);
      }}
    >
      {hasUnreadMessages && <RoundUnreadMessagesMarker />}
      {categoryName}
    </button>
  );
};

export default ChatNavItem;
