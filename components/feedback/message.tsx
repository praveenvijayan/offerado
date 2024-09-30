"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";

const Message: React.FC = () => {
  const [title, setTitle] = React.useState("");
  return (
    <div className="flex gap-4 w-full mt-4">
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Feedback</h1>
        <Input
          type="text"
          placeholder="Type your message here"
          className="mb-4"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          disabled={title.length <= 0}
          onClick={() => console.log("test")}
        >
          Create
        </Button>
      </div>
      <Card className="w-full max-w-lg mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-md font-semibold">
            {title || "Feedback title"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea placeholder="Type your message here." disabled />
          <p className="text-xs text-slate-500 pt-2 text-right">
            Maximum 60 characters
          </p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button disabled>Send Message</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Message;
