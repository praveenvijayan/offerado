"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Edit } from "lucide-react";
import React, { useState } from "react";
import CampaignDialogForm from "@/components/campaigns/campaign-dialog-form"; // Import the new dialog form component
import useCampaignStore from "@/stores/create-campaign-form";
import { Badge } from "../ui/badge";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import type { Offer } from "@prisma/client";

const CampaignHeader = () => {
  const { title, description, start, expiry, isActive } = useCampaignStore();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const params = useParams();
  const id = params.id;

  let campaign;
  let isLoading = false;

  if (id) {
    campaign = queryClient.getQueryData<Offer>(["campaign", id]);
    isLoading = !campaign;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex gap-2 items-center">
        <h3 className="text-xl">{title || "Untitled campaign"} </h3>
        {campaign && (
          <Badge variant={"secondary"} className="text-xs">
            {campaign.isActive ? "Published" : "Draft"}
          </Badge>
        )}

        <Button variant="ghost" size={"icon"} onClick={() => setOpen(true)}>
          <Edit className="h-4 w-4 stroke-green-500" />
        </Button>
      </div>
      <div className="flex gap-2 items-center">
        <h4 className="text-sm">{description || "Campaign description"}</h4>

        <Separator orientation="vertical" className="h-4" />
        <h5 className="text-sm">
          {format(new Date(start || new Date()), "LLL dd, y")} -{" "}
          {format(new Date(expiry || new Date()), "LLL dd, y")}
        </h5>
      </div>

      {/* Render the dialog form */}
      <CampaignDialogForm open={open} setOpen={setOpen} />
    </div>
  );
};

export default CampaignHeader;
