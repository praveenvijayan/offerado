import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

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

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch the organization and default business for the user
    const userWithOrganizationAndBusiness = await prisma.user.findUnique({
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

    // Ensure we got an organization and a business
    if (
      !userWithOrganizationAndBusiness ||
      !userWithOrganizationAndBusiness.organization ||
      userWithOrganizationAndBusiness.organization.businesses.length === 0
    ) {
      return NextResponse.json(
        { error: "No organization or default business found" },
        { status: 404 }
      );
    }

    // Extract organizationId and default businessId
    const { id: organizationId } = userWithOrganizationAndBusiness.organization;
    const { id: businessId } =
      userWithOrganizationAndBusiness.organization.businesses[0];

    console.log("organizationId:", organizationId, "businessId:", businessId);

    // Fetch all campaigns from the database
    const campaigns = await prisma.offer.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        businessId: businessId,
        organizationId: organizationId,
      },
    });

    // Return the campaigns in the response
    return NextResponse.json(campaigns);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json(
      { message: "Failed to fetch campaigns", error: String(error) },
      { status: 500 }
    );
  }
}
