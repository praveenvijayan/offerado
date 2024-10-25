import { useQuery, useMutation } from "@tanstack/react-query";
import type { Product } from "@prisma/client";
import { toast } from "sonner";
import Message from "@/components/feedback/feedback-form";

const API_URL = "/api/products";

// Fetch all products
export const fetchProducts = async () => {
  const response = await fetch("/api/products");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

const uploadProducts = async (products: Product[]) => {
  const response = await fetch("/api/products/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(products),
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    throw new Error(errorDetails?.error || "Failed to upload products");
  }

  return response.json();
};

export const useUploadProducts = () => {
  return useMutation({
    mutationFn: uploadProducts,
    onSuccess: (data) => {
      console.log("Upload successful:", data);
      toast.success(data.message);
    },
    onError: (error) => {
      // Handle error, e.g., show an error message
      toast.error(`Products uploaded failed ${error}`);
      console.error("Upload failed:", error);
    },
  });
};
