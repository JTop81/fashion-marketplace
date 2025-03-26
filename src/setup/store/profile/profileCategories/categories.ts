import {
  ICategoriesResponse,
  options,
} from "api/services/customize/interfaces/categories.interface";
import { create } from "zustand";

interface CategoryStore {
  categories: ICategoriesResponse[]; // Categories fetched from the API
  selectedOptions: Record<string, options[]>;
  freeText: string; // Map of categoryId to selected options
  modalState: {
    isOpen: boolean;
    currentCategory: ICategoriesResponse | null;
  };
  setSelectedOptions: (options: Record<string, options[]>) => void;
  setCategories: (categories: ICategoriesResponse[]) => void;
  openModal: (category: ICategoriesResponse) => void;
  closeModal: () => void;

  selectOption: (categoryId: string, option: options, state: boolean) => void;
}

export const useCategoriesStore = create<CategoryStore>((set) => ({
  categories: [],
  freeText: "",
  selectedOptions: {},
  modalState: {
    isOpen: false,
    currentCategory: null,
  },
  setCategories: (categories) => set({ categories }),
  openModal: (category) =>
    set({
      modalState: { isOpen: true, currentCategory: category },
    }),
  closeModal: () =>
    set({
      modalState: { isOpen: false, currentCategory: null },
    }),
  setSelectedOptions: (options) =>
    set(() => ({
      selectedOptions: options, // Replace the selectedOptions state
    })),
  setFreeText: (value: string) => {
    set({
      freeText: value,
    });
  },
  selectOption: (categoryId: string, option: options, add: boolean) => {
    set((state) => {
      const selectedOptions = { ...state.selectedOptions };
      const currentCategoryOptions = selectedOptions[categoryId] || [];

      if (add) {
        selectedOptions[categoryId] = [...currentCategoryOptions, option];
      } else {
        selectedOptions[categoryId] = currentCategoryOptions.filter(
          (item) => item.id !== option.id,
        );
      }

      return { selectedOptions };
    });
  },
}));
