import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { withOrganizationAndBusiness } from "@/lib/with-organization-and-business";
import { NextRequestWithOrgAndBusiness } from "@/types/globals";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Destructure the body to extract offer details
    const {
      title,
      description,
      offerType,
      businessId,
      startAt,
      endAt,
      qrCode,
      organizationId,
      interactiveType,
      offerJSON,
      templateLiteral,
    } = body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !offerType ||
      !businessId ||
      !startAt ||
      !endAt ||
      !organizationId ||
      !offerJSON ||
      !templateLiteral
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new offer in the database
    const newOffer = await prisma.offer.create({
      data: {
        title,
        description,
        offerType,
        businessId,
        startAt: new Date(startAt),
        endAt: new Date(endAt),
        qrCode: qrCode ?? null,
        organizationId,
        interactiveType: interactiveType ?? null,
        offerJSON: offerJSON || {},
        isActive: false,
        templateLiteral: templateLiteral || {},
      },
    });

    return NextResponse.json(newOffer, { status: 201 });
  } catch (error: any) {
    console.error("Error creating offer:", error);
    return NextResponse.json(
      { error: "Failed to create offer" },
      { status: 500 }
    );
  }
}

async function handler(request: NextRequestWithOrgAndBusiness) {
  try {
    const { organizationId, businessId } = request;

    const campaigns = await prisma.offer.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        businessId: businessId,
        organizationId: organizationId,
      },
    });

    return NextResponse.json(campaigns);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json(
      { error: "Failed to fetch campaigns" },
      { status: 500 }
    );
  }
}

export const GET = withOrganizationAndBusiness(handler);
