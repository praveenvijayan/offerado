import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SidebarLink } from "@/components/layout/sidebar-link";
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
} from "lucide-react";
import Link from "next/link";
import { Settings2, Package } from "lucide-react";
import { QuestionMarkIcon } from "@radix-ui/react-icons";

export const Sidebar = () => {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2 ">
        <LogoAndNotifications />
        <nav>
          <Accordion
            type="single"
            collapsible
            className="w-full px-[1rem] text-left"
          >
            {/* Campaign and Promotion Management */}
            <AccordionItem value="campaign-management">
              <AccordionTrigger className="text-xs">
                <Megaphone className="h-4 w-4 mr-2" />
                <div className="text-left w-full">
                  Campaign and Promotion Management
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <SidebarLink
                  href="/offers"
                  label="All Campaign"
                  icon={Package2}
                />
                <div className="pl-[2rem]">
                  <SidebarLink
                    href="/offers/create"
                    label="Poll"
                    icon={ChartColumn}
                  />
                  <SidebarLink
                    href="/offers/create"
                    label="Quiz"
                    icon={BookMarked}
                  />
                  <SidebarLink
                    href="/offers/create"
                    label="Contest"
                    icon={LoaderPinwheel}
                  />
                  <SidebarLink
                    href="/offers/create"
                    label="Feedback"
                    icon={ClipboardType}
                  />
                </div>
                <SidebarLink
                  href="/scheduled-offers"
                  label="Scheduled Campaign"
                  icon={Calendar}
                />
                <SidebarLink
                  href="/target-audience-distribution"
                  label="Target Audience Distribution"
                  icon={Target}
                />
                <SidebarLink
                  href="/sponsored-promotions"
                  label="Sponsored Promotions"
                  icon={Megaphone}
                />
                <SidebarLink
                  href="/loyalty-programs"
                  label="Coupon management"
                  icon={TicketPercent}
                />
              </AccordionContent>
            </AccordionItem>

            {/* Analytics and Reporting */}
            <AccordionItem value="analytics-reporting">
              <AccordionTrigger className="text-xs">
                <BarChart2 className="h-4 w-4 mr-2" />
                <div className="text-left w-full">Analytics and Reporting</div>
              </AccordionTrigger>
              <AccordionContent>
                <SidebarLink
                  href="/performance-tracking"
                  label="Performance Tracking"
                  icon={BarChart2}
                />
                <SidebarLink
                  href="/predictive-sales-analysis"
                  label="Predictive Sales Analysis"
                  icon={TrendingUp}
                />
                <SidebarLink
                  href="/comprehensive-reports"
                  label="Comprehensive Reporting"
                  icon={ClipboardList}
                />
              </AccordionContent>
            </AccordionItem>

            {/* Marketing Tools */}
            <AccordionItem value="marketing-tools">
              <AccordionTrigger className="text-xs">
                <MessageCircleWarning className="h-4 w-4 mr-2" />
                <div className="text-left w-full">
                  Marketing and Distribution Tools
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <SidebarLink
                  href="/omni-channel-distribution"
                  label="Omni-Channel Distribution"
                  icon={Monitor}
                />
                <SidebarLink
                  href="/qr-code-generator"
                  label="PDF & QR Code Generator"
                  icon={QrCode}
                />
                <SidebarLink
                  href="/push-notifications-sms"
                  label="Push Notifications & SMS"
                  icon={Clock}
                />
              </AccordionContent>
            </AccordionItem>

            {/* Billing and Payments */}
            <AccordionItem value="billing-payments">
              <AccordionTrigger className="text-xs">
                <DollarSign className="h-4 w-4 mr-2" />
                <div className="text-left w-full">Billing and Payments</div>
              </AccordionTrigger>
              <AccordionContent>
                <SidebarLink
                  href="/subscription-billing-management"
                  label="Subscription & Billing Management"
                  icon={ClipboardList}
                />
              </AccordionContent>
            </AccordionItem>

            {/* Product management */}
            <AccordionItem value="product-management">
              <AccordionTrigger className="text-xs">
                <FileText className="h-4 w-4 mr-2" />
                <div className="text-left w-full">Products Management</div>
              </AccordionTrigger>
              <AccordionContent>
                <SidebarLink
                  href="/products"
                  label="Products"
                  icon={ShoppingCart}
                />
                <SidebarLink
                  href="/custom-platform-integrations"
                  label="Import Products"
                  icon={CloudDownload}
                />
                <SidebarLink
                  href="/ai-powered-suggestions"
                  label="AI-Powered Suggestions"
                  icon={Brain}
                />
              </AccordionContent>
            </AccordionItem>

            {/* Customer management */}
            <AccordionItem value="customer-management">
              <AccordionTrigger className="text-xs">
                <SquareUser className="h-4 w-4 mr-2" />
                <div className="text-left w-full">Contacts</div>
              </AccordionTrigger>
              <AccordionContent>
                <SidebarLink
                  href="/master-data-upload"
                  label="Contact management"
                  icon={BookA}
                />
                <SidebarLink
                  href="/custom-platform-integrations"
                  label="Import"
                  icon={BookDown}
                />
              </AccordionContent>
            </AccordionItem>

            {/* Data Management */}
            <AccordionItem value="data-management">
              <AccordionTrigger className="text-xs">
                <Blocks className="h-4 w-4 mr-2" />
                <div className="text-left w-full">Integrations</div>
              </AccordionTrigger>
              <AccordionContent>
                <SidebarLink
                  href="/social-media"
                  label="Platform Integrations"
                  icon={Plug2}
                />
              </AccordionContent>
            </AccordionItem>

            {/* Super Admin */}
            <AccordionItem value="super-admin-management">
              <AccordionTrigger className="text-xs">
                <FileSliders className="h-4 w-4 mr-2" />
                <div className="text-left w-full">Admin Management</div>
              </AccordionTrigger>
              <AccordionContent>
                <SidebarLink
                  href="/master-data-upload"
                  label="Domain Linking"
                  icon={Globe}
                />
                <SidebarLink
                  href="/custom-platform-integrations"
                  label="User Management"
                  icon={UserCog}
                />
                <SidebarLink
                  href="/custom-platform-integrations"
                  label="Role Management"
                  icon={Users}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </nav>
      </div>
    </div>
  );
};

// Logo and Notifications
const LogoAndNotifications = () => (
  <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 justify-between">
    <Link href="/" className="flex items-center gap-2 font-semibold">
      <Package className="h-4 w-4" />
      <span className="">Acme Inc</span>
    </Link>
    <Link href="/organizations">
      <Settings2 />
    </Link>
  </div>
);
