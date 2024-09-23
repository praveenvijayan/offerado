import { create } from "zustand";

interface SheetState {
  openSheet: string | null; // Stores the current open sheet (null if no sheet is open)
  open: (sheetType: string) => void; // Function to open a specific sheet
  close: () => void; // Function to close the sheet
}

const useSheetStore = create<SheetState>((set) => ({
  openSheet: null, // Initially no sheet is open
  open: (sheetType: string) => set({ openSheet: sheetType }), // Set the current open sheet
  close: () => set({ openSheet: null }), // Close any open sheet
}));

export default useSheetStore;
