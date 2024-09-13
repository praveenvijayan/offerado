import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { role, userId } = await req.json(); // Get data from the request body

    // Update the user's public metadata with the role
    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        role,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to update user role",
    });
  }
}
