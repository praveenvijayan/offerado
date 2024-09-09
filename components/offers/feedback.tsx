import { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// Sample feedback React components
const StarRating = () => <div>Star Rating Feedback</div>;
const TextFeedback = () => <div>Text Feedback Form</div>;
const MultipleChoiceFeedback = () => <div>Multiple Choice Feedback</div>;

const feedbackComponents = [
  { id: 1, title: "Star Rating", component: StarRating },
  { id: 2, title: "Text Feedback Form", component: TextFeedback },
  {
    id: 3,
    title: "Multiple Choice Feedback",
    component: MultipleChoiceFeedback,
  },
];

const Feedback = () => {
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<number[]>([]);

  const handleSheetContent = (type: string) => {
    setSelectedContent(type);
  };

  const handleFeedbackSelect = (id: number) => {
    setSelectedFeedback((prev) =>
      prev.includes(id)
        ? prev.filter((feedbackId) => feedbackId !== id)
        : [...prev, id]
    );
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
              <div
                className="flex align-middle border border-dashed border-white p-4 rounded-lg text-center cursor-pointer"
                onClick={() => handleSheetContent("Feedback")}
              >
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
                {selectedContent === "Feedback" && (
                  <div className="space-y-4">
                    {feedbackComponents.map((feedback) => (
                      <div
                        key={feedback.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          checked={selectedFeedback.includes(feedback.id)}
                          onCheckedChange={() =>
                            handleFeedbackSelect(feedback.id)
                          }
                        />
                        <span>{feedback.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <SheetFooter>
                <Button
                  onClick={() =>
                    console.log(
                      "Selected Feedback Components:",
                      selectedFeedback.map(
                        (id) =>
                          feedbackComponents.find((c) => c.id === id)?.title
                      )
                    )
                  }
                >
                  Add Selected Feedback
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </CardContent>
    </Card>
  );
};

export default Feedback;
