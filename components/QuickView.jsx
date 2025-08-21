'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';

export default function QuickView({ slug, onClose }) {
  const [product, setProduct] = useState(null);
  const open = !!slug;

  useEffect(() => {
    if (!slug) return;
    const controller = new AbortController();
    fetch(`/api/products/${slug}`, { signal: controller.signal })
      .then(r => r.json())
      .then(d => setProduct(d.product || null))
      .catch(() => {});
    return () => controller.abort();
  }, [slug]);

  return (
    <Dialog.Root open={open} onOpenChange={(o) => { if (!o) onClose?.(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black w-[92vw] max-w-2xl rounded-2xl p-6 shadow-2xl">
          <div className="flex items-start gap-6">
            <div className="aspect-square bg-[#f2f2f2] w-1/2 rounded-xl" />
            <div className="flex-1">
              <Dialog.Title className="text-xl md:text-2xl font-medium">{product?.name || 'Loading...'}</Dialog.Title>
              <p className="text-sm text-black/70 mt-2 line-clamp-4">{product?.description}</p>
              <div className="mt-4 flex gap-2 flex-wrap">
                {product?.variants?.map(v => (
                  <span key={v.id} className="text-xs border px-2 py-1 rounded-full">{v.size} / {v.color}</span>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3">
                <button className="px-5 py-3 rounded-full bg-black text-white">Add to Cart</button>
                <button className="px-5 py-3 rounded-full border">Wishlist</button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}


