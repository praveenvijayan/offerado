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
import contests from "@/data/contests.json";
import { useContestSheetStore } from "@/stores/offer-creation-component-selection";

// Sample contest React components
const SpinWheel = () => <div>Spin the Wheel Contest</div>;
const TriviaGame = () => <div>Trivia Game Contest</div>;
const PuzzleChallenge = () => <div>Puzzle Challenge Contest</div>;

const Contests = () => {
  const { selectedItems, addSelectedItem, removeSelectedItem } =
    useComponentStore();
  const { isSheetOpen, closeSheet } = useContestSheetStore();
  const handleQuizSelect = (id: number) => {
    if (selectedItems.contests.includes(id)) {
      removeSelectedItem("contests", id);
    } else {
      addSelectedItem("contests", id);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <Sheet open={isSheetOpen} onOpenChange={closeSheet}>
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
                <div key={contest.id} className="flex items-center space-x-2">
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
                  selectedItems.contests.map(
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
  );
};

export default Contests;
