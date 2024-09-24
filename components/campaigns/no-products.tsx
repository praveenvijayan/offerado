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
// Helper data structure to define campaign types
const campaignTypes = [
  {
    id: "SingleProduct",
    icon: BoxIcon,
    title: "Single Product Campaign",
    description: "Manage a single product campaign.",
    buttonText: "Single product campaign",
    buttonColor: "orange-200",
    actionText: "Single product action",
  },
  {
    id: "MultiProduct",
    icon: SquareLibrary,
    title: "Multi Product Campaign",
    description: "Manage a multi-product campaign.",
    buttonText: "Multi product campaign",
    buttonColor: "red-400",
    actionText: "Multi product action",
  },
  {
    id: "Quizzes",
    icon: FileQuestion,
    title: "Quizzes Campaign",
    description: "Create a customer engaging quizzes campaign.",
    buttonText: "Quizzes",
    buttonColor: "emerald-200",
    actionText: "Quiz action",
  },
  {
    id: "Contest",
    icon: ShipWheel,
    title: "Contest Campaign",
    description: "Create a customer engaging contest campaign.",
    buttonText: "Contest",
    buttonColor: "blue-400",
    actionText: "Contest action",
  },
  {
    id: "FeedbackForm",
    icon: FormInputIcon,
    title: "Feedback Form Campaign",
    description: "Create a feedback form campaign.",
    buttonText: "Feedback Form",
    buttonColor: "purple-400",
    actionText: "Feedback form action",
  },
  {
    id: "Poll",
    icon: CircleDot,
    title: "Poll Campaign",
    description: "Create a customer engaging poll campaign.",
    buttonText: "Poll",
    buttonColor: "yellow-400",
    actionText: "Poll action",
  },
];

// Reusable function to render campaign buttons and sheets
const RenderCampaign = ({
  id,
  icon: Icon,
  title,
  description,
  buttonText,
  buttonColor,
  actionText,
}: any) => {
  const { openSheet, open, close } = useSheetStore();
  const { setCampaignType, campaignType } = CampaignTypeStore();

  return (
    <>
      {/* Campaign Button */}
      <Button
        onClick={() => {
          open(id);
          setCampaignType(id);
        }}
        className={`rounded-xl p-6 flex flex-col justify-center text-center items-center gap-4 h-auto w-auto text-wrap`}
      >
        <Icon
          className={`w-14 h-14 stroke-black fill-${buttonColor} stroke-1`}
        />
        <p>{buttonText}</p>
      </Button>

      {/* Campaign Sheet */}
      <ReusableSheet
        open={openSheet === id}
        onOpenChange={close}
        title={title}
        description={description}
      >
        {id == "SingleProduct" && <SingleProduct />}
        {/* <p>{`This is the content for the ${buttonText.toLowerCase()}.`}</p> */}
      </ReusableSheet>
    </>
  );
};

const NoProducts = () => {
  return (
    <div className="flex flex-col py-2 gap-y-6">
      <h3 className="text-sm flex items-center gap-2">Select campaign type</h3>
      <div className="grid gap-4 grid-cols-6">
        {campaignTypes.slice(0, 2).map((campaign) => (
          <RenderCampaign key={campaign.id} {...campaign} />
        ))}
      </div>

      <h3 className="text-sm flex items-center gap-2">
        Or select a customer engaging campaign
      </h3>
      <div className="grid gap-4 grid-cols-6">
        {campaignTypes.slice(2).map((campaign) => (
          <RenderCampaign key={campaign.id} {...campaign} />
        ))}
      </div>
    </div>
  );
};

export default NoProducts;
