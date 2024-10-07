"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Edit,
  FileBadge,
  MonitorDot,
  QrCode,
  Share2,
  TabletSmartphoneIcon,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { fetchOfferById } from "@/services/campaign-service";
import { fetchAllTemplates } from "@/services/template-service";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import type { Offer } from "@prisma/client";
import PublishDialog from "@/components/campaigns/publish";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";

type DynamicComponentProps = {
  offer: Offer | null;
};
import { useMutation } from "@tanstack/react-query";
import { updateOffer } from "@/services/campaign-service";
import { toast } from "sonner";
import TemplateLiterals from "@/components/campaigns/template-literal";
import useTemplateLiteralsStore from "@/stores/template-literals";

export default function PreviewAndSelectTemplate() {
  const [view, setView] = useState("desktop");
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState("");
  const [currentTemplateId, setCurrentTemplateId] = useState("");
  const [SelectedComponent, setSelectedComponent] =
    useState<React.ComponentType<DynamicComponentProps> | null>(null);
  const offerIdParam = useSearchParams();
  const offerId = offerIdParam.get("id");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { templateLiterals, setTemplateLiteral } = useTemplateLiteralsStore();

  const { mutate, isError, isSuccess } = useMutation({
    mutationFn: updateOffer,
    onSuccess: (data) => {
      console.log("Campaign updated successfully:", data);
      toast.success("Campaign updated successfully");

      if (data.id) {
        queryClient.invalidateQueries({ queryKey: ["offer", data.id] });
        queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      }
    },
    onError: (error) => {
      toast.error(`Error updating offer: ${error}`);
    },
  });

  const handleUpdateOffer = () => {
    if (!offer) return;

    const updatedOffer = {
      ...offer,
      templateId: currentTemplateId,
      isActive: !offer.isActive,
      templateLiteral: templateLiterals || {},
    };

    mutate(updatedOffer);
  };

  const handleDraft = () => {
    if (!offer) return;

    const updatedOffer = {
      ...offer,
      templateId: currentTemplateId,
      isActive: false,
      templateLiteral: templateLiterals || {},
    };

    mutate(updatedOffer);
  };

  const handleResize = (size: string) => {
    setView(size);
  };

  const handleSheetToggle = () => {
    setSheetOpen(!isSheetOpen);
  };

  const handleEdit = () => {
    router.push(`/campaigns/edit/${offerId}`);
  };

  // Fetch offer by ID using React Query
  const useOfferById = (id: string) => {
    return useQuery({
      queryKey: ["offer", id],
      queryFn: () => fetchOfferById(id),
      enabled: !!id,
    });
  };

  const {
    data: offer,
    isLoading: isOfferLoading,
    error: offerError,
  } = useOfferById(offerId || "");

  // Fetch templates using React Query
  const {
    data: templates,
    isLoading: isTemplatesLoading,
    error: templatesError,
  } = useQuery({
    queryKey: ["templates"],
    queryFn: fetchAllTemplates,
  });

  // Filter templates based on offer type
  const filteredTemplates =
    templates?.filter(
      (tmpl: any) => tmpl.type.toLowerCase() === offer?.offerType?.toLowerCase()
    ) || [];

  useEffect(() => {
    if (!SelectedComponent && filteredTemplates.length > 0) {
      let selectedTemplate;

      // Check if a templateId exists in the offer and find the corresponding template
      if (offer?.templateId) {
        selectedTemplate = filteredTemplates.find(
          (template: any) => template.id === offer.templateId
        );
      }

      // If no template is found using the templateId, fall back to the default template
      if (!selectedTemplate) {
        selectedTemplate = filteredTemplates[0];
      }

      // Load the selected template
      loadComponent(selectedTemplate.component);
      setCurrentTemplate(selectedTemplate.name);
      setCurrentTemplateId(selectedTemplate.id);
    }
  }, [SelectedComponent, filteredTemplates, offer]);

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
      <div className="flex justify-between items-center">
        <h3>Customize campaign</h3>
        <div className="flex gap-4">
          <Button size="sm" onClick={handleSheetToggle}>
            Template
          </Button>
          {offer?.isActive && (
            <>
              <Separator orientation="vertical" className="h-8" />
              <Button
                size="icon"
                className="w-8 h-8"
                variant={"secondary"}
                title="Show QR Code"
              >
                <QrCode className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                className="w-8 h-8"
                variant={"secondary"}
                title="Download PDF"
              >
                <FileBadge className="w-5 h-5" />
              </Button>

              <Button
                size="icon"
                className="w-8 h-8"
                onClick={() => setIsDialogOpen(true)}
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </>
          )}

          <Separator orientation="vertical" className="h-8" />

          <Button
            size="icon"
            className="w-8 h-8"
            variant={"secondary"}
            title="Schedule"
            disabled={offer?.isActive}
          >
            <Clock className="w-5 h-5" />
          </Button>
          <Button size="sm" variant={"secondary"} onClick={handleEdit}>
            Edit
          </Button>
          <Button size="sm" variant={"secondary"} onClick={handleDraft}>
            Save as draft {offer?.templateId == currentTemplateId ? " " : "*"}
          </Button>

          <Button
            size="sm"
            className={
              offer?.isActive
                ? "bg-yellow-600 hover:bg-yellow-400"
                : "bg-green-600 hover:bg-green-400"
            }
            onClick={handleUpdateOffer}
          >
            {offer?.isActive ? "Unpublish" : "Publish"}
          </Button>
        </div>
      </div>
      <Separator />
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
          className={view === "mobile" ? "bg-green-600 hover:bg-green-600" : ""}
        >
          <TabletSmartphoneIcon className="cursor-pointer" />
        </Button>
        <TemplateLiterals offer={offer} />
      </div>
      <ScrollArea
        className={`container mx-auto flex flex-col gap-4 bg-muted rounded-md transition-all duration-300 overflow-auto ${
          view === "desktop" ? "w-full h-[75vh]" : "w-[375px] h-[75vh]"
        }`}
      >
        {SelectedComponent ? (
          <SelectedComponent offer={offer} />
        ) : (
          <p>Template loading....</p>
        )}
      </ScrollArea>

      {/* Sheet component triggered externally */}
      <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent>
          <SheetHeader className="mb-4">
            <SheetTitle>Select Template</SheetTitle>
          </SheetHeader>
          <div className="grid grid-cols-2 gap-2">
            {isTemplatesLoading ? (
              <p>Loading templates...</p>
            ) : templatesError ? (
              <p>Error loading templates.</p>
            ) : filteredTemplates.length > 0 ? (
              filteredTemplates.map((template: any) => (
                <Button
                  variant={"ghost"}
                  key={template.id}
                  onClick={() => {
                    setCurrentTemplate(template.name);
                    setCurrentTemplateId(template.id);
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
      <PublishDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
    </div>
  );
}
