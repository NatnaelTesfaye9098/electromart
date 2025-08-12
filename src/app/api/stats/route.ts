import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [products, brands, categories] = await Promise.all([
      prisma.product.count(),
      prisma.brand.count(),
      prisma.category.count(),
    ]);

    return NextResponse.json({ products, brands, categories });
  } catch (error) {
    console.error("GET /api/stats error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


