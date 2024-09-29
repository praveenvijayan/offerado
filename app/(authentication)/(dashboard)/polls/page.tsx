"use client";

import React from "react";
import { usePolls } from "@/hooks/use-poll";
import Link from "next/link";
import { Arrow } from "@radix-ui/react-dropdown-menu";
import { ArrowRight } from "lucide-react";

export default function PollsPage() {
  const { data: polls, isLoading, isError, error } = usePolls();

  if (isLoading) {
    return (
      <div className="container mx-auto">
        <h1 className="text-xl font-bold mb-6">Your Polls</h1>
        <p>Loading polls...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto">
        <h1 className="text-xl font-bold mb-6">Your Polls</h1>
        <p>Error loading polls: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Your Polls</h1>
        <Link
          href="/polls/create"
          className="bg-green-500 hover:bg-green-700 text-white text-xs  py-2 px-4 rounded-2xl"
        >
          Create new Poll
        </Link>
      </div>
      {polls && polls.length > 0 ? (
        <ul className="space-y-4">
          {polls.map((poll) => (
            <li
              key={poll.id}
              className="border p-2 rounded flex justify-between items-center"
            >
              <h2 className="text-lg font-semibold">
                {poll.title}

                <p className="text-sm font-normal text-gray-500">
                  Created on: {new Date(poll.createdAt).toLocaleDateString()}
                </p>
              </h2>
              {poll.description && <p className="mb-2">{poll.description}</p>}

              <Link
                href={`/polls/${poll.id}`}
                className="text-sm text-blue-500 hover:underline"
              >
                View Poll <ArrowRight className="inline-block ml-1 w-4 h-4" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No polls found.</p>
      )}
    </div>
  );
}
