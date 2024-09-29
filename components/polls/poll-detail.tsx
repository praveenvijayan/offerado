"use client";

import React from "react";
import { usePoll } from "@/hooks/use-poll";

interface PollDetailProps {
  pollId: string;
}

const PollDetail: React.FC<PollDetailProps> = ({ pollId }) => {
  const { data: poll, isLoading, isError, error } = usePoll(pollId);

  if (isLoading) {
    return <div>Loading poll...</div>;
  }

  if (isError) {
    return <div>Error loading poll: {error.message}</div>;
  }

  if (!poll) {
    return <div>No poll found.</div>;
  }

  return (
    <div>
      <h1>{poll.title}</h1>
      {poll.description && <p>{poll.description}</p>}
      <ul>
        {poll.options.map((option) => (
          <li key={option.id}>
            {option.order}. {option.text}
          </li>
        ))}
      </ul>
      {/* Additional UI for voting can be added here */}
    </div>
  );
};

export default PollDetail;
