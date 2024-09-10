"use client";

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

const Poll = () => {
  const { selectedItems, addSelectedItem, removeSelectedItem } =
    useComponentStore();

  const { isSheetOpen, openSheet, closeSheet } = usePollSheetStore();

  const handlePollSelect = (id: number) => {
    if (selectedItems.polls.includes(id)) {
      removeSelectedItem("polls", id);
    } else {
      addSelectedItem("polls", id);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <Sheet open={isSheetOpen} onOpenChange={closeSheet}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Select a Poll</SheetTitle>
            <SheetDescription>
              Select one or more polls to add.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <div className="space-y-4">
              {polls.map((poll) => (
                <div key={poll.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedItems.polls.includes(poll.id)}
                    onCheckedChange={() => handlePollSelect(poll.id)}
                  />
                  <span>{poll.title}</span>
                </div>
              ))}
            </div>
          </div>
          <SheetFooter>
            {/* Add button logic for final selection */}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Poll;
