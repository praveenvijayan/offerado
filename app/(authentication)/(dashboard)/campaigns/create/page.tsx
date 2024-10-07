"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import NoProducts from "@/components/campaigns/no-products";
import CampaignHeader from "@/components/campaigns/campaign-header";
import CampaignTypeStore from "@/stores/campaign-type";
import { useEffect, useState } from "react";
import SingleProductDisplay from "@/components/campaigns/single-product/single-product-display";
import useProductStore from "@/stores/single-product-store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCampaign } from "@/services/campaign-service";
import useCampaignStore from "@/stores/create-campaign-form";
import CampaignDialogForm from "@/components/campaigns/campaign-dialog-form";
import MultiProductDisplay from "@/components/campaigns/multi-product/multi-product-display";
import useSheetStore from "@/stores/sheet-store";
import CampaignSheet from "@/components/campaigns/campaign-sheet";
import campaignTypes from "@/data/campaign-types.json";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { useProductSelectionStore } from "@/stores/multiple-product-selection";
import PollDisplay from "@/components/campaigns/poll/poll-display";
import usePollStore from "@/stores/poll";
import type {
  Offer,
  Product,
  Poll,
  PollOption,
  FeedbackForm,
} from "@prisma/client";
import FeedbackDisplay from "@/components/campaigns/feedback/feedback-display";
import useFeedbackStore from "@/stores/feedback";
import { useCombinedItemsStore } from "@/stores/combined-items-store";

// 1. Define enums and interfaces
enum CampaignType {
  SingleProduct = "SingleProduct",
  MultiProduct = "MultiProduct",
  Poll = "Poll",
  Feedback = "FeedbackForm",
  // Add other campaign types as needed
}

interface PollData extends Poll {
  options: PollOption[];
  businessId: string;
  organizationId: string;
}

type OfferData = (Product | PollData | FeedbackForm)[];

interface NewCampaign {
  title: string;
  description: string;
  offerType: CampaignType;
  startAt: Date;
  endAt: Date;
  qrCode: string;
  interactiveType: null | string;
  businessId: string;
  organizationId: string;
  offerJSON: { data: any };
  templateLiteral: {};
}

export default function CreateCampaignPage() {
  const router = useRouter();
  const handleClick = () => router.push("/campaigns");
  const campaignType = CampaignTypeStore((state) => state.campaignType);
  const isProductSelected = CampaignTypeStore(
    (state) => state.isProductSelected
  );
  const { selectedProduct: selectedSingleProduct } = useProductStore();
  const { openSheet, open: openReusableSheet } = useSheetStore();
  const campaign = campaignTypes.find((c) => c.id === campaignType);
  const { selectedPollData } = usePollStore();
  const { selectedFeedbackData } = useFeedbackStore();
  const selectedProduct = useProductStore((state) => state.selectedProduct);
  const selectedProducts = useProductSelectionStore(
    (state) => state.selectedProducts
  );
  const { title, description, start, expiry, reset } = useCampaignStore();

  const [open, setOpen] = useState(false);

  const { combinedItems } = useCombinedItemsStore();

  const mutation = useMutation({
    mutationFn: createCampaign,
    onSuccess: (data) => {
      toast.success("Campaign created successfully!");
      router.push(`/campaigns/preview?id=${data.id}`);
    },
    onError: (error) => {
      toast.error("Failed to create campaign");
      console.error("Error creating campaign:", error);
    },
  });

  // 2. Adjust buildOfferJSON function with explicit return types
  const buildOfferJSON = (): OfferData => {
    switch (campaignType) {
      case CampaignType.SingleProduct:
        return selectedProduct ? [selectedProduct] : [];
      case CampaignType.MultiProduct:
        return combinedItems;
      case CampaignType.Poll:
        return selectedPollData ? [selectedPollData as PollData] : [];
      case CampaignType.Feedback:
        return selectedFeedbackData
          ? [selectedFeedbackData as FeedbackForm]
          : [];
      default:
        return [];
    }
  };

  // 2. Implement type guards
  function isProduct(item: any): item is Product {
    return item && "sku" in item;
  }

  function isPollData(item: any): item is PollData {
    return item && "options" in item;
  }

  function isFeedbackForm(item: any): item is FeedbackForm {
    return item && "description" in item;
  }

  const handleCampaignCreation = () => {
    if (!title || !description || !start || !expiry || !campaignType) {
      setOpen(true);
      return;
    }

    const offers = buildOfferJSON();

    if (offers.length === 0) {
      toast.error("No items selected for the campaign.");
      return;
    }

    // Assume the first item's businessId and organizationId apply to all
    const firstItem = offers[0];
    const newCampaign: NewCampaign = {
      title,
      description,
      offerType: campaignType as CampaignType,
      startAt: new Date(start),
      endAt: new Date(expiry),
      qrCode: "QRCODE123",
      interactiveType: null,
      businessId: firstItem.businessId,
      organizationId: firstItem.organizationId,
      offerJSON: { data: [] },
      templateLiteral: {},
    };

    newCampaign.offerJSON.data = offers.map((item) => {
      if (isProduct(item)) {
        return {
          ...item,
          itemType: "product",
          // Include additional product-specific fields if necessary
        };
      } else if (isPollData(item)) {
        return {
          ...item,
          itemType: "poll",
          // Include additional poll-specific fields if necessary
        };
      } else if (isFeedbackForm(item)) {
        return {
          ...item,
          itemType: "feedback",
          // Include additional feedback-specific fields if necessary
        };
      }
      return item;
    });

    // Trigger the mutation to create the campaign
    mutation.mutate(newCampaign);
  };

  return (
    <div className="flex flex-col gap-4 h-[88vh] w-full">
      <div className="flex w-full items-center h-fit gap-2">
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={handleClick}
          className="hidden"
        >
          <ArrowLeft />
        </Button>
        <CampaignHeader />
        {campaignType === CampaignType.Feedback && !selectedFeedbackData && (
          <div className="ml-auto justify-self-end gap-2 flex">
            <Button
              size={"sm"}
              onClick={() => openReusableSheet("FeedbackForm")}
            >
              Add Feedback
            </Button>
          </div>
        )}
        {campaignType === CampaignType.Poll && !selectedPollData && (
          <div className="ml-auto justify-self-end gap-2 flex">
            <Button size={"sm"} onClick={() => openReusableSheet("Poll")}>
              Add Poll
            </Button>
          </div>
        )}
        {campaignType === CampaignType.SingleProduct &&
          !selectedSingleProduct && (
            <div className="ml-auto justify-self-end gap-2 flex">
              <Button
                size={"sm"}
                onClick={() => openReusableSheet("SingleProduct")}
              >
                Add Product
              </Button>
            </div>
          )}
        {campaignType === CampaignType.MultiProduct && isProductSelected && (
          <div className="ml-auto justify-self-end gap-2 flex">
            <Button
              size={"sm"}
              onClick={() => openReusableSheet("MultiProduct")}
            >
              Add Products
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size={"sm"} className="flex gap-1 pr-1">
                  Add Components <DotsVerticalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Components</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => {
                      openReusableSheet("Quizzes");
                    }}
                  >
                    Quizzes
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => openReusableSheet("Contest")}
                  >
                    Contest
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => openReusableSheet("FeedbackForm")}
                  >
                    Feedback Form
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => openReusableSheet("Poll")}>
                    Poll
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      <Separator />
      {!isProductSelected && <NoProducts />}
      {campaignType === CampaignType.SingleProduct && isProductSelected && (
        <SingleProductDisplay />
      )}
      {campaignType === CampaignType.MultiProduct && isProductSelected && (
        <MultiProductDisplay />
      )}
      {campaignType === CampaignType.Poll && isProductSelected && (
        <PollDisplay />
      )}
      {campaignType === CampaignType.Feedback && isProductSelected && (
        <FeedbackDisplay />
      )}
      {isProductSelected && (
        <div className="flex justify-end gap-2 ">
          <Button
            className="bg-green-500 rounded-2xl"
            onClick={handleCampaignCreation}
          >
            Continue
          </Button>
        </div>
      )}
      <CampaignDialogForm open={open} setOpen={setOpen} />
      {campaignType && (
        <CampaignSheet
          id={campaign?.id}
          title={campaign?.title}
          description={campaign?.description}
        />
      )}
    </div>
  );
}
