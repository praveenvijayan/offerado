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
import { useRouter } from "next/navigation";
import NoProducts from "@/components/campaigns/no-products";
import CampaignHeader from "@/components/campaigns/campaign-header";

export default function CreateCampaignPage() {
  const router = useRouter();
  const handleClick = () => router.push("/campaigns");
  return (
    <div className="flex flex-col gap-4 h-[88vh] w-full">
      <div className="flex w-full items-center h-fit gap-2">
        <Button variant={"ghost"} size={"sm"} onClick={handleClick}>
          <ArrowLeft />
        </Button>
        <CampaignHeader />
        <div className="ml-auto justify-self-end flex gap-2">
          <Button variant={"outline"} size={"sm"} onClick={handleClick}>
            Add Products
          </Button>
          <Button variant={"outline"} size={"sm"} onClick={handleClick}>
            Add Components
          </Button>
        </div>
      </div>
      <Separator />
      <NoProducts />
    </div>
  );
}
