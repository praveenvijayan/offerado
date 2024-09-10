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
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useComponentStore } from "@/stores/use-component-store";
import feedbackComponents from "@/data/feedback.json";
// Sample feedback React components
const StarRating = () => <div>Star Rating Feedback</div>;
const TextFeedback = () => <div>Text Feedback Form</div>;
const MultipleChoiceFeedback = () => <div>Multiple Choice Feedback</div>;

const Feedback = () => {
  const { selectedItems, addSelectedItem, removeSelectedItem } =
    useComponentStore();

  const handleQuizSelect = (id: number) => {
    if (selectedItems.feedback.includes(id)) {
      removeSelectedItem("feedback", id);
    } else {
      addSelectedItem("feedback", id);
    }
  };
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <Sheet>
            <SheetTrigger asChild>
              <div className="flex align-middle border border-dashed border-white p-4 rounded-lg text-center cursor-pointer">
                <Plus height={16} width={16} />
                <span className="text-sm">Add Feedback</span>
              </div>
            </SheetTrigger>
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
                    <div
                      key={feedback.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        checked={selectedItems.feedback.includes(feedback.id)}
                        onCheckedChange={() => handleQuizSelect(feedback.id)}
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
      </CardContent>
    </Card>
  );
};

export default Feedback;
