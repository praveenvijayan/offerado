import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Share } from "lucide-react";
import Image from "next/image";
import { useOfferStore } from "@/stores/offer-store";

const ShareCampaign = () => {
  const platforms = [
    "Twitter",
    "Facebook",
    "WhatsApp",
    "LinkedIn",
    "Instagram",
  ];
  const { offer } = useOfferStore();
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Share Campaign</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {platforms.map((platform) => (
            <Card key={platform}>
              <CardHeader>
                <CardTitle className="flex justify-between">
                  {platform} <Share />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src={offer.image}
                  alt="Offer Image"
                  className="w-full h-32 object-cover rounded-md mb-[1rem]"
                  width={120}
                  height={100}
                />
                <p>{offer.title}</p>
                <p>{offer.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShareCampaign;
