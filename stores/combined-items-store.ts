// stores/combined-items-store.ts
import create from "zustand";
import { Product, Poll, FeedbackForm } from "@prisma/client";

type CombinedItem = Product | Poll | FeedbackForm;

interface CombinedItemsState {
  combinedItems: CombinedItem[];
  setCombinedItems: (items: CombinedItem[]) => void;
  addItem: (item: CombinedItem) => void;
  removeItem: (id: string) => void;
  resetCombinedItems: () => void;
}

export const useCombinedItemsStore = create<CombinedItemsState>((set) => ({
  combinedItems: [],
  setCombinedItems: (items) => set({ combinedItems: items }),
  addItem: (item) =>
    set((state) => ({ combinedItems: [...state.combinedItems, item] })),
  removeItem: (id) =>
    set((state) => ({
      combinedItems: state.combinedItems.filter((item) => item.id !== id),
    })),
  resetCombinedItems: () => set({ combinedItems: [] }),
}));
