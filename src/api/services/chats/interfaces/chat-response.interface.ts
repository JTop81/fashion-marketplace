import { ChatStatus } from "common/components/Chat/enums";

import { IMessageResponse } from "./message-response.interface";

export interface IChatResponse {
  id: string;
  author: string;
  avatarSrc: string;
  lastMessage: IMessageResponse | null;
  status: ChatStatus;
  unreadMessagesCount: number;
}
