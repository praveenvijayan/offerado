import React, { useEffect, useState, useMemo, CSSProperties } from "react";
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
import { useQueryClient } from "@tanstack/react-query";
import usePollStore from "@/stores/poll";
import useFeedbackStore from "@/stores/feedback";
import { useCombinedItemsStore } from "@/stores/combined-items-store";

interface DraggableRowProps {
  row: Row<any>;
  updateData: (
    rowIndex: number,
    columnId: string,
    value: any,
    fieldToUpdate?: string
  ) => void;
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
            row={row.original}
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
  updateData: (
    rowIndex: number,
    columnId: string,
    value: any,
    fieldToUpdate?: string
  ) => void;
  row: any;
}

const EditableCell: React.FC<EditableCellProps> = React.memo(
  ({ cell, rowIndex, updateData, row }) => {
    const initialValue = cell.getValue();
    const columnId = cell.column.id;

    const [value, setValue] = useState(initialValue);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    const onBlur = () => {
      setIsEditing(false);
      if (columnId === "nameOrTitle") {
        // Determine the actual field to update ('name' or 'title')
        const fieldToUpdate = row.name !== undefined ? "name" : "title";
        updateData(rowIndex, columnId, value, fieldToUpdate);
      } else {
        updateData(rowIndex, columnId, value);
      }
    };

    if (columnId === "nameOrTitle" || columnId === "offerPrice") {
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
                columnId === "nameOrTitle" ? "w-full" : "w-[4.5rem]"
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

const MultiItemDisplay = () => {
  const {
    selectedProducts,
    resetProducts,
    toggleProductSelection,
    updateProducts,
  } = useProductSelectionStore();
  const { selectedPollData, resetSelectedPollData } = usePollStore();
  const { selectedFeedbackData, resetSelectedFeedbackData } =
    useFeedbackStore();
  const [sorting, setSorting] = useState<SortingState>([]);
  const { resetIsProductSelected } = CampaignTypeStore();
  const queryClient = useQueryClient();

  const {
    combinedItems,
    setCombinedItems,
    addItem,
    removeItem,
    resetCombinedItems,
  } = useCombinedItemsStore();

  // State variable for combinedItems
  // const [combinedItems, setCombinedItems] = useState<any[]>([]);

  // Update combinedItems whenever the selected items change
  useEffect(() => {
    const items = [
      ...selectedProducts.map((item) => ({ ...item, itemType: "product" })),
      ...(selectedPollData ? [{ ...selectedPollData, itemType: "poll" }] : []),
      ...(selectedFeedbackData
        ? [{ ...selectedFeedbackData, itemType: "feedback" }]
        : []),
    ];
    setCombinedItems(items);
  }, [
    selectedProducts,
    selectedPollData,
    selectedFeedbackData,
    setCombinedItems,
  ]);

  useEffect(() => {
    if (
      !selectedProducts.length &&
      !selectedPollData &&
      !selectedFeedbackData
    ) {
      resetIsProductSelected();
    }
    queryClient.invalidateQueries({ queryKey: ["campaigns"] });
  }, [
    selectedProducts,
    selectedPollData,
    selectedFeedbackData,
    resetIsProductSelected,
    queryClient,
  ]);

  const updateData = (
    rowIndex: number,
    columnId: string,
    value: any,
    fieldToUpdate?: string
  ) => {
    const newData = [...combinedItems];
    if (newData[rowIndex] && typeof newData[rowIndex] === "object") {
      if (columnId === "nameOrTitle" && fieldToUpdate) {
        (newData[rowIndex] as Record<string, any>)[fieldToUpdate] = value;
      } else {
        (newData[rowIndex] as Record<string, any>)[columnId] =
          columnId === "offerPrice" ? parseFloat(value) : value;
      }
    }
    setCombinedItems(newData);
    // Optionally, update individual stores if needed
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "index",
        header: "#",
        cell: ({ row }: { row: Row<any> }) => row.index + 1,
        size: 50,
      },
      {
        accessorKey: "image",
        header: "IMAGE",
        cell: ({ row }: { row: Row<any> }) =>
          row.original.image ? (
            <Image
              src={row.original.image}
              alt={row.original.name || row.original.title}
              className="object-cover rounded-md"
              width={32}
              height={32}
            />
          ) : (
            <span className="text-xs">
              {row.original.itemType.toUpperCase() || "No Image"}
            </span>
          ),
      },
      {
        id: "nameOrTitle",
        header: "NAME/TITLE",
        accessorFn: (row: any) => row.name || row.title || "-",
        cell: ({ getValue }: any) => getValue(),
      },
      {
        id: "categoryOrDescription",
        header: "CATEGORY/DESCRIPTION",
        accessorFn: (row) => row.category || row.description || "-",
        cell: ({ getValue }) => getValue(),
      },
      {
        accessorKey: "offerPrice",
        header: "OFFER PRICE",
        cell: ({ row }: { row: Row<any> }) =>
          row.original.offerPrice
            ? `${row.original.offerPrice.toFixed(2)} ₹`
            : "-",
      },
      {
        accessorKey: "actions",
        header: "ACTIONS",
        enableSorting: false,
        cell: ({ row }: { row: Row<any> }) => (
          <div className="flex gap-2">
            <Button
              variant="destructive"
              onClick={() => {
                // Remove the item from combinedItems
                const newItems = combinedItems.filter(
                  (item) => item.id !== row.original.id
                );
                setCombinedItems(newItems);
                // Optionally, update individual stores if needed
                if (row.original.itemType === "product") {
                  toggleProductSelection(row.original);
                } else if (row.original.itemType === "poll") {
                  resetSelectedPollData();
                } else if (row.original.itemType === "feedback") {
                  resetSelectedFeedbackData();
                }
              }}
              className="w-5 h-5 p-0 self-center flex mx-auto"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ),
      },
    ],
    [
      combinedItems,
      toggleProductSelection,
      resetSelectedPollData,
      resetSelectedFeedbackData,
    ]
  );

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = combinedItems.findIndex((item) => item.id === active.id);
      const newIndex = combinedItems.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(combinedItems, oldIndex, newIndex);
      setCombinedItems(newItems);
      // Optionally, update individual stores if needed
    }
  };

  const table = useReactTable({
    data: combinedItems,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => row.id,
  });

  if (!combinedItems.length) {
    return <div>No items selected</div>;
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <ScrollArea className="h-[70vh] w-full">
        <div className="multi-item-display w-full mx-auto">
          <div className="flex justify-between items-center">
            <p className="text-xs">
              You have{" "}
              <span className="font-semibold text-green-500">
                {combinedItems.length}
              </span>{" "}
              items in the list.
            </p>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => {
                resetIsProductSelected();
                resetProducts();
                resetSelectedPollData();
                resetSelectedFeedbackData();
                setCombinedItems([]);
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
                    {{
                      asc: <ArrowUp className="inline-block ml-2 w-4 h-4" />,
                      desc: <ArrowDown className="inline-block ml-2 w-4 h-4" />,
                    }[header.column.getIsSorted() as string] ?? null}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <SortableContext
                items={combinedItems}
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

export default MultiItemDisplay;
