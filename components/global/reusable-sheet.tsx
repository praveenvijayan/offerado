// components/Sheet.tsx
"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"; // Adjust the import path according to your folder structure
import { ReactNode } from "react";

interface ReusableSheetProps {
  open: boolean; // To control the open state of the sheet
  onOpenChange: (open: boolean) => void; // Handler to control when the sheet is opened/closed
  title: string; // Title of the sheet
  description?: string; // Optional description
  children: ReactNode; // Children content to render inside the sheet
}

const ReusableSheet: React.FC<ReusableSheetProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="xl:w-[1000px] xl:max-w-none sm:w-[400px] sm:max-w-[540px]">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>

        {/* Children content passed inside the sheet */}
        <div className="py-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
};

export default ReusableSheet;
