import React from "react";
import ReusableSheet from "@/components/global/reusable-sheet";
import useSheetStore from "@/stores/sheet-store";
import CampaignTypeStore from "@/stores/campaign-type";
import SingleProduct from "@/components/campaigns/single-product/single-product";
import MultiProduct from "@/components/campaigns/multi-product/multi-product";

const CampaignSheet = ({ id, title, description }: any) => {
  const { openSheet, close } = useSheetStore();

  return (
    <ReusableSheet
      open={openSheet === id}
      onOpenChange={close}
      title={title}
      description={description}
    >
      {id === "SingleProduct" && <SingleProduct />}
      {id === "MultiProduct" && <MultiProduct />}
    </ReusableSheet>
  );
};

export default CampaignSheet;
