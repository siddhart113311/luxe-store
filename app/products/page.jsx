import ProductCard from '@/components/ProductCard';

async function getProducts(searchParams) {
  const qs = new URLSearchParams(searchParams).toString();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/products?${qs}`, { cache: 'no-store' });
  return res.json();
}

export default async function ProductsPage({ searchParams }) {
  const { products } = await getProducts(searchParams);
  return (
    <main className="container-padding py-16">
      <h1 className="text-3xl md:text-5xl mb-6">Shop</h1>
      <form className="mb-8 grid grid-cols-2 md:grid-cols-6 gap-3">
        <input name="q" placeholder="Search" defaultValue={searchParams?.q} className="col-span-2 md:col-span-2 rounded-full border px-3 py-2" />
        <select name="category" defaultValue={searchParams?.category || ''} className="rounded-full border px-3 py-2">
          <option value="">All Categories</option>
          <option value="t-shirts">T-Shirts</option>
          <option value="hoodies">Hoodies</option>
          <option value="jeans">Jeans</option>
          <option value="shoes">Shoes</option>
          <option value="watches">Watches</option>
        </select>
        <select name="size" defaultValue={searchParams?.size || ''} className="rounded-full border px-3 py-2">
          <option value="">Any Size</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
        </select>
        <select name="color" defaultValue={searchParams?.color || ''} className="rounded-full border px-3 py-2">
          <option value="">Any Color</option>
          <option>Black</option>
          <option>Beige</option>
        </select>
        <select name="sort" defaultValue={searchParams?.sort || ''} className="rounded-full border px-3 py-2">
          <option value="">Featured</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
        <button className="rounded-full border px-4 py-2">Apply</button>
      </form>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products?.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </main>
  );
}


