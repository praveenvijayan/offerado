"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import products from "@/data/products.json";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useProductsStore from "@/stores/use-product-store";
import {
  ArrowLeft,
  CircleAlert,
  Cross,
  CrossIcon,
  Delete,
  DeleteIcon,
  Import,
  LucideDelete,
  Search,
  X,
} from "lucide-react";
import useTabsStore from "@/stores/campaign-tabs";

type SortOrder = "asc" | "desc";

const ProductsList: React.FC = () => {
  const [viewSelected, setViewSelected] = useState(false);
  const { moveToNextTab, moveToPreviousTab } = useTabsStore();
  const {
    currentPage,
    searchQuery,
    sortColumn,
    sortOrder,
    selectedProducts,
    setCurrentPage,
    setSearchQuery,
    setSortColumn,
    setSortOrder,
    toggleProductSelection,
    reset,
  } = useProductsStore();

  const itemsPerPage = 6;

  // Handle the search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Handle sorting column and order
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  // Filter and sort the products based on search and sort options
  const filteredProducts = products
    .filter((product: any) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a: any, b: any) => {
      if (sortColumn === "name" || sortColumn === "category") {
        return sortOrder === "asc"
          ? a[sortColumn].localeCompare(b[sortColumn])
          : b[sortColumn].localeCompare(a[sortColumn]);
      } else {
        return sortOrder === "asc"
          ? a[sortColumn] - b[sortColumn]
          : b[sortColumn] - a[sortColumn];
      }
    });

  // Get only the selected products
  const selectedProductList = products.filter((product: any) =>
    selectedProducts.includes(product.id)
  );

  // Determine which products to display: all or selected
  const productsToDisplay = viewSelected
    ? selectedProductList
    : filteredProducts;

  const totalPages = Math.ceil(productsToDisplay.length / itemsPerPage);

  // Get the current page's products
  const paginatedProducts = productsToDisplay.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="products-list px-4">
      <div className="flex justify-between items-center w-full mb-6">
        <h3 className="font-semibold text-xl">
          {" "}
          Add Products to your campaigns{" "}
          <h4 className="text-sm font-normal">
            You have {products.length} products in your list
          </h4>
        </h3>
        <div className="">
          <Button variant={"ghost"} className="flex gap-2">
            <Import />
          </Button>
        </div>
      </div>
      <div className="w-full flex rounded-md bg-white text-sm items-center text-slate-800 relative">
        <Search className="stroke-gray-600 mx-2 absolute" />
        <input
          type="text"
          placeholder="Search products"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full bg-transparent p-2 px-10"
        />
      </div>
      <h2 className="flex justify-end items-end w-full mb-2 gap-4">
        {viewSelected ? (
          <Button
            variant={"link"}
            className="text-xs underline p-0"
            onClick={() => setViewSelected(false)}
          >
            Clear selection and view all products
          </Button>
        ) : (
          <Button
            variant={"link"}
            className="text-xs underline p-0"
            onClick={() => setViewSelected(true)}
          >
            You have selected
            <span className="font-semibold text-sm px-2">
              {selectedProducts.length}
            </span>
            products
          </Button>
        )}
        {selectedProducts.length ? (
          <Button
            variant={"link"}
            className="text-xs p-0 text-red-500 no-underline"
            onClick={() => reset()}
          >
            <X className="w-4 h-4 stroke-red-500" /> Clear All
          </Button>
        ) : (
          " "
        )}
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Select</TableHead>
            <TableHead>Image</TableHead>
            <TableHead
              onClick={() => handleSort("name")}
              className="cursor-pointer"
            >
              Product Name{" "}
              {sortColumn === "name" && (sortOrder === "asc" ? "⬆" : "⬇")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("category")}
              className="cursor-pointer"
            >
              Category{" "}
              {sortColumn === "category" && (sortOrder === "asc" ? "⬆" : "⬇")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("mrp")}
              className="cursor-pointer"
            >
              MRP {sortColumn === "mrp" && (sortOrder === "asc" ? "⬆" : "⬇")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("offerPrice")}
              className="cursor-pointer"
            >
              Offer Price{" "}
              {sortColumn === "offerPrice" && (sortOrder === "asc" ? "⬆" : "⬇")}
            </TableHead>
            <TableHead>Offer Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product: any) => (
              <TableRow key={product.id} className="max-h-16">
                <TableCell>
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={() => toggleProductSelection(product.id)}
                  />
                </TableCell>
                <TableCell>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="rounded-md"
                  />
                </TableCell>
                <TableCell className="text-sm">{product.name}</TableCell>
                <TableCell className="text-sm">{product.category}</TableCell>
                <TableCell className="text-sm">{product.mrp}</TableCell>
                <TableCell className="text-sm">{product.offerPrice}</TableCell>
                <TableCell className="text-sm">Discount</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                {viewSelected ? "No selected products" : "No products found"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Component */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(currentPage - 1)}
                  isActive={currentPage === 1}
                />
              </PaginationItem>

              {/* Always show the first page */}
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive={currentPage === 1}
                  onClick={() => handlePageChange(1)}
                >
                  1
                </PaginationLink>
              </PaginationItem>

              {currentPage > 3 && totalPages > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {Array.from({ length: totalPages }, (_, index) => index + 1)
                .filter(
                  (page) =>
                    page >= currentPage - 1 &&
                    page <= currentPage + 1 &&
                    page !== 1 &&
                    page !== totalPages
                )
                .map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === page}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

              {currentPage < totalPages - 2 && totalPages > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {totalPages > 1 && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === totalPages}
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(currentPage + 1)}
                  isActive={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
      <div className="flex items-center gap-4 w-full justify-between">
        <Button
          type="button"
          className="mt-4"
          variant={"ghost"}
          onClick={moveToPreviousTab}
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
        <Button
          type="submit"
          className="mt-4 bg-green-500 rounded-2xl"
          onClick={moveToNextTab}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ProductsList;
