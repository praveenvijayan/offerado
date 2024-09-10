"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MonitorDot, TabletSmartphoneIcon } from "lucide-react";
import { useTemplateStore } from "@/stores/store"; // Import Zustand store

const TemplateSelection = () => {
  const {
    templates,
    selectedTemplate,
    iframeSize,
    setSelectedTemplate,
    setIframeSize,
  } = useTemplateStore();

  const handleTemplateSelect = (id: string) => {
    setSelectedTemplate(id);
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Select Template</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-8 gap-4">
            {templates.map((template: any) => (
              <Card
                key={template.id}
                className={`cursor-pointer ${
                  selectedTemplate === template.id
                    ? "border-2 border-blue-500"
                    : ""
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    src={template.image}
                    alt={`${template.name} preview`}
                    width={64}
                    height={64}
                    className="w-full"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
          <Button type="submit" className="mt-4">
            Next
          </Button>
        </CardContent>
      </Card>
      <div className="p-[1rem]">
        <div className="flex justify-center align-middle p-[1rem] gap-x-4">
          <MonitorDot
            className="cursor-pointer"
            onClick={() => setIframeSize("desktop")} // Use Zustand to handle iframe resize
          />
          <TabletSmartphoneIcon
            className="cursor-pointer"
            onClick={() => setIframeSize("mobile")} // Use Zustand to handle iframe resize
          />
        </div>

        <iframe
          src="https://www.offerado.in/66d35228e5762fda53f84d9b"
          className="w-full ml-auto mr-auto rounded-md"
          style={{
            width: iframeSize.width,
            height: iframeSize.height,
          }}
        ></iframe>
      </div>
    </>
  );
};

export default TemplateSelection;
