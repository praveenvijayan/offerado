"use client";
import React, { useEffect, useState } from "react";
import { usePolls } from "@/hooks/use-poll";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
} from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  PlusCircle,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import CampaignTypeStore from "@/stores/campaign-type";
import useSheetStore from "@/stores/sheet-store";
import { useFeedbackForms } from "@/hooks/use-feedback";
import useFeedbackStore from "@/stores/feedback";

const Feedback: React.FC = () => {
  //   const [selectedFeedback, setSelectedFeedback] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const { selectedFeedbackData, setSelectedFeedbackData } = useFeedbackStore();
  const { setIsProductSelected, isProductSelected } = CampaignTypeStore();
  const { openSheet, close } = useSheetStore();

  // Feedback
  const { data: feedbackForms, isLoading, isError } = useFeedbackForms();
  const handleFeedbackChange = (feedback: any) => {
    setSelectedFeedbackData(feedback);
  };

  const handleSubmit = () => {
    close();
  };

  useEffect(() => {
    if (selectedFeedbackData) {
      setIsProductSelected();
    }
  }, [setIsProductSelected, selectedFeedbackData]);

  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "action",
      header: "ACTION",
      enableSorting: false,
      cell: ({ row }) => (
        <RadioGroup
          value={selectedFeedbackData?.id}
          onValueChange={() => handleFeedbackChange(row.original)}
        >
          <RadioGroupItem value={row.original.id} className="mr-2" />
        </RadioGroup>
      ),
    },
    {
      accessorKey: "title",
      header: "FEEDBACK TITLE",
      cell: ({ cell }) => <span>{cell.getValue() as string}</span>,
    },
  ];

  const table = useReactTable({
    data: feedbackForms || [],
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId);
      return value
        ? value.toString().toLowerCase().includes(filterValue.toLowerCase())
        : false;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto">
        <p>Loading feedback...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto">
        <p>Error loading feedback</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 relative">
      <div className="flex items-center gap-2 lg:absolute lg:-top-12 lg:right-0">
        <Button size="sm" className="rounded-xl flex gap-2 ml-auto mb-3">
          <PlusCircle className="w-4 h-4" /> New Feedback
        </Button>
      </div>
      <div className="flex justify-between items-center gap-4">
        <Input
          type="text"
          placeholder="Search polls..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className=""
        />
      </div>

      <ScrollArea className="mx-auto h-[70vh] flex flex-col gap-4 w-full">
        <Table>
          <TableHeader>
            <TableRow>
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center">
                        {header.column.columnDef.header as React.ReactNode}
                        {header.column.getCanSort() &&
                          (header.column.getIsSorted() ? (
                            header.column.getIsSorted() === "asc" ? (
                              <ArrowUpIcon className="inline-block w-4 h-4 ml-2" />
                            ) : (
                              <ArrowDownIcon className="inline-block w-4 h-4 ml-2" />
                            )
                          ) : (
                            <ArrowUpDownIcon className="inline-block w-4 h-4 ml-2" />
                          ))}
                      </div>
                    )}
                  </TableCell>
                ))
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.column.id === "action" ? (
                      <RadioGroup
                        value={selectedFeedbackData?.id}
                        onValueChange={() => handleFeedbackChange(row.original)}
                      >
                        <RadioGroupItem
                          value={row.original.id}
                          className="mr-2"
                        />
                      </RadioGroup>
                    ) : (
                      (cell.getContext().getValue() as React.ReactNode)
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
      <Button
        onClick={handleSubmit}
        disabled={!selectedFeedbackData}
        className="mt-4 ml-auto bg-green-500 hover:bg-green-600 text-white rounded-2xl"
      >
        Add to campaign
      </Button>
    </div>
  );
};

export default Feedback;
