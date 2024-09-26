import { create } from "zustand";

interface SheetState {
  openSheet: string | null;
  open: (sheetType: string) => void;
  close: () => void;
}

const useSheetStore = create<SheetState>((set) => ({
  openSheet: null,
  open: (sheetType: string) => set({ openSheet: sheetType }),
  close: () => set({ openSheet: null }),
}));

export default useSheetStore;
