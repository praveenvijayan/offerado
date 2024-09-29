import { create } from "zustand";
import type { Product } from "@prisma/client"; // Adjust the import path based on your project structure

type ProductSelectionState = {
  selectedProducts: Product[];
  toggleProductSelection: (product: Product) => void;
  isSelected: (productId: string) => boolean;
  resetProducts: () => void;
  getSelectedProducts: () => Product[];
  setSelectedProducts: (products: Product[]) => void;
  updateProducts: (products: Product[]) => void; // Added for updating the products
};

export const useProductSelectionStore = create<ProductSelectionState>(
  (set, get) => ({
    selectedProducts: [],

    toggleProductSelection: (product) =>
      set((state) => {
        const isAlreadySelected = state.selectedProducts.some(
          (p) => p.id === product.id
        );

        if (isAlreadySelected) {
          // Remove product if already selected
          return {
            selectedProducts: state.selectedProducts.filter(
              (p) => p.id !== product.id
            ),
          };
        } else {
          // Add product to the selection
          return {
            selectedProducts: [...state.selectedProducts, product],
          };
        }
      }),

    isSelected: (productId) => {
      const { selectedProducts } = get();
      return selectedProducts.some((p) => p.id === productId);
    },

    resetProducts: () =>
      set(() => ({
        selectedProducts: [],
      })),

    getSelectedProducts: () => {
      return get().selectedProducts;
    },

    setSelectedProducts: (products) =>
      set(() => ({
        selectedProducts: products,
      })),

    updateProducts: (products) =>
      set(() => ({
        selectedProducts: products,
      })),
  })
);
