import { IPostMessage } from "api/services/ai-search/interfaces/ai-search.interface";
import { IHistoricalSearchResponse } from "api/services/ai-search/interfaces/ai-search-response.interface";
import { create } from "zustand";

interface AISearchStore {
  sessionId: string;
  currentCursor: string;
  setCurrentCursor: (newCursor: string) => void;
  setSessionId: (sessionId: string) => void;
  messages: IPostMessage[];
  clearMessages: () => void;
  hisArr: IHistoricalSearchResponse[];
  setHisArr: (data: IHistoricalSearchResponse[]) => void;
  setMessages: (newMessage: IPostMessage) => void;
}

export const useAiSearchStore = create<AISearchStore>((set) => ({
  sessionId: "",
  hisArr: [],
  currentCursor: "",
  setCurrentCursor: (newCursor: string) => set({ currentCursor: newCursor }),
  setHisArr: (data: IHistoricalSearchResponse[]) => set({ hisArr: data }),
  setSessionId: (sessionId: string) => set({ sessionId }),
  messages: [],
  clearMessages: () => set((state) => ({ ...state, messages: [] })),
  setMessages: (newMessage: IPostMessage) =>
    set((state) => ({
      ...state,
      messages: [...state.messages, newMessage],
    })),
}));
