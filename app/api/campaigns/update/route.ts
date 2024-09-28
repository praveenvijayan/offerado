import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import template from "@/data/template.json";

export async function PUT(request: any) {
  try {
    // Parse the request body to get the updated campaign data
    const updatedCampaign = await request.json();
    const { id } = updatedCampaign;

    // Validate if id (offerId) is provided
    if (!id) {
      return NextResponse.json(
        { error: "Campaign ID is required" },
        { status: 400 }
      );
    }

    // Update the offer with the specified id
    const updatedOffer = await prisma.offer.update({
      where: { id },
      data: {
        title: updatedCampaign.title,
        description: updatedCampaign.description,
        offerType: updatedCampaign.offerType,
        businessId: updatedCampaign.businessId,
        startAt: updatedCampaign.startAt,
        endAt: updatedCampaign.endAt,
        qrCode: updatedCampaign.qrCode,
        organizationId: updatedCampaign.organizationId,
        offerJSON: updatedCampaign.offerJSON,
        interactiveType: updatedCampaign.interactiveType || null,
        isActive: updatedCampaign.isActive || false,
        templateId: updatedCampaign.templateId || null,
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
