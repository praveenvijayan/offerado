"use client";
import OfferSummaryCard from "@/components/offers/offer-summary-card";
import CreateCampaignForm from "@/components/offers/campaign-form";
import TemplateSelection from "@/components/offers/template-selection";
import ShareCampaign from "@/components/offers/share-campaign";
import ComponentSelection from "@/components/offers/component-selection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SelectedComponents from "@/components/offers/selected-components";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import ComponentAccordion from "@/components/offers/components-accordion";
import ComponentCollection from "@/components/offers/component-collection";
import { Circle, Import } from "lucide-react";
import useCampaignStore from "@/stores/create-campaign-form";
import Campaigns from "../page";
import { Button } from "@/components/ui/button";
import ProductsList from "@/components/offers/products-list";

const CreateOffer = () => {
  const Campaigns = useCampaignStore();
  return (
    <div className="flex h-[85vh] w-full">
      {/* Left Sidebar */}
      <Tabs
        defaultValue="details"
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
            value="components"
            className="flex gap-2 items-middle text-sm"
          >
            <Circle className="min-w-4 min-h-4 max-w-4 max-h-4" />
            Add products and components
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
        <div className=" w-full px-6 border-l-2">
          <ScrollArea className="max-h-[85vh] overflow-y-auto rounded-md">
            <TabsContent value="details">
              <h3 className="mb-4">
                Create a new {Campaigns.campaignType} campaign
              </h3>
              <CreateCampaignForm />
            </TabsContent>

            <TabsContent value="components" className="w-full">
              <div className="flex justify-between items-center w-full mb-6">
                <h3 className="font-semibold text-xl">Select Products</h3>
                <div className="">
                  <Button variant={"ghost"} className="flex gap-2">
                    <Import /> Import products
                  </Button>
                </div>
              </div>
              <ProductsList />
              {/* <ComponentAccordion /> */}
              {/* <ComponentCollection /> */}
            </TabsContent>

            <TabsContent value="theme">
              <TemplateSelection />
            </TabsContent>

            <TabsContent value="preview">
              <OfferSummaryCard />
              <SelectedComponents />
              <ShareCampaign />
            </TabsContent>
          </ScrollArea>
        </div>
      </Tabs>
    </div>
  );
};

export default CreateOffer;
