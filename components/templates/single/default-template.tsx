import React, { useMemo } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import useTemplateLiteralsStore from "@/stores/template-literals";
import { protest, pacifico, ubuntu } from "@/app/fonts";
import { cn } from "../../../lib/utils";
import { Radar } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const DefaultSingleTemplate = ({ offer }: { offer: any }) => {
  const offerData = offer?.offerJSON?.data;
  const { templateLiterals, setTemplateLiteral } = useTemplateLiteralsStore();

  // Memoize the default template variables
  const defaultTplVars = useMemo(
    () => ({
      companyName: "Your Company Name",
      offertext: "Offer!",
      description:
        "Enjoy your unforgettable experience. Evening, mega discount!",
      priceTitle: "Save!",
      footer: "12th Avenue Street 12345, New York, USA | +2134535677823",
    }),
    []
  );
  // Get the templateId from the offer
  const templateId = offer?.templateId;

  // Check if there's a template literal for this templateId in the offer response or use the default one
  const offerTemplateLiteral =
    offer?.templateLiteral?.[templateId] || defaultTplVars;

  // Set the template literal in the Zustand store if it doesn't exist
  if (!templateLiterals[templateId]) {
    setTemplateLiteral(templateId, offerTemplateLiteral);
  }

  // Get the current template literals from the Zustand store
  const currentTemplate = templateLiterals[templateId] || {};

  return (
    <div className="bg-[url(/bg-home-desktop.jpg)] bg-[#FEFCF3] bg-no-repeat bg-center w-[100%] min-h-screen py-8 @container">
      <h3
        className={cn(
          "font-semibold text-sm text-red-700 text-center",
          ubuntu.className
        )}
      >
        <Radar className="stroke-red-400 w-4 h-4 inline-block mx-4" />
        {templateLiterals[templateId].companyName}{" "}
        <Radar className="stroke-red-400 w-4 h-4 inline-block mx-4" />
      </h3>
      <h2
        className={cn(
          "font-semibold text-7xl text-red-800 uppercase text-center p-4",
          protest.className
        )}
      >
        {offer?.title}
      </h2>
      <h3
        className={cn(
          "font-semibold text-7xl text-amber-500 text-center -m-10 mb-10",
          "[text-shadow:_3px_0px_0_rgb(255_255_255)]",
          pacifico.className
        )}
      >
        {templateLiterals[templateId].offertext}{" "}
      </h3>
      <p
        className={cn(
          "text-center text-lg font-semibold bg-red-700 w-fit mx-auto px-6 py-2 block mb-[3rem] @lg:mb-[6rem]",
          "relative w-[280px] bg-[#D95B43] [--p:50px] [clip-path:polygon(var(--p)_0,100%_0,calc(100%-var(--p))_100%,0_100%)]",
          ubuntu.className
        )}
      >
        <span className="">{format(new Date(offer?.startAt), "do MMM")}</span>{" "}
        to <span className="">{format(new Date(offer?.endAt), "do MMM")}</span>
      </p>
      <div
        className={cn(
          "text-left text-sm font-semibold text-red-800 max-w-[16rem] @lg:max-w-[24rem] mx-auto",
          ubuntu.className
        )}
      >
        {templateLiterals[templateId].description}
      </div>
      <div className="flex mx-auto flex-col gap-4 py-[4rem] max-w-xl relative bg-[url(/bg-product.png)] bg-no-repeat bg-center w-[100%]">
        <Image
          src={offerData[0]?.image}
          alt={offerData[0]?.name}
          width={150}
          height={150}
          className="rounded-xl mx-auto shadow-xl"
        />
        <h3
          className={cn(
            "font-semibold text-3xl text-amber-700 text-center max-w-[12rem] mx-auto",
            pacifico.className
          )}
        >
          {offerData[0]?.name}
        </h3>

        <div
          className={cn(
            "absolute flex flex-col top-[2rem] right-0 w-[8rem] h-[8rem] bg-red-700 rounded-full text-center text-white font-semibold text-xl items-center justify-center border-white border-4",
            protest.className
          )}
        >
          <span className={cn("", protest.className)}>
            {templateLiterals[templateId].priceTitle}
          </span>
          <span className="line-through text-amber-500">
            {offerData[0]?.mrp?.toFixed(2)} ₹
          </span>
          {offerData[0]?.offerPrice?.toFixed(2)} ₹
        </div>
        <div
          className={cn(
            "absolute flex flex-col bottom-[8rem] @lg:bottom-[2rem] left-0 w-[7rem] h-[7rem] p-4 bg-red-700 rounded-full text-center text-white font-semibold text-sm items-center justify-center border-white border-4",
            protest.className
          )}
        >
          {offer?.description}
        </div>
      </div>
      <Separator className="my-[2rem] border-red-600" />
      <footer
        className={cn(
          "text-sm text-center text-red-900 font-semibold",
          ubuntu.className
        )}
      >
        {templateLiterals[templateId].footer}
      </footer>
    </div>
  );
};

export default DefaultSingleTemplate;
