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

type SortOrder = "asc" | "desc"; // Define the sorting order

const ProductsList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // State to track search query
  const [sortColumn, setSortColumn] = useState<string>("name"); // State to track the column being sorted
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc"); // State to track sorting order

  const itemsPerPage = 8; // Number of items per page

  // Handle the search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when search query changes
  };

  // Handle sorting column and order
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Toggle sorting order if the column is already selected
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set new sort column and default to ascending order
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  // Sort and filter products based on the search query and sort column
  const filteredProducts = products
    .filter((product: any) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a: any, b: any) => {
      if (sortColumn === "name" || sortColumn === "category") {
        // Sort strings
        return sortOrder === "asc"
          ? a[sortColumn].localeCompare(b[sortColumn])
          : b[sortColumn].localeCompare(a[sortColumn]);
      } else {
        // Sort numbers (for MRP, offerPrice, etc.)
        return sortOrder === "asc"
          ? a[sortColumn] - b[sortColumn]
          : b[sortColumn] - a[sortColumn];
      }
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage); // Total number of pages

  // Get the current page's products
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="products-list ">
      <h2 className="flex justify-between items-center bg-muted py-2 px-4 rounded-lg mb-4">
        Products List{" "}
        <input
          type="text"
          placeholder="Search products"
          value={searchQuery} // Bind searchQuery to the input field
          onChange={handleSearchChange} // Update searchQuery when the input changes
          className="p-1 px-4 text-sm rounded-md"
        />
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
              {sortColumn === "name" && (sortOrder === "asc" ? "▲" : "▼")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("category")}
              className="cursor-pointer"
            >
              Category{" "}
              {sortColumn === "category" && (sortOrder === "asc" ? "▲" : "▼")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("mrp")}
              className="cursor-pointer"
            >
              MRP {sortColumn === "mrp" && (sortOrder === "asc" ? "▲" : "▼")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("offerPrice")}
              className="cursor-pointer"
            >
              Offer Price{" "}
              {sortColumn === "offerPrice" && (sortOrder === "asc" ? "▲" : "▼")}
            </TableHead>
            <TableHead>Offer Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product: any) => (
              <TableRow key={product.id} className="max-h-16">
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={64}
                    height={64}
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
                No products found
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

              {/* Show ellipsis if there are more than 3 pages and currentPage > 3 */}
              {currentPage > 3 && totalPages > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {/* Show middle pages if they are within a certain range */}
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

              {/* Show ellipsis if currentPage is far from the last page */}
              {currentPage < totalPages - 2 && totalPages > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {/* Always show the last page */}
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

      <Button type="submit" className="mt-4">
        Continue
      </Button>
    </div>
  );
};

export default ProductsList;
