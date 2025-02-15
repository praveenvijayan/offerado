"use client";

import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/services/product-services";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  Row,
} from "@tanstack/react-table";
import { ArrowLeft, ArrowRight, PlusCircle } from "lucide-react";
import CampaignTypeStore from "@/stores/campaign-type";
import useSheetStore from "@/stores/sheet-store";
import useProductSingleStore from "@/stores/single-product-store";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { Product } from "@prisma/client";
import Image from "next/image";

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

interface DraggableRowProps {
  row: Row<Product>;
}

const SingleProduct = () => {
  const { data, isLoading, error } = useProducts();
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const { setIsProductSelected } = CampaignTypeStore();
  const { close } = useSheetStore();
  const { setSelectedProduct } = useProductSingleStore();

  const [selectedProductId, setSelectedProductId] = useState("");

  // Define columns for TanStack Table
  const columns = useMemo(
    () => [
      {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }: { row: Row<Product> }) => (
          <div className="flex items-center justify-center">
            <RadioGroupItem
              value={row.original.id.toString()}
              id={`radio-${row.original.id}`}
            />
            <Label htmlFor={`radio-${row.original.id}`} className="sr-only">
              Select {row.original.name}
            </Label>
          </div>
        ),
      },
      {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }: { row: Row<Product> }) => (
          <Image
            src={row.original.image}
            alt={row.original.name}
            className="w-10 h-10 rounded-md"
            width={24}
            height={24}
          />
        ),
      },
      {
        accessorKey: "discountType",
        header: "Type",
      },
      {
        accessorKey: "name",
        header: "Product Name",
      },
      {
        accessorKey: "category",
        header: "Category",
      },
    ],
    []
  );

  // Create table instance with TanStack Table
  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      globalFilter,
      sorting,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting as any,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;

  return (
    <div className="single-product relative">
      <div className="flex items-center gap-2 lg:absolute lg:-top-12 lg:right-0">
        <Button size="sm" className="rounded-xl flex gap-2 ml-auto mb-3">
          <PlusCircle className="w-4 h-4" /> New Product
        </Button>
      </div>
      {/* Search Input */}
      <div className="flex justify-between items-center gap-4 mb-4">
        <Input
          type="text"
          placeholder="Search products..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className=""
        />
      </div>
      <ScrollArea className="h-[80vh] w-full pb-[8rem]">
        <RadioGroup
          value={selectedProductId}
          onValueChange={(value) => {
            setSelectedProductId(value);
            const selectedProduct = data?.find(
              (product: any) => product.id.toString() === value
            );
            setSelectedProduct(selectedProduct);
          }}
        >
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted()
                        ? header.column.getIsSorted() === "desc"
                          ? " 🔽"
                          : " 🔼"
                        : null}
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </RadioGroup>
        {/* Pagination Controls */}
        <div className="absolute bottom-0 left-0 bg-muted/20 rounded-md w-full">
          <div className="pagination-controls mt-4 flex items-center justify-between gap-4">
            <div className="flex items-center">
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
                className="ml-4 text-xs px-4 py-2 border rounded-md"
              >
                {[10, 20, 30, 40, 50].map((size) => (
                  <option key={size} value={size}>
                    Show {size}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-between items-center">
              <Button
                variant={"link"}
                size={"sm"}
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </span>
              <Button
                variant={"link"}
                size={"sm"}
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <Separator className="border-slate-600 border-t mt-[1rem]" />
          <div className="flex justify-end gap-4 p-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                close();
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-green-500"
              onClick={async () => {
                await timeout(800);
                setIsProductSelected();
                close();
              }}
              disabled={!selectedProductId}
            >
              Add to campaign
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default SingleProduct;
