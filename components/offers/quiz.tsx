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
import quizzes from "@/data/quiz.json";

const Quiz = () => {
  const { selectedItems, addSelectedItem, removeSelectedItem } =
    useComponentStore();

  const handleQuizSelect = (id: number) => {
    if (selectedItems.quizzes.includes(id)) {
      removeSelectedItem("quizzes", id);
    } else {
      addSelectedItem("quizzes", id);
    }
  };

  return (
    <>
      <Card className="">
        <CardHeader>
          <CardTitle>Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <Sheet>
              <SheetTrigger asChild>
                <div className="flex align-middle border border-dashed border-white p-4 rounded-lg text-center cursor-pointer">
                  <Plus height={16} width={16} />
                  <span className="text-sm">Add a Quiz</span>
                </div>
              </SheetTrigger>
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
                      <div
                        key={quiz.id}
                        className="flex items-center space-x-2"
                      >
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
        </CardContent>
      </Card>
    </>
  );
};

export default Quiz;
