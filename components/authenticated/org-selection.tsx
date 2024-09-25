import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Building2, ChevronDown, ChevronUp, PlusCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import useSidebarStore from "@/stores/store";

export function BusinessSelection() {
  const { isCollapsed, toggleSidebar } = useSidebarStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {isCollapsed ? (
              ""
            ) : (
              <div>
                <p className="font-medium">Business Name</p>
                <p className="text-xs text-gray-500">Business Admin</p>
              </div>
            )}
          </div>
          <ChevronUp />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex justify-between items-center">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">New Business</p>
                  <p className="text-xs text-gray-500">Business Admin</p>
                </div>
              </div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <Link href={"/business/create"}>
            <DropdownMenuItem className="flex items-center space-x-2 py-4">
              <PlusCircle className="mr-2" />
              Create a business
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
