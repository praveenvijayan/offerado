"use client";
import OfferSummaryCard from "@/components/offers/offer-summary-card";
import CreateCampaignForm from "@/components/offers/campaign-form";
import TemplateSelection from "@/components/offers/template-selection";
import ShareCampaign from "@/components/offers/share-campaign";
import ComponentSelection from "@/components/offers/component-selection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOfferStore } from "@/stores/store";
import SelectedComponents from "@/components/offers/selected-components";

const CreateOffer = () => {
  const {
    offer,
    selectedProducts,
    setOffer,
    handleProductSelection,
    setSelectedTemplate,
  } = useOfferStore();

  return (
    <div className="flex flex-col">
      <OfferSummaryCard offer={offer} />
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
          <ShareCampaign offer={offer} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreateOffer;
