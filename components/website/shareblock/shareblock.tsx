import React from "react";
import Image from "next/image";

export const ShareBlock: React.FC = () => {
  return (
    <div
      data-aos="slide-up"
      className="flex flex-col items-center justify-center my-[4rem] lg:my-[10rem]"
    >
      <h3 className="text-xl md:text-2xl mb-[2rem]">
        Easily share your offers
      </h3>
      <div className="flex flex-wrap items-center justify-center gap-[2rem] lg:gap-[8rem]">
        <Image src="/whatsapp.svg" alt="App Store" width={180} height={50} />
        <Image src="/facebook.svg" alt="App Store" width={180} height={50} />
        <Image src="/linkedin.svg" alt="App Store" width={150} height={50} />
        <Image src="/instagram.svg" alt="App Store" width={150} height={50} />
      </div>
    </div>
  );
};
