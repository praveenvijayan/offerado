import { ReactNode } from "react";
import Link from "next/link";
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
  Package2,
  QrCode,
  Search,
  Settings2,
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
import Image from "next/image";
import { ModeToggle } from "@/components/global/theme-comp";
import { MagicWandIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function LoginLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2 ">
            {/* Logo and Notifications */}
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 justify-between">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Package className="h-4 w-4" />
                <span className="">Acme Inc</span>
              </Link>
              <Link href="/organizations">
                <Settings2 />
              </Link>
            </div>

            {/* Sidebar Navigation */}
            <nav>
              <Accordion
                type="single"
                collapsible
                className="w-full px-[1rem] text-left"
              >
                {/* Offer Creation and Management */}
                <AccordionItem value="offer-management">
                  <AccordionTrigger className="text-xs">
                    <Package className="h-4 w-4 mr-2" />{" "}
                    <div className="text-left w-full">
                      Offer Creation and Management
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Link
                      href="/offers"
                      className="flex items-center gap-3 px-3 py-2 text-muted-foreground rounded-lg text-xs"
                    >
                      <Package2 className="h-4 w-4" /> All Offer
                    </Link>
                    <Link
                      href="/offers/create"
                      className="flex items-center gap-3 px-3 py-2 text-muted-foreground rounded-lg text-xs"
                    >
                      <Package className="h-4 w-4" /> Create New Offer
                    </Link>
                    {/* <Link
                      href="/bulk-edit-offers"
                      className="flex items-center gap-3 px-3 py-2 text-muted-foreground rounded-lg text-xs"
                    >
                      <ClipboardList className="h-4 w-4" /> Bulk Edit Offers
                    </Link> */}
                    <Link
                      href="/scheduled-offers"
                      className="flex items-center gap-3 px-3 py-2 text-muted-foreground rounded-lg text-xs"
                    >
                      <Calendar className="h-4 w-4" /> Scheduled Offers
                    </Link>
                    <Link
                      href="/real-time-offer-management"
                      className="flex items-center gap-3 px-3 py-2 text-muted-foreground rounded-lg text-xs"
                    >
                      <Monitor className="h-4 w-4" /> Real-Time Offer Management
                    </Link>
                    <Link
                      href="/ai-powered-suggestions"
                      className="flex items-center gap-3 px-3 py-2 text-muted-foreground rounded-lg text-xs"
                    >
                      <Brain className="h-4 w-4" /> AI-Powered Suggestions
                    </Link>
                    <Link
                      href="/inventory-sync"
                      className="flex items-center gap-3 px-3 py-2 text-muted-foreground rounded-lg text-xs"
                    >
                      <TrendingUp className="h-4 w-4" /> Inventory Sync
                    </Link>
                  </AccordionContent>
                </AccordionItem>

                {/* Campaign and Promotion Management */}
                <AccordionItem value="campaign-management">
                  <AccordionTrigger className="text-xs">
                    <Megaphone className="h-4 w-4 mr-2" />
                    <div className="text-left w-full">
                      {" "}
                      Campaign and Promotion Management
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Link
                      href="/target-audience-distribution"
                      className="flex items-center gap-3 px-3 py-2 text-muted-foreground rounded-lg text-xs"
                    >
                      <Target className="h-4 w-4" /> Target Audience
                      Distribution
                    </Link>
                    <Link
                      href="/sponsored-promotions"
                      className="flex items-center gap-3 px-3 py-2 text-muted-foreground rounded-lg text-xs"
                    >
                      <Megaphone className="h-4 w-4" /> Sponsored Promotions
                    </Link>
                    <Link
                      href="/loyalty-programs"
                      className="flex items-center gap-3 px-3 py-2 text-muted-foreground rounded-lg text-xs"
                    >
                      <DollarSign className="h-4 w-4" /> Loyalty Programs
                    </Link>
                    <Link
                      href="/offer-heatmaps"
                      className="flex items-center gap-3 px-3 py-2 text-muted-foreground rounded-lg text-xs"
                    >
                      <MapPin className="h-4 w-4" /> Offer Visualizations
                      (Heatmaps)
                    </Link>
                    <Link
                      href="/cross-selling-upselling-tools"
                      className="flex items-center gap-3 px-3 py-2 text-muted-foreground rounded-lg text-xs"
                    >
                      <ShoppingCart className="h-4 w-4" /> Cross-Selling &
                      Upselling Tools
                    </Link>
                  </AccordionContent>
                </AccordionItem>

                {/* Analytics and Reporting */}
                <AccordionItem value="analytics-reporting">
                  <AccordionTrigger className="text-xs">
                    <BarChart2 className="h-4 w-4 mr-2" />{" "}
                    <div className="text-left w-full">
                      {" "}
                      Analytics and Reporting
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Link
                      href="/performance-tracking"
                      className="flex items-center gap-3 px-3 py-2 text-muted-foreground rounded-lg text-xs"
                    >
                      <BarChart2 className="h-4 w-4" /> Performance Tracking
                    </Link>
                    <Link
                      href="/predictive-sales-analysis"
                      className="flex items-center gap-3 px-3 py-2 text-muted-foreground rounded-lg text-xs"
                    >
                      <TrendingUp className="h-4 w-4" /> Predictive Sales
                      Analysis
                    </Link>
                    <Link
                      href="/comprehensive-reports"
                      className="flex items-center gap-3 px-3 py-2 text-muted-foreground rounded-lg text-xs"
                    >
                      <ClipboardList className="h-4 w-4" /> Comprehensive
                      Reporting
                    </Link>
                  </AccordionContent>
                </AccordionItem>

                {/* Marketing Tools */}
                <AccordionItem value="marketing-tools">
                  <AccordionTrigger className="text-xs">
                    <MagicWandIcon className="h-4 w-4 mr-2" />{" "}
                    <div className="text-left w-full">
                      Marketing and Distribution Tools
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Link
                      href="/omni-channel-distribution"
                      className="flex items-center gap-3 px-3 py-2 text-muted-foreground rounded-lg text-xs"
                    >
                      <Monitor className="h-4 w-4" /> Omni-Channel Distribution
                    </Link>
                    <Link
                      href="/qr-code-generator"
                      className="flex items-center gap-3 px-3 py-2 text-muted-foreground rounded-lg text-xs"
                    >
                      <QrCode className="h-4 w-4" /> QR Code Generator
                    </Link>
                    <Link
                      href="/push-notifications-sms"
                      className="flex items-center gap-3 px-3 py-2 text-muted-foreground rounded-lg text-xs"
                    >
                      <Clock className="h-4 w-4" /> Push Notifications & SMS
                    </Link>
                  </AccordionContent>
                </AccordionItem>

                {/* Billing and Payments */}
                <AccordionItem value="billing-payments">
                  <AccordionTrigger className="text-xs">
                    <DollarSign className="h-4 w-4 mr-2" />{" "}
                    <div className="text-left w-full">Billing and Payments</div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Link
                      href="/client-billing-integration"
                      className="flex items-center gap-3 px-3 py-2 text-muted-foreground rounded-lg text-xs"
                    >
                      <DollarSign className="h-4 w-4" /> Client Billing Platform
                      Integration
                    </Link>
                    <Link
                      href="/subscription-billing-management"
                      className="flex items-center gap-3 px-3 py-2 text-muted-foreground rounded-lg text-xs"
                    >
                      <ClipboardList className="h-4 w-4" /> Subscription &
                      Billing Management
                    </Link>
                  </AccordionContent>
                </AccordionItem>

                {/* Data Management */}
                <AccordionItem value="data-management">
                  <AccordionTrigger className="text-xs">
                    <FileText className="h-4 w-4 mr-2" />{" "}
                    <div className="text-left w-full">
                      Data Management and Integrations
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Link
                      href="/master-data-upload"
                      className="flex items-center gap-3 px-3 py-2 text-muted-foreground rounded-lg text-xs"
                    >
                      <ClipboardList className="h-4 w-4" /> Master Data Upload
                    </Link>
                    <Link
                      href="/custom-platform-integrations"
                      className="flex items-center gap-3 px-3 py-2 text-muted-foreground rounded-lg text-xs"
                    >
                      <Layers className="h-4 w-4" /> Custom Platform
                      Integrations
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col">
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

            {/* Search */}
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

            <ModeToggle />
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
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
            </DropdownMenu>
          </header>

          {/* Main Content */}
          <main className="flex flex-1 flex-col p-4 lg:p-6">
            <ScrollArea>{children}</ScrollArea>
          </main>
        </div>
      </div>
    </section>
  );
}
