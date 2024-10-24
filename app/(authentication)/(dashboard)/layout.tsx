"use client";
import { ReactNode, useState } from "react";
import { Header } from "@/components/layout/header";
import useSidebarStore from "@/stores/store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserRole } from "@/services/user-role-service";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { AppSidebar } from "@/components/app-sidebar";
import { GeistSans } from "geist/font/sans";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default function LoginLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [history, setHistory] = useState<string[]>([]);
  const { user, isLoaded, isSignedIn } = useUser();
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
    // Update the history state with the current path
    setHistory((prev) => {
      if (prev[prev.length - 1] !== pathname) {
        return [...prev, pathname];
      }
      return prev;
    });
  }, [pathname]);

  useEffect(() => {
    if (isLoaded && isSignedIn && user && !isLoading && !error && role) {
      if (role === "User") {
        router.push("/landing");
      } else if (role === "Admin" || role === "Business") {
        if (history.length > 1) {
          const lastVisitedRoute = history[history.length - 2];
          if (lastVisitedRoute) {
            router.replace(lastVisitedRoute);
          }
        }
      } else {
        router.push("/default-page");
      }
    } else if (isLoaded && !isSignedIn) {
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
        className={cn(
          "min-h-screen font-geist antialiased",
          GeistSans.variable
        )}
      >
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <Header />
            <Breadcrumb className="mx-4 mt-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <BreadcrumbEllipsis className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem>Documentation</DropdownMenuItem>
                      <DropdownMenuItem>Themes</DropdownMenuItem>
                      <DropdownMenuItem>GitHub</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/docs/components">
                    Components
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className=" bg-muted/5 h-full rounded-t-2xl mx-4 mt-4 border p-6">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </section>
  );
}
