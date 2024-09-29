"use client";

import React, { useEffect, useMemo } from "react";
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
import { ArrowLeft, ArrowRight, PlusCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useProductSelectionStore } from "@/stores/multiple-product-selection";
import CampaignTypeStore from "@/stores/campaign-type";
import { Separator } from "@/components/ui/separator";
import useSheetStore from "@/stores/sheet-store";
import Image from "next/image";
import type { Product } from "@prisma/client";

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

interface DraggableRowProps {
  row: Row<Product>;
}

const MultiProduct = () => {
  const { data, isLoading, error } = useProducts();
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { setIsProductSelected, resetIsProductSelected } = CampaignTypeStore();
  const { close } = useSheetStore();

  // Updated store usage
  const selectedProducts = useProductSelectionStore(
    (state) => state.selectedProducts
  );
  const toggleProductSelection = useProductSelectionStore(
    (state) => state.toggleProductSelection
  );
  const resetProducts = useProductSelectionStore(
    (state) => state.resetProducts
  );
  const isSelected = useProductSelectionStore((state) => state.isSelected);

  useEffect(() => {
    if (selectedProducts.length > 0) {
      setIsProductSelected();
    } else {
      resetIsProductSelected();
    }
  }, [selectedProducts]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "action",
        header: "Select",
        cell: ({ row }: any) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={isSelected(row.original.id)}
              onCheckedChange={() => toggleProductSelection(row.original)}
            />
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
            width={40}
            height={40}
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
    [isSelected, toggleProductSelection]
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
    <div className="multi-product relative">
      <div className="flex items-center absolute top-0 right-0">
        <Button size="sm" className="rounded-xl flex items-center gap-2">
          <PlusCircle className="w-6 h-6" /> New Product
        </Button>
      </div>
      <p className="text-sm mb-4 flex items-center gap-4">
        You have total <span className="font-semibold"> {data?.length} </span>{" "}
        product(s), and you have selected{" "}
        <span
          className={`font-semibold ${
            selectedProducts?.length > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {selectedProducts?.length}
        </span>{" "}
        product(s).
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl text-red-600"
          onClick={() => {
            resetProducts();
            resetIsProductSelected();
          }}
          disabled={selectedProducts.length === 0}
        >
          <XCircle className="w-5 h-5" />
        </Button>
      </p>

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
      <ScrollArea className="h-[75vh] w-full pb-[8rem]">
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Pagination Controls */}
        <div className="absolute bottom-0 left-0 bg-muted/20 rounded-md w-full">
          <div className="pagination-controls mt-4 flex items-center justify-between">
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
            <div className="flex-1 flex justify-between items-center">
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
              onClick={() => {
                close();
              }}
            >
              Add to campaign
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default MultiProduct;
