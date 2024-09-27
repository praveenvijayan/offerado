import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

const DefaultSingleTemplate = ({ offer }: { offer: any }) => {
  const offerData = offer?.offerJSON?.data;

  return (
    <div className="single-template bg-white h-full text-center">
      <div className="bg-yellow-500 p-4 text-center">
        {/* Deal of the Day Header */}
        <div className="bg-red-700 text-white text-4xl font-bold py-2 px-4 rounded-md inline-block">
          {offer?.title}
        </div>

        {/* Offer Date Section */}
        <div className="mt-2">
          <p className="font-bold text-white text-xl">OFFER VALID ONLY ON</p>

          <p className="font-extrabold text-red-800 text-3xl">
            <span className="font-semibold">
              {format(new Date(offer?.startAt), "do MMM")}
            </span>{" "}
            to{" "}
            <span className="font-semibold">
              {format(new Date(offer?.endAt), "do MMM")}
            </span>
          </p>
        </div>

        {/* Chicken Image and Offer Price Section */}
        <div className="flex flex-col justify-center items-center mt-4">
          <Image
            src={offerData[0]?.image}
            alt={offerData[0]?.name}
            width={150}
            height={150}
            className="rounded-md shadow-md mx-auto my-[2rem]"
          />
          <div className="text-center">
            <div className="bg-red-600 text-white px-4 py-2 rounded-md text-xl font-bold inline-block">
              Market Price: ${offerData[0]?.mrp?.toFixed(2)}
            </div>
            <div className="bg-yellow-400 text-red-800 px-4 py-2 rounded-md text-2xl font-extrabold mt-2">
              Offer Price: {offerData[0]?.offerPrice?.toFixed(2)}
            </div>
            <p className="text-red-700 font-bold mt-2 text-2xl text-wrap max-w-sm">
              {offerData?.name}
            </p>
          </div>
        </div>

        {/* Best Price Label */}
        <div className="mt-4">
          <span className="bg-green-500 text-white font-bold py-2 px-4 rounded-full text-lg inline-block">
            {offer?.description}
          </span>
        </div>

        {/* Store Information Section */}
        <div className="mt-6 bg-white py-4 rounded-md shadow-lg text-center">
          <h2 className="text-red-700 font-extrabold text-2xl">
            Centreal Bazaar
          </h2>
          <p className="text-gray-700 font-bold">
            Fastest Growing Supermarket Chain in India
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-gray-800 font-bold">Thrikkakara</p>
              <p className="text-red-600 font-extrabold">75928 99991</p>
            </div>
            <div>
              <p className="text-gray-800 font-bold">Kakkanad</p>
              <p className="text-red-600 font-extrabold">75938 12544</p>
            </div>
            <div>
              <p className="text-gray-800 font-bold">Seaport-Airport Road</p>
              <p className="text-red-600 font-extrabold">75929 79979</p>
            </div>
            <div>
              <p className="text-gray-800 font-bold">Thrippunithura</p>
              <p className="text-red-600 font-extrabold">92077 701 835</p>
            </div>
          </div>
        </div>

        {/* Footer Section for Home Delivery */}
        <div className="mt-4">
          <p className="text-red-800 font-bold">
            Home delivery available @ DLF & Trinity Store
          </p>
        </div>
      </div>
    </div>
  );
};

export default DefaultSingleTemplate;
