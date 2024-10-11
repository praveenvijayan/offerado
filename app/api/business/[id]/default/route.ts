import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const businessId = params.id;

  try {
    const body = await req.json();
    const { organizationId } = body;

    if (!organizationId) {
      return NextResponse.json(
        { message: "organizationId is required" },
        { status: 400 }
      );
    }

    // Check if the business belongs to the given organization
    const business = await prisma.business.findFirst({
      where: { id: businessId, organizationId },
    });

    if (!business) {
      return NextResponse.json(
        {
          message: "Business not found or does not belong to this organization",
        },
        { status: 404 }
      );
    }

    // Unset isDefault for all other businesses under the same organization
    await prisma.business.updateMany({
      data: { isDefault: false },
      where: { isDefault: true, organizationId },
    });

    // Set the new default business
    const updatedBusiness = await prisma.business.update({
      where: { id: businessId },
      data: { isDefault: true },
    });

    return NextResponse.json(
      { message: "Business set as default", updatedBusiness },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error setting business as default", error },
      { status: 500 }
    );
  }
}
