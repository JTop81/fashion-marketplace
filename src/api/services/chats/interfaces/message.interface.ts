import { MessageStatus } from "common/components/Chat/enums";

import { IAuthor } from "./author.interface";

export interface IMessage {
  id?: string;
  chatId: string;
  author: IAuthor;
  messageText: string;
  timeSent: number;
  status: MessageStatus;
  recipient?: string;
  sender?: string;
}
