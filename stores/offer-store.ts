import { create } from "zustand";

interface Offer {
  title: string;
  description: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  selectedProducts: number;
  selectedTemplate: string;
  image: string;
}

interface OfferStore {
  offer: Offer;
  setOffer: (newOffer: Offer) => void;
}

export const useOfferStore = create<OfferStore>((set) => ({
  offer: {
    title: "Sample Offer",
    description: "This is a sample offer description.",
    isActive: true,
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    selectedProducts: 5,
    selectedTemplate: "Basic Template",
    image: "/share-image.jpg",
  },
  setOffer: (newOffer) => set({ offer: newOffer }),
}));
