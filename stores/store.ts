import { create } from "zustand";

interface OfferState {
  offer: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    selectedProducts: number;
    selectedTemplate: string;
    image: string;
    link: string;
  };
  selectedProducts: number[];
  selectedTemplate: string | null;
  setOffer: (offer: Partial<OfferState["offer"]>) => void;
  handleProductSelection: (productId: number) => void;
  setSelectedTemplate: (template: string) => void;
}

export const useOfferStore = create<OfferState>((set) => ({
  offer: {
    title: "Summer Sale Offer",
    description:
      "Enjoy up to 50% off on selected items during our summer sale.",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    isActive: true,
    selectedProducts: 5,
    selectedTemplate: "Template 2",
    image: "/share-image.jpg",
    link: "offerado.in/43534523523",
  },
  selectedProducts: [],
  selectedTemplate: null,
  setOffer: (offer) =>
    set((state) => ({ offer: { ...state.offer, ...offer } })),
  handleProductSelection: (productId) =>
    set((state) => ({
      selectedProducts: state.selectedProducts.includes(productId)
        ? state.selectedProducts.filter((id) => id !== productId)
        : [...state.selectedProducts, productId],
    })),
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
}));
