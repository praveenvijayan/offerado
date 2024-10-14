// app/api/organization/by-email/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // The Prisma client

// Handler to get organization by email from the POST body
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Fetch the organization by email
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
      include: {
        businesses: true,
      },
    });

    if (!organization) {
      return NextResponse.json(
        { error: "Organization not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(organization, { status: 200 });
  } catch (error) {
    console.error("Error fetching organization:", error);
    return NextResponse.json(
      { error: "Failed to fetch organization" },
      { status: 500 }
    );
  }
}
