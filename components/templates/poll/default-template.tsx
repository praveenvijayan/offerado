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

interface PollOption {
  id: string;
  text: string;
  pollId: string;
  order: number;
}

interface PollData {
  id: string;
  title: string;
  options: PollOption[];
}

const DefaultPollTemplate = ({ offer }: { offer: any }) => {
  const offerData: PollData = offer?.offerJSON?.data;

  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSubmit = () => {
    if (!selectedOption) {
      alert("Please select an option.");
      return;
    }
  };

  if (!offerData) {
    return <div>No poll data available.</div>;
  }

  return (
    <div className="flex justify-center items-center h-full p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold">{offerData.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            className="space-y-2"
            value={selectedOption}
            onValueChange={(value) => setSelectedOption(value)}
          >
            {offerData.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={option.id} />
                <label htmlFor={option.id} className="text-sm font-medium">
                  {option.text}
                </label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSubmit}>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DefaultPollTemplate;
