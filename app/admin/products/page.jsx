async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/products`, { cache: 'no-store' });
  return res.json();
}

export default async function AdminProducts() {
  const { products } = await getProducts();
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-4xl">Products</h1>
        <a href="/admin/products/new" className="px-4 py-2 rounded-full border">New Product</a>
      </div>
      <div className="divide-y">
        {products?.map(p => (
          <div key={p.id} className="py-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-xs text-black/60">/{p.slug}</div>
            </div>
            <div className="text-sm">₹{(p.priceCents/100).toFixed(0)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


