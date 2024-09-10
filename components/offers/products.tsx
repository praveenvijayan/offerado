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
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Plus } from "lucide-react";
import { useComponentStore } from "@/stores/use-component-store";
import products from "@/data/products.json";

const ProductSelection = () => {
  const { selectedItems, addSelectedItem, removeSelectedItem } =
    useComponentStore();

  const handleProductSelect = (id: number) => {
    if (selectedItems.products.includes(id)) {
      removeSelectedItem("products", id);
    } else {
      addSelectedItem("products", id);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Sheet>
            <SheetTrigger asChild>
              <div className="flex align-middle border border-dashed border-white p-4 rounded-lg text-center cursor-pointer">
                <Plus height={16} width={16} />
                <span className="text-sm">Add Products</span>
              </div>
            </SheetTrigger>
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
                            checked={selectedItems.products.includes(
                              product.id
                            )}
                            onCheckedChange={() =>
                              handleProductSelect(product.id)
                            }
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
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductSelection;
