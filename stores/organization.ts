import { create } from "zustand";
import type {
  Organization as PrismaOrganization,
  Business,
} from "@prisma/client";

// Extend the Prisma Organization type to include businesses relation
interface Organization extends PrismaOrganization {
  businesses: Business[]; // Include businesses relation
}

interface OrganizationStore {
  organization: Organization | null;
  setOrganization: (org: Organization) => void;
  clearOrganization: () => void;
}

const useOrganizationStore = create<OrganizationStore>((set) => ({
  organization: null,
  setOrganization: (org) => set({ organization: org }),
  clearOrganization: () => set({ organization: null }),
}));

export default useOrganizationStore;
