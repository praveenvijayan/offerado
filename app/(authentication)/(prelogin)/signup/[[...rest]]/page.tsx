"use client";
import { SignUp } from "@clerk/nextjs";
import RoleSelection from "@/components/authenticated/role-selection";
import { useUserRoleStore } from "@/stores/use-user-role-store";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { step, role } = useUserRoleStore();
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      router.push("/login");
    }
  }, [isLoaded, user, router]);

  if (!isLoaded || user) {
    return <>Loading...</>;
  }

  return (
    <div>
      {/* Step 1: Role Selection */}
      {step === 1 && <RoleSelection />}

      {/* Step 2: Show SignUp only after role selection */}
      {step === 2 && role && (
        <div className="sign-up-form">
          <h2 className="text-md py-4 text-center">
            You are signing up as a {role}
          </h2>
          <SignUp forceRedirectUrl="/onboarding" />{" "}
          {/* Redirect after sign-up */}
        </div>
      )}
    </div>
  );
}
