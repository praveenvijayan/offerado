import { CircleArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SignUpBlock: React.FC = () => {
  return (
    <div
      data-aos="fade-up"
      className="relative overflow-hidden max-w-[90%] lg:max-w-[56%] bg-[#f8f8f8f8] rounded-2xl flex  md:justify-between shadow-xl md:px-[2rem] my-[6rem] m-[auto]"
    >
      <div className="space-y-6 p-[2rem] md:py-[12rem] md:px-[1rem] w-[50%] lg:static absolute bg-white lg:bg-transparent right-0 top-0 rounded-b-2xl h-[310px] md:h-auto">
        <h2 className="text-3xl font-semibold">
          Get for free and start today!
        </h2>
        <Link
          href="/signup"
          className="block w-fit rounded-xl bg-red-500 hover:bg-red-600 text-white px-4 py-2 mt-4 text-sm"
        >
          Get for Free{" "}
          <CircleArrowRight className="md:inline-block w-5 hidden" />
        </Link>
      </div>
      <Image
        src="/signup-block.png"
        alt="Sign up and start today!"
        width={590}
        height={570}
        className="block h-full"
      />
    </div>
  );
};

export default SignUpBlock;
