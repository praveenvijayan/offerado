"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCreateFeedbackForm } from "@/hooks/use-feedback";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { toast } from "sonner";

const CreateFeedbackForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Replace with actual businessId from context or auth
  const businessId = "66ea8ee3357952b9fdbcc612";
  const organizationId = "66e5fa99851c0f9bf871839c";

  const {
    mutate: createForm,
    isPending,
    isError,
    isSuccess,
  } = useCreateFeedbackForm();

  const handleSubmit = () => {
    createForm(
      { title, description, businessId, organizationId },
      {
        onSuccess: () => {
          toast.success("Feedback form created successfully!");
          setTitle("");
          setDescription("");
        },
        onError: () => {
          toast.error("Error creating form. Please try again.");
        },
      }
    );
  };

  return (
    <div className="w-full flex justify-start items-start gap-6">
      <div className="w-1/2 flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Create Feedback Form</h2>
        <Input
          placeholder="Form Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Form Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          className="w-fit"
          onClick={handleSubmit}
          disabled={isPending || !title}
        >
          {isPending ? "Creating..." : "Create Form"}
        </Button>
        {/* {isError && <p className="text-red-500">Error creating form.</p>}
        {isSuccess && (
          <p className="text-green-500">Form created successfully.</p>
        )} */}
      </div>
      <div className="w-1/2">
        <Card className="w-full max-w-lg">
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
    </div>
  );
};

export default CreateFeedbackForm;
