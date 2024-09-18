// app/api/business-create/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // Parse the body to get business details
    const body = await req.json();
    const {
      name,
      description,
      logo,
      email,
      address,
      phone,
      country,
      currency,
      organizationId,
      location,
    } = body;

    // Validate required fields
    if (!name || !organizationId) {
      return NextResponse.json(
        { success: false, error: "Name and organizationId are required" },
        { status: 400 }
      );
    }

    // Prepare the location data (create a new location if provided)
    let locationData = null;
    if (location) {
      locationData = {
        create: {
          latitude: location.lat,
          longitude: location.lng,
          address: address,
        },
      };
    }

    // Create the business record with the organizationId and location
    const business = await prisma.business.create({
      data: {
        name,
        description,
        logo,
        email,
        address,
        phone,
        country,
        currency,
        organization: {
          connect: {
            id: organizationId,
          },
        },
        ...(locationData && { location: locationData }),
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, business }, { status: 201 });
  } catch (error) {
    console.error("Error creating business:", error);
    return NextResponse.json(
      { success: false, error: "Business creation failed" },
      { status: 500 }
    );
  }
}
