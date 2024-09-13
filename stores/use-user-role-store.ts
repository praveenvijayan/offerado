// stores/use-user-role-store.ts
import { create } from "zustand";

interface UserRoleState {
  role: string;
  step: number;
  setRole: (role: string) => void;
  nextStep: () => void;
  resetRole: () => void;
}

export const useUserRoleStore = create<UserRoleState>((set) => ({
  role: "",
  step: 1,
  setRole: (role) => set({ role }),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  resetRole: () => set({ role: "", step: 1 }),
}));
