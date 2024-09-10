"use client";

import { useState, Suspense, lazy } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { useComponentStore } from "@/stores/use-component-store";
import { usePollSheetStore } from "@/stores/offer-creation-component-selection";
import polls from "@/data/poll.json";
import { cn } from "@/lib/utils"; // Utility for conditional classNames
import { ScrollArea } from "@/components/ui/scroll-area";

const PollSheet = () => {
  const { selectedItems, addSelectedItem, removeSelectedItem } =
    useComponentStore();

  const { isSheetOpen, closeSheet } = usePollSheetStore();
  const [selectedPollComponents, setSelectedPollComponents] = useState<
    Record<number, React.ComponentType | null>
  >({});

  const handlePollSelect = (id: number) => {
    if (selectedItems.polls.includes(id)) {
      removeSelectedItem("polls", id);
    } else {
      addSelectedItem("polls", id);
    }
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={closeSheet}>
      <SheetContent className="xl:w-[1000px] xl:max-w-none sm:w-[400px] sm:max-w-[540px]">
        <SheetHeader>
          <SheetTitle>Select a Poll</SheetTitle>
          <SheetDescription>Select one or more polls to add.</SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              {polls.map((poll) => {
                // Dynamically load the poll component
                const PollComponent = lazy(
                  () => import(`@/components/polls/${poll.component}`)
                );

                return (
                  <div
                    key={poll.id}
                    className={cn(
                      "relative border rounded-md p-4 cursor-pointer",
                      selectedItems.polls.includes(poll.id)
                        ? "border-blue-500 shadow-lg"
                        : "border-gray-300"
                    )}
                    onClick={() => handlePollSelect(poll.id)}
                  >
                    {/* Checkbox for selection */}
                    <Checkbox
                      checked={selectedItems.polls.includes(poll.id)}
                      onCheckedChange={() => handlePollSelect(poll.id)}
                      className="absolute top-2 right-2"
                    />

                    {/* Display the actual poll component inside the card */}
                    <Suspense fallback={<div>Loading...</div>}>
                      <PollComponent />
                    </Suspense>

                    <div className="mt-2 text-center">
                      <span className="font-medium">{poll.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollArea>

        <SheetFooter>{/* Add button logic for final selection */}</SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default PollSheet;
