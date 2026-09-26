//display multiple productcard components
import ProductCard from "./ProductCard";

function ProductGrid({ products = [] }) {
  if (!products.length) {
    return (
      <p className="py-10 text-center text-gray-500">
        No products found.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;