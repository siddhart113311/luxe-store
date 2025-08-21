import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag"); // 'new' | 'best'
  const q = searchParams.get("q");
  const category = searchParams.get("category");
  const color = searchParams.get("color");
  const size = searchParams.get("size");
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const sort = searchParams.get("sort"); // price_asc | price_desc | newest

  const where = {};
  if (tag === "new") where.isNew = true;
  if (tag === "best") where.isBest = true;
  if (q) where.name = { contains: q, mode: "insensitive" };
  if (category) where.category = { slug: category };
  if (color || size) {
    where.variants = {
      some: {
        ...(color ? { color } : {}),
        ...(size ? { size } : {}),
      },
    };
  }
  if (min || max) {
    where.priceCents = {
      ...(min ? { gte: Number(min) } : {}),
      ...(max ? { lte: Number(max) } : {}),
    };
  }

  let orderBy = undefined;
  if (sort === "price_asc") orderBy = { priceCents: "asc" };
  if (sort === "price_desc") orderBy = { priceCents: "desc" };
  if (sort === "newest") orderBy = { createdAt: "desc" };

  const products = await prisma.product.findMany({
    where,
    orderBy,
    include: {
      images: true,
      variants: true,
      category: true,
    },
    take: 24,
  });

  return NextResponse.json({ products });
}


