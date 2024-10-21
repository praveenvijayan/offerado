import { del } from "@vercel/blob";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const urlToDelete = searchParams.get("url") as string;

  if (!urlToDelete) {
    return NextResponse.json({ message: "No URL provided" }, { status: 400 });
  }

  try {
    // Delete the blob from Vercel storage
    await del(urlToDelete);

    // Delete the image record from the database
    await prisma.media.deleteMany({
      where: {
        url: urlToDelete,
      },
    });

    return NextResponse.json({
      message: "Blob and database entry deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blob or database entry:", error);
    return NextResponse.json(
      { message: "Failed to delete blob or database entry" },
      { status: 500 }
    );
  }
}
