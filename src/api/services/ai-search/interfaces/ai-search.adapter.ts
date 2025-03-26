import { IFeeds, IMessages, IPostMessage } from "./ai-search.interface";
import {
  IFeedsResponse,
  IMessagesResponse,
  IPostMessageResponse,
} from "./ai-search-response.interface";

export const postMessageAdapter = (
  postMessageResponse: IPostMessageResponse,
): IPostMessage => {
  return {
    ...postMessageResponse,
    feeds: postMessageResponse.feeds
      ? feedsAdapter(postMessageResponse.feeds)
      : null, // Handle null feeds
  };
};

export const getMessagesAdapter = (
  messagesResponse: IMessagesResponse,
): IMessages => {
  return {
    ...messagesResponse,
    items: messagesResponse.items
      ? messagesResponse.items.map((message) => postMessageAdapter(message))
      : [], // Return an empty array if items is null
  };
};

export const feedsAdapter = (feedsResponse: IFeedsResponse): IFeeds => {
  return {
    ...feedsResponse,
    items: feedsResponse.items
      ? feedsResponse.items.map((feed) => ({
          ...feed,
          message_id: feed.ai_search_message_id, // Map ai_search_message_id to message_id
        }))
      : [], // Return an empty array if items is null
  };
};
