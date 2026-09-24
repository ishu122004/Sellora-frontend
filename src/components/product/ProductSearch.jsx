//search input for products
function ProductSearch({ search, setSearch }) {
  return (
    <div className="w-full">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
      />
    </div>
  );
}

export default ProductSearch;