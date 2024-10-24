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
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        Building Your Application
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            {children}
          </SidebarInset>
        </SidebarProvider>
      </div>
    </section>
  );
}
