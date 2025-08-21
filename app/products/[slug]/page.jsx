import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { images: true, variants: true, category: true },
  });
  if (!product) return notFound();
  return (
    <main className="container-padding py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-square bg-[#f7f7f7] rounded-2xl" />
        <div>
          <h1 className="text-3xl md:text-5xl">{product.name}</h1>
          <div className="mt-2 text-black/60">{product.category?.name}</div>
          <div className="mt-4">₹{(product.priceCents/100).toFixed(0)}</div>
          <p className="mt-6 text-black/70 leading-relaxed">{product.description}</p>
          <form action="#" className="mt-6 grid grid-cols-2 gap-3">
            {product.variants.map(v => (
              <label key={v.id} className="border rounded-full px-3 py-2 text-sm">
                <input type="radio" name="variant" value={v.id} className="mr-2" /> {v.size} / {v.color}
              </label>
            ))}
          </form>
          <div className="mt-6 flex gap-3">
            <form action="/api/cart" method="post">
              <button className="px-6 py-3 rounded-full bg-black text-white">Add to Cart</button>
            </form>
            <button className="px-6 py-3 rounded-full border">Wishlist</button>
          </div>
        </div>
      </div>
    </main>
  );
}


