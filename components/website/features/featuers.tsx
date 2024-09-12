import Image from "next/image";
import React from "react";

const Features: React.FC = () => {
  return (
    <section id="features" className="container mt-[3rem] mb-[2rem]">
      <div className="grid grid-cols-1gap-4 space-y-[6rem]">
        <div data-aos="slide-up" className="md:flex md:flex-row-reverse">
          <Image
            src="/showcase.png"
            alt="Publish your product offers quickly and easily with our
            user-friendly platform"
            width={650}
            height={300}
            className="md:ml-[2rem] mb-[1rem]"
          />
          <div className="lg:w-[43%]">
            <h3 className="text-4xl font-semibold mb-[2rem]">
              Effortlessly showcase your product deals with our intuitive
              platform.
            </h3>
            <p className="text-xl text-black">
              Our tools help you connect with a larger, more engaged audience,
              driving more traffic and sales. Maximize your business potential
              and watch your customer base grow!.
            </p>
          </div>
        </div>
        <div data-aos="slide-up" className="md:flex">
          <Image
            src="/reach.png"
            alt="Publish your product offers quickly and easily with our
            user-friendly platform"
            width={590}
            height={330}
            className="md:mr-[3rem] mb-[1rem]"
          />
          <div className="lg:w-[43%]">
            <h3 className="text-4xl font-semibold mb-[2rem]">
              Expand your reach to a wide audience of potential customers.
            </h3>
            <p className="text-xl text-black">
              Our tools help you connect with a larger, more engaged audience,
              driving more traffic and sales. Maximize your business potential
              and watch your customer base grow!
            </p>
          </div>
        </div>
        <div
          data-aos="slide-up"
          className="md:flex md:flex-row-reverse justify-between"
        >
          <Image
            src="/feature03.png"
            alt="Publish your product offers quickly and easily with our
            user-friendly platform"
            width={500}
            height={450}
            className="md:mr-[2rem] mb-[1rem]"
          />
          <div className="lg:w-[48%]">
            <h3 className="text-4xl font-semibold mb-[2rem]">
              Easily track and understand how your offers are doing
            </h3>
            <p className="text-xl text-black">
              Quickly and easily create your product offers with our
              user-friendly platform. Reach your customers in no time and boost
              your sales effortlessly. Experience seamless product promotion
              like never before!.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
