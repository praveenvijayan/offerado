import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { content, feedbackFormId, userId } = await request.json();

    if (!content || !feedbackFormId || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const feedbackResponse = await prisma.feedbackResponse.create({
      data: {
        content,
        feedbackFormId,
        userId,
      },
    });

    return NextResponse.json({ feedbackResponse }, { status: 201 });
  } catch (error) {
    console.error("Error creating feedback response:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
