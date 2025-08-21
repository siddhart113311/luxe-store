'use client';

import { useEffect, useState } from 'react';
import QuickView from './QuickView';

export default function Trending() {
  const [tab, setTab] = useState('new');
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/products?tag=${tab}`, { signal: controller.signal })
      .then(r => r.json())
      .then(d => setProducts(d.products || []))
      .catch(() => {});
    return () => controller.abort();
  }, [tab]);

  return (
    <section id="trending" className="container-padding py-24 bg-white text-black">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl md:text-5xl">Trending</h2>
        <div className="flex gap-3 text-sm">
          <button onClick={() => setTab('new')} className={`px-4 py-2 rounded-full border ${tab==='new'?'bg-black text-white':'border-black/10'}`}>New Arrivals</button>
          <button onClick={() => setTab('best')} className={`px-4 py-2 rounded-full border ${tab==='best'?'bg-black text-white':'border-black/10'}`}>Best Sellers</button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <button key={p.id} onClick={() => setActive(p.slug)} className="group relative aspect-[3/4] bg-[#f7f7f7] overflow-hidden text-left">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 opacity-0 group-hover:opacity-100 transition" />
            <div className="absolute bottom-3 left-3 text-xs tracking-wide uppercase">{p.name}</div>
            <span className="absolute right-3 top-3 text-[11px] rounded-full bg-black text-white px-3 py-1 opacity-0 group-hover:opacity-100 transition">Quick View</span>
          </button>
        ))}
      </div>
      <QuickView slug={active} onClose={() => setActive(null)} />
    </section>
  );
}


