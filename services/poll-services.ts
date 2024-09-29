// services/pollService.ts

export interface PollOption {
  id: string;
  text: string;
  order: number;
  pollId: string;
}

export interface Poll {
  id: string;
  title: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  options: PollOption[];
}

export const fetchPoll = async (id: string): Promise<Poll> => {
  const response = await fetch(`/api/polls/${id}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const poll = await response.json();
  return poll;
};

export const fetchPolls = async (): Promise<Poll[]> => {
  const response = await fetch("/api/polls");

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const polls = await response.json();
  return polls;
};

export const createPoll = async (pollData: {
  title: string;
  options: string[];
}) => {
  const response = await fetch("/api/polls", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pollData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create poll");
  }

  return response.json();
};
