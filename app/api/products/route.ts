import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { withOrganizationAndBusiness } from "@/lib/with-organization-and-business";
import { NextRequestWithOrgAndBusiness } from "@/types/globals";

async function handler(request: NextRequestWithOrgAndBusiness) {
  try {
    const { organizationId, businessId } = request;

    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        businessId: businessId,
        organizationId: organizationId,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export const GET = withOrganizationAndBusiness(handler);
