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
import { Circle } from "lucide-react";

const CreateOffer = () => {
  return (
    <div className="flex h-[85vh]">
      {/* Left Sidebar */}
      <Tabs
        defaultValue="details"
        orientation="vertical"
        className="flex bg-transparent"
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
        <div className="flex-1 px-6 border-l-2">
          <ScrollArea className="max-h-[85vh] overflow-y-auto rounded-md">
            <TabsContent value="details" className="mt-4">
              <CreateCampaignForm />
            </TabsContent>

            <TabsContent value="components" className="mt-4">
              <ComponentAccordion />
              <ComponentCollection />
            </TabsContent>

            <TabsContent value="theme" className="mt-4">
              <TemplateSelection />
            </TabsContent>

            <TabsContent value="preview" className="mt-4">
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
