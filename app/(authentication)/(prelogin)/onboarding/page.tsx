"use client";
import Lottie from "lottie-react";
import userAnimation from "@/animation/user-setup.json";
import { useAuth } from "@clerk/nextjs";
import { useUserRoleStore } from "@/stores/use-user-role-store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const { isSignedIn, userId } = useAuth();
  const { step, role } = useUserRoleStore();
  const router = useRouter();

  const updateRole = async () => {
    try {
      const res = await fetch("/api/update-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          userId,
        }),
      });

      const data = await res.json();
      if (data.success) {
        console.log("Role updated successfully");
        if (role === "User") {
          router.push("/landing");
        } else if (role === "Admin") {
          router.push("/dashboard");
        } else if (role === "Business") {
          router.push("/organizations");
        }
      } else {
        console.error("Failed to update role:", data.error);
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  useEffect(() => {
    if (isSignedIn && userId && role) {
      updateRole();
    }
  }, [isSignedIn, userId, role]);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="w-[400px] ml-auto mr-auto">
        <h1 className="text-md">
          Setting up the user {role} profile please wait...
        </h1>
        <Lottie animationData={userAnimation} loop={true} />
      </div>
    </div>
  );
}
