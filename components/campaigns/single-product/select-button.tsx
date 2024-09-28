import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}
const SelectButton = ({ onSelect }: { onSelect: () => void }) => {
  const [isSelected, setIsSelected] = useState(false);

  console.log("isSelected", isSelected);

  const handleSelect = async () => {
    setIsSelected(true);
    onSelect();
    await timeout(800);
    setIsSelected(false);
  };

  return (
    <Button
      size="sm"
      onClick={handleSelect}
      className={`text-green-600 border-green-800 ${
        isSelected ? "bg-green-800" : ""
      }`}
      variant={"outline"}
    >
      {isSelected ? "Selected" : "Select"}
    </Button>
  );
};

export default SelectButton;
