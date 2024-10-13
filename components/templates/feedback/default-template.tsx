import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { FeedbackForm } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";

const DefaultFeedbackTemplate = ({ offer }: { offer: any }) => {
  const offerData: FeedbackForm = offer?.offerJSON?.data;

  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSubmit = () => {
    if (!selectedOption) {
      alert("Please select an option.");
      return;
    }
  };

  if (!offerData) {
    return <div>No Feedback data available.</div>;
  }

  return (
    <div className="flex justify-center items-center h-full p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold">{offerData.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea placeholder="Type your message here." />
          <p className="text-xs text-slate-500 pt-2 text-right">
            Maximum 60 characters
          </p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSubmit}>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DefaultFeedbackTemplate;
