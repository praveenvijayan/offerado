"use client";
import OfferSummaryCard from "@/components/offers/offer-summary-card";
import CreateCampaignForm from "@/components/offers/campaign-form";
import TemplateSelection from "@/components/offers/template-selection";
import ShareCampaign from "@/components/offers/share-campaign";
import ComponentSelection from "@/components/offers/component-selection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOfferStore } from "@/stores/store";

const CreateOffer = () => {
  const {
    offer,
    selectedProducts,
    setOffer,
    handleProductSelection,
    setSelectedTemplate,
  } = useOfferStore();

  const products = [
    {
      id: 1,
      name: "Product A",
      category: "Electronics",
      mrp: 100,
      offerPrice: 80,
      image:
        "http://offerado.in/api/media/file/pngtree-fresh-orange-png-png-image_10159570.png",
    },
    {
      id: 2,
      name: "Product B",
      category: "Clothing",
      mrp: 50,
      offerPrice: 40,
      image:
        "http://offerado.in/api/media/file/pngtree-fruit-fresh-tomato-png-image_9959799.png",
    },
    {
      id: 3,
      name: "Product C",
      category: "Books",
      mrp: 20,
      offerPrice: 15,
      image:
        "http://offerado.in/api/media/file/pngtree-raw-sea-bass-fresh-seabass-fish-isolated-on-white-background-with-png-image_9225167.png",
    },
  ];

  const templates = [
    {
      id: "template1",
      name: "Template 1",
      image: "https://via.placeholder.com/64x64?text=Template+1",
    },
    {
      id: "template2",
      name: "Template 2",
      image: "https://via.placeholder.com/64x64?text=Template+2",
    },
    {
      id: "template3",
      name: "Template 3",
      image: "https://via.placeholder.com/64x64?text=Template+3",
    },
  ];

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
            <ComponentSelection
              products={products}
              selectedProducts={selectedProducts}
              onProductSelect={handleProductSelection}
            />
          </div>
        </TabsContent>

        <TabsContent value="selectTemplate">
          <TemplateSelection
            templates={templates}
            onSelect={setSelectedTemplate}
          />
        </TabsContent>

        <TabsContent value="shareOffers">
          <ShareCampaign offer={offer} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreateOffer;
