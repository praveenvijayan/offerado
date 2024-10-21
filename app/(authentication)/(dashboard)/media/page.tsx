"use client";
import React, { useEffect, useState } from "react";
import Uppy from "@uppy/core";
import { Dashboard, useUppyState } from "@uppy/react";
import XHRUpload from "@uppy/xhr-upload";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useGetAllImages } from "@/services/media";
import MediaListing from "@/components/products/media-listing";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
function createUppy() {
  return new Uppy({
    restrictions: {
      maxFileSize: 10485760,
      allowedFileTypes: ["image/*"],
    },
  }).use(XHRUpload, {
    endpoint: "/api/media/upload",
    formData: true,
    fieldName: "files[]",
    bundle: true,
    headers: {
      "x-upload-initiator": "client",
    },
  });
}

const MediaPage: React.FC = () => {
  const [uppy] = useState(createUppy);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const queryClient = useQueryClient();
  const fileCount = useUppyState(
    uppy,
    (state) => Object.keys(state.files).length
  );
  const totalProgress = useUppyState(uppy, (state) => state.totalProgress);

  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

  useEffect(() => {
    uppy.on("complete", () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
      setDrawerOpen(false);
      uppy.cancelAll();
      uppy.setState({ currentUploads: {} });
      toast.success("All files uploaded successfully!");
    });
  }, [uppy, queryClient]);

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Image Library</h1>
        <Button className="bg-green-500 rounded-2xl" onClick={toggleDrawer}>
          Upload Image
        </Button>
      </div>
      <MediaListing />
      <Drawer open={isDrawerOpen} onOpenChange={toggleDrawer}>
        {/* <DrawerTrigger>Open</DrawerTrigger> */}
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Upload your images</DrawerTitle>
            <DrawerDescription>
              This action will upload the images.
            </DrawerDescription>
          </DrawerHeader>
          <Dashboard uppy={uppy} />
          <DrawerFooter>
            <DrawerClose>
              {/* <Button variant="outline">Cancel</Button> */}
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MediaPage;
