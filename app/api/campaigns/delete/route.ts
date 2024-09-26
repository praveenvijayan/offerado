import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust this import path based on your project's structure

export async function DELETE(request: Request) {
  try {
    // Parse the request body to get the offer ID
    const { offerId } = await request.json();

    // Validate if offerId is provided
    if (!offerId) {
      return NextResponse.json(
        { error: "Offer ID is required" },
        { status: 400 }
      );
    }

    // Delete the offer with the specified ID
    const deletedOffer = await prisma.offer.delete({
      where: { id: offerId },
    });

    // Return the deleted offer as a response
    return NextResponse.json(deletedOffer, { status: 200 });
  } catch (error) {
    console.error("Error deleting offer:", error);
    return NextResponse.json(
      { message: "Failed to delete offer", error: String(error) },
      { status: 500 }
    );
  }
}
