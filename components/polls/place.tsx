import { useState } from "react";
import { usePollStore } from "@/stores/use-poll-store";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"; // Shadcn components
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const PollPlace = () => {
  const pollOptions = [
    { id: "1", option: "India" },
    { id: "2", option: "USA" },
    { id: "3", option: "UAE" },
  ];

  const { votes, castVote } = usePollStore();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    if (selectedOption) {
      castVote(selectedOption);
      setHasVoted(true);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto mt-8">
      <CardHeader>
        <CardTitle>Vote for your favorite destination</CardTitle>
        <CardDescription>
          Select an option and submit your vote.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!hasVoted ? (
          <RadioGroup
            value={selectedOption ?? ""}
            onValueChange={setSelectedOption}
            className="space-y-4"
          >
            {pollOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={`poll-${option.id}`} />
                <Label htmlFor={`poll-${option.id}`}>{option.option}</Label>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Results</h3>
            {pollOptions.map((option) => (
              <div key={option.id} className="flex justify-between">
                <span>{option.option}</span>
                <span>{votes[option.id] ? votes[option.id] : 0} votes</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        {!hasVoted ? (
          <Button onClick={handleVote} disabled={!selectedOption}>
            Submit Vote
          </Button>
        ) : (
          <Button onClick={() => setHasVoted(false)}>Vote Again</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PollPlace;
