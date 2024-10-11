import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const businessData = await request.json();

    // Validate that required fields are present
    if (!businessData.name || !businessData.organizationId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the business and connect to the organization in one step
    const newBusiness = await prisma.business.create({
      data: {
        name: businessData.name,
        description: businessData.description,
        logo: businessData.logo,
        email: businessData.email,
        address: businessData.address,
        phone: businessData.phone,
        country: businessData.country,
        currency: businessData.currency,
        location: businessData.location,
        // Connect to the organization using the ID
        organization: {
          connect: { id: businessData.organizationId },
        },
        // Add other fields here as needed
      },
      include: {
        organization: true,
      },
    });

    return NextResponse.json(newBusiness);
  } catch (error) {
    console.error("Error creating business:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
