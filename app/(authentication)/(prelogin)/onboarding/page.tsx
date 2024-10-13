"use client";

import Lottie from "lottie-react";
import userAnimation from "@/animation/user-setup.json";
import { useUser } from "@clerk/nextjs";
import { useUserRoleStore } from "@/stores/use-user-role-store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createOrganization } from "@/services/organization-service";

export default function OnboardingPage() {
  const { isSignedIn, isLoaded, user } = useUser();
  const { role, resetRole } = useUserRoleStore();
  const router = useRouter();

  // Corrected useState syntax
  const [orgId, setOrgId] = useState("");

  // Helper function to extract the email's first part
  const getOrganizationName = (email: string) => {
    return email.split("@")[0] + "_org";
  };

  // Mutation to handle the onboarding process
  const mutation = useMutation({
    mutationFn: async () => {
      let organizationId = null;

      if (role === "Business") {
        // Create organization first
        const organizationName = getOrganizationName(
          user?.primaryEmailAddress?.emailAddress || ""
        );

        const organization = await createOrganization({
          name: organizationName,
          email: user?.primaryEmailAddress?.emailAddress || "",
          ownerId: user?.id as string,
        });

        if (!organization) {
          throw new Error("Organization creation failed");
        }

        organizationId = organization.id;
        setOrgId(organizationId);
      }

      // Create the user in your database
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for authentication
        body: JSON.stringify({
          organizationId: organizationId, // May be null if not "Business"
          role: role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create user");
      }

      return response.json();
    },
    onSuccess: () => {
      resetRole();
      switch (role) {
        case "User":
          router.push("/landing");
          break;
        case "Admin":
        case "Business":
          router.push("/dashboard");
          break;
        default:
          router.push("/");
      }
    },
    onError: (error) => {
      console.error("Error during onboarding:", error);
    },
  });

  // Trigger role update or organization creation when user is signed in
  useEffect(() => {
    if (isLoaded && isSignedIn && user && role) {
      mutation.mutate();
    }
  }, [isLoaded, isSignedIn, user, role]);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="w-[400px] ml-auto mr-auto">
        <h1 className="text-md mb-4">
          {role === "Business"
            ? "Setting up your business profile."
            : `Setting up your ${role.toLowerCase()} profile.`}
        </h1>
        <Lottie animationData={userAnimation} loop={true} />
      </div>
    </div>
  );
}
