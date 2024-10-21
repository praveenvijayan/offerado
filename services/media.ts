import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
const fetchImages = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const response = await axios.get("/api/media/get-media", {
    params: { page, limit },
  });
  return response.data;
};

export const useGetAllImages = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["images", page, limit],
    queryFn: () => fetchImages({ page, limit }),
  });
};

// Delete files
const deleteFile = async (url: string) => {
  const response = await fetch(
    `/api/media/delete?url=${encodeURIComponent(url)}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete the file");
  }

  return response.json();
};

export const useDeleteFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      // Invalidate or refetch the media list if needed
      queryClient.invalidateQueries({ queryKey: ["images"] });
      toast.success("File deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting file:", error);
      toast.error("Error deleting file!");
    },
  });
};
