"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Import necessary modules from dnd-kit
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Import nanoid for generating unique IDs
import { nanoid } from "nanoid";
import { MoreHorizontal, X } from "lucide-react";

// Import React Query hooks
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Organization } from "@clerk/backend";
import { useRouter } from "next/navigation";
import { createPoll } from "@/services/poll-services";

// Define the Option interface
interface Option {
  id: string;
  value: string;
}

const CreatePollPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState<Option[]>([
    { id: nanoid(), value: "" },
    { id: nanoid(), value: "" },
  ]);
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPoll,
    onSuccess: (data) => {
      toast.success("Poll created successfully!");
      queryClient.invalidateQueries({ queryKey: ["polls"] });
      setTitle("");
      setOptions([
        { id: nanoid(), value: "" },
        { id: nanoid(), value: "" },
      ]);
      router.push(`/polls`);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const { mutate, isPending } = mutation;

  const handleOptionChange = (id: string, value: string) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, value } : option
      )
    );
  };

  const handleAddOption = () => {
    setOptions([...options, { id: nanoid(), value: "" }]);
  };

  const handleRemoveOption = (id: string) => {
    setOptions((prevOptions) =>
      prevOptions.filter((option) => option.id !== id)
    );
  };

  // Handle drag and drop reordering
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setOptions((prevOptions) => {
        const oldIndex = prevOptions.findIndex(
          (option) => option.id === active.id
        );
        const newIndex = prevOptions.findIndex(
          (option) => option.id === over?.id
        );

        return arrayMove(prevOptions, oldIndex, newIndex);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!title.trim()) {
      toast.error("Please enter a poll title.");
      return;
    }

    const filledOptions = options.filter(
      (option) => option.value.trim() !== ""
    );
    if (filledOptions.length < 2) {
      toast.error("Please enter at least two options.");
      return;
    }

    // Prepare the poll data
    const pollData = {
      title: title.trim(),
      options: filledOptions.map((option) => option.value),
      organizationId: "66e5fa99851c0f9bf871839c", // TODO: Replace with actual organizationId
      businessId: "66ea8ee3357952b9fdbcc612", // TODO: Replace with actual businessId
    };

    // Use mutate to submit the poll data
    mutate(pollData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-6">Create a New Poll</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side: Poll Creation Form */}
        <form onSubmit={handleSubmit} className="md:w-1/2">
          <input
            type="text"
            placeholder="Poll Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 p-2 border rounded dark:bg-muted"
          />

          {/* DndContext and SortableContext wrap the options */}
          <DndContext onDragEnd={handleDragEnd}>
            <SortableContext
              items={options.map((option) => option.id)}
              strategy={verticalListSortingStrategy}
            >
              {options.map((option, index) => (
                <SortableOption
                  key={option.id}
                  id={option.id}
                  index={index}
                  option={option}
                  handleOptionChange={handleOptionChange}
                  handleRemoveOption={handleRemoveOption}
                  optionsLength={options.length}
                />
              ))}
            </SortableContext>
          </DndContext>

          <button
            type="button"
            onClick={handleAddOption}
            className="mb-4 text-green-500"
          >
            + Add Option
          </button>
          <Separator className="mb-4" />
          <Button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-2xl"
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Poll"}
          </Button>
        </form>

        {/* Right Side: Poll Preview */}
        <div className="md:w-1/2">
          <div className="border p-4 rounded max-w-lg">
            {/* Poll Title */}
            <h3 className="text-xl font-bold mb-4">
              {title || "Your Poll Title"}
            </h3>
            {/* Poll Options */}
            <ul>
              {options.map((option, index) => (
                <li key={option.id} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="preview-option"
                    id={`preview-option-${index}`}
                    className="mr-2"
                    disabled
                  />
                  <label htmlFor={`preview-option-${index}`}>
                    {option.value || `Option ${index + 1}`}
                  </label>
                </li>
              ))}
            </ul>
            {/* Submit Button */}
            <Button disabled className="mt-4">
              Submit Vote
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for each sortable option
interface SortableOptionProps {
  id: string;
  index: number;
  option: Option;
  handleOptionChange: (id: string, value: string) => void;
  handleRemoveOption: (id: string) => void;
  optionsLength: number;
}

const SortableOption: React.FC<SortableOptionProps> = ({
  id,
  index,
  option,
  handleOptionChange,
  handleRemoveOption,
  optionsLength,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center mb-4 p-2 border rounded"
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="mr-2 cursor-move text-gray-500"
      >
        <MoreHorizontal className="h-4 w-4" />
      </div>
      <input
        type="text"
        placeholder={`Option ${index + 1}`}
        value={option.value}
        onChange={(e) => handleOptionChange(option.id, e.target.value)}
        className="w-full p-2 border rounded"
      />
      {optionsLength > 2 && (
        <button
          type="button"
          onClick={() => handleRemoveOption(option.id)}
          className="ml-2 text-red-500"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default CreatePollPage;
