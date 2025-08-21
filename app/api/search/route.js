import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  if (!q) return NextResponse.json({ results: [] });

  const results = await prisma.product.findMany({
    where: { name: { contains: q, mode: "insensitive" } },
    select: { id: true, slug: true, name: true, priceCents: true },
    take: 8,
  });
  return NextResponse.json({ results });
}


