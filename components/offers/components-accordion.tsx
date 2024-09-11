import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PollSelection from "./poll-selection";

const ComponentAccordion: React.FC = () => {
  return (
    <div className="pt-2 mt-2 ">
      <h3 className="py-2 text-md">2. Select Components</h3>
      <Accordion type="single" collapsible>
        <AccordionItem value="poll">
          <AccordionTrigger>Poll</AccordionTrigger>
          <AccordionContent>
            <PollSelection />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="feedback">
          <AccordionTrigger>Feedback</AccordionTrigger>
          <AccordionContent>
            Here you can add the terms and conditions of the offer.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="contest">
          <AccordionTrigger>Contests</AccordionTrigger>
          <AccordionContent>
            Here you can add instructions on how to redeem the offer.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="quiz">
          <AccordionTrigger>Quiz</AccordionTrigger>
          <AccordionContent>
            Here you can add instructions on how to redeem the offer.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="products">
          <AccordionTrigger>Products</AccordionTrigger>
          <AccordionContent>
            Here you can add instructions on how to redeem the offer.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Discount Offers">
          <AccordionTrigger>Discount Offers</AccordionTrigger>
          <AccordionContent>
            Here you can add instructions on how to redeem the offer.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Buy One Get One Free (BOGO) Offers">
          <AccordionTrigger>
            Buy One Get One Free (BOGO) Offers
          </AccordionTrigger>
          <AccordionContent>
            Here you can add instructions on how to redeem the offer.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Combo Offers">
          <AccordionTrigger>Combo Offers</AccordionTrigger>
          <AccordionContent>
            Here you can add instructions on how to redeem the offer.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Special Day Offers">
          <AccordionTrigger>Special Day Offers</AccordionTrigger>
          <AccordionContent>
            Here you can add instructions on how to redeem the offer.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Seasonal or Event-Based Offers">
          <AccordionTrigger>Seasonal or Event-Based Offers</AccordionTrigger>
          <AccordionContent>
            Here you can add instructions on how to redeem the offer.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Product-Specific Promotions">
          <AccordionTrigger>Product-Specific Promotions</AccordionTrigger>
          <AccordionContent>
            Here you can add instructions on how to redeem the offer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ComponentAccordion;
