import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Math.min(Number(searchParams.get("limit") ?? 12), 50);
    const brandId = searchParams.get("brandId") ?? undefined;
    const categoryId = searchParams.get("categoryId") ?? undefined;
    const search = searchParams.get("search") ?? undefined;

    const where = {
      ...(brandId ? { brandId } : {}),
      ...(categoryId ? { categoryId } : {}),
      ...(search
        ? { OR: [{ name: { contains: search, mode: "insensitive" } }, { description: { contains: search, mode: "insensitive" } }] }
        : {}),
    } as const;

    const [total, items] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: { brand: true, category: true },
      }),
    ]);

    return NextResponse.json({
      items,
      total,
      page,
      limit,
      hasMore: page * limit < total,
    });
  } catch (error) {
    console.error("GET /api/products error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


