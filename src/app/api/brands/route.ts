import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json({ items: brands });
  } catch (error) {
    console.error("GET /api/brands error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


