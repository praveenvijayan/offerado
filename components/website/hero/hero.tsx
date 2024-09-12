import { CircleArrowRight } from "lucide-react";
import Image from "next/image";

function CustomHero() {
  return (
    <section
      data-aos="fade-in"
      className="container flex bg-no-repeat bg-bottom overflow-auto justify-between items-center pt-[2rem] lg:pt-[6rem] flex-col lg:flex-row"
    >
      <Image
        src={"/hero spotlight.png"}
        alt="hero"
        width={1049}
        height={649}
        objectFit="crop"
        className="ml-auto"
      />
      <div
        data-aos="fade-up"
        data-aos-duration="900"
        className="lg:absolute lg:bg-white rounded-2xl pt-[2rem] md:p-[2rem] md:h-[50%] md:w-1/3 flex flex-col justify-center items-start space-y-[1rem] lg:space-y-[2rem]"
      >
        <h1 className="text-3xl md:text-5xl font-semibold dark:text-slate-800">
          Create and Share Your Offers with Ease
        </h1>
        <p className="text-md md:text-2xl dark:text-slate-800">
          Reach a wider audience, boost sales, and grow your business with
          Offerado
        </p>
        <div className="flex gap-4">
          <a
            href="/signup"
            className="px-4 py-2 bg-red-500  border-red-500 border-2 text-white rounded-xl hover:bg-stone-600 hover:border-stone-600 h-fit w-fit"
          >
            Get for free <CircleArrowRight className="inline-block w-[16px]" />
          </a>
          <a
            href="/signup"
            className="px-8 py-2 text-black rounded-xl hover:bg-red-100 hover:border-red-300 h-fit w-fit border-black border-2"
          >
            Book a Demo <CircleArrowRight className="inline-block w-[16px]" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default CustomHero;
