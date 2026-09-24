//allow customers to filter products
function ProductFilter({ products, category, setCategory }) {
  const categories = [
    ...new Set(products.map((product) => product.category))
  ];

  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-purple-600"
    >
      <option value="">All Categories</option>

      {categories.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

export default ProductFilter;