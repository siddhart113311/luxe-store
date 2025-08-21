export default function NewProduct() {
  return (
    <form action="/api/admin/products" method="post" className="max-w-xl space-y-4">
      <h1 className="text-2xl md:text-4xl mb-2">Create Product</h1>
      <input name="name" placeholder="Name" className="w-full border rounded px-3 py-2" required />
      <input name="slug" placeholder="Slug" className="w-full border rounded px-3 py-2" required />
      <textarea name="description" placeholder="Description" className="w-full border rounded px-3 py-2" required />
      <input name="priceCents" placeholder="Price (cents)" type="number" className="w-full border rounded px-3 py-2" required />
      <select name="category" className="w-full border rounded px-3 py-2">
        <option value="t-shirts">T-Shirts</option>
        <option value="hoodies">Hoodies</option>
        <option value="jeans">Jeans</option>
        <option value="shoes">Shoes</option>
        <option value="watches">Watches</option>
      </select>
      <div className="flex gap-3">
        <label className="text-sm"><input type="checkbox" name="isNew" className="mr-2"/> New Arrival</label>
        <label className="text-sm"><input type="checkbox" name="isBest" className="mr-2"/> Best Seller</label>
      </div>
      <button className="px-6 py-3 rounded-full bg-black text-white">Create</button>
    </form>
  );
}


