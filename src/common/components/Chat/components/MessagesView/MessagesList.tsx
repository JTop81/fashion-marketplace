import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import DateDivider from "common/components/Chat/components/MessagesView/DateDivider";
import MessageContainer from "common/components/Chat/components/MessagesView/Message/MessageContainer";
import { Message } from "common/components/Chat/types/Message";
import { useChatStore } from "setup/store/chat/chatStore";
import { useMessagesStore } from "setup/store/chat/messagesStore";
import { getSocket } from "socket";

const MessagesList = ({ isPopUp }: { isPopUp: boolean }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, fetchMessages, addMessage } = useMessagesStore();
  const { currentChat } = useChatStore();
  const [sortedMessagesByDay, setSortedMessagesByDay] = useState<
    { dayKey: string; messages: Message[] }[]
  >([]);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ block: "end", inline: "end" });
    }
  }, []);

  const groupAndSortMessagesByDay = useCallback((messages: Message[]) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "2-digit",
      month: "long",
    };
    const groupedMessages: { [key: string]: Message[] } = {};

    messages.forEach((message) => {
      const date = new Date(message.timeSent);
      const dayKey = date.toLocaleDateString("en-US", options);

      if (!groupedMessages[dayKey]) {
        groupedMessages[dayKey] = [];
      }
      groupedMessages[dayKey].push(message);
    });

    Object.keys(groupedMessages).forEach((dayKey) => {
      groupedMessages[dayKey].sort(
        (a, b) =>
          new Date(a.timeSent).getTime() - new Date(b.timeSent).getTime(),
      );
    });

    const sortedDays = Object.keys(groupedMessages)
      .sort(
        (a, b) =>
          new Date(groupedMessages[a][0].timeSent).getTime() -
          new Date(groupedMessages[b][0].timeSent).getTime(),
      )
      .map((dayKey) => ({ dayKey, messages: groupedMessages[dayKey] }));

    setSortedMessagesByDay(sortedDays);
  }, []);

  useEffect(() => {
    groupAndSortMessagesByDay(messages);
  }, [groupAndSortMessagesByDay, messages]);

  useEffect(() => {
    scrollToBottom();
  }, [sortedMessagesByDay, scrollToBottom]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleMessageReceive = (message: Message) => {
      if (currentChat && message.chatId === currentChat.id) {
        addMessage(message);
      }
    };

    socket.on("message:receive", handleMessageReceive);

    return () => {
      socket.off("message:receive", handleMessageReceive);
    };
  }, [addMessage, currentChat, fetchMessages]);

  const handleMouseEnter = useCallback(() => {
    if (isPopUp) {
      document.body.style.overflow = "hidden";
    }
  }, [isPopUp]);

  const handleMouseLeave = useCallback(() => {
    if (isPopUp) {
      document.body.style.overflow = "";
    }
  }, [isPopUp]);

  return (
    <div
      className={clsx(
        isPopUp
          ? "h-[calc(38rem-76px-52px)] h-max-[calc(38rem-76px-52px)]"
          : "h-[calc(100vh-76px-52px-2rem-6rem)] h-max-[calc(100vh-76px-52px-2rem-6rem)]",
        "grid grid-cols-1 w-full justify-end overflow-y-auto gap-4",
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {sortedMessagesByDay.map(({ dayKey, messages }) => (
        <React.Fragment key={dayKey}>
          <DateDivider>{dayKey}</DateDivider>
          {messages.map((message: Message) => (
            <MessageContainer key={message.id} message={message} />
          ))}
        </React.Fragment>
      ))}
      <div ref={messagesEndRef} className="h-1" />
    </div>
  );
};

export default MessagesList;
