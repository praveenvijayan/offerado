"use client";

import Lottie from "lottie-react";
import userAnimation from "@/animation/user-setup.json";
import { useAuth } from "@clerk/nextjs";
import { useUserRoleStore } from "@/stores/use-user-role-store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { updateUserRole } from "@/services/user-role-service"; // Import the service

export default function OnboardingPage() {
  const { isSignedIn, userId } = useAuth();
  const { role, resetRole } = useUserRoleStore();
  const router = useRouter();

  // React Query mutation for updating the user role
  const mutation = useMutation({
    mutationFn: () => updateUserRole(role, userId as string),
    onSuccess: () => {
      resetRole();
      switch (role) {
        case "User":
          router.push("/landing");
          break;
        case "Admin":
          router.push("/dashboard");
          break;
        case "Business":
          router.push("/organizations");
          break;
        default:
          router.push("/"); // Fallback in case of undefined role
      }
    },
    onError: (error) => {
      console.error("Error updating role:", error);
    },
  });

  // Trigger role update mutation when user is signed in
  useEffect(() => {
    if (isSignedIn && userId && role) {
      mutation.mutate();
    }
  }, [isSignedIn, userId, role]);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="w-[400px] ml-auto mr-auto">
        <h1 className="text-md">
          Setting up the user {role} profile, please wait...
        </h1>
        <Lottie animationData={userAnimation} loop={true} />
      </div>
    </div>
  );
}
