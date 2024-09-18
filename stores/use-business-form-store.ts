import create from "zustand";

// Define the types for the store
type BusinessFormValues = {
  name: string;
  description?: string;
  logo: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  currency: string;
  location: { lat: number; lng: number };
  isActive: boolean;
};

// Define the store interface
interface BusinessFormStore {
  businessForm: BusinessFormValues;
  setBusinessForm: (form: Partial<BusinessFormValues>) => void;
}

// Create Zustand store
export const useBusinessFormStore = create<BusinessFormStore>((set) => ({
  businessForm: {
    name: "",
    description: "",
    logo: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    currency: "",
    location: { lat: 0, lng: 0 },
    isActive: true,
  },
  setBusinessForm: (form: Partial<BusinessFormValues>) =>
    set((state) => ({
      businessForm: { ...state.businessForm, ...form },
    })),
}));
