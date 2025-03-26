import {
  CHAT_MESSAGES_URL,
  CHATS_URL,
} from "api/constants/endpoints.constants";
import { CHAT_ID_PARAM } from "api/constants/route-params.constants";
import axios, { AxiosResponse } from "axios";
import { ChatCategory } from "common/components/Chat/enums";
import { replaceUrlParams } from "utils/getUrlWithParams.util";

import { chatAdapter } from "./adapters/chat.adapter";
import { messageAdapter } from "./adapters/message.adapter";
import { IChat } from "./interfaces/chat.interface";
import { IChatResponse } from "./interfaces/chat-response.interface";
import { IMessage } from "./interfaces/message.interface";
import { IMessageResponse } from "./interfaces/message-response.interface";

export const getChats = async (
  chatCategory: ChatCategory,
): Promise<IChat[]> => {
  const response = await axios.get<IChatResponse[]>(
    `${CHATS_URL}?category=${chatCategory}`,
  );

  return response.data.map((chatResponse) => chatAdapter(chatResponse));
};

export const getChatById = async (chatId: string): Promise<IChat> => {
  const response = await axios.get<IChatResponse>(
    replaceUrlParams(CHATS_URL, { [CHAT_ID_PARAM]: chatId }),
  );

  return chatAdapter(response.data);
};

export const getMessages = async (chatId: string): Promise<IMessage[]> => {
  try {
    const response: AxiosResponse<IMessageResponse[]> = await axios.get(
      replaceUrlParams(CHAT_MESSAGES_URL, { [CHAT_ID_PARAM]: chatId }),
    );

    return response.data.map((message) => messageAdapter(message));
  } catch (error) {
    console.error("Fetch Messages Error", error);
    return [];
  }
};
