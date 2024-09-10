"use client";
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
import { useComponentStore } from "@/stores/use-component-store";
import contests from "@/data/contests.json";
// Sample contest React components
const SpinWheel = () => <div>Spin the Wheel Contest</div>;
const TriviaGame = () => <div>Trivia Game Contest</div>;
const PuzzleChallenge = () => <div>Puzzle Challenge Contest</div>;

const Contests = () => {
  const { selectedItems, addSelectedItem, removeSelectedItem } =
    useComponentStore();

  const handleQuizSelect = (id: number) => {
    if (selectedItems.contests.includes(id)) {
      removeSelectedItem("contests", id);
    } else {
      addSelectedItem("contests", id);
    }
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Contest</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <Sheet>
            <SheetTrigger asChild>
              <div className="flex align-middle border border-dashed border-white p-4 rounded-lg text-center cursor-pointer">
                <Plus height={16} width={16} />
                <span className="text-sm">Add a Contest</span>
              </div>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Select a Contest</SheetTitle>
                <SheetDescription>
                  Select one or more contests to add.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <div className="space-y-4">
                  {contests.map((contest) => (
                    <div
                      key={contest.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        checked={selectedItems.contests.includes(contest.id)}
                        onCheckedChange={() => handleQuizSelect(contest.id)}
                      />
                      <span>{contest.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              <SheetFooter>
                {/* <Button
                  onClick={() =>
                    console.log(
                      "Selected Contests:",
                      selectedContests.map(
                        (id) => contests.find((c) => c.id === id)?.title
                      )
                    )
                  }
                >
                  Add Selected Contests
                </Button> */}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </CardContent>
    </Card>
  );
};

export default Contests;
