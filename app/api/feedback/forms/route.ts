import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { title, description, businessId, organizationId } =
      await request.json();

    if (!title || !businessId || !organizationId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const feedbackForm = await prisma.feedbackForm.create({
      data: {
        title,
        description,
        businessId,
        organizationId,
      },
    });

    return NextResponse.json({ feedbackForm }, { status: 201 });
  } catch (error) {
    console.error("Error creating feedback form:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const feedbackForms = await prisma.feedbackForm.findMany({
      include: {
        business: true,
      },
    });

    return NextResponse.json({ feedbackForms }, { status: 200 });
  } catch (error) {
    console.error("Error fetching feedback forms:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
