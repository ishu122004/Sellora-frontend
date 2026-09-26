//sort the products
function ProductSort({ sort, setSort }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        Sort products
      </label>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-purple-500"
      >
        <option value="default">Recommended</option>
        <option value="price-low">
          Price: Low to High
        </option>
        <option value="price-high">
          Price: High to Low
        </option>
        <option value="name">
          Name: A to Z
        </option>
        <option value="newest">
          Newest
        </option>
      </select>
    </div>
  );
}

export default ProductSort;