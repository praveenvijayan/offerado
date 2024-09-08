import { useState } from "react";
import {
  ChevronDown,
  ChevronsLeft,
  Menu,
  X,
  Home,
  Package,
  Users,
  BarChart,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button"; // Shadcn Button
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Shadcn Sheet
import { cn } from "@/lib/utils"; // Utility for classNames

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const sidelinks = [
  {
    name: "Offer Management",
    links: [
      { name: "Create New Offer", href: "/create-new-offer", icon: Package },
      { name: "Bulk Edit Offers", href: "/bulk-edit-offers", icon: Package },
      { name: "Scheduled Offers", href: "/scheduled-offers", icon: Package },
      {
        name: "Real-Time Offer Management",
        href: "/real-time-offer-management",
        icon: Package,
      },
      {
        name: "AI-Powered Suggestions",
        href: "/ai-powered-suggestions",
        icon: Package,
      },
    ],
  },
  {
    name: "Campaign Management",
    links: [
      {
        name: "Target Audience Distribution",
        href: "/target-audience-distribution",
        icon: Users,
      },
      {
        name: "Sponsored Promotions",
        href: "/sponsored-promotions",
        icon: Users,
      },
      { name: "Loyalty Programs", href: "/loyalty-programs", icon: Users },
    ],
  },
  {
    name: "Analytics & Reports",
    links: [
      {
        name: "Performance Tracking",
        href: "/performance-tracking",
        icon: BarChart,
      },
      {
        name: "Predictive Sales Analysis",
        href: "/predictive-sales-analysis",
        icon: BarChart,
      },
    ],
  },
];

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const [navOpened, setNavOpened] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<
    Record<string, boolean>
  >({});

  const toggleGroup = (groupName: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  return (
    <aside
      className={cn(
        `fixed left-0 top-0 z-50 w-full border-r-2 transition-[width] md:bottom-0 md:right-auto md:h-screen  ${
          isCollapsed ? "md:w-14" : "md:w-64"
        }`
      )}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-opacity ${
          navOpened ? "h-screen opacity-50" : "h-0 opacity-0"
        } w-full bg-black md:hidden`}
      />

      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="z-50 flex justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6" />
            <div className={`${isCollapsed ? "hidden" : "block"}`}>
              <span className="font-medium">Shadcn Admin</span>
            </div>
          </div>

          {/* Toggle Button for mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-auto">
          {/* {sidelinks.map((group) => (
            <div key={group.name} className="px-4 my-2">
              <button
                onClick={() => toggleGroup(group.name)}
                className="flex justify-between items-center w-full py-2 font-medium"
              >
                {group.name}
                <ChevronDown
                  className={`transition-transform ${
                    collapsedGroups[group.name] ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`pl-4 transition-max-height ${
                  collapsedGroups[group.name] ? "max-h-0" : "max-h-64"
                }`}
              >
                {group.links.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-3 py-1 text-sm text-gray-600"
                  >
                    <link.icon className="h-4 w-4" />
                    {!isCollapsed && <span>{link.name}</span>}
                  </a>
                ))}
              </div>
            </div>
          ))} */}
        </div>

        {/* Toggle collapse/expand button */}
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size="icon"
          variant="outline"
          className="absolute -right-5 top-1/2 hidden rounded-full md:inline-flex"
        >
          <ChevronsLeft
            className={`h-5 w-5 ${isCollapsed ? "rotate-180" : ""}`}
          />
        </Button>
      </div>
    </aside>
  );
}
