// app/api/products/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch all products from the database
    const products = await prisma.product.findMany();

    // Return the products as a JSON response
    return NextResponse.json(products);
  } catch (error) {
    // Handle any errors
    console.log(error);
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
  }
}
