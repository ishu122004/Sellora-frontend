//search input for products
function ProductSearch({ search, setSearch }) {
  return (
    <div className="relative md:col-span-2">
      <label className="mb-2 block text-sm font-semibold text-gray-800">
        Search Products
      </label>

      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by product name..."
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 pr-10 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
        />

        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductSearch;