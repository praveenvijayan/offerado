"use client";
import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { MainContent } from "@/components/layout/main-content";
import useSidebarStore from "@/stores/store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserRole } from "@/services/user-role-service";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function LoginLayout({ children }: { children: ReactNode }) {
  const { isCollapsed } = useSidebarStore();
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  const queryClient = useQueryClient();
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

  if (
    !isLoaded ||
    isLoading ||
    error ||
    (role !== "Admin" && role !== "Business")
  ) {
    return null;
  }

  return (
    <section>
      <div
        className={`grid min-h-screen w-full ${
          isCollapsed
            ? "md:grid-cols-[80px_1fr]"
            : "md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
        }  transition-[width] duration-300`}
      >
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          <MainContent>{children}</MainContent>
        </div>
      </div>
    </section>
  );
}
