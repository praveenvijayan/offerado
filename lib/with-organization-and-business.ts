// lib/withOrganizationAndBusiness.ts

import { NextRequest, NextResponse } from "next/server";
import { NextRequestWithOrgAndBusiness } from "@/types/globals";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export function withOrganizationAndBusiness(
  handler: (
    request: NextRequest & NextRequestWithOrgAndBusiness
  ) => Promise<Response>
) {
  return async function (request: NextRequest) {
    try {
      const { userId } = auth();
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const user = await prisma.user.findUnique({
        where: { clerkUserId: userId },
        include: {
          organization: {
            include: {
              businesses: {
                where: { isDefault: true },
              },
            },
          },
        },
      });

      if (
        !user ||
        !user.organization ||
        user.organization.businesses.length === 0
      ) {
        return NextResponse.json(
          { error: "No organization or default business found" },
          { status: 404 }
        );
      }

      const { id: organizationId } = user.organization;
      const { id: businessId } = user.organization.businesses[0];

      // Augment the existing request object
      (request as any).organizationId = organizationId;
      (request as any).businessId = businessId;

      // Call the actual handler
      return handler(
        request as NextRequest & { organizationId: string; businessId: string }
      );
    } catch (error) {
      console.error("Error in decorator:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
}
