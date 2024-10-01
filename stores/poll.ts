import { create } from "zustand";
import type { Poll, PollOption } from "@prisma/client";

interface PollData extends Poll {
  options: PollOption[];
}

interface PollStore {
  selectedPollData: PollData | null;
  setSelectedPollData: (poll: PollData) => void;
  resetSelectedPollData: () => void;
}

const usePollStore = create<PollStore>((set) => ({
  selectedPollData: null,
  setSelectedPollData: (poll: PollData) => set({ selectedPollData: poll }),
  resetSelectedPollData: () => set({ selectedPollData: null }),
}));

export default usePollStore;
