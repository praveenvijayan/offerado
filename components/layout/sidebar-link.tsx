import Link from "next/link";
import { LucideIcon } from "lucide-react";

export const SidebarLink = ({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
}) => (
  <Link
    href={href}
    className="flex items-center gap-3 px-3 py-2 text-muted-foreground rounded-lg text-xs"
  >
    <Icon className="h-4 w-4" />
    {label}
  </Link>
);
