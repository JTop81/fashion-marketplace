import { authorAdapter } from "../adapters/author.adapter";
import { IMessage } from "../interfaces/message.interface";
import { IMessageResponse } from "../interfaces/message-response.interface";

export const messageAdapter = (messageResponse: IMessageResponse): IMessage => {
  const {
    id,
    chatId,
    author: authorResponse,
    messageText,
    timeSent,
    status,
  } = messageResponse;

  return {
    id,
    chatId,
    author: authorAdapter(authorResponse),
    messageText,
    timeSent,
    status,
  };
};
