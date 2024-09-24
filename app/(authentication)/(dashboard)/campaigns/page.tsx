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
        <Link
          href={"/campaigns/create"}
          className="ml-2 bg-green-600 text-white flex gap-1 rounded-xl p-2 items-center text-sm hover:bg-green-700"
        >
          <Plus className="w-4 h-4" />
          Add new campaign
        </Link>
      </div>
    </div>
  );
}
