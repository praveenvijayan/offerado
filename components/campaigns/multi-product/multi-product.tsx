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
} from "@tanstack/react-table";
import { ArrowLeft, ArrowRight, PlusCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useProductSelectionStore } from "@/stores/multiple-product-selection";
import CampaignTypeStore from "@/stores/campaign-type";

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
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

  console.log(selectedProducts.length);

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
      {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }: any) => (
          <Checkbox
            checked={isSelected(row.original.id)}
            onCheckedChange={() => toggleProductSelection(row.original.id)}
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
    <div className="multi-product">
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
          onClick={resetProducts}
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
        <div className="flex items-center gap-2">
          <Button size="icon" className="rounded-xl">
            <PlusCircle className="w-6 h-6" />
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[80vh] w-full">
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

export default MultiProduct;
