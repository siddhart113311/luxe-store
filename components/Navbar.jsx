'use client';

import SearchBar from './SearchBar';
import { useCartStore } from '@/store/cart';

export default function Navbar() {
  //this is navbar
  const items = useCartStore(s => s.items);
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-black/5">
      <div className="container-padding h-16 flex items-center justify-between">
        <a href="/" className="text-lg tracking-[0.2em] uppercase">Luxe</a>
        <SearchBar />
        <nav className="flex items-center gap-6 text-sm">
          <a href="/products">Shop</a>
          <a href="/checkout">Cart ({items.length})</a>
        </nav>
      </div>
    </header>
  );
}


