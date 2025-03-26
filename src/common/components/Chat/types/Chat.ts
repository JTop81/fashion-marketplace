import { ChatStatus } from "common/components/Chat/enums";
import { Message } from "common/components/Chat/types/Message";

export type Chat = {
  id: string;
  author: string;
  avatarSrc: string;
  lastMessage: Message | null;
  unreadMessagesCount: number;
  status: ChatStatus;
};
