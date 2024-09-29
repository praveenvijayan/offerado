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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCampaign, fetchAllCampaigns } from "@/services/campaign-service";
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
  Edit,
  Trash,
  PlusCircle,
} from "lucide-react";
import { CellContext, SortingState } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "../ui/badge";
import { CampaignCreateButton } from "./campaign-create-button";
import Image from "next/image";

const CampaignTable = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

  const { mutate: deleteOffer } = useMutation({
    mutationFn: deleteCampaign,
    onSuccess: () => {
      toast.success("Campaign deleted successfully");
      // Invalidate or refetch offers to reflect the deletion
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
    onError: (error) => {
      console.error("Error deleting offer:", error);
    },
  });

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
      accessorKey: "isActive",
      header: "Published",
      cell: (info: CellContext<any, any>) => (
        <Badge
          variant="outline"
          className={`flex justify-center items-center h-full w-fit mx-auto ${
            info.getValue() ? "border-green-600" : ""
          }`}
        >
          {info.getValue() ? "Yes" : "No"}
        </Badge>
      ),
      className: "text-center",
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
    {
      accessorKey: "actions",
      header: "ACTIONS",
      enableSorting: false,
      cell: ({ row }: any) => {
        // Get the row's data
        const rowData = row.original;

        return (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleEdit(rowData)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(rowData)}
            >
              <Trash className="w-4 h-4 stroke-red-500" />
            </Button>
          </div>
        );
      },
    },
  ];

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

  const handleEdit = (rowData: any) => {
    router.push(`/campaigns/preview?id=${rowData.id}`);
  };

  const handleDelete = (rowData: any) => {
    setSelectedCampaign(rowData);
    setIsDialogOpen(true);
  };

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
      {campaigns.length === 0 ? (
        // No campaigns message and button
        <div className="flex flex-col items-center justify-center my-auto h-[70vh]">
          <p className="text-lg">You haven&apos;t created any campaign yet.</p>
          <Image
            src={"/empty-campaigns.png"}
            alt="Empty Campaigns"
            width={546 / 1.5}
            height={457 / 1.5}
          />
          <CampaignCreateButton />
        </div>
      ) : (
        <>
          {/* Campaigns Table */}
          <div className="flex justify-between items-center mb-4">
            <Input
              type="text"
              placeholder="Search campaigns..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
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
                        {header.column.getCanSort() ? (
                          header.column.getIsSorted() ? (
                            header.column.getIsSorted() === "desc" ? (
                              <ArrowDown className="ml-2 h-4 w-4 inline" />
                            ) : (
                              <ArrowUp className="ml-2 h-4 w-4 inline" />
                            )
                          ) : (
                            <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                          )
                        ) : null}
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
              {[5, 10, 25, 50, 100].map((size) => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <h3 className="text-sm ">
            Are you sure you want to delete the campaign:{" "}
            <span className="text-md font-semibold inline ">
              {selectedCampaign?.title}?
            </span>
          </h3>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => {
                if (selectedCampaign) {
                  deleteOffer(selectedCampaign.id);
                }
                setIsDialogOpen(false);
              }}
            >
              Confirm
            </Button>
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignTable;
