import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Product } from "@prisma/client";
import type { Product as ProductInput } from "@prisma/client";
import { NextRequestWithOrgAndBusiness } from "@/types/globals";
import { withOrganizationAndBusiness } from "@/lib/with-organization-and-business";

// POST API to upload products in bulk
async function handler(request: NextRequest & NextRequestWithOrgAndBusiness) {
  try {
    const products: ProductInput[] = await request.json();

    // Validate and format data before saving
    const formattedProducts = products.map((product) => ({
      sku: product.sku,
      name: product.name,
      category: product.category,
      mrp: product.mrp,
      offerPrice: product.offerPrice,
      quantity: product.quantity,
      image: product.image,
      unit: product.unit,
      discountType: product.discountType,
      businessId: request.businessId,
      organizationId: request.organizationId,
    }));

    // Use Prisma to create multiple products in bulk
    const createdProducts = await prisma.product.createMany({
      data: formattedProducts,
    });

    return NextResponse.json({
      message: `${createdProducts.count} products uploaded successfully`,
    });
  } catch (error) {
    console.error("Error uploading products:", error);
    return NextResponse.json(
      { error: "Failed to upload products", details: error },
      { status: 500 }
    );
  }
}

export const POST = withOrganizationAndBusiness(handler);
