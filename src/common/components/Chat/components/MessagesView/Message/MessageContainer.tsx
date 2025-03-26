import clsx from "clsx";
import TextMessage from "common/components/Chat/components/MessagesView/Message/TextMessage";
import { Message } from "common/components/Chat/types/Message";

const MessageContainer = ({ message }: { message: Message }) => {
  const userLocale = navigator.language;
  const messageSentTime = new Date(message.timeSent).toLocaleTimeString(
    userLocale,
    { hour: "2-digit", minute: "2-digit" },
  );
  const currentUserName = "You";

  const isSentByCurrentUser = message.author.name === currentUserName;

  return (
    <div
      className={clsx(
        "flex w-fit max-w-[80%] gap-2",
        isSentByCurrentUser && "justify-self-end self-end",
      )}
    >
      {!isSentByCurrentUser && (
        <img
          className="w-10 h-10 rounded-full"
          src={message.author.avatar.src}
        />
      )}
      <TextMessage
        isSentByCurrentUser={isSentByCurrentUser}
        message={message}
        messageSentTime={messageSentTime}
      />
    </div>
  );
};

export default MessageContainer;
