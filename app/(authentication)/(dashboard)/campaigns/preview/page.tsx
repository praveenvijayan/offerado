"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MonitorDot, TabletSmartphoneIcon } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { fetchOfferById } from "@/services/campaign-service";
import template from "@/data/template.json";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import type { Offer } from "@prisma/client";

type DynamicComponentProps = {
  offer: Offer | null;
};

export default function PreviewAndSelectTemplate() {
  const [view, setView] = useState("desktop");
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState("");
  const [SelectedComponent, setSelectedComponent] =
    useState<React.ComponentType<DynamicComponentProps> | null>(null);
  const offerIdParam = useSearchParams();
  const offerId = offerIdParam.get("id");

  const handleResize = (size: string) => {
    setView(size);
  };

  const handleSheetToggle = () => {
    setSheetOpen(!isSheetOpen);
  };

  const useOfferById = (id: string) => {
    return useQuery({
      queryKey: ["offer", id],
      queryFn: () => fetchOfferById(id),
      enabled: !!id,
    });
  };

  const { data: offer, isLoading, error } = useOfferById(offerId || "");

  const filteredTemplates = template.filter(
    (tmpl) => tmpl.type.toLowerCase() === offer?.offerType?.toLowerCase()
  );

  useEffect(() => {
    if (!SelectedComponent && filteredTemplates.length > 0) {
      loadComponent(filteredTemplates[0].component);
      setCurrentTemplate(filteredTemplates[0].name);
    }
  }, [SelectedComponent, filteredTemplates]);

  // Function to dynamically load and set the component
  const loadComponent = (componentPath: string) => {
    const DynamicComponent = dynamic<DynamicComponentProps>(
      () => import(`@/components/${componentPath}`)
    );
    setSelectedComponent(() => DynamicComponent);
    setSheetOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h3>Customize campaign</h3>
        <div className="flex justify-center align-middle gap-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => handleResize("desktop")}
            className={
              view === "desktop" ? "bg-green-600 hover:bg-green-600" : ""
            }
          >
            <MonitorDot className="cursor-pointer" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => handleResize("mobile")}
            className={
              view === "mobile" ? "bg-green-600 hover:bg-green-600" : ""
            }
          >
            <TabletSmartphoneIcon className="cursor-pointer" />
          </Button>
        </div>
        <div className="flex gap-4">
          <Button size="sm" onClick={handleSheetToggle}>
            Select template
          </Button>
        </div>
      </div>
      <div
        className={`container mx-auto flex flex-col gap-4 bg-muted rounded-md transition-all duration-300 ${
          view === "desktop"
            ? "w-full min-h-[80vh] h-auto"
            : "w-[375px] h-[667px]"
        }`}
      >
        {SelectedComponent ? (
          <SelectedComponent offer={offer} />
        ) : (
          <p>Select a template to load</p>
        )}
      </div>

      {/* Sheet component triggered externally */}
      <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent>
          <SheetHeader className="mb-4">
            <SheetTitle>Select Template</SheetTitle>
          </SheetHeader>
          <div className="grid grid-cols-2 gap-2">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((template) => (
                <Button
                  variant={"ghost"}
                  key={template.id}
                  onClick={() => {
                    setCurrentTemplate(template.name);
                    loadComponent(template.component);
                  }}
                  className={`flex flex-col border rounded-md p-4 h-auto w-auto ${
                    SelectedComponent && template.name === currentTemplate
                      ? "border-green-600"
                      : ""
                  }`}
                >
                  <h3 className="text-sm ml-0">{template.name}</h3>
                  <div className="mt-2">
                    <Image
                      src={template.image}
                      alt={template.name}
                      width={120}
                      height={100}
                      className="rounded-md"
                    />
                  </div>
                </Button>
              ))
            ) : (
              <p>No templates available for this offer type.</p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
