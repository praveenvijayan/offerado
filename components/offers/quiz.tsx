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
import quizzes from "@/data/quiz.json";
import { useQuizSheetStore } from "@/stores/offer-creation-component-selection";

const Quiz = () => {
  const { selectedItems, addSelectedItem, removeSelectedItem } =
    useComponentStore();
  const { isSheetOpen, openSheet, closeSheet } = useQuizSheetStore();

  const handleQuizSelect = (id: number) => {
    if (selectedItems.quizzes.includes(id)) {
      removeSelectedItem("quizzes", id);
    } else {
      addSelectedItem("quizzes", id);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <Sheet open={isSheetOpen} onOpenChange={closeSheet}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Select a Quiz</SheetTitle>
            <SheetDescription>
              Select one or more quizzes to add.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <div className="space-y-4">
              {quizzes.map((quiz) => (
                <div key={quiz.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedItems.quizzes.includes(quiz.id)}
                    onCheckedChange={() => handleQuizSelect(quiz.id)}
                  />
                  <span>{quiz.title}</span>
                </div>
              ))}
            </div>
          </div>
          <SheetFooter>
            {/* <Button
              onClick={() =>
                console.log("Selected Quizzes:", selectedItems.quizzes)
              }
            >
              Add Selected Quizzes
            </Button> */}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Quiz;
