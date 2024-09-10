// src/stores/useComponentStore.ts
import { create } from "zustand";

interface ComponentState {
  selectedItems: {
    quizzes: number[];
    polls: number[];
    contests: number[];
    feedback: number[];
    products: number[];
    [key: string]: number[];
  };
  addSelectedItem: (type: string, id: number) => void;
  removeSelectedItem: (type: string, id: number) => void;
  clearSelectedItems: (type: string) => void;
}

export const useComponentStore = create<ComponentState>((set) => ({
  selectedItems: {
    quizzes: [],
    polls: [],
    contests: [],
    feedback: [],
    products: [],
  },
  addSelectedItem: (type, id) =>
    set((state) => ({
      selectedItems: {
        ...state.selectedItems,
        [type]: [...state.selectedItems[type], id],
      },
    })),
  removeSelectedItem: (type, id) =>
    set((state) => ({
      selectedItems: {
        ...state.selectedItems,
        [type]: state.selectedItems[type].filter((itemId) => itemId !== id),
      },
    })),
  clearSelectedItems: (type) =>
    set((state) => ({
      selectedItems: {
        ...state.selectedItems,
        [type]: [],
      },
    })),
}));
