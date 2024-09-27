import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

const LightMultiTemplate = ({ offer }: { offer: any }) => {
  const offerData = offer?.offerJSON?.data;

  return (
    <div className="single-template bg-gradient-to-b from-gray-900 to-black h-full text-center p-8">
      <div className="border-2 border-neon-green p-4 rounded-lg shadow-lg bg-gray-800 text-white">
        {/* Deal of the Day Header */}
        <div className="bg-gradient-to-r from-neon-pink to-neon-green text-yellow-400 text-3xl font-extrabold py-2 px-4 rounded-md">
          {offer?.title}
        </div>

        {/* Offer Date Section */}
        <div className="mt-6">
          <p className="text-neon-pink text-lg font-semibold uppercase">
            Valid From
          </p>
          <p className="text-neon-green text-2xl mt-2 font-bold">
            {format(new Date(offer?.startAt), "do MMM")} to{" "}
            {format(new Date(offer?.endAt), "do MMM")}
          </p>
        </div>

        {/* Product Image and Offer Price Section */}
        <div className="flex flex-col justify-center items-center mt-8">
          <Image
            src={offerData[0]?.image}
            alt={offerData[0]?.name}
            width={180}
            height={180}
            className="rounded-full border-4 border-neon-pink shadow-lg"
          />
          <div className="mt-6 text-center">
            <div className="bg-neon-green text-yellow-100 px-6 py-2 rounded-md text-lg font-bold inline-block shadow-neon">
              Market Price: ${offerData[0]?.mrp?.toFixed(2)}
            </div>
            <div className="bg-neon-pink text-yellow-200 px-6 py-2 rounded-md text-2xl font-extrabold mt-4 shadow-neon">
              Offer Price: ${offerData[0]?.offerPrice?.toFixed(2)}
            </div>
            <p className="text-neon-green font-semibold mt-4 text-xl tracking-wide">
              {offerData[0]?.name}
            </p>
          </div>
        </div>

        {/* Best Price Label */}
        <div className="mt-8">
          <span className="bg-black text-neon-green font-bold py-3 px-6 rounded-md text-xl inline-block border border-neon-green shadow-neon">
            {offer?.description || "Best Deal in Town!"}
          </span>
        </div>

        {/* Store Information Section */}
        <div className="mt-10 border-t border-neon-green pt-6">
          <h2 className="text-neon-pink font-extrabold text-3xl">
            Centreal Bazaar
          </h2>
          <p className="text-gray-300 text-sm mt-2">
            Fastest Growing Supermarket Chain in India
          </p>
          <div className="grid grid-cols-2 gap-8 mt-6">
            <div>
              <p className="text-neon-green font-bold">Thrikkakara</p>
              <p className="text-gray-200">75928 99991</p>
            </div>
            <div>
              <p className="text-neon-green font-bold">Kakkanad</p>
              <p className="text-gray-200">75938 12544</p>
            </div>
            <div>
              <p className="text-neon-green font-bold">Seaport-Airport Road</p>
              <p className="text-gray-200">75929 79979</p>
            </div>
            <div>
              <p className="text-neon-green font-bold">Thrippunithura</p>
              <p className="text-gray-200">92077 701 835</p>
            </div>
          </div>
        </div>

        {/* Footer Section for Home Delivery */}
        <div className="mt-6 text-gray-200 text-sm">
          Home delivery available @ DLF & Trinity Store
        </div>
      </div>
    </div>
  );
};

export default LightMultiTemplate;
