import React, { useState } from "react";
import { useComponentStore } from "@/stores/use-component-store"; // Zustand store
import pollData from "@/data/poll.json";

const ComponentCollection: React.FC = () => {
  // Accessing the selected items from Zustand store
  const selectedItems = useComponentStore((state) => state.selectedItems);

  // Get the selected poll titles based on the selected item IDs
  const polls = selectedItems.polls
    .map((id) => {
      const poll = pollData.find((p) => p.id === id);
      return poll ? poll.title : null;
    })
    .filter(Boolean);

  // State to handle reordering
  const [components, setComponents] = useState(polls);

  return <div></div>;
};

export default ComponentCollection;
