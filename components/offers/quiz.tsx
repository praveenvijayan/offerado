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

// List of available quizzes
const quizzes = [
  { id: 1, title: "Quiz 1: Basic Math Quiz" },
  { id: 2, title: "Quiz 2: General Knowledge Quiz" },
  { id: 3, title: "Quiz 3: JavaScript Fundamentals" },
  { id: 4, title: "Quiz 4: Science Quiz" },
  { id: 5, title: "Quiz 5: History Quiz" },
];

const Quiz = () => {
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [selectedQuizzes, setSelectedQuizzes] = useState<number[]>([]);

  const handleSheetContent = (type: string) => {
    setSelectedContent(type);
  };

  const handleQuizSelect = (id: number) => {
    setSelectedQuizzes((prev) =>
      prev.includes(id) ? prev.filter((quizId) => quizId !== id) : [...prev, id]
    );
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
                <div
                  className="flex align-middle border border-dashed border-white p-4 rounded-lg text-center cursor-pointer"
                  onClick={() => handleSheetContent("Quiz")}
                >
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
                  {selectedContent === "Quiz" && (
                    <div className="space-y-4">
                      {quizzes.map((quiz) => (
                        <div
                          key={quiz.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            checked={selectedQuizzes.includes(quiz.id)}
                            onCheckedChange={() => handleQuizSelect(quiz.id)}
                          />
                          <span>{quiz.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <SheetFooter>
                  <Button
                    onClick={() =>
                      console.log("Selected Quizzes:", selectedQuizzes)
                    }
                  >
                    Add Selected Quizzes
                  </Button>
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
