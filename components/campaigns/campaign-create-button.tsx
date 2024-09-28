import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { useRouter } from "next/navigation";
import useResetAllStores from "@/hooks/reset-all-create-stores";
import useProductStore from "@/stores/single-product-store";
import { useProductSelectionStore } from "@/stores/multiple-product-selection";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CampaignCreateButtonProps {
  className?: string;
}

export const CampaignCreateButton: React.FC<CampaignCreateButtonProps> = ({
  className,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const resetAllStores = useResetAllStores();
  const { selectedProduct } = useProductStore();
  const { selectedProducts } = useProductSelectionStore();

  const handleCreateClick = () => {
    if (selectedProduct || selectedProducts.length) {
      setDialogOpen(true);
      return;
    }
    resetAllStores();
    router.push("/campaigns/create");
  };

  const handleConfirm = () => {
    resetAllStores();
    router.push("/campaigns/create");
    setDialogOpen(false);
  };

  return (
    <>
      <Button
        size="sm"
        className={cn(
          className,
          "bg-green-600 text-white flex gap-1 rounded-2xl p-2 items-center text-xs hover:bg-green-700"
        )}
        variant="default"
        onClick={handleCreateClick}
      >
        <PlusIcon className="h-5 w-5" />
        Create Campaign
      </Button>

      {/* Dialog for unsaved changes */}
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unsaved Changes</DialogTitle>
            <DialogDescription>
              You have unsaved changes. Please save or discard your changes
              before creating a new campaign.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="default" onClick={handleConfirm}>
              Discard Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
