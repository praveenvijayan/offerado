import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Menu } from "lucide-react";

const offers = [
  {
    id: "OFFER001",
    title: "Buy One Get One Free",
    offerType: "BOGO",
    expiryDate: "2024-09-30",
    status: "Active",
  },
  {
    id: "OFFER002",
    title: "20% off on all items",
    offerType: "Discount",
    expiryDate: "2024-10-15",
    status: "Upcoming",
  },
  {
    id: "OFFER003",
    title: "Free shipping on orders over $50",
    offerType: "Shipping",
    expiryDate: "2024-09-20",
    status: "Expired",
  },
  {
    id: "OFFER004",
    title: "Bundle Offer: 3 for 2",
    offerType: "Bundle",
    expiryDate: "2024-09-25",
    status: "Active",
  },
  {
    id: "OFFER005",
    title: "30% off on electronics",
    offerType: "Discount",
    expiryDate: "2024-11-01",
    status: "Upcoming",
  },
];

export default function Offers() {
  return (
    <div className="flex flex-col h-screen p-6">
      {/* Tools */}
      <div className="shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Menu className="w-6 h-6" />
          <span className="font-bold text-xl">Offers</span>
        </div>
      </div>
      {/* Offers Table */}
      <Table>
        <TableCaption>A list of your current and upcoming offers.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Offer ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {offers.map((offer) => (
            <TableRow key={offer.id}>
              <TableCell className="font-medium">{offer.id}</TableCell>
              <TableCell>{offer.title}</TableCell>
              <TableCell>{offer.offerType}</TableCell>
              <TableCell>{offer.expiryDate}</TableCell>
              <TableCell>{offer.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total Offers</TableCell>
            <TableCell>{offers.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
