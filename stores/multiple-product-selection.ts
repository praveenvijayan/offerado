import { create } from "zustand";

type ProductSelectionState = {
  selectedProducts: string[];
  toggleProductSelection: (productId: string) => void;
  isSelected: (productId: string) => boolean;
  resetProducts: () => void;
  getSelectedProducts: () => string[];
};

export const useProductSelectionStore = create<ProductSelectionState>(
  (set, get) => ({
    selectedProducts: [],

    toggleProductSelection: (productId) =>
      set((state) => {
        if (state.selectedProducts.includes(productId)) {
          // Remove product if already selected
          return {
            selectedProducts: state.selectedProducts.filter(
              (id) => id !== productId
            ),
          };
        } else {
          // Add product to the selection
          return {
            selectedProducts: [...state.selectedProducts, productId],
          };
        }
      }),

    isSelected: (productId) => {
      const { selectedProducts } = get();
      return selectedProducts.includes(productId);
    },

    resetProducts: () =>
      set(() => ({
        selectedProducts: [],
      })),

    getSelectedProducts: () => {
      return get().selectedProducts;
    },
  })
);
