// hooks/useSetBusinessAsDefault.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setBusinessAsDefault } from "@/services/business-services";
import { toast } from "sonner";
import useOrganizationStore from "@/stores/organization";

export const useSetBusinessAsDefault = () => {
  const queryClient = useQueryClient();
  const { organization } = useOrganizationStore();

  const mutation = useMutation({
    mutationFn: ({
      businessId,
      organizationId,
    }: {
      businessId: string;
      organizationId: string;
    }) => setBusinessAsDefault(businessId, organizationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organization", organization?.email],
      });
      toast.success("Business set as default successfully");
    },
    onError: (error: any) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleSetAsDefault = (businessId: string, organizationId: string) => {
    mutation.mutate({
      businessId,
      organizationId,
    });
  };

  return { handleSetAsDefault, isPending: mutation.isPending };
};
