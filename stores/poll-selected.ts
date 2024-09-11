import { create } from "zustand";

interface PollStoreState {
  selectedPoll: number | null;
  selectPoll: (id: number) => void;
}

const usePollStore = create<PollStoreState>((set) => ({
  selectedPoll: null,
  selectPoll: (id: number) => set({ selectedPoll: id }),
}));

export default usePollStore;
