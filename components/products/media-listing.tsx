import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useDeleteFile, useGetAllImages } from "@/services/media";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea } from "../ui/scroll-area";

const MediaListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImages, setSelectedImages] = useState<{ [key: string]: any }>(
    {}
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  const { data, isLoading, isError } = useGetAllImages(
    currentPage,
    itemsPerPage
  );
  const images = data?.images || [];
  const totalPages = data?.totalPages || 1;

  const { mutate: deleteFile, isPending: isDeleting } = useDeleteFile();

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter images based on the search term
  const filteredImages = images.filter((image: any) =>
    image.name.toLowerCase().includes(searchTerm)
  );

  // Handle checkbox change for selecting images
  const handleCheckboxChange = (imageId: string, imageData: any) => {
    setSelectedImages((prevSelected) => {
      const updated = { ...prevSelected };
      if (updated[imageId]) {
        delete updated[imageId];
      } else {
        updated[imageId] = imageData;
      }
      return updated;
    });
  };

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Handle deleting selected files
  const handleDelete = () => {
    Object.keys(selectedImages).forEach((imageId) => {
      const image = selectedImages[imageId];
      deleteFile(image.url);
    });
    setSelectedImages({}); // Clear selected images after deletion
  };

  // Download selected image URLs as a text file
  const downloadUrlsAsFile = () => {
    const selectedData = Object.values(selectedImages)
      .map((image: any) => `${image.name},${image.url}`)
      .join("\n");

    if (selectedData) {
      const blob = new Blob([`Name,URL\n${selectedData}`], {
        type: "text/csv",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "selected-images.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  useEffect(() => {
    // Ensure that the images for the current page reflect the checkbox selection state
    images.forEach((image: any) => {
      if (selectedImages[image.id]) {
        setSelectedImages((prevSelected) => ({
          ...prevSelected,
          [image.id]: image,
        }));
      }
    });
  }, [images]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading images</div>;

  return (
    <>
      <div className="flex justify-between items-center py-4 gap-4">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button
          onClick={downloadUrlsAsFile}
          disabled={Object.keys(selectedImages).length === 0}
        >
          Download CSV
        </Button>
        <Button
          variant={"destructive"}
          onClick={handleDelete}
          disabled={isDeleting || Object.keys(selectedImages).length === 0}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <DotsVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem
              onClick={() =>
                setSelectedImages(
                  filteredImages.reduce((acc: any, image: any) => {
                    acc[image.id] = image;
                    return acc;
                  }, {} as { [key: string]: any })
                )
              }
            >
              Select All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedImages({})}>
              Deselect All
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ScrollArea className="h-[65vh]">
        <div className="grid grid-cols-1 gap-2">
          {filteredImages.map((image: any) => (
            <div
              key={image.id}
              className="border bg-muted-foreground/20 p-4 rounded-lg flex items-center gap-4 h-16 px-4"
            >
              <Checkbox
                checked={!!selectedImages[image.id]}
                onCheckedChange={() =>
                  handleCheckboxChange(image.id, {
                    id: image.id,
                    name: image.name,
                    url: image.url,
                  })
                }
              />
              <Image
                src={image.url}
                alt={`Image ${image.id}`}
                width={64}
                height={64}
              />
              <h4 className="text-xs m-0 pt-2 text-pretty break-all w-2/3">
                {image.name}
              </h4>
            </div>
          ))}
        </div>
      </ScrollArea>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              className={
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => handlePageChange(i + 1)}
                isActive={i + 1 === currentPage}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              className={
                currentPage === totalPages
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default MediaListing;
