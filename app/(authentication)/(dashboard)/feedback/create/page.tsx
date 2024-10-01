import React from "react";
import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Message from "@/components/feedback/feedback-form";
import CreateFeedbackForm from "@/components/feedback/feedback-form";

export const metadata: Metadata = {
  title: "Create Feedback",
  description: "Submit your feedback",
};

export default function CreateFeedbackPage() {
  return (
    <div className="container mx-auto flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Create Feedback</h1>

      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="account">Feedback</TabsTrigger>
          <TabsTrigger value="password">Rating</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <CreateFeedbackForm />
        </TabsContent>
        <TabsContent value="password">Rating component coming soon</TabsContent>
      </Tabs>
    </div>
  );
}
