import { create } from "zustand";

interface TabsState {
  activeTab: string;
  stepsCompleted: {
    details: boolean;
    components: boolean;
    theme: boolean;
    preview: boolean;
  };
  setActiveTab: (tab: string) => void;
  completeStep: (step: keyof TabsState["stepsCompleted"]) => void;
  moveToNextTab: () => void;
  moveToPreviousTab: () => void;
  reset: () => void;
}

const tabsOrder = ["details", "components", "theme", "preview"];

const getNextTab = (currentTab: string): string => {
  const currentIndex = tabsOrder.indexOf(currentTab);
  return tabsOrder[currentIndex + 1] || "preview";
};

const getPreviousTab = (currentTab: string): string => {
  const currentIndex = tabsOrder.indexOf(currentTab);
  return tabsOrder[currentIndex - 1] || "details";
};

const useTabsStore = create<TabsState>((set) => ({
  activeTab: "details",
  stepsCompleted: {
    details: false,
    components: false,
    theme: false,
    preview: false,
  },
  setActiveTab: (tab) => set({ activeTab: tab }),
  completeStep: (step) =>
    set((state) => ({
      stepsCompleted: { ...state.stepsCompleted, [step]: true },
    })),
  moveToNextTab: () =>
    set((state) => {
      const nextTab = getNextTab(state.activeTab);
      return { activeTab: nextTab };
    }),
  moveToPreviousTab: () =>
    set((state) => {
      const previousTab = getPreviousTab(state.activeTab);
      return { activeTab: previousTab };
    }),
  reset: () =>
    set({
      activeTab: "details",
      stepsCompleted: {
        details: false,
        components: false,
        theme: false,
        preview: false,
      },
    }),
}));

export default useTabsStore;
