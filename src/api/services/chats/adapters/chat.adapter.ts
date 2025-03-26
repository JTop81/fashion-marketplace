import { messageAdapter } from "../adapters/message.adapter";
import { IChat } from "../interfaces/chat.interface";
import { IChatResponse } from "../interfaces/chat-response.interface";

export const chatAdapter = (chatResponse: IChatResponse): IChat => {
  const {
    id,
    author,
    avatarSrc,
    lastMessage: messageResponse,
    status,
    unreadMessagesCount,
  } = chatResponse;
  const lastMessage = messageResponse ? messageAdapter(messageResponse) : null;
  return {
    id,
    author,
    avatarSrc,
    lastMessage,
    status,
    unreadMessagesCount,
  };
};
