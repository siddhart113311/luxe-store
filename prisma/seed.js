import { PrismaClient } from "../app/generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { slug: "t-shirts", name: "T-Shirts" },
    { slug: "hoodies", name: "Hoodies" },
    { slug: "jeans", name: "Jeans" },
    { slug: "shoes", name: "Shoes" },
    { slug: "watches", name: "Watches" },
  ];

  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }

  const tshirts = await prisma.category.findUnique({ where: { slug: "t-shirts" } });
  const hoodies = await prisma.category.findUnique({ where: { slug: "hoodies" } });

  const products = [
    {
      slug: "noir-classic-tee",
      name: "Noir Classic Tee",
      description: "Heavyweight cotton. Minimal serif logotype emboss.",
      priceCents: 5999,
      isNew: true,
      categoryId: tshirts.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1400&auto=format&fit=crop", alt: "Noir Tee" }] },
      variants: { create: [
        { size: "S", color: "Black", stock: 15 },
        { size: "M", color: "Black", stock: 20 },
      ] },
    },
    {
      slug: "sand-heritage-hoodie",
      name: "Sand Heritage Hoodie",
      description: "Brushed fleece. Gold foil crest.",
      priceCents: 8999,
      isBest: true,
      categoryId: hoodies.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1548883354-7622d03aca41?q=80&w=1400&auto=format&fit=crop", alt: "Sand Hoodie" }] },
      variants: { create: [
        { size: "M", color: "Beige", stock: 10 },
        { size: "L", color: "Beige", stock: 8 },
      ] },
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });


