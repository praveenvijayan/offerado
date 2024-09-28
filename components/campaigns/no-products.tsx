"use client";
import {
  ArrowLeft,
  BoxIcon,
  CircleDot,
  FileQuestion,
  FormInputIcon,
  ShipWheel,
  SquareLibrary,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ReusableSheet from "@/components/global/reusable-sheet";
import useSheetStore from "@/stores/sheet-store";
import { useRouter } from "next/navigation";
import SingleProduct from "@/components/campaigns/single-product/single-product";
import useCampaignStore from "@/stores/campaign-type";
import CampaignTypeStore from "@/stores/campaign-type";
import MultiProductDisplay from "./multi-product/multi-product-display";
import MultiProduct from "./multi-product/multi-product";
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
  const { openSheet, open, close } = useSheetStore();
  const { setCampaignType, campaignType } = CampaignTypeStore();

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
    <>
      <Button
        onClick={() => {
          open(id);
          setCampaignType(id);
        }}
        className={`rounded-xl p-6 flex flex-col justify-center text-center items-center gap-4 h-auto w-auto text-wrap`}
      >
        {IconComponent && (
          <IconComponent
            className={`w-14 h-14 stroke-black fill-${buttonColor} stroke-1`}
          />
        )}
        <p>{buttonText}</p>
      </Button>
    </>
  );
};

const NoProducts = () => {
  return (
    <div className="flex flex-col py-2 gap-y-6">
      <h3 className="text-sm flex items-center gap-2">Select campaign type</h3>
      <div className="grid gap-4 grid-cols-6">
        {campaignTypes.slice(0, 2).map((campaign: any) => (
          <RenderCampaign key={campaign.id} {...campaign} />
        ))}
      </div>

      <h3 className="text-sm flex items-center gap-2">
        Or select a customer engaging campaign
      </h3>
      <div className="grid gap-4 grid-cols-6">
        {campaignTypes.slice(2).map((campaign: any) => (
          <RenderCampaign key={campaign.id} {...campaign} />
        ))}
      </div>
    </div>
  );
};

export default NoProducts;
