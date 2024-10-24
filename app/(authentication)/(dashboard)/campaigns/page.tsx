"use client";
import { useEffect } from "react";
import CampaignTable from "@/components/campaigns/campaign-listing";
import useResetAllStores from "@/hooks/reset-all-create-stores";

export default function Campaigns() {
  const resetAllStores = useResetAllStores();

  useEffect(() => {
    resetAllStores();
  }, [resetAllStores]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Campaigns</h3>
      <CampaignTable />
    </div>
  );
}
