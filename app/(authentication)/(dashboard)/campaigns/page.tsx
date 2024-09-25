"use client";
import useCampaignStore from "@/stores/create-campaign-form";
import { useEffect } from "react";
import CampaignTypeStore from "@/stores/campaign-type";
import useProductStore from "@/stores/single-product-store";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function Campaigns() {
  const { reset } = useCampaignStore();
  const { resetCampaignType, resetIsProductSelected } = CampaignTypeStore();
  const { resetSelectedProduct } = useProductStore();

  useEffect(() => {
    reset();
    resetSelectedProduct();
    resetCampaignType();
    resetIsProductSelected();
  }, [reset, resetCampaignType, resetIsProductSelected, resetSelectedProduct]);

  return (
    <div className="flex flex-col ">
      <div className="flex justify-between w-full items-center">
        <h3>Campaigns</h3>
      </div>
    </div>
  );
}
