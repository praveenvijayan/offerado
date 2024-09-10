// stores/store.ts
import { create } from "zustand";

interface Template {
  id: string;
  name: string;
  image: string;
}

interface IframeSize {
  width: string;
  height: string;
}

interface TemplateStore {
  templates: Template[];
  selectedTemplate: string | null;
  iframeSize: IframeSize;
  setSelectedTemplate: (id: string) => void;
  setIframeSize: (type: "desktop" | "mobile") => void;
}

export const useTemplateStore = create<TemplateStore>((set) => ({
  templates: [
    {
      id: "template-1",
      name: "Template 1",
      image: "https://placehold.co/120x160.png",
    },
    {
      id: "template-2",
      name: "Template 2",
      image: "https://placehold.co/120x160.png",
    },
  ],
  selectedTemplate: null,
  iframeSize: { width: "100%", height: "800px" },
  setSelectedTemplate: (id) => set({ selectedTemplate: id }),
  setIframeSize: (type) =>
    set({
      iframeSize:
        type === "desktop"
          ? { width: "100%", height: "800px" }
          : { width: "375px", height: "667px" },
    }),
}));
