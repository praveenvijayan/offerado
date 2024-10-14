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
  currentBusinessId: string | null; // Add currentBusinessId
  setOrganization: (org: Organization) => void;
  clearOrganization: () => void;
}

const useOrganizationStore = create<OrganizationStore>((set) => ({
  organization: null,
  currentBusinessId: null, // Initialize currentBusinessId to null
  setOrganization: (org: Organization) => {
    // Find the business where isDefault is true
    const defaultBusiness = org.businesses.find(
      (business) => business.isDefault
    );

    set({
      organization: org,
      currentBusinessId: defaultBusiness ? defaultBusiness.id : null, // Set currentBusinessId based on isDefault
    });
  },
  clearOrganization: () => set({ organization: null, currentBusinessId: null }), // Clear both organization and currentBusinessId
}));

export default useOrganizationStore;
