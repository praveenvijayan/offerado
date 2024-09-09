import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MonitorDot, TabletSmartphoneIcon } from "lucide-react";

const TemplateSelection = ({
  templates,
  onSelect,
}: {
  templates: any[];
  onSelect: (id: string) => void;
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleTemplateSelect = (id: string) => {
    setSelectedTemplate(id);
    onSelect(id);
  };

  const [iframeSize, setIframeSize] = useState({
    width: "100%",
    height: "1024px",
  });

  const handleResize = (size: "desktop" | "mobile") => {
    if (size === "desktop") {
      setIframeSize({ width: "100%", height: "1024px" }); // Desktop size
    } else if (size === "mobile") {
      setIframeSize({ width: "375px", height: "667px" }); // Mobile size (common smartphone size)
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Select Template</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-8 gap-4">
            {templates.map((template) => (
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
            onClick={() => handleResize("desktop")}
          />
          <TabletSmartphoneIcon
            className="cursor-pointer"
            onClick={() => handleResize("mobile")}
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
