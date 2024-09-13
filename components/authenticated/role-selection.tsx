import React from "react";
import { useUserRoleStore } from "@/stores/use-user-role-store";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, User2 } from "lucide-react";
import Logo from "../global/logo";
import Link from "next/link";

export default function RoleSelection() {
  const { role, setRole, nextStep } = useUserRoleStore();

  const handleRoleChange = (selectedRole: string) => {
    setRole(selectedRole);
  };

  const handleNextClick = () => {
    if (role) {
      nextStep();
    } else {
      alert("Please select an account type before proceeding.");
    }
  };

  return (
    <>
      <h3 className="flex flex-col justify-center align-middle items-center text-xl gap-2 font-semibold p-4 text-center md:px-0">
        <Link href="/">
          <Logo />
        </Link>
        Select type of account
      </h3>
      <div className="flex justify-center items-center gap-4 flex-wrap">
        <Card
          onClick={() => handleRoleChange("Business")}
          className={`cursor-pointer w-full max-w-xs p-6 transition-transform transform h-[300px] ${
            role === "Business" ? "border border-blue-500" : ""
          }`}
        >
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              <Building /> Business Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-xs text-muted-foreground">
              <li>You can create and manage campaigns</li>
              <li>Share offers with users</li>
              <li>Promote your products and services</li>
              <li>View analytics, and engage with customers</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              variant={role === "Business" ? "default" : "outline"}
              className="w-full"
            >
              Sign up as Business
            </Button>
          </CardFooter>
        </Card>

        {/* User Card */}
        <Card
          onClick={() => handleRoleChange("User")}
          className={`cursor-pointer w-full max-w-xs p-6 transition-transform transform h-[300px] ${
            role === "User" ? "border border-blue-500" : ""
          }`}
        >
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              <User2 /> User Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-xs text-muted-foreground">
              <li>You can explore offers</li>
              <li>Create wish lists, and interact with businesses.</li>
              <li>
                Save your favorite products and receive personalized offers from
                your favorite brands.
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              variant={role === "User" ? "default" : "outline"}
              className="w-full"
            >
              Sign up as a User
            </Button>
          </CardFooter>
        </Card>

        {/* Next Button */}
        <div className="w-full flex flex-col justify-center align-middle items-center gap-4">
          <Button
            onClick={handleNextClick}
            disabled={!role}
            className="w-1/2 max-w-sm mt-4"
          >
            Next
          </Button>
          <Link href="/login">or Login</Link>
        </div>
      </div>
    </>
  );
}
