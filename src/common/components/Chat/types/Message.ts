import { MessageStatus } from "common/components/Chat/enums";

export type Message = {
  id?: string;
  chatId: string;
  author: { avatar: { src: string }; name: string };
  messageText: string;
  timeSent: number;
  status: MessageStatus;
  recipient?: string;
  sender?: string;
};
