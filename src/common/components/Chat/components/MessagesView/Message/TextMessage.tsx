import React from "react";
import clsx from "clsx";
import { Message } from "common/components/Chat/types/Message";
import { useIsMobile } from "common/hooks/useIsMobile";
const TextMessage = ({
  isSentByCurrentUser,
  message,
  messageSentTime,
}: {
  isSentByCurrentUser: boolean;
  message: Message;
  messageSentTime?: string;
}) => {
  const isMobile = useIsMobile();
  return (
    <div className={clsx("flex flex-col", isMobile && "w-full")}>
      <div className={clsx(isSentByCurrentUser && "self-end")}>
        <p className="text-stone-500">
          {message.author.name}, {messageSentTime}
        </p>
      </div>
      <div
        className={clsx(
          "bg-white w-fit px-2 py-1 rounded-3xl shadow border px-2 flex items-center",
          isSentByCurrentUser
            ? "border-purple-700 self-end"
            : "border-stone-200 self-start",
        )}
      >
        <p> {message.messageText}</p>
      </div>
    </div>
  );
};

export default TextMessage;
