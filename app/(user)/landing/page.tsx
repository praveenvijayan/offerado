import React from "react";
import { Metadata } from "next";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Landing Page",
  description: "Welcome to our landing page",
};

const LandingPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl pt-1">Welcome to Offerado</h1>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </header>
      <p className="text-lg mb-4">
        Discover amazing features and services tailored just for you.
      </p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;
