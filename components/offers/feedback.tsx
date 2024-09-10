"use client";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useComponentStore } from "@/stores/use-component-store";
import feedbackComponents from "@/data/feedback.json";
import { useFeedbackSheetStore } from "@/stores/offer-creation-component-selection";

// Sample feedback React components
const StarRating = () => <div>Star Rating Feedback</div>;
const TextFeedback = () => <div>Text Feedback Form</div>;
const MultipleChoiceFeedback = () => <div>Multiple Choice Feedback</div>;

const Feedback = () => {
  const { selectedItems, addSelectedItem, removeSelectedItem } =
    useComponentStore();
  const { isSheetOpen, closeSheet } = useFeedbackSheetStore();
  const handleFeedbackSelect = (id: number) => {
    if (selectedItems.feedback.includes(id)) {
      removeSelectedItem("feedback", id);
    } else {
      addSelectedItem("feedback", id);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <Sheet open={isSheetOpen} onOpenChange={closeSheet}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Select a Feedback Component</SheetTitle>
            <SheetDescription>
              Select one or more feedback components to add.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <div className="space-y-4">
              {feedbackComponents.map((feedback) => (
                <div key={feedback.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedItems.feedback.includes(feedback.id)}
                    onCheckedChange={() => handleFeedbackSelect(feedback.id)}
                  />
                  <span>{feedback.title}</span>
                </div>
              ))}
            </div>
          </div>
          <SheetFooter></SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Feedback;
