"use client";
import { SignUp } from "@clerk/nextjs";
import RoleSelection from "@/components/authenticated/role-selection";
import { useUserRoleStore } from "@/stores/use-user-role-store";
import { useEffect } from "react";

export default function SignUpPage() {
  const { step, role } = useUserRoleStore();

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
