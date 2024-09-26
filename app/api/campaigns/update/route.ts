import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Define the route handler for PUT requests
export async function PUT(request: Request) {
  try {
    // Parse the request body to get the updated data
    const { offerId, templateId, isActive } = await request.json();

    // Validate if offerId is provided
    if (!offerId) {
      return NextResponse.json(
        { error: "offerId is required" },
        { status: 400 }
      );
    }

    // Update the offer with the specified offerId
    const updatedOffer = await prisma.offer.update({
      where: { id: offerId },
      data: {
        templateId,
        isActive,
      },
    });

    // Return the updated offer in the response
    return NextResponse.json(updatedOffer, { status: 200 });
  } catch (error) {
    console.error("Error updating offer:", error);
    return NextResponse.json(
      { error: "Failed to update offer" },
      { status: 500 }
    );
  }
}
