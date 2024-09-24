"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Edit } from "lucide-react";
import React, { useState } from "react";
import CampaignDialogForm from "@/components/campaigns/campaign-dialog-form"; // Import the new dialog form component
import useCampaignStore from "@/stores/create-campaign-form";

const CampaignHeader = () => {
  const { title, description, start, expiry } = useCampaignStore();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h3 className="text-xl">{title || "Untitled campaign"}</h3>
      <div className="flex gap-2 items-center">
        <h4 className="text-sm">{description || "Campaign description"}</h4>
        <Separator orientation="vertical" className="h-4" />
        <h5 className="text-sm">
          {format(new Date(start || new Date()), "LLL dd, y")} -{" "}
          {format(new Date(expiry || new Date()), "LLL dd, y")}
        </h5>

        {/* Trigger the dialog externally */}
        <Button variant="ghost" size={"icon"} onClick={() => setOpen(true)}>
          <Edit className="h-4 w-4 stroke-green-500" />
        </Button>
      </div>

      {/* Render the dialog form */}
      <CampaignDialogForm open={open} setOpen={setOpen} />
    </div>
  );
};

export default CampaignHeader;
