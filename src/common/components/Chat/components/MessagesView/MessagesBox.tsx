import MessageInput from "common/components/Chat/components/MessagesView/MessageInput";
import MessagesList from "common/components/Chat/components/MessagesView/MessagesList";
import { useMessagesStore } from "setup/store/chat/messagesStore";

const MessagesBox = ({ isPopUp }: { isPopUp: boolean }) => {
  const { messages } = useMessagesStore();

  return (
    <div className="flex max-h-full w-full flex-[1_1_0] flex-col items-between justify-between">
      <div className="w-full px-4">
        {messages.length === 0 && (
          <p className="self-center  text-center text-zinc-700">
            No messages yet
          </p>
        )}
        {messages.length > 0 && <MessagesList isPopUp={isPopUp} />}
      </div>
      <MessageInput isPopUp={isPopUp} />
    </div>
  );
};

export default MessagesBox;
