//allow customers to filter products
function ProductFilter({
  categories = [],
  category,
  setCategory
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        Category
      </label>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-purple-500"
      >
        {categories.map((item) => (
          <option key={item} value={item}>
            {item === "All" ? "All Categories" : item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProductFilter;