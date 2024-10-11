import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronUp, PlusCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import useSidebarStore from "@/stores/store";
import { useQuery } from "@tanstack/react-query";
import { getOrganizationByEmail } from "@/services/organization-service";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import useOrganizationStore from "@/stores/organization";
import NoBusiness from "./no-business";
import type { Business } from "@prisma/client";

// BusinessSelection Component
export function BusinessSelection() {
  const { isCollapsed } = useSidebarStore();
  const { user } = useUser();
  const { organization, setOrganization } = useOrganizationStore();
  const [isNoBusinessDialogOpen, setNoBusinessDialogOpen] = useState(false);

  const email = user?.primaryEmailAddress?.emailAddress;

  // Fetch organization by email using React Query
  const {
    data: fetchedOrganization,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["organization", email],
    queryFn: () => getOrganizationByEmail(email as string),
    enabled: !!email, // Only fetch if email is available
  });

  // Set organization in Zustand store and handle no businesses scenario
  useEffect(() => {
    if (fetchedOrganization) {
      setOrganization(fetchedOrganization); // Store fetched organization in Zustand
      setNoBusinessDialogOpen(fetchedOrganization.businesses?.length === 0);
    }
  }, [fetchedOrganization, setOrganization]);

  // Handle loading and error states
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching organization</p>;

  return (
    <>
      {organization?.businesses?.length ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <div>
                    <p className="font-medium">
                      {organization?.name || "Business Name"}
                    </p>
                  </div>
                )}
              </div>
              <ChevronUp />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-64">
            <DropdownMenuGroup>
              {organization.businesses.map((business: Business) => (
                <DropdownMenuItem
                  key={business.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-4 py-4">
                    <Avatar>
                      <AvatarImage
                        src={business.logo || "https://github.com/shadcn.png"}
                      />
                      <AvatarFallback>{business.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{business.name}</p>
                      <p className="text-xs text-gray-500">Business Admin</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>

            <DropdownMenuGroup>
              <Link href="/business/create">
                <DropdownMenuItem className="flex items-center space-x-2 py-4">
                  <PlusCircle className="mr-2" />
                  Create a business
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <NoBusiness
          open={isNoBusinessDialogOpen}
          setOpen={setNoBusinessDialogOpen}
        />
      )}
    </>
  );
}
