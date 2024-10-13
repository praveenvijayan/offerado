"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignIn, useUser } from "@clerk/nextjs";
import Lottie from "lottie-react";
import userAnimation from "@/animation/login-setup.json";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserRole } from "@/services/user-role-service";
export default function AfterLogin() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const queryClient = useQueryClient();

  const {
    data: role,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["userRole"],
    queryFn: fetchUserRole,
    staleTime: 0,
  });

  useEffect(() => {
    if (isLoaded && user && !isLoading && !error && role) {
      // Redirect based on user role once loading is complete and no error
      if (role === "User") {
        router.push("/landing");
      } else if (role === "Admin") {
        router.push("/dashboard");
      } else if (role === "Business") {
        router.push("/dashboard");
      } else {
        router.push("/default-page");
      }
    }
  }, [isLoaded, user, router, role, isLoading, error]);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="w-[400px] ml-auto mr-auto">
        <h1 className="text-md">Logging in..</h1>
        <Lottie animationData={userAnimation} loop={true} />;
      </div>
    </div>
  );
}
