export default function AdminLayout({ children }) {
  return (
    <div className="container-padding py-8">
      <nav className="flex gap-6 text-sm mb-8">
        <a href="/admin">Overview</a>
        <a href="/admin/products">Products</a>
        <a href="/admin/orders">Orders</a>
      </nav>
      {children}
    </div>
  );
}


