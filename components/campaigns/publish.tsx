"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  MessageCircleCode,
} from "lucide-react";

const PublishDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const [url, setUrl] = useState("https://example.com");
  const [isCopied, setIsCopied] = useState(false);

  // Copy the URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500); // Reset after 1.5 seconds
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share your campaign</DialogTitle>
          <DialogDescription>
            Share your awesome campaign with the world!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-left gap-4">
          {/* Social Media Icons */}
          <div className="flex gap-4">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/?text=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-green-500"
            >
              <MessageCircleCode className="w-8 h-8" />
            </a>
            {/* Twitter */}
            <a
              href={`https://twitter.com/share?url=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-400"
            >
              <Twitter className="w-8 h-8" />
            </a>
            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                url
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600"
            >
              <Facebook className="w-8 h-8" />
            </a>
            {/* LinkedIn */}
            <a
              href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
                url
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-700"
            >
              <Linkedin className="w-8 h-8" />
            </a>
          </div>

          {/* URL Copy Field */}
          <div className="flex items-center bg-muted p-2 rounded-md w-full max-w-md">
            <input
              type="text"
              value={url}
              readOnly
              className="bg-transparent flex-1 p-2 outline-none"
            />
            <Button
              onClick={copyToClipboard}
              variant="ghost"
              className="flex items-center"
            >
              {isCopied ? "Copied!" : <Copy className="w-6 h-6" />}
            </Button>
          </div>
        </div>
        <DialogFooter>
          {/* <Button onClick={() => setIsOpen(false)} variant="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              // Handle publish logic here
              setIsOpen(false);
            }}
            variant="default"
          >
            Publish
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PublishDialog;
