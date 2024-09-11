import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

const RatingComponent = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (value: number) => {
    setRating(value);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          onClick={() => handleRating(i)}
          className={cn(
            "text-gray-300 hover:text-yellow-400 transition-colors",
            { "text-yellow-400": rating >= i }
          )}
        >
          {rating >= i - 0.5 && rating < i ? (
            <StarHalf className="w-6 h-6" />
          ) : (
            <Star className="w-6 h-6" />
          )}
        </button>
      );
    }
    return stars;
  };

  return (
    <Card className="w-full max-w-lg mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-md font-semibold">Add your rating</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex justify-center space-x-1">{renderStars()}</div>
        <p className="text-center mt-2">Your rating: {rating} / 5</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={() => console.log(`Submitted rating: ${rating}`)}>
          Submit Rating
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RatingComponent;
