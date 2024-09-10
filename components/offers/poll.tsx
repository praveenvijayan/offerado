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
import polls from "@/data/poll.json";

const Poll = () => {
  const { selectedItems, addSelectedItem, removeSelectedItem } =
    useComponentStore();

  const handlePollSelect = (id: number) => {
    if (selectedItems.quizzes.includes(id)) {
      removeSelectedItem("polls", id);
    } else {
      addSelectedItem("polls", id);
    }
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
              <div className="flex align-middle border border-dashed border-white p-4 rounded-lg text-center cursor-pointer">
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
                <div className="space-y-4">
                  {polls.map((poll) => (
                    <div key={poll.id} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedItems.polls.includes(poll.id)}
                        onCheckedChange={() => handlePollSelect(poll.id)}
                      />
                      <span>{poll.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              <SheetFooter>
                {/* <Button
                  onClick={() => console.log("Selected Polls:", selectedItems)}
                >
                  Add Selected Polls
                </Button> */}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </CardContent>
    </Card>
  );
};

export default Poll;
