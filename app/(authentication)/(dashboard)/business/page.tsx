"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Building2, Delete, Edit, PlusCircle } from "lucide-react";
import Link from "next/link";
import useOrganizationStore from "@/stores/organization";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation } from "@tanstack/react-query";
import { setBusinessAsDefault } from "@/services/business-services";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSetBusinessAsDefault } from "@/hooks/use-set-business-as-default";

const BusinessPage: React.FC = () => {
  const { organization } = useOrganizationStore();
  const { handleSetAsDefault, isPending } = useSetBusinessAsDefault();

  const businesses = organization?.businesses || [];

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "isDefault",
      header: "Default",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            size={"sm"}
            variant="outline"
            className={row.original.isDefault ? "bg-green-500" : ""}
            onClick={() =>
              handleSetAsDefault(row.original.id, organization?.id as string)
            }
          >
            {row.original.isDefault ? "Default" : "Set as Default"}
          </Button>
          <Button size={"icon"} variant="outline" className="p-0">
            <Edit className="h-4 w-4" />
          </Button>
          <Button size={"icon"} variant="destructive" className="p-0">
            <Delete className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  // Create the table instance using TanStack Table
  const table = useReactTable({
    data: businesses,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="p-4">
        <h3 className="text-2xl font-semibold">Business</h3>
        <p>
          You can create multiple business units to manage the products and
          campaigns.
        </p>
      </div>

      {/* Add New Business Button */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
        <Link
          href="/business/create"
          className="flex space-2 gap-3 w-fit border-2 p-3 rounded-xl hover:bg-slate-800"
        >
          <PlusCircle /> Add new business
        </Link>
      </div>

      <div className="p-4">
        <h3 className="text-md font-semibold mb-4 flex gap-3">
          <Building2 className="w-6 h-6" /> Your Businesses
        </h3>

        {businesses.length > 0 && (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {typeof header.column.columnDef.header === "function"
                        ? header.column.columnDef.header(header.getContext())
                        : header.column.columnDef.header}
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
                      {/* Pass the whole cell context here */}
                      {typeof cell.column.columnDef.cell === "function"
                        ? cell.column.columnDef.cell(cell.getContext())
                        : cell.getValue()?.toString() ?? ""}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
};

export default BusinessPage;
