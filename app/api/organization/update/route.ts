// app/api/organization/update/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust the import path to your prisma instance

export async function POST(request: Request) {
  try {
    const { organizationId, businessId } = await request.json();

    if (!organizationId || !businessId) {
      return NextResponse.json(
        { error: "Missing organizationId or businessId" },
        { status: 400 }
      );
    }

    // Update the organization by connecting the business
    const updatedOrganization = await prisma.organization.update({
      where: { id: organizationId },
      data: {
        businesses: {
          connect: { id: businessId },
        },
      },
      include: {
        businesses: true,
      },
    });

    return NextResponse.json(updatedOrganization);
  } catch (error) {
    console.error("Error updating organization:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
