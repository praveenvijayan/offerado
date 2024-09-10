import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const OfferSummaryCard = ({ offer }: { offer: any }) => (
  <Card className="w-full p-6 shadow-lg rounded-lg border mb-[1rem]">
    <CardHeader>
      <CardTitle className="text-xl font-bold">{offer.title}</CardTitle>
      <CardDescription>{offer.description}</CardDescription>
      <div>
        <Badge
          variant={offer.isActive ? "success" : ("destructive" as any)}
          className="ml-auto"
        >
          {offer.isActive ? "Active" : "Inactive"}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="grid grid-cols-5 gap-4">
        <div className="p-4 rounded-md">
          <p className="text-sm font-semibold">Start Date</p>
          <p className="text-lg">{offer.startDate}</p>
        </div>
        <div className="p-4 rounded-md">
          <p className="text-sm font-semibold">End Date</p>
          <p className="text-lg">{offer.endDate}</p>
        </div>
        <div className="p-4 rounded-md">
          <p className="text-sm font-semibold">Selected Products</p>
          <p className="text-lg">{offer.selectedProducts} products</p>
        </div>
        <div className="p-4 rounded-md">
          <p className="text-sm font-semibold">Selected Template</p>
          <p className="text-lg">{offer.selectedTemplate}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default OfferSummaryCard;
