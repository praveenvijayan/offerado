"use client";

import React, { useMemo } from "react";
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
import { Input } from "@/components/ui/input"; // Add input for search
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Arrow } from "@radix-ui/react-dropdown-menu";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import CampaignTypeStore from "@/stores/campaign-type";
import useSheetStore from "@/stores/sheet-store";
import { useState } from "react";
import SelectButton from "./select-button";
import useProductSingleStore from "@/stores/single-product-store";

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
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
  const { openSheet, open, close } = useSheetStore();
  const { setSelectedProduct } = useProductSingleStore();
  // Define columns for TanStack Table
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Product Name",
      },
      {
        accessorKey: "category",
        header: "Category",
      },
      {
        accessorKey: "mrp",
        header: "MRP",
      },
      {
        accessorKey: "offerPrice",
        header: "Offer Price",
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }: any) => (
          <SelectButton
            onSelect={async () => {
              await timeout(800);
              setSelectedProduct(row.original);
              close();
              await timeout(400);
              setIsProductSelected();
            }}
          />
        ),
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
    <div className="single-product">
      {/* Search Input */}
      <div className="flex justify-between items-center gap-4 mb-4">
        <Input
          type="text"
          placeholder="Search products..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className=""
        />
        {/* <div className="flex items-center gap-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Group</Label>
        </div> */}
      </div>
      <ScrollArea className="h-[84vh] w-full">
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

        <div className="pagination-controls mt-4 flex items-center justify-between gap-4 border-t border-b py-4">
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
      </ScrollArea>
    </div>
  );
};

export default SingleProduct;
