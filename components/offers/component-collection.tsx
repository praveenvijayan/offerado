import React, { useState } from "react";
import { Reorder } from "framer-motion";
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

  return (
    <Reorder.Group
      axis="y"
      values={components}
      onReorder={setComponents}
      className="flex flex-col gap-4"
    >
      {components.map((title, index) => (
        <Reorder.Item key={index} value={title} className="w-full">
          <li className="w-full h-28 rounded-md bg-slate-500 p-[1rem]">
            {title}
          </li>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

export default ComponentCollection;
