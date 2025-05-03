"use client";
import PricingPlan from "@/app/_data/PricingPlan";
import { useUser } from "@clerk/nextjs";
import React from "react";

function Upgrade() {
  const { user } = useUser();

  return (
    <div className="p-10 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-indigo-700">
          Upgrade Your Experience
        </h1>
        <p className="text-gray-600 mt-2">
          Choose the plan that fits your needs and take your interview
          preparation to the next level.
        </p>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-center md:gap-10">
          {PricingPlan.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 p-6 shadow-lg bg-white sm:px-8 lg:p-12 hover:shadow-xl transition-shadow"
            >
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  {item.duration} <span className="sr-only">Plan</span>
                </h2>

                <p className="mt-2 sm:mt-4">
                  <strong className="text-4xl font-extrabold text-indigo-700 sm:text-5xl">
                    {item.price}${" "}
                  </strong>
                  <span className="text-sm font-medium text-gray-600">
                    /{item.duration}
                  </span>
                </p>
              </div>

              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 text-green-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium">
                    Unlimited new Mock Interviews
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 text-green-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium">
                    Retake previous interviews anytime
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 text-green-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium">
                    Priority Email Support
                  </span>
                </li>
              </ul>

              <a
                href={
                  item.link +
                  "?prefilled_email=" +
                  user?.primaryEmailAddress.emailAddress
                }
                target="_blank"
                className="mt-8 block rounded-full border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300 transition-colors"
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
