import * as React from "react";
import { ChevronsUpDown, Plus, Check } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import useOrganizationStore from "@/stores/organization";
import NewBusiness from "@/components/authenticated/new-business";
import { useSetBusinessAsDefault } from "@/hooks/use-set-business-as-default";
import { getOrganizationByEmail } from "@/services/organization-service";
import type { Business } from "@prisma/client";

export function TeamSwitcher() {
  const { isMobile } = useSidebar();
  const [isNoBusinessDialogOpen, setNoBusinessDialogOpen] = useState(false);
  const { handleSetAsDefault } = useSetBusinessAsDefault();
  const { user } = useUser();
  const { organization, setOrganization } = useOrganizationStore();
  const email = user?.primaryEmailAddress?.emailAddress;

  const {
    data: fetchedOrganization,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["organization", email],
    queryFn: () => getOrganizationByEmail(email as string),
    enabled: !!email,
  });

  const [currentBusiness, setCurrentBusiness] = useState<Business | null>(null);

  useEffect(() => {
    if (fetchedOrganization) {
      setOrganization(fetchedOrganization);
      setNoBusinessDialogOpen(fetchedOrganization.businesses?.length === 0);
    }
  }, [fetchedOrganization, setOrganization]);

  useEffect(() => {
    if (organization) {
      const defaultBusiness =
        organization.businesses?.find((business) => business.isDefault) ||
        organization.businesses?.[0];
      setCurrentBusiness(defaultBusiness || null);
    }
  }, [organization]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching organization</p>;

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Avatar>
                    {currentBusiness?.logo ? (
                      <AvatarImage
                        src={currentBusiness.logo}
                        alt={currentBusiness.name}
                        className="rounded-lg"
                      />
                    ) : (
                      <AvatarFallback className="bg-slate-500 inline-flex mt-1 ml-1 rounded-sm size-8">
                        {currentBusiness?.name[0]}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {currentBusiness?.name || "Business Name"}
                  </span>
                  <span className="truncate text-xs">
                    {organization?.name || "Organization Name"}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Businesses
              </DropdownMenuLabel>
              {organization?.businesses?.map((business: Business, index) => (
                <DropdownMenuItem
                  key={business.id}
                  onClick={() => {
                    handleSetAsDefault(business.id, organization?.id);
                    setCurrentBusiness(business);
                  }}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <Avatar>
                      {business.logo ? (
                        <AvatarImage src={business.logo} alt={business.name} />
                      ) : (
                        <AvatarFallback className="bg-slate-500 inline-flex mt-2 ml-2 rounded-sm size-6">
                          {currentBusiness?.name[0]}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                  <span className="flex-1">{business.name}</span>
                  {business.isDefault && (
                    <Check className="ml-auto h-4 w-4 text-green-500" />
                  )}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2 p-2"
                onClick={() => setNoBusinessDialogOpen(true)}
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  Add business
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <NewBusiness
        open={isNoBusinessDialogOpen}
        setOpen={setNoBusinessDialogOpen}
      />
    </>
  );
}
