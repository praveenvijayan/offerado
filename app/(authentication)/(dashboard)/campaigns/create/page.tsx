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

type OfferData = Product[] | PollData[] | FeedbackForm[];

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
        return selectedProducts || [];
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
  function isProductArray(data: OfferData): data is Product[] {
    return data.length > 0 && "sku" in data[0];
  }

  function isPollDataArray(data: OfferData): data is PollData[] {
    return data.length > 0 && "title" in data[0] && "options" in data[0];
  }

  function isFeedbackFormArray(data: OfferData): data is FeedbackForm[] {
    return data.length > 0 && "title" in data[0] && "description" in data[0];
  }

  const handleCampaignCreation = () => {
    if (!title || !description || !start || !expiry || !campaignType) {
      setOpen(true);
      return;
    }

    const productsOrData = buildOfferJSON();

    let newCampaign: NewCampaign = {
      title,
      description,
      offerType: campaignType as CampaignType,
      startAt: new Date(start),
      endAt: new Date(expiry),
      qrCode: "QRCODE123",
      interactiveType: null,
      businessId: "",
      organizationId: "",
      offerJSON: { data: [] },
    };

    if (isProductArray(productsOrData)) {
      const products = productsOrData;

      if (products.length === 0) {
        toast.error("No products selected for the campaign.");
        return;
      }

      newCampaign.businessId = products[0].businessId;
      newCampaign.organizationId = products[0].organizationId;
      newCampaign.offerJSON = {
        data: products.map((product) => ({
          // Include necessary product fields
          ...product,
        })),
      };
    } else if (isPollDataArray(productsOrData)) {
      const pollData = productsOrData[0];

      if (!pollData) {
        toast.error("No poll data selected for the campaign.");
        return;
      }

      newCampaign.businessId = pollData.businessId;
      newCampaign.organizationId = pollData.organizationId;
      newCampaign.offerJSON = {
        data: {
          title: pollData.title,
          options: pollData.options,
          // Include other poll-specific fields if necessary
        },
      };
    } else if (isFeedbackFormArray(productsOrData)) {
      const feedbackForm = productsOrData[0];

      if (!feedbackForm) {
        toast.error("No feedback form selected for the campaign.");
        return;
      }

      newCampaign.businessId = feedbackForm.businessId;
      newCampaign.organizationId = feedbackForm.organizationId;
      newCampaign.offerJSON = {
        data: {
          title: feedbackForm.title,
          description: feedbackForm.description,
        },
      };
    } else {
      // Handle other campaign types here
      newCampaign.offerJSON = { data: [] };
    }

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
