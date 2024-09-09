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

// List of available polls
const polls = [
  { id: 1, title: "Poll 1: Favorite Food?" },
  { id: 2, title: "Poll 2: Best Travel Destination?" },
  { id: 3, title: "Poll 3: Preferred Work Setup?" },
  { id: 4, title: "Poll 4: Favorite Programming Language?" },
  { id: 5, title: "Poll 5: Best Movie of 2023?" },
];

const Poll = () => {
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [selectedPolls, setSelectedPolls] = useState<number[]>([]);

  const handleSheetContent = (type: string) => {
    setSelectedContent(type);
  };

  const handlePollSelect = (id: number) => {
    setSelectedPolls((prev) =>
      prev.includes(id) ? prev.filter((pollId) => pollId !== id) : [...prev, id]
    );
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Poll</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <Sheet>
            <SheetTrigger asChild>
              <div
                className="flex align-middle border border-dashed border-white p-4 rounded-lg text-center cursor-pointer"
                onClick={() => handleSheetContent("Poll")}
              >
                <Plus height={16} width={16} />
                <span className="text-sm">Add Poll</span>
              </div>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Select a Poll</SheetTitle>
                <SheetDescription>
                  Select one or more polls to add.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                {selectedContent === "Poll" && (
                  <div className="space-y-4">
                    {polls.map((poll) => (
                      <div
                        key={poll.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          checked={selectedPolls.includes(poll.id)}
                          onCheckedChange={() => handlePollSelect(poll.id)}
                        />
                        <span>{poll.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <SheetFooter>
                <Button
                  onClick={() => console.log("Selected Polls:", selectedPolls)}
                >
                  Add Selected Polls
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </CardContent>
    </Card>
  );
};

export default Poll;
