import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

const GallerySingleTemplate = ({ offer }: { offer: any }) => {
  const offerData = offer?.offerJSON?.data;

  return (
    <div className="single-template bg-gray-100 h-full text-left p-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Deal of the Day Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-2xl font-semibold py-4 px-6">
          {offer?.title}
        </div>

        {/* Offer Date Section */}
        <div className="p-6 border-b border-gray-300">
          <p className="text-gray-700 text-sm uppercase font-medium">
            Valid From
          </p>

          <p className="text-gray-900 text-lg mt-1">
            {format(new Date(offer?.startAt), "do MMM")} to{" "}
            {format(new Date(offer?.endAt), "do MMM")}
          </p>
        </div>

        {/* Chicken Image and Offer Price Section */}
        <div className="p-6 flex flex-col md:flex-row items-center">
          <h3 className="text-xl font-semibold">{offerData[0]?.name}</h3>
          <Image
            src={offerData[0]?.image}
            alt={offerData[0]?.name}
            width={150}
            height={150}
            className="rounded-md shadow-md mb-4 md:mb-0"
          />
          <div className="md:ml-6 text-center md:text-left">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md text-md font-medium inline-block">
              Market Price: ${offerData[0]?.mrp?.toFixed(2)}
            </div>
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md text-xl font-semibold mt-2">
              Offer Price: ${offerData[0]?.offerPrice?.toFixed(2)}
            </div>
            <p className="text-gray-700 font-semibold mt-2 text-lg">
              {offerData[0]?.name}
            </p>
          </div>
        </div>

        {/* Best Price Label */}
        <div className="p-6 text-center bg-green-500 text-white">
          <span className="font-bold text-lg">
            {offer?.description || "Best Deal of the Season!"}
          </span>
        </div>

        {/* Store Information Section */}
        <div className="p-6 bg-white border-t border-gray-300">
          <h2 className="text-gray-900 font-bold text-xl">Centreal Bazaar</h2>
          <p className="text-gray-600 text-sm">
            Fastest Growing Supermarket Chain in India
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-gray-700 font-bold">Thrikkakara</p>
              <p className="text-gray-900 font-medium">75928 99991</p>
            </div>
            <div>
              <p className="text-gray-700 font-bold">Kakkanad</p>
              <p className="text-gray-900 font-medium">75938 12544</p>
            </div>
            <div>
              <p className="text-gray-700 font-bold">Seaport-Airport Road</p>
              <p className="text-gray-900 font-medium">75929 79979</p>
            </div>
            <div>
              <p className="text-gray-700 font-bold">Thrippunithura</p>
              <p className="text-gray-900 font-medium">92077 701 835</p>
            </div>
          </div>
        </div>

        {/* Footer Section for Home Delivery */}
        <div className="p-6 bg-gray-50 text-center">
          <p className="text-gray-900 font-medium">
            Home delivery available @ DLF & Trinity Store
          </p>
        </div>
      </div>
    </div>
  );
};

export default GallerySingleTemplate;
