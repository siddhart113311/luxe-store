async function getOrders() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/admin/orders`, { cache: 'no-store' });
  return res.json();
}

export default async function AdminOrders() {
  const { orders } = await getOrders();
  return (
    <div>
      <h1 className="text-2xl md:text-4xl mb-6">Orders</h1>
      <div className="divide-y">
        {orders?.map(o => (
          <div key={o.id} className="py-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{o.email}</div>
              <div className="text-xs text-black/60">{o.status}</div>
            </div>
            <div className="text-sm">₹{(o.totalCents/100).toFixed(0)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


