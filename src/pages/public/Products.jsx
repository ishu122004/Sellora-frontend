//show all products
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchproducts } from "../../redux/slices/productSlice";
import ProductCard from "../../components/product/ProductCard";

function Products() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(fetchproducts());
  }, [dispatch]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <p>Loading products...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 md:px-8">

      <section className="mx-auto max-w-7xl">

        <div className="mb-10">
          <p className="text-sm font-medium text-purple-600">
            MarketHub
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Explore Products
          </h1>

          <p className="mt-2 text-gray-500">
            Products from all our sellers.
          </p>
        </div>

        {error && (
          <p className="mb-5 text-red-600">{error}</p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>

      </section>

    </main>
  );
}

export default Products;