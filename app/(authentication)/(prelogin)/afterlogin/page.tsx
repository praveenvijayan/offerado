"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Lottie from "lottie-react";
import userAnimation from "@/animation/login-setup.json";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserRole } from "@/services/user-role-service";

export default function AfterLogin() {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  const queryClient = useQueryClient();

  // Conditionally fetch the user's role only after Clerk has authenticated the user
  const {
    data: role,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["userRole"],
    queryFn: fetchUserRole,
    staleTime: 0,
    enabled: !!user && isLoaded && isSignedIn, // Only fetch role when user is authenticated and loaded
  });

  useEffect(() => {
    // Only proceed if the user is signed in and the role is successfully fetched
    if (isLoaded && isSignedIn && user && !isLoading && !error && role) {
      // Redirect based on the user's role
      if (role === "User") {
        router.push("/landing");
      } else if (role === "Admin" || role === "Business") {
        router.push("/dashboard");
      } else {
        router.push("/default-page");
      }
    } else if (isLoaded && !isSignedIn) {
      // Redirect to login if the user is not signed in
      router.push("/login");
    }
  }, [isLoaded, isSignedIn, user, role, isLoading, error, router]);

  // Handle loading and error states
  if (isLoading || !isLoaded) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="w-[400px] ml-auto mr-auto">
          <h1 className="text-md">Logging in..</h1>
          <Lottie animationData={userAnimation} loop={true} />
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="text-center text-red-500">Error fetching user role</div>
    );
  }

  return null; // Once redirected, no need to render anything here
}
