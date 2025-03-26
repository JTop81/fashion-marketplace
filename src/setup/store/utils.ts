import { create } from "zustand";

const persistToLocalStorage = (storeKey: string) => ({
  saveState: (state: any) => {
    localStorage.setItem(storeKey, JSON.stringify(state));
  },
  loadState: () => {
    return JSON.parse(localStorage.getItem(storeKey) || "null");
  },
  clearState: () => {
    localStorage.removeItem(storeKey);
  },
});

export const createStore = <T>(storeKey: string, customLogic: any) => {
  const commonLogic = persistToLocalStorage(storeKey);

  return create<T>((set, get) => ({
    ...commonLogic,
    ...customLogic(set, get), // Spread custom logic, allowing it to use set & get
  }));
};
