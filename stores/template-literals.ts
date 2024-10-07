import { create } from "zustand";

// Define the TypeScript type for the schema-less JSON structure
type TemplateLiteral = Record<string, any>;

interface TemplateLiteralsState {
  templateLiterals: TemplateLiteral;
  setTemplateLiteral: (templateId: string, data: any) => void;
  getTemplateLiteral: (templateId: string) => any;
  resetTemplateLiterals: () => void;
}

const useTemplateLiteralsStore = create<TemplateLiteralsState>((set, get) => ({
  // Initial state
  templateLiterals: {},

  // Set a template literal for a specific template ID
  setTemplateLiteral: (templateId, data) =>
    set((state) => ({
      templateLiterals: {
        ...state.templateLiterals,
        [templateId]: data,
      },
    })),

  // Get a template literal by template ID
  getTemplateLiteral: (templateId) =>
    get().templateLiterals[templateId] || null,

  // Reset the template literals to the initial empty state
  resetTemplateLiterals: () => set({ templateLiterals: {} }),
}));

export default useTemplateLiteralsStore;
