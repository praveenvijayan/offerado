import { Button } from "@/components/ui/button";
import { Bell, CircleUser, Search, Menu, Sidebar, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/global/theme-comp";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Help from "../global/help";
import { CampaignCreateButton } from "../campaigns/campaign-create-button";
import { useSidebar } from "@/components/ui/sidebar";

export const Header = () => (
  <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
    <MobileMenu />
    <SearchBar />
    <CampaignCreateButton />
    <ModeToggle />
    <NotificationButton />
    <Help />
    {/* <UserMenu />
     */}
    <SignedIn>
      <UserButton />
    </SignedIn>
    <SignedOut>
      <SignInButton />
    </SignedOut>
  </header>
);

// Search Bar Component
const SearchBar = () => (
  <div className="w-full flex-1">
    <form>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
        />
      </div>
    </form>
  </div>
);

// Notification Button
const NotificationButton = () => (
  <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
    <Bell className="h-4 w-4" />
    <span className="sr-only">Toggle notifications</span>
  </Button>
);

// User Menu Component
const UserMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="secondary" size="icon" className="rounded-full">
        <CircleUser className="h-5 w-5" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuItem>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

// Mobile Menu Component
const MobileMenu = () => {
  const { setOpenMobile } = useSidebar();

  return (
    <Button
      variant="outline"
      size="icon"
      className="md:hidden"
      onClick={() => setOpenMobile(true)}
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">Open mobile menu</span>
    </Button>
  );
};
