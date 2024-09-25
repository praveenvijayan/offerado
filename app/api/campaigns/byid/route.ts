import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"; // Adjust the path to your prisma instance
const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Offer ID is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch offer by ID from the database
    const offer = await prisma.offer.findUnique({
      where: {
        id: id,
      },
    });

    if (!offer) {
      return NextResponse.json({ message: "Offer not found" }, { status: 404 });
    }

    // Return the offer in the response
    return NextResponse.json(offer);
  } catch (error) {
    console.error("Error fetching offer:", error);
    return NextResponse.json(
      { message: "Failed to fetch offer", error: String(error) },
      { status: 500 }
    );
  }
}
