import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Feedback",
  description: "Submit your feedback",
};

export default function FeedbackPage() {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Feedback</h1>
        <Link
          href="/feedback/create"
          className="bg-green-500 hover:bg-green-700 text-white text-xs py-2 px-4 rounded-2xl"
        >
          Create
        </Link>
      </div>
    </div>
  );
}
