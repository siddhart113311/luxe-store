'use client';

import { useCartStore } from '@/store/cart';
import Image from 'next/image';

export default function ProductCard({ product }) {
  const addItem = useCartStore(s => s.addItem);
  const toggleWishlist = useCartStore(s => s.toggleWishlist);
  const isWished = useCartStore(s => s.isWished);

  return (
    <div className="group relative">
      <a href={`/products/${product.slug}`} className="block aspect-[3/4] bg-[#f7f7f7] overflow-hidden relative">
        {product.images?.[0]?.url ? (
          <Image src={product.images[0].url} alt={product.images[0].alt || product.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/15 opacity-0 group-hover:opacity-100 transition" />
      </a>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <div className="text-sm text-black/70">{product.category?.name}</div>
          <div className="text-base">{product.name}</div>
        </div>
        <div className="text-sm">₹{(product.priceCents/100).toFixed(0)}</div>
      </div>
      <div className="mt-2 flex gap-2">
        <button onClick={() => addItem(product)} className="px-3 py-2 rounded-full bg-black text-white text-xs">Add</button>
        <button onClick={() => toggleWishlist(product.id)} className={`px-3 py-2 rounded-full border text-xs ${isWished(product.id)?'bg-black text-white':'border-black/15'}`}>Wishlist</button>
      </div>
    </div>
  );
}


