import useProductSingleStore from "@/stores/single-product-store";
import React, { useEffect, useState } from "react";
import { useProducts } from "@/services/product-services";
import CampaignTypeStore from "@/stores/campaign-type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Delete, Edit, X } from "lucide-react";

const SingleProductDisplay = () => {
  const { selectedProduct, resetSelectedProduct, setSelectedProduct } =
    useProductSingleStore();
  const { data, isLoading, error } = useProducts();
  const router = useRouter();
  const { resetIsProductSelected } = CampaignTypeStore();

  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [editedName, setEditedName] = useState(selectedProduct?.name || ""); // Store edited name
  const [editedOfferPrice, setEditedOfferPrice] = useState(
    selectedProduct?.offerPrice || 0
  ); // Store edited offer price

  useEffect(() => {
    setEditedName(selectedProduct?.name || "");
    setEditedOfferPrice(selectedProduct?.offerPrice || 0);
  }, [selectedProduct]);

  const handleSave = () => {
    if (!selectedProduct) return;

    setSelectedProduct({
      ...selectedProduct,
      name: editedName || selectedProduct.name,
      offerPrice: editedOfferPrice || selectedProduct.offerPrice,
      id: selectedProduct.id,
      sku: selectedProduct.sku,
      category: selectedProduct.category,
      mrp: selectedProduct.mrp,
      quantity: selectedProduct.quantity,
      image: selectedProduct.image,
      discountType: selectedProduct.discountType,
      businessId: selectedProduct.businessId,
      organizationId: selectedProduct.organizationId,
      createdAt: selectedProduct.createdAt,
      updatedAt: new Date(),
    });

    setIsEditing(false); // Exit edit mode after saving
  };

  if (!selectedProduct) {
    return <div>No product selected</div>;
  }

  return (
    <div className="single-product-display w-full mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>IMAGE</TableHead>
            <TableHead>NAME</TableHead>
            <TableHead>CATEGORY</TableHead>
            <TableHead>OFFER PRICE</TableHead>
            <TableHead>MRP</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Row for displaying the product */}
          <TableRow>
            {/* Image */}
            <TableCell>
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-24 h-24 object-cover rounded-md"
                width={96}
                height={96}
              />
            </TableCell>

            {/* Product Name */}
            <TableCell>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onBlur={handleSave}
                className="border rounded-md p-1 w-auto"
              />
            </TableCell>

            {/* Category */}
            <TableCell>{selectedProduct.category}</TableCell>

            {/* Offer Price */}
            <TableCell>
              <input
                type="number"
                value={editedOfferPrice}
                onChange={(e) =>
                  setEditedOfferPrice(parseFloat(e.target.value))
                }
                onBlur={handleSave}
                className="border rounded-md p-1 w-auto"
              />
            </TableCell>

            {/* MRP */}
            <TableCell>{`${selectedProduct.mrp.toFixed(2)} ₹`}</TableCell>

            {/* SKU */}
            <TableCell>{selectedProduct.sku}</TableCell>

            {/* Actions */}
            <TableCell>
              {/* {isEditing ? (
                <>
                  <Button variant="ghost" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button variant="default" onClick={handleSave}>
                    Save
                  </Button>
                </>
              ) : (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  <Edit size="sm" />
                </Button>
              )} */}

              {/* Clear Selection Button */}
              <Button
                variant="destructive"
                onClick={() => {
                  resetSelectedProduct();
                  resetIsProductSelected();
                }}
                className="w-8 h-8 p-0 self-center"
              >
                <X className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default SingleProductDisplay;
