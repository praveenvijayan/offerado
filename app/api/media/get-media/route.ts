import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { withOrganizationAndBusiness } from "@/lib/with-organization-and-business";
import { NextRequestWithOrgAndBusiness } from "@/types/globals";

async function handler(request: NextRequest & NextRequestWithOrgAndBusiness) {
  try {
    const { organizationId, businessId, url } = request;
    const { searchParams } = new URL(url);
    const page = parseInt(searchParams.get("page") as string) || 1;
    const limit = parseInt(searchParams.get("limit") as string) || 10;
    const skip = (page - 1) * limit;

    console.log("page", page);

    const images = await prisma.media.findMany({
      skip,
      take: limit,
      where: {
        type: "IMAGE",
        isActive: true,
        businessId: businessId,
        organizationId: organizationId,
      },
    });

    const totalImages = await prisma.media.count();

    return new Response(
      JSON.stringify({
        images,
        totalImages,
        totalPages: Math.ceil(totalImages / limit),
      })
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}

export const GET = withOrganizationAndBusiness(handler);
