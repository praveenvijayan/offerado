import { create } from "zustand";

interface CampaignState {
  title: string;
  description: string;
  start: Date | string; // It can be a Date object or a string depending on how it's handled
  expiry: Date | string;
  isActive: boolean;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setStart: (start: Date | string) => void;
  setExpiry: (expiry: Date | string) => void;
  setIsActive: (isActive: boolean) => void;
  getDetails: () => {
    title: string;
    description: string;
    start: Date | string;
    expiry: Date | string;
    isActive: boolean;
  };
}

const useCampaignStore = create<CampaignState>((set, get) => ({
  title: "",
  description: "",
  start: "",
  expiry: "",
  isActive: false,
  setTitle: (title: string) => set({ title }),
  setDescription: (description: string) => set({ description }),
  setStart: (start: Date | string) => set({ start }),
  setExpiry: (expiry: Date | string) => set({ expiry }),
  setIsActive: (isActive: boolean) => set({ isActive }),
  getDetails: () => ({
    title: get().title,
    description: get().description,
    start: get().start,
    expiry: get().expiry,
    isActive: get().isActive,
  }),
}));

export default useCampaignStore;
