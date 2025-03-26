import React, { useState } from "react";
import { IoIosSend, IoMdAttach } from "react-icons/io";
import clsx from "clsx";
import { MessageStatus } from "common/components/Chat/enums";
import { useChatStore } from "setup/store/chat/chatStore";
import { getSocket } from "socket";

const MessageInput = ({ isPopUp }: { isPopUp: boolean }) => {
  const [messageText, setMessageText] = useState<string>("");
  const { currentChat } = useChatStore();

  const handleSendMessage = () => {
    if (messageText.trim() && currentChat) {
      const socket = getSocket();
      if (!socket) return;

      const message = {
        content: messageText,
        chatId: currentChat.id,
        status: MessageStatus.UNSEEN,
      };
      socket.emit("message:send", { toClientId: socket.id, message });
    }
    setMessageText("");
  };

  return (
    <div
      className={clsx(
        isPopUp ? "px-2" : "px-10",
        "self-end mb-4 flex justify-self-end align-self-end palce-self-end  w-full h-[50px] justify-between items-center mt-2 gap-2",
      )}
    >
      <div className="w-10 h-10 bg-zinc-200 rounded-full flex justify-center items-center">
        <IoMdAttach />
      </div>
      <div className="flex w-full p-2 bg-white rounded-3xl">
        <form
          className="w-full flex justify-center items-center"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <input
            className="w-full outline-none"
            placeholder="Write your message..."
            value={messageText}
            disabled={currentChat ? false : true}
            onChange={(event) => setMessageText(event.target.value)}
          />
          <button
            type="submit"
            disabled={currentChat ? false : true}
            className="w-9 h-9 bg-blue-500 rounded-full text-white flex self-end justify-center items-center"
          >
            <IoIosSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;
