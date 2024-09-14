import React from "react";
import { Button } from "../ui/button";
import { HelpCircle } from "lucide-react";

const Help: React.FC = () => {
  return (
    <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
      <HelpCircle className="h-4 w-4" />
    </Button>
  );
};

export default Help;
