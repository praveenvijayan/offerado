import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  Megaphone,
  Package2,
  ChartColumn,
  LoaderPinwheel,
  ClipboardType,
  Calendar,
  Target,
  TicketPercent,
  BarChart2,
  TrendingUp,
  ClipboardList,
  Monitor,
  QrCode,
  Clock,
  DollarSign,
  FileText,
  ShoppingCart,
  CloudDownload,
  Image,
  Brain,
  SquareUser,
  BookA,
  BookDown,
  Blocks,
  Box,
  Plug2,
  FileSliders,
  Globe,
  UserCog,
  Users,
  MessageCircleWarning,
  BookMarked,
  Settings,
  Store,
  BriefcaseBusiness,
} from "lucide-react";

import { usePathname } from "next/navigation";
import useSidebarStore from "@/stores/store";
import menuItems from "@/data/menu.json";
import Link from "next/link";
import { useState, useEffect } from "react";

const iconMap = {
  Megaphone,
  Package2,
  ChartColumn,
  LoaderPinwheel,
  ClipboardType,
  Calendar,
  Target,
  TicketPercent,
  BarChart2,
  TrendingUp,
  ClipboardList,
  Monitor,
  QrCode,
  Clock,
  DollarSign,
  FileText,
  ShoppingCart,
  CloudDownload,
  Image,
  Brain,
  SquareUser,
  BookA,
  BookDown,
  Blocks,
  Plug2,
  FileSliders,
  Globe,
  UserCog,
  Users,
  MessageCircleWarning,
  BookMarked,
  Box,
  Settings,
  Store,
  BriefcaseBusiness,
} as any;

const SidebarNavigation = () => {
  const { isCollapsed } = useSidebarStore();
  const pathname = usePathname();

  // State to manage which accordion item is open
  const [openItem, setOpenItem] = useState<string | null>(null);

  // Check if the current route belongs to any menu item
  useEffect(() => {
    menuItems.forEach((menuItem: any, index: number) => {
      menuItem.links.forEach((link: any) => {
        // Highlight if the pathname starts with the link's href
        if (pathname.startsWith(link.href)) {
          setOpenItem(`item-${index}`);
        }
      });
    });
  }, [pathname]);

  return (
    <nav>
      {isCollapsed ? (
        // Collapsed sidebar: use DropdownMenu
        <ul className="w-full px-[1rem] text-left">
          {menuItems.map((menuItem: any, index: number) => {
            const IconComponent = iconMap[menuItem.icon];

            return (
              <li key={index}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center text-xs p-2">
                      <IconComponent className="h-6 w-6" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56"
                    side="right"
                    align="start"
                    sideOffset={16}
                  >
                    <DropdownMenuGroup>
                      {menuItem.links.map((link: any, linkIndex: number) => {
                        const LinkIcon = iconMap[link.icon];

                        // Highlight the active link if the pathname starts with the link's href
                        const isActive = pathname.startsWith(link.href);

                        return (
                          <DropdownMenuItem
                            key={linkIndex}
                            asChild
                            className={isActive ? "bg-gray-200" : ""}
                          >
                            <Link
                              href={link.href}
                              className={`flex items-center ${
                                isActive ? "text-blue-600" : ""
                              }`}
                            >
                              <LinkIcon className="h-4 w-4 mr-2" />
                              <span>{link.label}</span>
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuGroup>
                    {index < menuItems.length - 1 && <DropdownMenuSeparator />}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            );
          })}
        </ul>
      ) : (
        // Expanded sidebar: use Accordion
        <Accordion
          type="single"
          collapsible
          value={openItem as string}
          onValueChange={(value) => setOpenItem(value)}
          className="w-full px-[1rem] text-left"
        >
          {menuItems.map((menuItem: any, index: number) => {
            const IconComponent = iconMap[menuItem.icon];

            return (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="flex items-center text-xs hover:no-underline">
                  <IconComponent className="h-6 w-6 mr-2" />
                  <span className="ml-3 text-left w-full block">
                    {menuItem.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="pl-4 flex flex-col gap-y-4">
                    {menuItem.links.map((link: any, linkIndex: number) => {
                      const LinkIcon = iconMap[link.icon];
                      // Highlight the active link if the pathname starts with the link's href
                      const isActive = pathname.startsWith(link.href);

                      return (
                        <li
                          key={linkIndex}
                          className={link.indent ? "pl-[2rem]" : ""}
                        >
                          <Link
                            href={link.href}
                            className={`flex items-start ${
                              isActive ? "text-blue-600" : ""
                            }`}
                          >
                            <LinkIcon className="h-4 w-4 mr-2" />
                            <span className="text-xs">{link.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </nav>
  );
};

export default SidebarNavigation;
