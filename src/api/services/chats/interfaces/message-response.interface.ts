import { MessageStatus } from "common/components/Chat/enums";

import { IAuthorResponse } from "./author-response.interface";

export interface IMessageResponse {
  id: string;
  chatId: string;
  author: IAuthorResponse;
  messageText: string;
  timeSent: number;
  status: MessageStatus;
  recipient?: string;
  sender?: string;
}
