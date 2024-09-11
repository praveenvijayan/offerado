import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"; // Import Shadcn card components
import { Input } from "@/components/ui/input"; // Adjust the path if needed
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";

const Message: React.FC = () => {
  return (
    <Card className="w-full max-w-lg mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-md font-semibold">
          Add your feedback
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          type="text"
          placeholder="Type your message here"
          className="mb-4"
        />
        <Textarea placeholder="Type your message here." />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => console.log("Submit")}>Send Message</Button>
      </CardFooter>
    </Card>
  );
};

export default Message;
