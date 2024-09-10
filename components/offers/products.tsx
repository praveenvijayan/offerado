import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { useComponentStore } from "@/stores/use-component-store";
import products from "@/data/products.json";
import { useProductSheetStore } from "@/stores/offer-creation-component-selection";

const ProductSelection = () => {
  const { selectedItems, addSelectedItem, removeSelectedItem } =
    useComponentStore();
  const { isSheetOpen, closeSheet } = useProductSheetStore();
  const handleProductSelect = (id: number) => {
    if (selectedItems.products.includes(id)) {
      removeSelectedItem("products", id);
    } else {
      addSelectedItem("products", id);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <Sheet open={isSheetOpen} onOpenChange={closeSheet}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Select Products</SheetTitle>
            <SheetDescription>
              Select one or more products from the list.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col space-y-2 mb-[1rem]">
            {/* Table inside the Sheet */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Select</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>MRP</TableHead>
                  <TableHead>Offer Price</TableHead>
                  <TableHead>Offer Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product: any) => (
                  <TableRow
                    key={product.id}
                    className={
                      selectedItems.products.includes(product.id)
                        ? "bg-green-900 hover:bg-green-900"
                        : ""
                    }
                  >
                    {/* Select Product */}
                    <TableCell>
                      <Checkbox
                        checked={selectedItems.products.includes(product.id)}
                        onCheckedChange={() => handleProductSelect(product.id)}
                      />
                    </TableCell>
                    {/* Image */}
                    <TableCell>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={64}
                        height={64}
                      />
                    </TableCell>
                    {/* Product Name */}
                    <TableCell>{product.name}</TableCell>

                    {/* Category */}
                    <TableCell>{product.category}</TableCell>

                    {/* MRP */}
                    <TableCell>{product.mrp}</TableCell>

                    {/* Offer Price */}
                    <TableCell>{product.offerPrice}</TableCell>

                    {/* Offer Type */}
                    <TableCell>Discount</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <SheetFooter>
            {/* <Button
              onClick={() =>
                console.log("Selected Products:", selectedProducts)
              }
            >
              Add Selected Products
            </Button>
            <Button variant="destructive" onClick={clearSelectedProducts}>
              Clear
            </Button> */}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProductSelection;
