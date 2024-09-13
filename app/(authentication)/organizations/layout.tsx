import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  BarChart2,
  Bell,
  Brain,
  Calendar,
  CircleUser,
  Clipboard,
  ClipboardList,
  Clock,
  DollarSign,
  FileText,
  Home,
  Layers,
  LineChart,
  MapPin,
  Megaphone,
  Menu,
  Monitor,
  Package,
  QrCode,
  Search,
  ShoppingCart,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

interface LayoutProps {
  children: ReactNode;
}
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ModeToggle } from "@/components/global/theme-comp";
import { MagicWandIcon } from "@radix-ui/react-icons";
import Logo from "@/components/global/logo";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
export default function SingleLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden md:flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Logo />
          </Link>
        </div>
        {/* Main Content Area */}
        <main className="flex flex-col bg-gray-50 dark:bg-slate-900">
          {/* Header */}
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="flex flex-col gap-2">
                  {/* Similar to the sidebar nav links */}
                </nav>
              </SheetContent>
            </Sheet>
            <div className="w-full"> </div>
            <ModeToggle />
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
            {/* User Menu */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
            <SignedIn>
              {/* Mount the UserButton component */}
              <UserButton />
            </SignedIn>
            <SignedOut>
              {/* Signed out users get sign in button */}
              <SignInButton />
            </SignedOut>
          </header>
          {/* Main Content */}
          <main className="flex flex-1 flex-col p-4 lg:p-6">{children}</main>
        </main>
      </div>
    </section>
  );
}
