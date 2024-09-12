"use client";

import Image from "next/image";
import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What is Offerado?",
      answer:
        "Offerado is a platform that allows businesses to create, share, and manage product offers to reach a wider audience, boost sales, and grow their business.",
    },
    {
      question: "How can I create and share offers using Offerado?",
      answer:
        "You can easily create product offers with Offerado's user-friendly platform. Once created, you can share these offers across multiple social media platforms to reach more customers.",
    },
    {
      question: "What are the different plans available on Offerado?",
      answer:
        "Offerado offers three plans: Free Plan (Free forever with 1 business unit, 20 products, 1 team member, and 3 offers), Standard Plan (Free during Beta, $9/month with unlimited team members, products, business units, and offers, including API access, complete documentation, and email support), and Enterprise Plan (Contact for pricing, includes all standard features, customizations, and priority support).",
    },
    {
      question: "Can I track the performance of my offers on Offerado?",
      answer:
        "Yes, Offerado provides tools to easily track and understand the performance of your offers, helping you maximize their impact and reach.",
    },
    {
      question:
        "Does Offerado support multiple team members and business units?",
      answer:
        "Yes, the Standard and Enterprise plans support unlimited team members and business units, allowing for collaboration and efficient management of multiple offers.",
    },
  ];

  return (
    <section id="FAQ" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
          <div data-aos="fade-up" className="w-full lg:w-1/2">
            <Image
              src={"/faq-section-three.jpeg"}
              alt={"FAQ tailwind section"}
              className={"w-full rounded-xl"}
              width={600}
              height={600}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-xl">
              <div className="mb-6 lg:mb-16">
                <h6 className="text-lg text-center font-medium text-indigo-600 mb-2 lg:text-left">
                  faqs
                </h6>
                <h2 className="text-4xl text-center font-semibold text-gray-900 leading-[3.25rem] mb-5 lg:text-left">
                  Looking for answers?
                </h2>
              </div>
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="accordion-group mt-[1rem]"
                  data-accordion="default-accordion"
                >
                  <div
                    className={`accordion pb-8 border-b border-solid border-gray-200 ${
                      activeIndex === index ? "active" : ""
                    }`}
                    id={`basic-heading-${index}-with-arrow-always-open`}
                  >
                    <button
                      className="accordion-toggle group inline-flex justify-between text-xl font-normal leading-8 text-gray-600 w-full transition duration-500 hover:text-indigo-600 accordion-active:text-indigo-600 accordion-active:font-medium always-open"
                      aria-controls={`basic-collapse-${index}-with-arrow-always-open`}
                      onClick={() => handleToggle(index)}
                    >
                      <h5 className="text-left mb-[.5rem]">{item.question}</h5>
                      <svg
                        className={`text-gray-900 transition duration-500 group-hover:text-indigo-600 accordion-active:text-indigo-600 ${
                          activeIndex === index ? "rotate-180" : ""
                        }`}
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                    {activeIndex === index && (
                      <div
                        id={`basic-collapse-${index}-with-arrow-always-open`}
                        className="accordion-content w-full px-0 overflow-hidden pr-4 active"
                        aria-labelledby={`basic-heading-${index}-with-arrow-always-open`}
                      >
                        <p className="text-base font-normal text-gray-600">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
