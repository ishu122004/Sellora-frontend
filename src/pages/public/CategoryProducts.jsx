//display products belonging to one category
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../services/api";

function CategoryProducts() {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await api.get("/products");

        const filtered = res.data.filter(
          (product) =>
            product.category.toLowerCase() ===
            category.toLowerCase()
        );

        setProducts(filtered);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [category]);

  if (loading) {
    return (
      <main className="p-10">
        Loading products...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">
          {category}
        </h1>

        {products.length === 0 ? (
          <p className="mt-8 text-gray-500">
            No products found in this category.
          </p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <article
                key={product._id}
                className="overflow-hidden rounded-xl bg-white shadow-sm"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />

                <div className="p-4">
                  <p className="text-xs text-purple-600">
                    {product.category}
                  </p>

                  <h2 className="mt-2 font-semibold">
                    {product.name}
                  </h2>

                  <p className="mt-2 font-bold">
                    ₹{product.price}
                  </p>

                  <Link
                    to={`/product/${product._id}`}
                    className="mt-4 block rounded-lg bg-black px-4 py-2 text-center text-sm text-white"
                  >
                    View
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default CategoryProducts;