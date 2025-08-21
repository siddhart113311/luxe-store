'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(persist((set, get) => ({
  items: [],
  wishlist: {},
  addItem: (product, variantId = null, quantity = 1) => {
    const key = `${product.id}:${variantId || ''}`;
    const found = get().items.find(i => i.key === key);
    if (found) {
      set({ items: get().items.map(i => i.key === key ? { ...i, quantity: i.quantity + quantity } : i) });
    } else {
      set({ items: [...get().items, { key, productId: product.id, variantId, quantity, priceCents: product.priceCents, name: product.name }] });
    }
  },
  removeItem: (key) => set({ items: get().items.filter(i => i.key !== key) }),
  updateQuantity: (key, quantity) => set({ items: get().items.map(i => i.key === key ? { ...i, quantity } : i) }),
  clearCart: () => set({ items: [] }),
  toggleWishlist: (productId) => set({ wishlist: { ...get().wishlist, [productId]: !get().wishlist[productId] } }),
  isWished: (productId) => !!get().wishlist[productId],
  subtotalCents: () => get().items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0),
}), { name: 'luxe-cart' }));


