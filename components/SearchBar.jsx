'use client';

import { useEffect, useRef, useState } from 'react';

export default function SearchBar() {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const box = useRef(null);

  useEffect(() => {
    if (!q) { setResults([]); return; }
    const controller = new AbortController();
    const id = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: controller.signal })
        .then(r => r.json()).then(d => setResults(d.results || [])).catch(() => {});
    }, 180);
    return () => { controller.abort(); clearTimeout(id); };
  }, [q]);

  useEffect(() => {
    const onDoc = (e) => { if (!box.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  return (
    <div ref={box} className="relative w-full max-w-md">
      <input value={q} onChange={e=>{setQ(e.target.value); setOpen(true);}} placeholder="Search products" className="w-full rounded-full border border-black/15 px-4 py-2 bg-white text-black" />
      {open && results.length>0 && (
        <div className="absolute mt-2 w-full rounded-xl border bg-white shadow-xl z-50">
          {results.map(r => (
            <a key={r.id} href={`/products/${r.slug}`} className="flex items-center justify-between px-4 py-2 hover:bg-black/5">
              <span className="text-sm">{r.name}</span>
              <span className="text-xs text-black/60">₹{(r.priceCents/100).toFixed(0)}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}


