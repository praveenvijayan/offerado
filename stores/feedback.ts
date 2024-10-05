import { create } from "zustand";
import type { FeedbackForm } from "@prisma/client";

interface FeedbackStore {
  selectedFeedbackData: FeedbackForm | null;
  setSelectedFeedbackData: (feedback: FeedbackForm) => void;
  resetSelectedFeedbackData: () => void;
}

const useFeedbackStore = create<FeedbackStore>((set) => ({
  selectedFeedbackData: null,
  setSelectedFeedbackData: (feedback: FeedbackForm) =>
    set({ selectedFeedbackData: feedback }),
  resetSelectedFeedbackData: () => set({ selectedFeedbackData: null }),
}));

export default useFeedbackStore;
