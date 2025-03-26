import { getMessages } from "api/services/chats";
import { IMessage } from "api/services/chats/interfaces/message.interface";
import { getSocket } from "socket";
import { create } from "zustand";

type MessagesStore = {
  messages: IMessage[];
  fetchMessages: (chatId: string) => Promise<void>;
  seeMessage: (messageId: string) => void;
  addMessage: (message: IMessage) => void;
};

const useMessagesStore = create<MessagesStore>((set) => ({
  messages: [],
  async fetchMessages(chatId: string) {
    const messages = await getMessages(chatId);
    set({ messages });
  },
  addMessage(message: IMessage) {
    set((state) => ({ messages: [...state.messages, message] }));
  },
  seeMessage(messageId: string) {
    const socket = getSocket();
    if (socket) {
      socket.emit("message:see", messageId);
    }
  },
}));

export { useMessagesStore };
