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

// Sample contest React components
const SpinWheel = () => <div>Spin the Wheel Contest</div>;
const TriviaGame = () => <div>Trivia Game Contest</div>;
const PuzzleChallenge = () => <div>Puzzle Challenge Contest</div>;

const contests = [
  { id: 1, title: "Spin the Wheel", component: SpinWheel },
  { id: 2, title: "Trivia Game", component: TriviaGame },
  { id: 3, title: "Puzzle Challenge", component: PuzzleChallenge },
];

const Contests = () => {
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [selectedContests, setSelectedContests] = useState<number[]>([]);

  const handleSheetContent = (type: string) => {
    setSelectedContent(type);
  };

  const handleContestSelect = (id: number) => {
    setSelectedContests((prev) =>
      prev.includes(id)
        ? prev.filter((contestId) => contestId !== id)
        : [...prev, id]
    );
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
              <div
                className="flex align-middle border border-dashed border-white p-4 rounded-lg text-center cursor-pointer"
                onClick={() => handleSheetContent("Contest")}
              >
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
                {selectedContent === "Contest" && (
                  <div className="space-y-4">
                    {contests.map((contest) => (
                      <div
                        key={contest.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          checked={selectedContests.includes(contest.id)}
                          onCheckedChange={() =>
                            handleContestSelect(contest.id)
                          }
                        />
                        <span>{contest.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <SheetFooter>
                <Button
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
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </CardContent>
    </Card>
  );
};

export default Contests;
