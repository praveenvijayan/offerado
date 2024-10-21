// "use client";
// import React, { useEffect, useState } from "react";
// import { ArrowLeft } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { useRouter, useParams } from "next/navigation";
// import NoProducts from "@/components/campaigns/no-products";
// import CampaignHeader from "@/components/campaigns/campaign-header";
// import CampaignTypeStore from "@/stores/campaign-type";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { fetchOfferById, updateOffer } from "@/services/campaign-service";
// import useCampaignStore from "@/stores/create-campaign-form";
// import CampaignDialogForm from "@/components/campaigns/campaign-dialog-form";
// import SingleProductDisplay from "@/components/campaigns/single-product/single-product-display";
// import MultiProductDisplay from "@/components/campaigns/multi-product/multi-product-display";
// import useProductStore from "@/stores/single-product-store";
// import { useProductSelectionStore } from "@/stores/multiple-product-selection";
// import { useProducts } from "@/services/product-service";
// import campaignTypes from "@/data/campaign-types.json";
// import useSheetStore from "@/stores/sheet-store";
// import CampaignSheet from "@/components/campaigns/campaign-sheet";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { DotsVerticalIcon } from "@radix-ui/react-icons";
// import useResetAllStores from "@/hooks/reset-all-create-stores";
// import useProductSingleStore from "@/stores/single-product-store";

// export default function EditCampaignPage({ params }: any) {
//   const router = useRouter();
//   //   const params = useParams();
//   const id = params.id;
//   const queryClient = useQueryClient();
//   const resetAllStores = useResetAllStores();

//   const { data: campaign, isLoading: isCampaignLoading } = useQuery({
//     queryKey: ["campaign", id],
//     queryFn: () => fetchOfferById(Array.isArray(id) ? id[0] : id),
//     enabled: !!id,
//     staleTime: 0,
//     refetchOnMount: true,
//     refetchOnWindowFocus: true,
//   });

//   const { data: productsData } = useProducts();
//   const isProductSelected = CampaignTypeStore(
//     (state) => state.isProductSelected
//   );

//   const { selectedProduct: selectedSingleProduct } = useProductSingleStore();

//   const { setCampaignType, campaignType } = CampaignTypeStore();

//   const { openSheet, open: openReusableSheet, close } = useSheetStore();
//   const campaignTypeData = campaignTypes.find((c) => c.id === campaignType);

//   const selectedProduct = useProductStore((state) => state.selectedProduct);
//   const setSelectedProduct = useProductStore(
//     (state) => state.setSelectedProduct
//   );

//   const selectedProducts = useProductSelectionStore(
//     (state) => state.selectedProducts
//   );
//   const setSelectedProducts = useProductSelectionStore(
//     (state) => state.setSelectedProducts
//   );

//   const {
//     title,
//     description,
//     start,
//     expiry,
//     setTitle,
//     setDescription,
//     setStart,
//     setExpiry,
//   } = useCampaignStore();

//   const { setIsProductSelected } = CampaignTypeStore();

//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     if (campaign) {
//       setTitle(campaign?.title);
//       setDescription(campaign?.description);
//       setStart(campaign?.startAt);
//       setExpiry(campaign?.endAt);
//       setCampaignType(campaign?.offerType);

//       if (campaign.offerType === "SingleProduct") {
//         const productData = campaign?.offerJSON.data[0];
//         setSelectedProduct(productData);
//       } else if (campaign?.offerType === "MultiProduct") {
//         const productDataArray = campaign?.offerJSON.data;
//         // setSelectedProducts(productDataArray.map((product: any) => product.id));
//         setSelectedProducts(productDataArray);
//       }
//       // Handle other campaign types as needed
//     }
//     setIsProductSelected();
//     queryClient.invalidateQueries({ queryKey: ["offer", campaign?.id] });
//     queryClient.invalidateQueries({ queryKey: ["campaigns"] });
//   }, [campaign]);

//   const mutation = useMutation({
//     mutationFn: updateOffer,
//     onSuccess: (data) => {
//       toast.success("Campaign updated successfully!");
//       queryClient.invalidateQueries({ queryKey: ["campaigns"] });
//       resetAllStores();
//       router.push(`/campaigns/preview?id=${data.id}`);
//     },
//     onError: (error) => {
//       toast.error("Failed to update campaign");
//       console.error("Error updating campaign:", error);
//     },
//   });

//   const handleCampaignUpdate = () => {
//     if (!title || !description || !start || !expiry || !campaignType) {
//       setOpen(true);
//       return;
//     }

//     // Helper function to build offerJSON based on campaign type
//     const buildOfferJSON = () => {
//       switch (campaignType) {
//         case "SingleProduct":
//           return selectedProduct ? [selectedProduct] : [];
//         case "MultiProduct":
//           return selectedProducts || [];
//         // Extend here for future campaign types
//         case "Quizzes":
//         case "Contest":
//         case "FeedbackForm":
//           return [];
//         default:
//           return [];
//       }
//     };

//     // Get the products based on the campaign type
//     const products = buildOfferJSON();

//     // Return early if no products are selected for product-based campaigns
//     if (
//       (campaignType === "SingleProduct" || campaignType === "MultiProduct") &&
//       products.length === 0
//     ) {
//       toast.error("No products selected for the campaign.");
//       return;
//     }

//     // Construct the offerJSON using the selected products (if applicable)
//     const offerJSON = {
//       data: products.map((product) => ({
//         id: product.id,
//         sku: product.sku,
//         name: product.name,
//         category: product.category,
//         mrp: product.mrp,
//         offerPrice: product.offerPrice,
//         quantity: product.quantity,
//         image: product.image,
//         discountType: product.discountType,
//         businessId: product.businessId,
//         organizationId: product.organizationId,
//         createdAt: product.createdAt,
//         updatedAt: product.updatedAt,
//       })),
//     };

//     // Prepare the updated campaign payload
//     const updatedCampaign = {
//       id: campaign.id,
//       title,
//       description,
//       offerType: campaignType,
//       businessId: products[0]?.businessId || campaign.businessId,
//       startAt: new Date(start),
//       endAt: new Date(expiry),
//       qrCode: campaign.qrCode,
//       organizationId: products[0]?.organizationId || campaign.organizationId,
//       offerJSON: offerJSON,
//       interactiveType: null,
//     };

//     // Trigger the mutation to update the campaign
//     mutation.mutate(updatedCampaign);
//   };

//   return (
//     <div className="flex flex-col gap-4 h-[88vh] w-full">
//       <div className="flex w-full items-center h-fit gap-2">
//         <CampaignHeader />
//         {campaignType === "SingleProduct" && !selectedSingleProduct && (
//           <div className="ml-auto justify-self-end gap-2 flex">
//             <Button
//               size={"sm"}
//               onClick={() => openReusableSheet("SingleProduct")}
//             >
//               Add Product
//             </Button>
//           </div>
//         )}
//         {campaignType == "MultiProduct" && isProductSelected && (
//           <div className="ml-auto justify-self-end gap-2 flex">
//             <Button
//               size={"sm"}
//               onClick={() => openReusableSheet("MultiProduct")}
//             >
//               Add Products
//             </Button>

//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button size={"sm"} className="flex gap-1 pr-1">
//                   Add Components <DotsVerticalIcon />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-56">
//                 <DropdownMenuLabel>Components</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuGroup>
//                   <DropdownMenuItem
//                     onClick={() => {
//                       openReusableSheet("Quizzes");
//                     }}
//                   >
//                     Quizzes
//                   </DropdownMenuItem>
//                   <DropdownMenuItem
//                     onClick={() => openReusableSheet("Contest")}
//                   >
//                     Contest
//                   </DropdownMenuItem>
//                   <DropdownMenuItem
//                     onClick={() => openReusableSheet("FeedbackForm")}
//                   >
//                     Feedback Form
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => openReusableSheet("Poll")}>
//                     Poll
//                   </DropdownMenuItem>
//                 </DropdownMenuGroup>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         )}
//       </div>
//       <Separator />
//       {/* Display components based on campaign type and isProductSelected */}
//       {campaignType == "SingleProduct" && isProductSelected && (
//         <SingleProductDisplay />
//       )}
//       {campaignType == "MultiProduct" && isProductSelected && (
//         <MultiProductDisplay />
//       )}
//       {campaignType == "Quizzes" && isProductSelected && <div>Quizzes</div>}
//       {campaignType == "Contest" && isProductSelected && <div>Contest</div>}
//       {campaignType == "FeedbackForm" && isProductSelected && (
//         <div>FeedbackForm</div>
//       )}
//       {campaignType == "Poll" && isProductSelected && <div>Poll</div>}
//       {isProductSelected && (
//         <div className="flex justify-end gap-2 ">
//           <Button
//             className="bg-green-500 rounded-2xl"
//             onClick={handleCampaignUpdate}
//           >
//             Update Campaign
//           </Button>
//         </div>
//       )}
//       <CampaignDialogForm open={open} setOpen={setOpen} />
//       {campaignType && (
//         <CampaignSheet
//           id={campaignTypeData?.id}
//           title={campaignTypeData?.title}
//           description={campaignTypeData?.description}
//         />
//       )}
//     </div>
//   );
// }
