import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ products });
}

export async function POST(request) {
  const form = await request.formData();
  const name = form.get('name');
  const slug = form.get('slug');
  const description = form.get('description');
  const priceCents = Number(form.get('priceCents')) || 0;
  const categorySlug = form.get('category');
  const isNew = form.get('isNew') === 'on';
  const isBest = form.get('isBest') === 'on';

  const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
  if (!category) return NextResponse.json({ error: 'Invalid category' }, { status: 400 });

  const product = await prisma.product.create({
    data: { name, slug, description, priceCents, categoryId: category.id, isNew, isBest },
  });
  return NextResponse.redirect(new URL('/admin/products', request.url));
}


