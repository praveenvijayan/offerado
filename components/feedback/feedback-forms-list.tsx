"use client";
import React from "react";
import { useFeedbackForms } from "@/hooks/use-feedback";
import { useSubmitFeedbackResponse } from "@/hooks/use-feedback";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FeedbackFormsList: React.FC = () => {
  const { data: feedbackForms, isLoading, isError } = useFeedbackForms();
  const { mutate: submitResponse } = useSubmitFeedbackResponse();

  // Replace with actual userId from context or auth
  const userId = "your-user-id";

  const [responses, setResponses] = React.useState<{ [key: string]: string }>(
    {}
  );

  const handleResponseChange = (formId: string, content: string) => {
    setResponses((prev) => ({ ...prev, [formId]: content }));
  };

  const handleSubmitResponse = (formId: string) => {
    const content = responses[formId];
    submitResponse({ content, feedbackFormId: formId, userId });
    setResponses((prev) => ({ ...prev, [formId]: "" }));
  };

  if (isLoading) return <p>Loading feedback forms...</p>;
  if (isError)
    return <p className="text-red-500">Error loading feedback forms.</p>;

  return (
    <div className="w-full">
      <ul className="space-y-2">
        {feedbackForms && feedbackForms.length > 0 ? (
          feedbackForms.map((form: any) => (
            <li
              key={form.id}
              className="border-b p-2 rounded flex justify-between items-center"
            >
              <h2 className="text-md font-semibold">
                {form.title}

                <p className="text-sm font-normal text-gray-500">
                  {form.description}
                </p>
              </h2>

              <Link
                href={`/feedback/${form.id}`}
                className="text-sm text-blue-500 hover:underline"
              >
                View Feedback{" "}
                <ArrowRight className="inline-block ml-1 w-4 h-4" />
              </Link>
            </li>
          ))
        ) : (
          <p>No feedback forms available.</p>
        )}
      </ul>
    </div>
  );
};

export default FeedbackFormsList;
