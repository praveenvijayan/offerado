"uase client";
import { Button } from "@/components/ui/button";
import useFeedbackStore from "@/stores/feedback";
import { X } from "lucide-react";
import React, { useState } from "react";

const FeedbackDisplay: React.FC = () => {
  const { selectedFeedbackData, resetSelectedFeedbackData } =
    useFeedbackStore();

  if (!selectedFeedbackData) {
    return <p>No Feedback selected.</p>;
  }

  return (
    <div className="flex justify-between gap-4 w-full">
      <h2>
        {selectedFeedbackData.title}
        <p className="text-xs">{selectedFeedbackData.description}</p>
      </h2>
      <Button
        variant="destructive"
        onClick={() => {
          resetSelectedFeedbackData();
        }}
        className="w-8 h-8 p-0 self-center"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default FeedbackDisplay;
