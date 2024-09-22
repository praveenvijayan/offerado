import { create } from "zustand";

interface CampaignState {
  title: string;
  description: string;
  start: Date | string;
  expiry: Date | string;
  isActive: boolean;
  campaignType: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setStart: (start: Date | string) => void;
  setExpiry: (expiry: Date | string) => void;
  setIsActive: (isActive: boolean) => void;
  setCampaignType: (campaignType: string) => void;
  getDetails: () => {
    title: string;
    description: string;
    start: Date | string;
    expiry: Date | string;
    isActive: boolean;
    campaignType: string;
  };
  reset: () => void;
}

const useCampaignStore = create<CampaignState>((set, get) => ({
  title: "",
  description: "",
  start: "",
  expiry: "",
  isActive: false,
  campaignType: "",
  setTitle: (title: string) => set({ title }),
  setDescription: (description: string) => set({ description }),
  setStart: (start: Date | string) => set({ start }),
  setExpiry: (expiry: Date | string) => set({ expiry }),
  setIsActive: (isActive: boolean) => set({ isActive }),
  setCampaignType: (campaignType: string) => set({ campaignType }),
  getDetails: () => ({
    title: get().title,
    description: get().description,
    start: get().start,
    expiry: get().expiry,
    isActive: get().isActive,
    campaignType: get().campaignType,
  }),
  reset: () =>
    set({
      title: "",
      description: "",
      start: "",
      expiry: "",
      isActive: false,
      campaignType: "",
    }),
}));

export default useCampaignStore;
