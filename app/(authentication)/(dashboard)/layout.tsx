"use client";
import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { MainContent } from "@/components/layout/main-content";
import useSidebarStore from "@/stores/store";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function LoginLayout({ children }: { children: ReactNode }) {
  const { isCollapsed } = useSidebarStore();
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
