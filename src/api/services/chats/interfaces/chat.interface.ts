import { ChatStatus } from "common/components/Chat/enums";

import { IMessage } from "./message.interface";

export interface IChat {
  id: string;
  author: string;
  avatarSrc: string;
  lastMessage: IMessage | null;
  status: ChatStatus;
  unreadMessagesCount: number;
}
