import React, { useEffect, useState, useMemo, CSSProperties } from "react";
import { useProducts } from "@/services/product-services";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
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
import { ArrowDown, ArrowUp, X } from "lucide-react";
import { useProductSelectionStore } from "@/stores/multiple-product-selection";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Product } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CampaignTypeStore from "@/stores/campaign-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import usePollStore from "@/stores/poll";

interface DraggableRowProps {
  row: Row<Product>;
  updateData: (rowIndex: number, columnId: string, value: any) => void;
}

const DraggableRow: React.FC<DraggableRowProps> = React.memo(
  ({ row, updateData }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: row.original.id,
    });

    const style: CSSProperties = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.8 : 1,
      zIndex: isDragging ? 1 : 0,
      position: "relative",
    };

    return (
      <tr ref={setNodeRef} style={style}>
        <TableCell
          {...attributes}
          {...listeners}
          style={{ cursor: "grab", width: "60px" }}
        >
          🟰
        </TableCell>

        {row.getVisibleCells().map((cell) => (
          <EditableCell
            key={cell.id}
            cell={cell}
            rowIndex={row.index}
            updateData={updateData}
          />
        ))}
      </tr>
    );
  }
);
DraggableRow.displayName = "DraggableRow";

interface EditableCellProps {
  cell: any;
  rowIndex: number;
  updateData: (rowIndex: number, columnId: string, value: any) => void;
}

const EditableCell: React.FC<EditableCellProps> = React.memo(
  ({ cell, rowIndex, updateData }) => {
    const initialValue = cell.getValue();
    const columnId = cell.column.id;

    const [value, setValue] = useState(initialValue);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    const onBlur = () => {
      setIsEditing(false);
      updateData(rowIndex, columnId, value);
    };

    if (columnId === "name" || columnId === "offerPrice") {
      return (
        <TableCell
          onClick={() => setIsEditing(true)}
          style={{ cursor: "pointer" }}
        >
          {isEditing ? (
            <input
              type={columnId === "offerPrice" ? "number" : "text"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={onBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onBlur();
                }
              }}
              autoFocus
              className={`border rounded px-2 py-1 ${
                columnId === "name" ? "w-full" : "w-[4.5rem]"
              }`}
            />
          ) : (
            value
          )}
        </TableCell>
      );
    }

    return (
      <TableCell>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </TableCell>
    );
  }
);

EditableCell.displayName = "EditableCell";

const MultiProductDisplay = () => {
  const {
    selectedProducts,
    resetProducts,
    toggleProductSelection,
    updateProducts,
  } = useProductSelectionStore();
  const [sorting, setSorting] = useState<SortingState>([]);
  const { resetIsProductSelected } = CampaignTypeStore();
  const queryClient = useQueryClient();
  const { selectedPollData, resetSelectedPollData } = usePollStore();

  useEffect(() => {
    if (!selectedProducts.length) {
      resetIsProductSelected();
    }
    console.log(selectedPollData);

    queryClient.invalidateQueries({ queryKey: ["campaigns"] });
  }, [selectedProducts]);

  const updateData = (rowIndex: number, columnId: string, value: any) => {
    const newData = [...selectedProducts];
    newData[rowIndex] = {
      ...newData[rowIndex],
      [columnId]: columnId === "offerPrice" ? parseFloat(value) : value,
    };

    // Update the store
    updateProducts(newData);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "index",
        header: "#",
        cell: ({ row }: { row: Row<Product> }) => row.index + 1,
        size: 50,
      },
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
        cell: ({ row }: { row: Row<Product> }) => row.original.name,
      },
      {
        accessorKey: "category",
        header: "CATEGORY",
        cell: ({ row }: { row: Row<Product> }) => row.original.category,
      },
      {
        accessorKey: "offerPrice",
        header: "OFFER PRICE",
        cell: ({ row }: { row: Row<Product> }) =>
          `${row.original.offerPrice.toFixed(2)} ₹`,
      },
      {
        accessorKey: "mrp",
        header: "MRP",
        cell: ({ row }: { row: Row<Product> }) =>
          `${row.original.mrp.toFixed(2)} ₹`,
      },
      {
        accessorKey: "actions",
        header: "ACTIONS",
        enableSorting: false,
        cell: ({ row }: { row: Row<Product> }) => (
          <div className="flex gap-2">
            <Button
              variant="destructive"
              onClick={() => {
                toggleProductSelection(row.original);
              }}
              className="w-5 h-5 p-0 self-center flex mx-auto"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ),
      },
    ],
    [toggleProductSelection]
  );

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = selectedProducts.findIndex(
        (item) => item.id === active.id
      );
      const newIndex = selectedProducts.findIndex(
        (item) => item.id === over.id
      );
      const newItems = arrayMove(selectedProducts, oldIndex, newIndex);

      // Update the store
      updateProducts(newItems);
    }
  }

  const table = useReactTable({
    data: selectedProducts,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => row.id,
  });

  if (!selectedProducts.length) {
    return <div>No products selected</div>;
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <ScrollArea className="h-[70vh] w-full">
        <div className="multi-product-display w-full mx-auto">
          <div className="flex justify-between items-center">
            <p className="text-xs">
              You have{" "}
              <span className="font-semibold text-green-500">
                {selectedProducts.length}
              </span>{" "}
              items in the list.
            </p>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => {
                resetIsProductSelected();
                resetProducts();
              }}
              className="w-auto p-2 mb-2 mr-2"
            >
              Clear All
            </Button>
          </div>
          <Separator />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead style={{ width: "60px" }}>Drag</TableHead>
                {table.getHeaderGroups()[0].headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getIsSorted() === "asc" && (
                      <ArrowUp className="inline-block ml-2 w-4 h-4" />
                    )}
                    {header.column.getIsSorted() === "desc" && (
                      <ArrowDown className="inline-block ml-2 w-4 h-4" />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <SortableContext
                items={selectedProducts}
                strategy={verticalListSortingStrategy}
              >
                {table.getRowModel().rows.map((row) => (
                  <DraggableRow
                    key={row.id}
                    row={row}
                    updateData={updateData}
                  />
                ))}
              </SortableContext>
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </DndContext>
  );
};

export default MultiProductDisplay;
