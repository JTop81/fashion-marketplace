import { getChatById, getChats } from "api/services/chats";
import { IChat } from "api/services/chats/interfaces/chat.interface";
import { ChatCategory } from "common/components/Chat/enums";
import { getSocket } from "socket";
import { create } from "zustand";

type ChatStore = {
  chats: IChat[];
  currentChat: IChat | null;
  setCurrentChat: (chatId?: string | null) => void;
  fetchChats: (categoryName: ChatCategory) => Promise<void>;
  fetchChatById: (chatId: string) => Promise<void>;
  deleteChat: (chatId: string) => void;
  createChat: (receiverId: string) => void;
};

const useChatStore = create<ChatStore>((set) => ({
  chats: [],
  currentChat: null,
  async fetchChats() {
    const chats = await getChats(ChatCategory.ALL);
    set({ chats });
  },
  async fetchChatById(chatId: string) {
    const chat = await getChatById(chatId);
    set((state) => ({
      chats: state.chats.map((existingChat) =>
        existingChat.id === chatId
          ? { ...existingChat, ...chat }
          : existingChat,
      ),
    }));
  },
  setCurrentChat(chatId?: string | null) {
    if (chatId) {
      set((state) => ({
        currentChat: state.chats.find((chat: IChat) => chat.id === chatId),
      }));
      const socket = getSocket();
      if (socket) {
        socket.emit("message:see", chatId);
      }
    } else {
      set(() => ({ currentChat: null }));
    }
  },
  deleteChat(_: string) {
  },
  createChat(receiverId: string) {
  },
}));

export { useChatStore };
