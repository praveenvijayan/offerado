"use client";
import Link from "next/link";
import { Settings2, Package, ChevronLeft, ChevronRight } from "lucide-react";
import SidebarNavigation from "./navigation";

import useSidebarStore from "@/stores/store";
import { LogoOrganization } from "./logo-organization";

export const Sidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebarStore();

  return (
    <div
      className={`border-r bg-muted/40  ${
        isCollapsed ? "w-20" : "w-70"
      } transition-[width] duration-300`}
    >
      <div className="flex h-full max-h-screen flex-col gap-2">
        <LogoOrganization />
        <SidebarNavigation />
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center h-10 w-10 border-t border-muted mt-auto ml-auto"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>
    </div>
  );
};
