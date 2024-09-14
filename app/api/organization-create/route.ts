import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // Read the body once
    const { role, ownerId, name, email, image } = await req.json();

    if (!ownerId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Log the received data
    console.log("Received data:", { name, email, image });

    // Ensure the required fields are provided
    if (!name || !email) {
      return new NextResponse("Name and Email are required", { status: 400 });
    }

    // Check if the email is already in use
    const existingOrganization = await prisma.organization.findUnique({
      where: { email },
    });

    if (existingOrganization) {
      return new NextResponse("Email already in use", { status: 400 });
    }

    // Create the new organization
    const organization = await prisma.organization.create({
      data: {
        name,
        email,
        image: image || "",
        ownerId,
      },
    });

    return NextResponse.json(organization);
  } catch (error) {
    console.error("[ORGANIZATIONS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
