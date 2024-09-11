import React, { useState } from "react";
import { Reorder } from "framer-motion";
import FoodPoll from "../polls/food";
import PollPlace from "../polls/place";
import Message from "../feedback/message";
import RatingComponent from "../feedback/rating";

const ComponentCollection: React.FC = () => {
  const [components, setComponents] = useState([
    { id: "foodPoll", component: <FoodPoll /> },
    { id: "pollPlace", component: <PollPlace /> },
    { id: "message", component: <Message /> },
    { id: "rating", component: <RatingComponent /> },
  ]);

  return (
    <Reorder.Group
      axis="y"
      values={components}
      onReorder={setComponents}
      //   className="flex flex-col gap-4"
    >
      {components.map((item) => (
        <Reorder.Item key={item.id} value={item} className="w-full">
          {item.component}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

export default ComponentCollection;
