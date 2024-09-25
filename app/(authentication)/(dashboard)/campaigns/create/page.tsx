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

export default function CreateCampaignPage() {
  const router = useRouter();
  const handleClick = () => router.push("/campaigns");
  const campaignType = CampaignTypeStore((state) => state.campaignType);
  const isProductSelected = CampaignTypeStore(
    (state) => state.isProductSelected
  );

  const selectedProduct = useProductStore((state) => state.selectedProduct);

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

  useEffect(() => {}, [campaignType, isProductSelected]);
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

    const newCampaign = {
      title: title,
      description: description,
      offerType: campaignType,
      businessId: selectedProduct?.businessId,
      startAt: new Date(start),
      endAt: new Date(expiry),
      qrCode: "QRCODE123",
      organizationId: selectedProduct?.organizationId,
      offerJSON: {
        data: {
          id: selectedProduct?.id,
          sku: selectedProduct?.sku,
          name: selectedProduct?.name,
          category: selectedProduct?.category,
          mrp: selectedProduct?.mrp,
          offerPrice: selectedProduct?.offerPrice,
          quantity: selectedProduct?.quantity,
          image: selectedProduct?.image,
          discountType: selectedProduct?.discountType,
          businessId: selectedProduct?.businessId,
          organizationId: selectedProduct?.organizationId,
          createdAt: selectedProduct?.createdAt,
          updatedAt: selectedProduct?.updatedAt,
        },
      },
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
        <div className="ml-auto justify-self-end gap-2 flex hidden">
          <Button size={"sm"} onClick={handleClick}>
            Add Products
          </Button>
          <Button size={"sm"} onClick={handleClick}>
            Add Components
          </Button>
        </div>
      </div>
      <Separator />
      {!isProductSelected && <NoProducts />}
      {/* <NoProducts /> */}
      {campaignType == "SingleProduct" && isProductSelected && (
        <SingleProductDisplay />
      )}
      {campaignType == "MultiProduct" && isProductSelected && (
        <div>Multiple Product</div>
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
    </div>
  );
}
