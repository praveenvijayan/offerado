"use client";
import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCampaigns } from "@/services/campaign-service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpDown,
} from "lucide-react";
import { CellContext, SortingState } from "@tanstack/react-table";

// Define columns for the table
const columns = [
  {
    accessorKey: "title",
    header: "TITLE",
    cell: (info: CellContext<any, any>) => info.getValue(),
  },
  {
    accessorKey: "description",
    header: "DESCRIPTION",
    cell: (info: CellContext<any, any>) => info.getValue(),
  },
  {
    accessorKey: "offerType",
    header: "TYPE",
    cell: (info: CellContext<any, any>) => info.getValue(),
  },
  {
    accessorKey: "startAt",
    header: "START DATE",
    cell: (info: CellContext<any, any>) =>
      new Date(info.getValue()).toLocaleDateString(),
  },
  {
    accessorKey: "endAt",
    header: "END DATE",
    cell: (info: CellContext<any, any>) =>
      new Date(info.getValue()).toLocaleDateString(),
  },
];

const CampaignTable = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  // Fetch campaigns from the API using React Query
  const {
    data: campaigns = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["campaigns"],
    queryFn: fetchAllCampaigns,
  });

  // Initialize the table instance with TanStack Table hooks
  const table = useReactTable({
    data: campaigns,
    columns,
    state: {
      globalFilter,
      sorting,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Loading and error handling
  if (isLoading) return <div>Loading campaigns...</div>;
  if (isError) return <div>Error loading campaigns: {error.message}</div>;

  return (
    <div>
      {/* Search Input */}
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="Search campaigns..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>

      {/* Campaigns Table */}
      <ScrollArea className="h-[70vh]">
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
                    {header.column.getIsSorted() ? (
                      header.column.getIsSorted() === "desc" ? (
                        <ArrowDown className="ml-2 h-4 w-4 inline" />
                      ) : (
                        <ArrowUp className="ml-2 h-4 w-4 inline" />
                      )
                    ) : (
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
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
      </ScrollArea>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ArrowLeft className="mr-1 h-4 w-4 inline" /> Previous
        </Button>
        <span className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next <ArrowRight className="ml-1 h-4 w-4 inline" />
        </Button>
        <select
          value={pagination.pageSize}
          onChange={(e) => {
            setPagination((prev) => ({
              ...prev,
              pageSize: Number(e.target.value),
            }));
          }}
          className="text-sm p-1"
        >
          {[5, 10, 20].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CampaignTable;
