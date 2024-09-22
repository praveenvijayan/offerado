"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useProductsStore from "@/stores/use-product-store";
import { ArrowLeft } from "lucide-react";
import useTabsStore from "@/stores/campaign-tabs";
import products from "@/data/products.json"; // Import actual products data

const ProductsSelectedList: React.FC = () => {
  const { moveToNextTab, moveToPreviousTab } = useTabsStore(); // Handle tab navigation
  const { selectedProducts, currentPage, setCurrentPage } = useProductsStore(); // Get selected product IDs

  const itemsPerPage = 6;

  // Get the actual products using the selected product IDs
  const selectedProductList = products.filter((product: any) =>
    selectedProducts.includes(product.id)
  );

  // Pagination logic
  const totalPages = Math.ceil(selectedProductList.length / itemsPerPage);

  const paginatedProducts = selectedProductList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="products-list px-4">
      <div className="flex flex-col justify-between items-start w-full mb-6">
        <h3 className="font-semibold text-xl">Customize the Campaign</h3>
        <h4 className="text-sm font-normal">
          You have added {selectedProducts.length} products to your campaign
          list
        </h4>
      </div>
      <Table>
        <TableHeader className="bg-muted/10">
          <TableRow>
            <TableHead className="text-center text-xs font-semibold">
              IMAGE
            </TableHead>
            <TableHead className="text-xs font-semibold">
              PRODUCT NAME
            </TableHead>
            <TableHead className="text-center text-xs font-semibold">
              MRP
            </TableHead>
            <TableHead className="text-center text-xs font-semibold">
              OFFER PRICE
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product: any) => (
              <TableRow key={product.id} className="max-h-16">
                <TableCell>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={48}
                    height={48}
                    className="rounded-md"
                  />
                </TableCell>
                <TableCell className="text-sm">{product.name}</TableCell>
                <TableCell className="text-sm text-center">
                  {product.mrp}
                </TableCell>
                <TableCell className="text-sm text-center">
                  {product.offerPrice}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No selected products
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center border-t-2 border-b-2 py-3">
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

              {Array.from({ length: totalPages }, (_, index) => index + 1)
                .slice(1, -1) // Display middle pages, excluding first and last
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
          onClick={moveToPreviousTab} // Go back to the previous tab
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
        <Button
          type="submit"
          className="mt-4 bg-green-500 rounded-2xl"
          onClick={moveToNextTab} // Continue to the next tab
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ProductsSelectedList;
