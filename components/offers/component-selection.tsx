import { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Poll from "./poll";
import Quiz from "./quiz";
import Contests from "./contest";
import Feedback from "./feedback";
import ProductSelection from "./products";

const ComponentSelection = ({
  products,
  selectedProducts,
  onProductSelect,
}: {
  products: any[];
  selectedProducts: number[];
  onProductSelect: (id: number) => void;
}) => {
  const [selectedContent, setSelectedContent] = useState<string | null>(null);

  const handleSheetContent = (type: string) => {
    setSelectedContent(type);
  };

  return (
    <>
      <Poll />
      <Quiz />
      <Contests />
      <Feedback />
      <ProductSelection products={products} />
    </>
  );
};

export default ComponentSelection;
