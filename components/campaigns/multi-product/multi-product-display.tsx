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
import { ArrowDown, ArrowUp, Edit, X } from "lucide-react";
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
import { Arrow } from "@radix-ui/react-dropdown-menu";

interface DraggableRowProps {
  row: Row<Product>;
}

const DraggableRow: React.FC<DraggableRowProps> = ({ row }) => {
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
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </tr>
  );
};

const MultiProductDisplay = () => {
  const { data } = useProducts();
  const { selectedProducts, resetProducts, toggleProductSelection } =
    useProductSelectionStore();

  const [tableData, setTableData] = useState<Product[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]); // State for sorting

  useEffect(() => {
    if (!data) return;

    setTableData(
      data.filter((product) => selectedProducts.includes(product.id))
    );
  }, [selectedProducts, data]);

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
              variant="ghost"
              className="w-5 h-5 p-0 self-center flex mx-auto"
            >
              <Edit className="w-3 h-3" />
            </Button>
            <Button
              variant="destructive"
              onClick={() => toggleProductSelection(row.original.id)}
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
      setTableData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting }, // Add sorting state to the table
    onSortingChange: setSorting, // Set sorting change handler
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), // Add sorting model
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
              onClick={resetProducts}
              className="w-auto p-2 mb-2 mr-2"
            >
              Clear All
            </Button>
          </div>
          <Separator />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead style={{ width: "60px" }}>Move</TableHead>
                {table.getHeaderGroups()[0].headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()} // Add sorting handler
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
                items={tableData}
                strategy={verticalListSortingStrategy}
              >
                {table.getRowModel().rows.map((row) => (
                  <DraggableRow key={row.id} row={row} />
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
