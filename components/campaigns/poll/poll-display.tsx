import { Button } from "@/components/ui/button";
import usePollStore from "@/stores/poll";
import { X } from "lucide-react";
import React from "react";

const PollDisplay: React.FC = () => {
  const { selectedPollData, resetSelectedPollData } = usePollStore();

  if (!selectedPollData) {
    return <p>No poll selected.</p>;
  }

  return (
    <div className="flex justify-between gap-4 w-full">
      <h2>
        {selectedPollData.title} ({selectedPollData.options.length} Options)
        <p>{selectedPollData.description}</p>
      </h2>
      <Button
        variant="destructive"
        onClick={() => {
          resetSelectedPollData();
        }}
        className="w-8 h-8 p-0 self-center"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default PollDisplay;
