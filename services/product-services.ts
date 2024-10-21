import { useQuery } from "@tanstack/react-query";

const API_URL = "/api/products";

// Fetch all products
export const fetchProducts = async () => {
  const response = await fetch("/api/products");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
