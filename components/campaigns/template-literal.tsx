import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Edit } from "lucide-react";
import useTemplateLiteralsStore from "@/stores/template-literals";
import { ScrollArea } from "../ui/scroll-area";

const TemplateLiterals = ({ offer }: { offer: any }) => {
  const { templateLiterals, setTemplateLiteral } = useTemplateLiteralsStore();
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  // Get the template literals for the current template
  const currentTemplateLiterals = templateLiterals[offer?.templateId] || {};

  // Handle edit click
  const handleEditClick = (key: string, value: string) => {
    setEditingKey(key);
    setEditValue(value);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  // Handle save
  // const handleSave = (key: string) => {
  //   setTemplateLiteral(offer?.templateId, {
  //     ...currentTemplateLiterals,
  //     [key]: editValue,
  //   });
  //   setEditingKey(null);
  // };

  const handleBlur = (key: string) => {
    setTemplateLiteral(offer?.templateId, {
      ...currentTemplateLiterals,
      [key]: editValue,
    });
    setEditingKey(null);
  };

  return (
    <div className="flex flex-col gap-4 ml-auto">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="px-4 py-2 rounded-md z-10 bg-yellow-600 p-2 ml-auto"
          >
            <Edit className="w-8 h-8 stroke-white" />
          </Button>
        </SheetTrigger>
        <SheetContent className="xl:w-[800px] xl:max-w-none sm:w-[400px] sm:max-w-[540px]">
          <SheetHeader>
            <SheetTitle>
              Customize template content
              <span className="text-xs text-muted-foreground block mt-1">
                Edit the content of the template.
              </span>
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex flex-col mt-4 h-[80vh]">
            {/* Display all template literals for the current template */}
            {Object.entries(currentTemplateLiterals).length > 0 ? (
              <ul className="space-y-4">
                {Object.entries(currentTemplateLiterals).map(
                  ([key, value], index) => (
                    <li key={key} className="flex justify-between items-center">
                      {editingKey === key ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editValue}
                            onChange={handleInputChange}
                            onBlur={() => handleBlur(key)}
                            className="border rounded px-2 py-1"
                          />
                        </div>
                      ) : (
                        <span
                          onClick={() => handleEditClick(key, String(value))}
                          className="cursor-pointer"
                        >
                          {++index}. {String(value)}
                        </span>
                      )}
                    </li>
                  )
                )}
              </ul>
            ) : (
              <p>No template literals found for this template.</p>
            )}
          </ScrollArea>
          <SheetClose asChild>
            <Button className="flex items-end ml-auto rounded-2xl bg-green-500 hover:bg-green-600">
              Update content
            </Button>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default TemplateLiterals;
