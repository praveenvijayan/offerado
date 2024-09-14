"use client";

import Lottie from "lottie-react";
import userAnimation from "@/animation/user-setup.json";
import { useUser } from "@clerk/nextjs";
import { useUserRoleStore } from "@/stores/use-user-role-store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { updateUserRole } from "@/services/user-role-service";
import { createOrganization } from "@/services/organization-service"; // Import organization service

export default function OnboardingPage() {
  const { isSignedIn, isLoaded, user } = useUser(); // Clerk's useUser() hook
  const { role, resetRole } = useUserRoleStore();
  const router = useRouter();

  // Helper function to extract the email's first part
  const getOrganizationName = (email: string) => {
    return email.split("@")[0] + "_org";
  };

  // React Query mutation for creating an organization and updating the user role
  const mutation = useMutation({
    mutationFn: async () => {
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

        // If organization is created successfully, update user role
        if (organization) {
          return await updateUserRole(role, user?.id as string);
        }
        throw new Error("Organization creation failed");
      } else {
        // If not "Business", just update the user role
        return await updateUserRole(role, user?.id as string);
      }
    },
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
          router.push("/dashboard");
          break;
        default:
          router.push("/");
      }
    },
    onError: (error) => {
      console.error("Error creating organization or updating role:", error);
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
            : `Setting up the ${role} profile.`}
        </h1>
        <Lottie animationData={userAnimation} loop={true} />
      </div>
    </div>
  );
}
