import React from "react";
import Image from "next/image";

const DefaultSingleTemplate = ({ offer }: { offer: any }) => {
  const offerData = offer?.offerJSON?.data;

  return (
    <div className="single-template bg-white h-full">
     <h1 className="text-3xl font-bold text-gray-800">
          {offer?.title || "Special Offer"}
        </h1>
        <p className="text-lg text-gray-600">{offer?.description}</p>
        <Image
          src={
            offerData?.image ||
            "http://dummyimage.com/200x200.png/ff4444/ffffff"
          }
          alt={offerData?.name}
          width={150}
          height={150}
          className="rounded-md shadow-md"
        /><h2 className="text-2xl font-semibold text-gray-700">
        {offerData?.name || "Product Name"}
      </h2><p className="text-sm text-gray-500">SKU: {offerData?.sku}</p>
          <p className="text-sm text-gray-500">
            Category: {offerData?.category}
          </p><p className="text-lg font-semibold text-gray-700">MRP:</p>
              <p className="text-2xl font-bold text-red-600 line-through">
                ${offerData?.mrp?.toFixed(2)}
              </p> <p className="text-lg font-semibold text-gray-700">
                Offer Price:
              </p>
              <p className="text-3xl font-bold text-green-600">
                ${offerData?.offerPrice?.toFixed(2)}
              </p>
       

        <div className="w-full mt-4">
          <p className="text-center text-sm text-gray-500">
            Offer available from{" "}
            <span className="font-semibold">
              {new Date(offer?.startAt).toLocaleDateString()}
            </span>{" "}
            to{" "}
            <span className="font-semibold">
              {new Date(offer?.endAt).toLocaleDateString()}
            </span>
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          {/* <Image
            src={`https://dummyimage.com/150x150.png?text=${offer?.qrCode}`}
            alt="QR Code"
            width={150}
            height={150}
            className="border border-gray-300 rounded-md"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default DefaultSingleTemplate;
