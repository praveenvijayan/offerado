import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

const GalleryMultiTemplate = ({ offer }: { offer: any }) => {
  const offerData = offer?.offerJSON?.data || [];

  return (
    <div className="gallery-multi-template bg-gray-100 h-full text-left p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Offer Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-2xl font-semibold py-4 px-6">
          {offer?.title}
        </div>

        {/* Offer Date Section */}
        <div className="p-4 border-b border-gray-300">
          <p className="text-gray-700 text-sm uppercase font-medium">
            Valid From
          </p>
          <p className="text-gray-900 text-lg mt-1">
            {format(new Date(offer?.startAt), "do MMM")} to{" "}
            {format(new Date(offer?.endAt), "do MMM")}
          </p>
        </div>

        {/* Product Gallery Section */}
        <div className="@container">
          <div className="p-4 grid gap-4 grid-cols-2 @md:grid-cols-3 @lg:grid-cols-4">
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
                  <h3 className="text-lg font-semibold text-gray-900">
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
        <div className="p-4 text-center bg-green-500 text-white">
          <span className="font-bold text-lg">
            {offer?.description || "Best Deal of the Season!"}
          </span>
        </div>

        {/* Store Information Section */}
        <div className="p-4 bg-white border-t border-gray-300">
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
        <div className="p-4 bg-gray-50 text-center">
          <p className="text-gray-900 font-medium">
            Home delivery available @ DLF & Trinity Store
          </p>
        </div>
      </div>
    </div>
  );
};

export default GalleryMultiTemplate;
