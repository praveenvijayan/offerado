import { create } from "zustand";

interface CampaignTypeStore {
  isProductSelected: boolean;
  campaignType: string | null;
  setCampaignType: (type: string) => void;
  resetCampaignType: () => void;
  setIsProductSelected: () => void;
  resetIsProductSelected: () => void;
}

const CampaignTypeStore = create<CampaignTypeStore>((set) => ({
  campaignType: null,
  isProductSelected: false,
  setCampaignType: (type) => set({ campaignType: type }),
  resetCampaignType: () => set({ campaignType: null }),
  setIsProductSelected: () => set({ isProductSelected: true }),
  resetIsProductSelected: () => set({ isProductSelected: false }),
}));

export default CampaignTypeStore;
