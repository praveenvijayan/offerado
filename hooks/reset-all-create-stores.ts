import { useEffect, useCallback } from "react";
import useCampaignStore from "@/stores/create-campaign-form";
import CampaignTypeStore from "@/stores/campaign-type";
import useProductStore from "@/stores/single-product-store";
import { useProductSelectionStore } from "@/stores/multiple-product-selection";
import useTemplateLiteralsStore from "@/stores/template-literals";

const useResetAllStores = () => {
  const { reset } = useCampaignStore();
  const { resetCampaignType, resetIsProductSelected } = CampaignTypeStore();
  const { resetSelectedProduct } = useProductStore();
  const { resetProducts } = useProductSelectionStore();
  const { resetTemplateLiterals } = useTemplateLiteralsStore();

  // Create a single reset function using useCallback
  const resetAll = useCallback(() => {
    reset();
    resetSelectedProduct();
    resetCampaignType();
    resetIsProductSelected();
    resetProducts();
    resetTemplateLiterals();
  }, [
    reset,
    resetCampaignType,
    resetIsProductSelected,
    resetSelectedProduct,
    resetProducts,
    resetTemplateLiterals,
  ]);

  return resetAll;
};

export default useResetAllStores;
