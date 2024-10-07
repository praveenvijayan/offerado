import React, { useMemo } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import useTemplateLiteralsStore from "@/stores/template-literals";

const DefaultMultiTemplate = ({ offer }: { offer: any }) => {
  const { templateLiterals, setTemplateLiteral } = useTemplateLiteralsStore();

  // Memoize the default template variables
  const defaultTplVars = useMemo(
    () => ({
      title: "Summer",
      description: "Summer is a great time to visit our city.",
      subTitle: "Offer",
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

  const offerData = offer?.offerJSON?.data || [];

  return (
    <div className="multi-template bg-gray-50 h-full p-6 text-gray-800">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {/* Offer Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-900">
            {offer?.title}
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Offer Valid:{" "}
            <span className="font-bold text-gray-800">
              {format(new Date(offer?.startAt), "do MMM")} -{" "}
              {format(new Date(offer?.endAt), "do MMM")}
            </span>
          </p>
        </div>

        <div className="flex flex-col justify-center mx-auto mb-4">
          <h3 className="text-2xl rounded-full text-red-500 font-semibold text-center w-fit p-4">
            {currentTemplate.title}
          </h3>
          <h3 className="text-sm bg-green-50 rounded-full text-stone-500 font-semibold text-center w-fit p-4">
            {currentTemplate.subTitle}
            <span className="text-sm bg-red-50 font-semibold text-center w-fit p-4">
              {currentTemplate.description}
            </span>
          </h3>
        </div>

        {/* Items List Section */}
        <div className="@container">
          <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-6">
            {offerData.map((item: any, index: number) => {
              switch (item.itemType) {
                case "product":
                  return (
                    <div
                      key={index}
                      className="rounded-lg shadow-md overflow-hidden"
                    >
                      <Image
                        src={item?.image}
                        alt={item?.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4 text-center">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {item?.name}
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Market Price:{" "}
                            <span className="line-through">
                              ₹{item?.mrp?.toFixed(2)}
                            </span>
                          </p>
                          <p className="text-xl font-bold text-green-600">
                            Offer Price: ₹{item?.offerPrice?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                case "poll":
                  return (
                    <div key={index} className="border p-4 rounded max-w-lg">
                      <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                      <ul>
                        {item.options.map((option: any) => (
                          <li
                            key={option.id}
                            className="flex items-center mb-2"
                          >
                            <input
                              type="radio"
                              name={`preview-option-${index}`}
                              className="mr-2"
                            />
                            <label htmlFor={`preview-option-${index}`}>
                              {option.text}
                            </label>
                          </li>
                        ))}
                      </ul>
                      <Button disabled className="mt-4">
                        Submit Vote
                      </Button>
                    </div>
                  );
                case "feedback":
                  return (
                    <Card key={index} className="w-full max-w-lg">
                      <CardHeader>
                        <CardTitle className="text-md font-semibold">
                          {item.title}
                          {item.description && (
                            <p className="mt-2 text-gray-600 text-xs">
                              {item.description}
                            </p>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Textarea
                          placeholder="Type your message here."
                          disabled
                        />
                        <p className="text-xs text-slate-500 pt-2 text-right">
                          Maximum 60 characters
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <Button disabled>Send Message</Button>
                      </CardFooter>
                    </Card>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>

        {/* Offer Description */}
        <div className="mt-6 text-center">
          <span className="inline-block bg-green-500 text-white font-bold py-2 px-6 rounded-lg">
            {offer?.description}
          </span>
        </div>

        {/* Store Information Section */}
        <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Centreal Bazaar
          </h2>
          <p className="text-center text-gray-600">
            Fastest Growing Supermarket Chain in India
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-center">
            <div>
              <p className="text-gray-700 font-medium">Thrikkakara</p>
              <p className="text-green-600 font-semibold">75928 99991</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Kakkanad</p>
              <p className="text-green-600 font-semibold">75938 12544</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Seaport-Airport Road</p>
              <p className="text-green-600 font-semibold">75929 79979</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Thrippunithura</p>
              <p className="text-green-600 font-semibold">92077 701 835</p>
            </div>
          </div>
        </div>

        {/* Footer Section for Home Delivery */}
        <div className="mt-6 text-center">
          <p className="text-lg text-gray-700 font-medium">
            Home delivery available @{" "}
            <span className="font-semibold">DLF & Trinity Store</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DefaultMultiTemplate;
