"use client";
import { useRouter } from "next/navigation";
import useCampaignStore from "@/stores/create-campaign-form";
import {
  BoxIcon,
  CircleDot,
  FileQuestion,
  FormInputIcon,
  Plus,
  ShipWheel,
  SquareLibrary,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import useTabsStore from "@/stores/campaign-tabs";
import { useEffect } from "react";
import useProductsStore from "@/stores/use-product-store";
import Link from "next/link";

export default function Campaigns() {
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
