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

const CreateOffer = () => {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold py-4">Create Campaign</h2>
      <div className="grid grid-cols-1 md:grid-cols-12 md:border-t-2">
        <div className="col-span-8 h-full md:border-r-2 md:p-4 order-2 md:order-1">
          <CreateCampaignForm />
          <ComponentAccordion />
        </div>
        <div className="col-span-4 h-full order-1 md:order-2 p-4">
          <OfferSummaryCard />
          <ComponentCollection />
        </div>
      </div>
      {/* <OfferSummaryCard />
      <Tabs defaultValue="createOffer" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="createOffer">1. Create Campaign</TabsTrigger>
          <TabsTrigger value="components">2. Components</TabsTrigger>
          <TabsTrigger value="selectTemplate">3. Select Template</TabsTrigger>
          <TabsTrigger value="shareOffers">4. Share Campaign</TabsTrigger>
        </TabsList>

        <TabsContent value="createOffer">
          <CreateCampaignForm />
        </TabsContent>

        <TabsContent value="components">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
            <ComponentSelection />
          </div>
          <SelectedComponents />
        </TabsContent>

        <TabsContent value="selectTemplate">
          <TemplateSelection />
        </TabsContent>

        <TabsContent value="shareOffers">
          <ShareCampaign />
        </TabsContent>
      </Tabs> */}
    </div>
  );
};

export default CreateOffer;
