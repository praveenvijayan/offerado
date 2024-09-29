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
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { useProductSelectionStore } from "@/stores/multiple-product-selection";
import { useProducts } from "@/services/product-services";
import useProductSingleStore from "@/stores/single-product-store";

export default function CreateCampaignPage() {
  const router = useRouter();
  const { data } = useProducts();
  const handleClick = () => router.push("/campaigns");
  const campaignType = CampaignTypeStore((state) => state.campaignType);
  const isProductSelected = CampaignTypeStore(
    (state) => state.isProductSelected
  );
  const { selectedProduct: selectedSingleProduct } = useProductSingleStore();
  const { openSheet, open: openReusableSheet, close } = useSheetStore();
  const campaign = campaignTypes.find((c) => c.id === campaignType);

  const selectedProduct = useProductStore((state) => state.selectedProduct);
  const selectedProducts = useProductSelectionStore(
    (state) => state.selectedProducts
  );
  const {
    title,
    description,
    start,
    expiry,
    setTitle,
    setDescription,
    setStart,
    setExpiry,
    setCampaignType,
    reset,
  } = useCampaignStore();

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

  const handleCampaignCreation = () => {
    if (!title || !description || !start || !expiry || !campaignType) {
      setOpen(true);
      return;
    }

    // Helper function to build offerJSON based on campaign type
    const buildOfferJSON = () => {
      switch (campaignType) {
        case "SingleProduct":
          return selectedProduct ? [selectedProduct] : [];
        case "MultiProduct":
          return selectedProducts || [];
        // Extend here for future campaign types
        case "Quizzes":
        case "Contest":
        case "FeedbackForm":
          return []; // Adjust based on specific requirements for new types
        default:
          return [];
      }
    };

    // Get the products based on the campaign type
    const products = buildOfferJSON();

    // Return early if no products are selected for product-based campaigns
    if (
      (campaignType === "SingleProduct" || campaignType === "MultiProduct") &&
      products.length === 0
    ) {
      toast.error("No products selected for the campaign.");
      return;
    }

    // Construct the offerJSON using the selected products (if applicable)
    const offerJSON = {
      data: products.map((product) => ({
        id: product.id,
        sku: product.sku,
        name: product.name,
        category: product.category,
        mrp: product.mrp,
        offerPrice: product.offerPrice,
        quantity: product.quantity,
        image: product.image,
        discountType: product.discountType,
        businessId: product.businessId,
        organizationId: product.organizationId,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      })),
    };

    // Prepare the campaign payload
    const newCampaign = {
      title,
      description,
      offerType: campaignType,
      businessId: products[0]?.businessId, // Adjust as needed for future types
      startAt: new Date(start),
      endAt: new Date(expiry),
      qrCode: "QRCODE123",
      organizationId: products[0]?.organizationId, // Adjust as needed for future types
      offerJSON: offerJSON,
      interactiveType: null,
    };

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
        {campaignType === "SingleProduct" && !selectedSingleProduct && (
          <div className="ml-auto justify-self-end gap-2 flex">
            <Button
              size={"sm"}
              onClick={() => openReusableSheet("SingleProduct")}
            >
              Add Product
            </Button>
          </div>
        )}
        {campaignType == "MultiProduct" && isProductSelected && (
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
      {/* <NoProducts /> */}
      {campaignType == "SingleProduct" && isProductSelected && (
        <SingleProductDisplay />
      )}
      {campaignType == "MultiProduct" && isProductSelected && (
        <MultiProductDisplay />
      )}
      {campaignType == "Quizzes" && isProductSelected && <div>Quizzes</div>}
      {campaignType == "Contest" && isProductSelected && <div>Contest</div>}
      {campaignType == "FeedbackForm" && isProductSelected && (
        <div>FeedbackForm</div>
      )}
      {campaignType == "Poll" && isProductSelected && <div>Poll</div>}
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
