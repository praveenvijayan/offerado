// app/api/media/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, MediaType } from "@prisma/client";
import { put } from "@vercel/blob";
import { withOrganizationAndBusiness } from "@/lib/with-organization-and-business";

const prisma = new PrismaClient();

async function handler(
  request: NextRequest & { organizationId: string; businessId: string }
): Promise<Response> {
  try {
    const formData = await request.formData();
    if (!formData) {
      return NextResponse.json(
        { success: false, error: "No form data" },
        { status: 400 }
      );
    }
    // Get all uploaded files
    const files = formData.getAll("files[]") as File[];
    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: "No files uploaded" },
        { status: 400 }
      );
    }

    const mediaRecords = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Vercel Blob Storage
        const blob = await put(file.name, buffer, {
          access: "public",
          contentType: file.type,
        });

        // Create the Media record in the database
        return prisma.media.create({
          data: {
            url: blob.url,
            type: "IMAGE",
            name: file.name,
            organizationId: request.organizationId,
            businessId: request.businessId,
          },
        });
      })
    );

    return NextResponse.json({ success: true, media: mediaRecords });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export const POST = withOrganizationAndBusiness(handler);
