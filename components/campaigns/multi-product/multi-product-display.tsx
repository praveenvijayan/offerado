import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useProducts } from "@/services/product-services";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  Row,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { X } from "lucide-react";
import { useProductSelectionStore } from "@/stores/multiple-product-selection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { debounce } from "lodash";
import type { Product } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
type EditingProductsState = {
  [key: string]: Product;
};
const MultiProductDisplay = () => {
  const { data, isLoading, error } = useProducts();
  const { selectedProducts, resetProducts, toggleProductSelection } =
    useProductSelectionStore();

  const [editingProducts, setEditingProducts] = useState<EditingProductsState>(
    {}
  );

  // Initialize the editing state only when selectedProducts or data changes
  useEffect(() => {
    if (!data) return;
    const initialEditingState = selectedProducts.reduce(
      (acc: any, productId) => {
        const product = data.find((p) => p.id === productId);
        if (product) {
          acc[productId] = {
            name: product.name,
            offerPrice: product.offerPrice,
          };
        }
        return acc;
      },
      {}
    );
    setEditingProducts(initialEditingState);
  }, [selectedProducts, data]);

  // Debounced handleSave to optimize performance
  const handleSave = useCallback(
    debounce((productId: any) => {
      const product = data?.find((p) => p.id === productId);
      if (!product) return;

      const updatedProduct = {
        ...product,
        name: editingProducts[productId]?.name || product.name,
        offerPrice:
          editingProducts[productId]?.offerPrice || product.offerPrice,
        updatedAt: new Date(),
      };

      console.log("Saved product:", updatedProduct);
    }, 300),
    [data, editingProducts]
  );

  // Memorize the columns to prevent unnecessary re-renders
  const columns = useMemo(
    () => [
      {
        accessorKey: "image",
        header: "IMAGE",
        cell: ({ row }: { row: Row<Product> }) => (
          <Image
            src={row.original.image}
            alt={row.original.name}
            className="object-cover rounded-md"
            width={32}
            height={32}
          />
        ),
      },
      {
        accessorKey: "sku",
        header: "SKU",
      },
      {
        accessorKey: "name",
        header: "NAME",
        cell: ({ row }) => (
          <input
            type="text"
            value={editingProducts[row.original.id]?.name || row.original.name}
            onChange={(e) =>
              setEditingProducts((prev) => ({
                ...prev,
                [row.original.id]: {
                  ...prev[row.original.id],
                  name: e.target.value,
                },
              }))
            }
            onBlur={() => handleSave(row.original.id)}
            className="border rounded-md p-1 w-auto"
          />
        ),
      },
      {
        accessorKey: "category",
        header: "CATEGORY",
      },
      {
        accessorKey: "offerPrice",
        header: "OFFER PRICE",
        cell: ({ row }) => (
          <input
            type="number"
            value={
              editingProducts[row.original.id]?.offerPrice ||
              row.original.offerPrice
            }
            onChange={(e) =>
              setEditingProducts((prev) => ({
                ...prev,
                [row.original.id]: {
                  ...prev[row.original.id],
                  offerPrice: parseFloat(e.target.value),
                },
              }))
            }
            onBlur={() => handleSave(row.original.id)}
            className="border rounded-md p-1 max-w-16"
          />
        ),
      },
      {
        accessorKey: "mrp",
        header: "MRP",
        cell: ({ row }) => `${row.original.mrp.toFixed(2)} ₹`,
      },

      {
        accessorKey: "actions",
        header: "ACTIONS",
        cell: ({ row }) => (
          <Button
            variant="destructive"
            onClick={() => toggleProductSelection(row.original.id)}
            className="w-5 h-5 p-0 self-center flex mx-auto"
          >
            <X className="w-3 h-3" />
          </Button>
        ),
      },
    ],
    [editingProducts, handleSave, toggleProductSelection]
  );

  // Memorize table data to prevent unnecessary re-renders
  const tableData = useMemo(
    () =>
      data?.filter((product) => selectedProducts.includes(product.id)) || [],
    [data, selectedProducts]
  );

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!selectedProducts.length) {
    return <div>No products selected</div>;
  }

  return (
    <ScrollArea className="h-[70vh] w-full">
      <div className="multi-product-display w-full mx-auto">
        {/* Clear All Selections Button */}
        <div className="flex justify-end ">
          <Button
            size="sm"
            variant="destructive"
            onClick={resetProducts}
            className="w-auto p-2 mb-2 mr-2"
          >
            Clear All
          </Button>
        </div>
        <Separator />
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ScrollArea>
  );
};

export default MultiProductDisplay;
