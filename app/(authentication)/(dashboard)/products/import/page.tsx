"use client";
import { Input } from "@/components/ui/input";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { CircleAlertIcon, CircleX } from "lucide-react";
import Link from "next/link";
import { useUploadProducts } from "@/services/product-services";
import { Product } from "@prisma/client";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
// Define Zod schema for product validation
const productSchema = z.object({
  sku: z.string().nonempty("SKU is required"),
  name: z.string().nonempty("Name is required"),
  category: z.string().nonempty("Category is required"),
  mrp: z.number().min(0, "MRP must be a positive number"),
  offerPrice: z.number().min(0, "Offer price must be a positive number"),
  quantity: z.number().int().min(0, "Quantity must be a positive integer"),
  image: z.string().url("Image must be a valid URL"),
  unit: z.string().nonempty("Unit is required"),
  discountType: z.string().nonempty("Discount type is required"),
});

// Schema for the list of products
const productsSchema = z.array(productSchema).refine(
  (products) => {
    const uniqueSkus = new Set(products.map((product) => product.sku));
    return uniqueSkus.size === products.length;
  },
  { message: "SKU must be unique" }
);

export default function ImportProductsPage() {
  const [data, setData] = useState<Product[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mutation = useUploadProducts();
  const [errors, setErrors] = useState<string[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (result) {
          const data = new Uint8Array(result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json<Product>(worksheet);

          const parsed = productsSchema.safeParse(jsonData);

          if (!parsed.success) {
            const validationErrors = parsed.error.errors.map(
              (err) => `Row ${(err.path[0] as number) + 2}: ${err.message}`
            );
            setErrors(validationErrors);
          } else {
            setData(parsed.data as any);
            setErrors([]);
          }
        }

        // Clear the input after processing
      };
      reader.readAsArrayBuffer(file);
    }
  };

  function clearInput() {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const handleUpload = () => {
    if (data.length === 0) {
      console.error("No data to upload");
      return;
    }
    mutation.mutate(data);
  };

  return (
    <div className="container mx-auto">
      <div className="flex  items-start justify-between">
        <h1 className="text-2xl font-bold mb-5">
          Import Products{" "}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <CircleAlertIcon className="w-4 h-4 inline-block mr-1" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-100 p-6">
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-normal flex items-center mb-2">
                  Make sure Before you upload
                </h4>
                <ul className="text-xs list-disc flex flex-col gap-2">
                  <li>
                    Click on the download template to download the template.
                  </li>
                  <li>Product SKU is unique and not already used.</li>
                  <li>Image must be a url.</li>
                  <li>
                    The fields name, category, unit and discountType must be
                    text.
                  </li>
                  <li>
                    The fields mrp,offerPrice and quantity must be numbers.
                  </li>
                </ul>
              </div>
            </PopoverContent>
          </Popover>
        </h1>
        <Link
          href="/assets/product-template.xlsx"
          className="text-green-500 hover:bg-muted inline-block p-2 px-4 rounded-lg border"
          target="_blank"
        >
          <span className="text-sm">Download template</span>
        </Link>
      </div>
      <Separator className="mb-6" />
      <div className="flex items-start space-x-2 mb-5">
        <div className="w-full flex-col max-w-xl">
          <Input
            ref={fileInputRef}
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
          />
        </div>
        <Button size={"icon"} variant={"destructive"} onClick={clearInput}>
          <CircleX className="h-6 w-6" />
        </Button>
        <Button
          className="bg-green-500 rounded-2xl flex ml-auto"
          onClick={handleUpload}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Uploading..." : "Upload"}
        </Button>
      </div>

      {errors.length > 0 && (
        <div className="mt-4">
          <h2 className="text-red-500 font-bold mb-2">Validation Errors:</h2>
          <ul className="text-red-500 list-disc pl-5">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* {mutation.isError && (
        <div className="text-red-500 mt-4">Error: {mutation.error.message}</div>
      )} */}
    </div>
  );
}
