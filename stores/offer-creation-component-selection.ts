import { create } from "zustand";

// Generic interface for component sheet state
interface ComponentSheetState {
  isSheetOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
}

// Utility function to create sheet stores
const createSheetStore = () =>
  create<ComponentSheetState>((set) => ({
    isSheetOpen: false,
    openSheet: () => set(() => ({ isSheetOpen: true })),
    closeSheet: () => set(() => ({ isSheetOpen: false })),
  }));

// Poll Sheet Store
export const usePollSheetStore = createSheetStore();

// Quiz Sheet Store
export const useQuizSheetStore = createSheetStore();

// Contest Sheet Store
export const useContestSheetStore = createSheetStore();

// Feedback Sheet Store
export const useFeedbackSheetStore = createSheetStore();

// Product Sheet Store
export const useProductSheetStore = createSheetStore();
