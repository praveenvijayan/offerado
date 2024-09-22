"use client";
import { useEffect } from "react";
import OfferSummaryCard from "@/components/offers/offer-summary-card";
import CreateCampaignForm from "@/components/offers/campaign-form";
import TemplateSelection from "@/components/offers/template-selection";
import ShareCampaign from "@/components/offers/share-campaign";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Circle, Import } from "lucide-react";
import useTabsStore from "@/stores/campaign-tabs";
import ProductsList from "@/components/offers/products-list";
import { Button } from "@/components/ui/button";
import useCampaignStore from "@/stores/create-campaign-form";
import ProductsSelectedList from "@/components/offers/products-list-selected";

const CreateOffer = () => {
  const { activeTab, setActiveTab, completeStep, moveToNextTab } =
    useTabsStore();

  const Campaigns = useCampaignStore();

  return (
    <div className="flex h-[88vh] w-full">
      {/* Left Sidebar */}
      <Tabs
        value={activeTab}
        orientation="vertical"
        className="flex bg-transparent w-full"
      >
        {/* Tabs List (Vertical Menu) */}
        <TabsList className="flex flex-col justify-start items-start gap-4 p-4 border-0 bg-transparent">
          <TabsTrigger
            value="details"
            className="flex gap-2 items-middle text-sm"
          >
            <Circle className="min-w-4 min-h-4 max-w-4 max-h-4" />
            Add campaign details
          </TabsTrigger>
          <TabsTrigger
            value="products"
            className="flex gap-2 items-middle text-sm"
          >
            <Circle className="min-w-4 min-h-4 max-w-4 max-h-4" />
            Add products
          </TabsTrigger>
          <TabsTrigger
            value="components"
            className="flex gap-2 items-middle text-sm"
          >
            <Circle className="min-w-4 min-h-4 max-w-4 max-h-4" />
            Add components
          </TabsTrigger>
          <TabsTrigger
            value="theme"
            className="flex gap-2 items-middle text-sm"
          >
            <Circle className="min-w-4 min-h-4 max-w-4 max-h-4" />
            Choose a theme
          </TabsTrigger>
          <TabsTrigger
            value="preview"
            className="flex gap-2 items-middle text-sm"
          >
            <Circle className="min-w-4 min-h-4 max-w-4 max-h-4" />
            Preview
          </TabsTrigger>
        </TabsList>

        {/* Tabs Content (Right Side) */}
        <div className="w-full border-l-2">
          <ScrollArea className="max-h-[85vh] overflow-y-auto rounded-md">
            <TabsContent value="details">
              <CreateCampaignForm />
            </TabsContent>

            <TabsContent value="products" className="w-full">
              <ProductsList />
            </TabsContent>

            <TabsContent value="components" className="w-full">
              <ProductsSelectedList />
            </TabsContent>

            <TabsContent value="theme">
              <TemplateSelection />
            </TabsContent>

            <TabsContent value="preview">
              <OfferSummaryCard />
              <ShareCampaign />
            </TabsContent>
          </ScrollArea>
        </div>
      </Tabs>
    </div>
  );
};

export default CreateOffer;
