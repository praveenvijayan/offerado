import { useState } from "react";
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

const ProductSelection = ({ products }: { products: any[] }) => {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const handleProductSelection = (productId: number) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  return (
    <div>
      <Card className="">
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Sheet>
            <SheetTrigger asChild>
              <div
                className="flex align-middle border border-dashed border-white p-4 rounded-lg text-center cursor-pointer"
                onClick={() => handleProductSelection(123)}
              >
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
                      <TableHead>Product Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>MRP</TableHead>
                      <TableHead>Offer Price</TableHead>
                      <TableHead>Offer Type</TableHead>
                      <TableHead>Image</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow
                        key={product.id}
                        className={
                          selectedProducts.includes(product.id)
                            ? "bg-green-900 hover:bg-green-900"
                            : ""
                        }
                      >
                        {/* Select Product */}
                        <TableCell>
                          <Checkbox
                            checked={selectedProducts.includes(product.id)}
                            onCheckedChange={() =>
                              handleProductSelection(product.id)
                            }
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

                        {/* Image */}
                        <TableCell>
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={64}
                            height={64}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <SheetFooter>
                <Button
                  onClick={() =>
                    console.log("Selected Products:", setSelectedProducts)
                  }
                >
                  Add Selected Products
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductSelection;
