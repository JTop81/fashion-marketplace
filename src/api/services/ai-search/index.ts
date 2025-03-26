import { getAxiosInstance } from "api/axios";
import {
  CREATE_SESSION,
  DELETE_ALL_SESSIONS,
  DELETE_SESSION,
  GET_FEEDS,
  GET_HISTORICAL_SEARCHES,
  GET_MESSAGES,
  POST_MESSAGES,
} from "api/constants/endpoints.constants";
import { MESSAGE_ID, SESSION_ID } from "api/constants/route-params.constants";
import { replaceUrlParams } from "utils/getUrlWithParams.util";

import {
  getMessagesAdapter,
  postMessageAdapter,
} from "./interfaces/ai-search.adapter";
import {
  IMessages,
  IPostMessage,
  PostMessageData,
} from "./interfaces/ai-search.interface";
import {
  IFeedsResponse,
  IHistoricalSearchResponse,
  IMessagesResponse,
  IPostMessageResponse,
  IUserSessionResponse,
} from "./interfaces/ai-search-response.interface";

export const createSession = async (): Promise<IUserSessionResponse> => {
  const api = await getAxiosInstance();
  const response = await api.post(CREATE_SESSION);
  return response.data;
};

export const deleteAllSessions = async (): Promise<any> => {
  const api = await getAxiosInstance();
  const response = await api.delete(DELETE_ALL_SESSIONS);
  return response.data;
};

export const deleteSession = async (sessionId: string): Promise<any> => {
  const api = await getAxiosInstance();
  const response = await api.delete(
    replaceUrlParams(DELETE_SESSION, { [SESSION_ID]: sessionId }),
  );
  return response.data;
};

export const postMessage = async (
  data: PostMessageData,
): Promise<IPostMessage> => {
  const api = await getAxiosInstance();
  const response = await api.post<IPostMessageResponse>(POST_MESSAGES, data);
  return postMessageAdapter(response.data);
};

export const getMessages = async (
  sessionId: string,
  lastMessageCreatedAt?: string,
  cursor?: string,
  sort?: string,
): Promise<IMessages> => {
  const filter = {
    created_at: {
      gt: lastMessageCreatedAt,
    },
  };
  const api = await getAxiosInstance();
  const response = await api.get<IMessagesResponse>(
    replaceUrlParams(GET_MESSAGES, { [SESSION_ID]: sessionId }),
    {
      params: {
        filter: JSON.stringify(filter),
        cursor,
        sort,
      },
    },
  );
  // { [CHAT_ID_PARAM]: chatId }
  return getMessagesAdapter(response.data);
};

export const getFeeds = async (
  messageId: string,
  cursor?: string,
): Promise<IFeedsResponse> => {
  const api = await getAxiosInstance();
  const response = await api.get(
    replaceUrlParams(GET_FEEDS, { [MESSAGE_ID]: messageId }),
    {
      params: {
        cursor,
      },
    },
  );
  return response.data;
};

export const getHistoricalSearches = async (): Promise<
  IHistoricalSearchResponse[]
> => {
  const api = await getAxiosInstance();
  const response = await api.get(GET_HISTORICAL_SEARCHES);
  return response.data;
};
