"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignIn, useUser } from "@clerk/nextjs";
import Lottie from "lottie-react";
import userAnimation from "@/animation/login-setup.json";

export default function AfterLogin() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      const role = user.publicMetadata?.role;
      if (role === "User") {
        router.push("/landing");
      } else if (role === "Admin") {
        router.push("/dashboard");
      } else if (role === "Business") {
        router.push("/organizations");
      } else {
        router.push("/default-page");
      }
    }
  }, [isLoaded, user, router]);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="w-[400px] ml-auto mr-auto">
        <h1 className="text-md">Logging in..</h1>
        <Lottie animationData={userAnimation} loop={true} />;
      </div>
    </div>
  );
}
