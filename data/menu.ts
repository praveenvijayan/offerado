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
export const menuItems = [
  {
    title: "Campaigns",
    icon: Megaphone,
    isActive: true,
    items: [
      {
        title: "All Campaigns",
        url: "/campaigns",
        icon: "Package2",
      },
      {
        title: "Poll",
        url: "/polls",
        icon: "ChartColumn",
        indent: true,
      },
      {
        title: "Quiz",
        url: "/quiz",
        icon: "BookMarked",
        indent: true,
      },
      {
        title: "Contest",
        url: "/contest",
        icon: "LoaderPinwheel",
        indent: true,
      },
      {
        title: "Feedback",
        url: "/feedback",
        icon: "ClipboardType",
        indent: true,
      },
      {
        title: "Scheduled Campaign",
        url: "/scheduled-offers",
        icon: "Calendar",
      },
      {
        title: "Target Audience Distribution",
        url: "/target-audience-distribution",
        icon: "Target",
      },
      {
        title: "Sponsored Promotions",
        url: "/sponsored-promotions",
        icon: "Megaphone",
      },
      {
        title: "Coupon management",
        url: "/loyalty-programs",
        icon: "TicketPercent",
      },
    ],
  },
  {
    title: "Analytics",
    icon: BarChart2,
    items: [
      {
        title: "Performance Tracking",
        url: "/performance-tracking",
        icon: "BarChart2",
      },
      {
        title: "Predictive Sales Analysis",
        url: "/predictive-sales-analysis",
        icon: "TrendingUp",
      },
      {
        title: "Comprehensive Reporting",
        url: "/comprehensive-reports",
        icon: "ClipboardList",
      },
    ],
  },
  {
    title: "Marketing",
    icon: MessageCircleWarning,
    items: [
      {
        title: "Omni-Channel Distribution",
        url: "/omni-channel-distribution",
        icon: "Monitor",
      },
      {
        title: "PDF & QR Code Generator",
        url: "/qr-code-generator",
        icon: "QrCode",
      },
      {
        title: "Push Notifications & SMS",
        url: "/push-notifications-sms",
        icon: "Clock",
      },
    ],
  },
  {
    title: "Subscriptions",
    icon: DollarSign,
    items: [
      {
        title: "Subscription & Billing Management",
        url: "/subscription-billing-management",
        icon: "ClipboardList",
      },
    ],
  },
  {
    title: "Product Management",
    icon: Box,
    items: [
      {
        title: "Products",
        url: "/products",
        icon: "ShoppingCart",
      },
      {
        title: "Import Products",
        url: "/products/import",
        icon: "CloudDownload",
      },
      {
        title: "Media library",
        url: "/media",
        icon: "Image",
      },
      {
        title: "AI-Powered Suggestions",
        url: "/ai-powered-suggestions",
        icon: "Brain",
      },
    ],
  },
  {
    title: "Contacts",
    icon: SquareUser,
    items: [
      {
        title: "Contact management",
        url: "/master-data-upload",
        icon: "BookA",
      },
      {
        title: "Import",
        url: "/custom-platform-integrations",
        icon: "BookDown",
      },
    ],
  },
  {
    title: "Integrations",
    icon: Blocks,
    items: [
      {
        title: "Platform Integrations",
        url: "/social-media",
        icon: "Plug2",
      },
    ],
  },
  {
    title: "Admin Management",
    icon: FileSliders,
    items: [
      {
        title: "Domain Linking",
        url: "/master-data-upload",
        icon: "Globe",
      },
      {
        title: "User Management",
        url: "/custom-platform-integrations",
        icon: "UserCog",
      },
      {
        title: "Role Management",
        url: "/custom-platform-integrations",
        icon: "Users",
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    items: [
      {
        title: "User Profile",
        url: "/user-profile",
        icon: "Users",
      },
      {
        title: "Business",
        url: "/business",
        icon: "BriefcaseBusiness",
      },
    ],
  },
];
