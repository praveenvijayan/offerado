"use client";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import NoProducts from "@/components/campaigns/no-products";
import CampaignHeader from "@/components/campaigns/campaign-header";
import CampaignTypeStore from "@/stores/campaign-type";
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
import PollDisplay from "@/components/campaigns/poll/poll-display";
import usePollStore from "@/stores/poll";
import type { Product, Poll, PollOption, FeedbackForm } from "@prisma/client";
import FeedbackDisplay from "@/components/campaigns/feedback/feedback-display";
import useFeedbackStore from "@/stores/feedback";
import { useCombinedItemsStore } from "@/stores/combined-items-store";
import useOrganizationStore from "@/stores/organization";
import { Popover, PopoverContent } from "@/components/ui/popover";

// Enums and Interfaces
enum CampaignType {
  SingleProduct = "SingleProduct",
  MultiProduct = "MultiProduct",
  Poll = "Poll",
  Feedback = "FeedbackForm",
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

// Strategy Interface
interface OfferStrategy {
  buildOffer(): OfferData;
}

// Concrete Strategies
class SingleProductStrategy implements OfferStrategy {
  constructor(private selectedProduct: Product | null) {}

  buildOffer(): OfferData {
    return this.selectedProduct ? [this.selectedProduct] : [];
  }
}

class MultiProductStrategy implements OfferStrategy {
  constructor(private combinedItems: any[]) {}

  buildOffer(): OfferData {
    return this.combinedItems;
  }
}

class PollStrategy implements OfferStrategy {
  constructor(private selectedPollData: PollData | null) {}

  buildOffer(): OfferData {
    return this.selectedPollData ? [this.selectedPollData] : [];
  }
}

class FeedbackStrategy implements OfferStrategy {
  constructor(private selectedFeedbackData: FeedbackForm | null) {}

  buildOffer(): OfferData {
    return this.selectedFeedbackData ? [this.selectedFeedbackData] : [];
  }
}

// Factory Class
class CampaignFactory {
  static createCampaign(
    campaignData: Omit<
      NewCampaign,
      "qrCode" | "interactiveType" | "templateLiteral"
    >,
    qrCode: string = "QRCODE123",
    interactiveType: null | string = null,
    templateLiteral: {} = {}
  ): NewCampaign {
    return {
      ...campaignData,
      qrCode,
      interactiveType,
      templateLiteral,
    };
  }
}

// Type Guards
function isProduct(item: any): item is Product {
  return item && "sku" in item;
}

function isPollData(item: any): item is PollData {
  return item && "options" in item;
}

function isFeedbackForm(item: any): item is FeedbackForm {
  return item && "description" in item;
}

export default function CreateCampaignPage() {
  const router = useRouter();
  const handleClick = () => router.push("/campaigns");
  const campaignType = CampaignTypeStore((state) => state.campaignType);
  const isProductSelected = CampaignTypeStore(
    (state) => state.isProductSelected
  );
  const { open: openReusableSheet } = useSheetStore();
  const campaign = campaignTypes.find((c) => c.id === campaignType);
  const { selectedPollData } = usePollStore();
  const { selectedFeedbackData } = useFeedbackStore();
  const { selectedProduct } = useProductStore();
  const { title, description, start, expiry } = useCampaignStore();
  const { organization, currentBusinessId } = useOrganizationStore();

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

  // Strategy Selector
  const getOfferStrategy = (): OfferStrategy => {
    switch (campaignType) {
      case CampaignType.SingleProduct:
        return new SingleProductStrategy(selectedProduct);
      case CampaignType.MultiProduct:
        return new MultiProductStrategy(combinedItems);
      case CampaignType.Poll:
        return new PollStrategy(selectedPollData);
      case CampaignType.Feedback:
        return new FeedbackStrategy(selectedFeedbackData);
      default:
        throw new Error("Invalid campaign type");
    }
  };

  // Handle Campaign Creation
  const handleCampaignCreation = () => {
    if (!title || !description || !start || !expiry || !campaignType) {
      toast.error("Please fill the campaign title, description and dates.");
      // console.error("Missing required fields");
      // setOpen(true);
      return;
    }

    const offerStrategy = getOfferStrategy();
    const offers = offerStrategy.buildOffer();

    if (offers.length === 0) {
      toast.error("No items selected for the campaign.");
      return;
    }

    const campaignData = {
      title,
      description,
      offerType: campaignType as CampaignType,
      startAt: new Date(start),
      endAt: new Date(expiry),
      businessId: currentBusinessId as string,
      organizationId: organization?.id as string,
      offerJSON: { data: offers.map(mapOfferItem) },
    };

    const newCampaign = CampaignFactory.createCampaign(campaignData);

    mutation.mutate(newCampaign);
  };

  // Helper Function
  const mapOfferItem = (item: any) => {
    if (isProduct(item)) {
      return {
        ...item,
        itemType: "product",
        // Additional product fields
      };
    } else if (isPollData(item)) {
      return {
        ...item,
        itemType: "poll",
        // Additional poll fields
      };
    } else if (isFeedbackForm(item)) {
      return {
        ...item,
        itemType: "feedback",
        // Additional feedback fields
      };
    }
    return item;
  };

  return (
    <div className="flex flex-col">
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
        {/* Conditional Rendering for Adding Components */}
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
        {campaignType === CampaignType.SingleProduct && !selectedProduct && (
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
      <Separator className="mb-4 mt-4" />
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
