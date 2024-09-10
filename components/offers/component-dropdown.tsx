"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Trophy,
  MessageCircle,
  ShoppingBag,
  ChartPie,
  PlusCircle,
} from "lucide-react";
import {
  useContestSheetStore,
  useFeedbackSheetStore,
  usePollSheetStore,
  useProductSheetStore,
  useQuizSheetStore,
} from "@/stores/offer-creation-component-selection";
const ComponentDropdown = () => {
  const { openSheet: openContestSheet } = useContestSheetStore();
  const { openSheet: openFeedbackSheet } = useFeedbackSheetStore();
  const { openSheet: openPollSheet } = usePollSheetStore();
  const { openSheet: openProductSheet } = useProductSheetStore();
  const { openSheet: openQizSheet } = useQuizSheetStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-fit rounded-full border-0 hover:bg-transparent p-0"
        >
          <PlusCircle className="mr-2" />
          Add components
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={openPollSheet}>
          <ChartPie className="mr-2 h-4 w-4" /> Poll
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openQizSheet}>
          <FileText className="mr-2 h-4 w-4" /> Quiz
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openContestSheet}>
          <Trophy className="mr-2 h-4 w-4" /> Contests
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openFeedbackSheet}>
          <MessageCircle className="mr-2 h-4 w-4" /> Feedback
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openProductSheet}>
          <ShoppingBag className="mr-2 h-4 w-4" /> Product Selection
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ComponentDropdown;
