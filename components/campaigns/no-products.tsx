"use client";
import {
  BoxIcon,
  CircleDot,
  FileQuestion,
  FormInputIcon,
  ShipWheel,
  SquareLibrary,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import useSheetStore from "@/stores/sheet-store";
import CampaignTypeStore from "@/stores/campaign-type";
import campaignTypes from "@/data/campaign-types.json";

// Reusable function to render campaign buttons and sheets
const RenderCampaign = ({
  id,
  icon,
  title,
  description,
  buttonText,
  buttonColor,
  actionText,
}: any) => {
  const { open } = useSheetStore();
  const { setCampaignType } = CampaignTypeStore();

  const iconComponents = {
    BoxIcon,
    SquareLibrary,
    FileQuestion,
    FormInputIcon,
    ShipWheel,
    CircleDot,
  } as any;

  const IconComponent = iconComponents[icon];

  return (
    <Button
      onClick={() => {
        open(id);
        setCampaignType(id);
      }}
      className={`bg-muted-foreground/90 rounded-xl p-6 flex flex-col justify-center text-center items-center gap-4 h-auto w-auto text-wrap`}
    >
      {IconComponent && (
        <IconComponent
          className={`w-14 h-14 dark:stroke-black fill-${buttonColor} stroke-1`}
        />
      )}
      <p>{buttonText}</p>
    </Button>
  );
};

const NoProducts = () => {
  return (
    <div className="flex flex-col py-2 gap-y-6">
      <h3 className="text-sm flex items-center gap-2">Select campaign type</h3>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-6">
        {campaignTypes.slice(0, 2).map((campaign: any) => (
          <RenderCampaign key={campaign.id} {...campaign} />
        ))}
      </div>

      <h3 className="text-sm flex items-center gap-2">
        Or select a customer engaging campaign
      </h3>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-6">
        {campaignTypes.slice(2).map((campaign: any) => (
          <RenderCampaign key={campaign.id} {...campaign} />
        ))}
      </div>
    </div>
  );
};

export default NoProducts;
