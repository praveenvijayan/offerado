import Link from "next/link";
import { Settings2, Package, ChevronLeft, ChevronRight } from "lucide-react";
import useSidebarStore from "@/stores/store";

export const LogoOrganization = () => {
  const { isCollapsed, toggleSidebar } = useSidebarStore();

  return (
    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 justify-between">
      <Link
        href="/organizations"
        className="flex items-center gap-2 font-semibold"
      >
        <Package className="h-4 w-4" />
        {!isCollapsed && <span className="">Acme Inc</span>}
      </Link>
      {!isCollapsed && (
        <Link href="/organizations">
          <Settings2 />
        </Link>
      )}
    </div>
  );
};
