import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

const DefaultMultiTemplate = ({ offer }: { offer: any }) => {
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

        {/* Product List Section */}
        <div className="@container">
          <div className="grid grid-cols-2 @md:grid-cols-2 @lg:grid-cols-3 gap-6">
            {offerData.map((product: any, index: number) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Image
                  src={product?.image}
                  alt={product?.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {product?.name}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Market Price:{" "}
                      <span className="line-through">
                        ${product?.mrp?.toFixed(2)}
                      </span>
                    </p>
                    <p className="text-xl font-bold text-green-600">
                      Offer Price: ${product?.offerPrice?.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
