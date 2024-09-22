import { create } from "zustand";

type SortOrder = "asc" | "desc";

interface ProductsState {
  currentPage: number;
  searchQuery: string;
  sortColumn: string;
  sortOrder: SortOrder;
  selectedProducts: number[]; // Array of selected product IDs
  setCurrentPage: (page: number) => void;
  setSearchQuery: (query: string) => void;
  setSortColumn: (column: string) => void;
  setSortOrder: (order: SortOrder) => void;
  selectProduct: (productId: number) => void;
  deselectProduct: (productId: number) => void;
  toggleProductSelection: (productId: number) => void;
  reset: () => void;
}

const useProductsStore = create<ProductsState>((set) => ({
  currentPage: 1,
  searchQuery: "",
  sortColumn: "name",
  sortOrder: "asc",
  selectedProducts: [],
  setCurrentPage: (page) => set(() => ({ currentPage: page })),
  setSearchQuery: (query) => set(() => ({ searchQuery: query })),
  setSortColumn: (column) => set(() => ({ sortColumn: column })),
  setSortOrder: (order) => set(() => ({ sortOrder: order })),
  selectProduct: (productId) =>
    set((state) => ({
      selectedProducts: [...state.selectedProducts, productId],
    })),
  deselectProduct: (productId) =>
    set((state) => ({
      selectedProducts: state.selectedProducts.filter((id) => id !== productId),
    })),
  toggleProductSelection: (productId) =>
    set((state) => ({
      selectedProducts: state.selectedProducts.includes(productId)
        ? state.selectedProducts.filter((id) => id !== productId)
        : [...state.selectedProducts, productId],
    })),
  reset: () =>
    set(() => ({
      currentPage: 1,
      searchQuery: "",
      sortColumn: "name",
      sortOrder: "asc",
      selectedProducts: [],
    })),
}));

export default useProductsStore;
