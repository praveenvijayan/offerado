import Image from "next/image";
import Header from "@/components/website/header/header";
import CustomHero from "@/components/website/hero/hero";
import Features from "@/components/website/features/featuers";
import SignUpBlock from "@/components/website/signupblock/signupblock";
import Testimonial from "@/components/website/testimonials/testimonial";
import Plans from "@/components/website/plans/plans";
import Footer from "@/components/website/footer/footer";
import FAQ from "@/components/website/faq/faq";
import { ShareBlock } from "@/components/website/shareblock/shareblock";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Home() {
  return (
    <main className="min-h-screen w-full dark:bg-slate-800">
      <div
        className=" bg-no-repeat bg-bottom overflow-auto pt-[3rem]"
        style={{ backgroundImage: 'url("/bg-home-desktop.png")' }}
      >
        <div className="container mx-auto">
          <Header />
          <CustomHero />
        </div>
      </div>
      <div className="container mx-auto">
        <ShareBlock />
        <Features />
        <SignUpBlock />
        {/* <Testimonial /> */}
        <Plans />
        <FAQ />
      </div>
      <Footer />
      <SpeedInsights />
    </main>
  );
}
