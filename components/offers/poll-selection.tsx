import Image from "next/image";
import React from "react";
import pollData from "@/data/poll.json";
import { useComponentStore } from "@/stores/use-component-store";
import { cn } from "@/lib/utils";

const PollSelection: React.FC = () => {
  const { selectedItems, addSelectedItem, removeSelectedItem } =
    useComponentStore();
  const handlePollSelect = (id: number) => {
    if (selectedItems.polls.includes(id)) {
      removeSelectedItem("polls", id);
    } else {
      addSelectedItem("polls", id);
    }
  };
  return (
    <div className="poll-selection">
      <h2 className="font-semibold py-2">Select poll components</h2>
      <ul className="grid grid-cols-4 gap-4 h-full">
        {pollData.map((poll) => (
          <li
            key={poll.id}
            className={cn(
              "flex justify-center items-center flex-col w-full relative border rounded-md p-4 cursor-pointer gap-2",
              selectedItems.polls.includes(poll.id)
                ? "border-2 border-blue-400 shadow-lg"
                : "border-2"
            )}
            onClick={() => handlePollSelect(poll.id)}
          >
            <p>{poll.title}</p>
            <Image
              src={"/poll/" + poll.component + ".jpg"}
              alt={poll.title}
              width={100}
              height={100}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PollSelection;
