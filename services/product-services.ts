import { useQuery } from "@tanstack/react-query";
import type { Product } from "@prisma/client";

// API endpoint for products
const API_URL = "http://localhost:3000/api/products";

// Fetch all products
const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

// Hook to fetch all products
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};
