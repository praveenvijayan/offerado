import Link from "next/link";
import { ClerkProvider, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/global/logo";
import { SignIn } from "@clerk/nextjs";
import Lottie from "lottie-react";
import userAnimation from "@/animation/login-setup.json";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center">
      <ClerkLoading>Loading...</ClerkLoading>{" "}
      <ClerkLoaded>
        <div className="mb-4">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <SignIn fallbackRedirectUrl="/afterlogin" />
      </ClerkLoaded>
    </div>
  );
}
