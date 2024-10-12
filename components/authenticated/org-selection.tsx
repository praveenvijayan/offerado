import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronUp, CircleCheck, PlusCircle } from "lucide-react";
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
import NewBusiness from "./new-business";
import { useSetBusinessAsDefault } from "@/hooks/use-set-business-as-default";

// BusinessSelection Component
export function BusinessSelection() {
  const { isCollapsed } = useSidebarStore();
  const { user } = useUser();
  const { organization, setOrganization } = useOrganizationStore();
  const [isNoBusinessDialogOpen, setNoBusinessDialogOpen] = useState(false);
  const { handleSetAsDefault, isPending } = useSetBusinessAsDefault();
  const email = user?.primaryEmailAddress?.emailAddress;

  // Fetch organization by email using React Query
  const {
    data: fetchedOrganization,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["organization", email],
    queryFn: () => getOrganizationByEmail(email as string),
    enabled: !!email,
  });

  // Set organization in Zustand store and handle no businesses scenario
  useEffect(() => {
    if (fetchedOrganization) {
      setOrganization(fetchedOrganization);
      setNoBusinessDialogOpen(fetchedOrganization.businesses?.length === 0);
    }
  }, [fetchedOrganization, setOrganization]);

  // Get the default or first business to display in the trigger
  const currentBusiness =
    organization?.businesses?.find((business) => business.isDefault) ||
    organization?.businesses?.[0];

  // Handle loading and error states
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching organization</p>;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage
                  src={currentBusiness?.logo || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>{currentBusiness?.name[0]}</AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div>
                  <p className="font-medium">
                    {currentBusiness?.name || "Business Name"}
                  </p>
                  <p className="font-normal text-muted-foreground text-xs">
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
            {organization?.businesses?.length &&
              organization.businesses.map((business: Business) => (
                <DropdownMenuItem
                  key={business.id}
                  className="flex justify-between items-center"
                  onClick={() =>
                    handleSetAsDefault(business.id, organization?.id)
                  }
                >
                  <div className="flex items-center gap-4 py-4 relative">
                    {business.isDefault ? (
                      <CircleCheck className="w-4 h-4 inline-block fill-green-600 mr-2 absolute left-6 top-4 z-10" />
                    ) : (
                      ""
                    )}
                    <Avatar className="">
                      <AvatarImage
                        src={business.logo || "https://github.com/shadcn.png"}
                      />
                      <AvatarFallback>{business.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{business.name} </p>
                      <p className="text-xs text-gray-500">Business Admin</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
          </DropdownMenuGroup>

          <DropdownMenuGroup>
            <DropdownMenuItem
              className="flex items-center space-x-2 py-4"
              onClick={() => {
                setNoBusinessDialogOpen(true);
              }}
            >
              <PlusCircle className="mr-2" />
              Create a business
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <NewBusiness
        open={isNoBusinessDialogOpen}
        setOpen={setNoBusinessDialogOpen}
      />
    </>
  );
}
