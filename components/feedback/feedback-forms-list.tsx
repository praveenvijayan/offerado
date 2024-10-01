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
      {feedbackForms && feedbackForms.length > 0 ? (
        feedbackForms.map((form: any) => (
          <Card key={form.id} className="mb-4">
            <CardHeader>
              <h3 className="text-lg font-semibold">{form.title}</h3>
              {form.description && (
                <p className="text-xs">{form.description}</p>
              )}
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Your response..."
                value={responses[form.id] || ""}
                onChange={(e) => handleResponseChange(form.id, e.target.value)}
              />
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleSubmitResponse(form.id)}
                disabled={!responses[form.id]}
              >
                Submit Response
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <p>No feedback forms available.</p>
      )}
    </div>
  );
};

export default FeedbackFormsList;
