import { create } from "zustand";
import type { Product } from "@prisma/client";

interface ProductStore {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product) => void;
  resetSelectedProduct: () => void;
}
// Zustand store definition
const useProductStore = create<ProductStore>((set) => ({
  selectedProduct: null,

  // Function to set the selected product object
  setSelectedProduct: (product: Product) => set({ selectedProduct: product }),

  // Function to reset the selected product to null
  resetSelectedProduct: () => set({ selectedProduct: null }),
}));

export default useProductStore;
