"use client";
import { useRouter } from "next/navigation";
import useCampaignStore from "@/stores/create-campaign-form";
import {
  BoxIcon,
  CircleDot,
  FileQuestion,
  FormInputIcon,
  ShipWheel,
  SquareLibrary,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Campaigns() {
  const router = useRouter();
  const setCampaignType = useCampaignStore((state) => state.setCampaignType);

  const handleCampaignSelection = (type: string) => {
    setCampaignType(type);
    router.push("/campaigns/create");
  };

  return (
    <div className="flex flex-col p-6 gap-y-6">
      <h3 className="text-xl">Create a new campaign</h3>
      <div className="grid gap-4 grid-cols-4">
        <Button
          onClick={() => handleCampaignSelection("Single Product")}
          className="rounded-xl p-6 flex flex-col justify-center text-center items-center gap-4 h-auto w-auto"
        >
          <BoxIcon className="w-14 h-14 stroke-black fill-orange-200 stroke-1" />
          <p>Single product campaign</p>
        </Button>
        <Button
          onClick={() => handleCampaignSelection("Multi Product")}
          className="rounded-xl p-6 flex flex-col justify-center text-center items-center gap-4 h-auto w-auto"
        >
          <SquareLibrary className="w-16 h-16 stroke-black fill-red-400 stroke-1" />
          <p>Multi product campaign</p>
        </Button>
      </div>

      <h3 className="text-xl">Create a customer engaging campaign</h3>
      <div className="grid gap-4 grid-cols-4">
        <Button
          onClick={() => handleCampaignSelection("Quizzes")}
          className="rounded-xl p-6 flex flex-col justify-center text-center items-center gap-4 h-auto w-auto"
        >
          <FileQuestion className="w-14 h-14 stroke-black fill-emerald-200 stroke-1" />
          <p>Quizzes</p>
        </Button>
        <Button
          onClick={() => handleCampaignSelection("Contest")}
          className="rounded-xl p-6 flex flex-col justify-center text-center items-center gap-4 h-auto w-auto"
        >
          <ShipWheel className="w-16 h-16 stroke-black fill-blue-400 stroke-1" />
          <p>Create contest</p>
        </Button>
        <Button
          onClick={() => handleCampaignSelection("Feedback Form")}
          className="rounded-xl p-6 flex flex-col justify-center text-center items-center gap-4 h-auto w-auto"
        >
          <FormInputIcon className="w-16 h-16 stroke-black fill-purple-400 stroke-1" />
          <p>Feedback form</p>
        </Button>
        <Button
          onClick={() => handleCampaignSelection("Poll")}
          className="rounded-xl p-6 flex flex-col justify-center text-center items-center gap-4 h-auto w-auto"
        >
          <CircleDot className="w-16 h-16 stroke-black fill-yellow-400 stroke-1" />
          <p>Poll</p>
        </Button>
      </div>
    </div>
  );
}
