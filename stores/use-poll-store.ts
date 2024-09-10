import { create } from "zustand";

interface PollStore {
  votes: Record<string, number>;
  castVote: (id: string) => void;
}

export const usePollStore = create<PollStore>((set) => ({
  votes: {},
  castVote: (id: string) =>
    set((state) => ({
      votes: {
        ...state.votes,
        [id]: (state.votes[id] || 0) + 1,
      },
    })),
}));
