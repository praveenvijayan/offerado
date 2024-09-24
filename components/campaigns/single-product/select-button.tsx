import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}
const SelectButton = ({ onSelect }: { onSelect: () => void }) => {
  const [isSelected, setIsSelected] = useState(false);

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
      className={isSelected ? "bg-green-500" : ""}
    >
      {isSelected ? "Selected" : "Select"}
    </Button>
  );
};

export default SelectButton;
