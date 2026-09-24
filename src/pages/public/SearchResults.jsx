//display product based on search
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../../services/api";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const searchProducts = async () => {
      try {
        const res = await api.get("/products");

        const result = res.data.filter((product) =>
          product.name
            .toLowerCase()
            .includes(query.toLowerCase())
        );

        setProducts(result);
      } catch (error) {
        console.error(error);
      }
    };

    searchProducts();
  }, [query]);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">
          Search Results
        </h1>

        <p className="mt-2 text-gray-500">
          Results for "{query}"
        </p>

        {products.length === 0 ? (
          <p className="mt-8 text-gray-500">
            No products found.
          </p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <article
                key={product._id}
                className="rounded-xl bg-white p-4 shadow-sm"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full rounded-lg object-cover"
                />

                <h2 className="mt-4 font-semibold">
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
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default SearchResults;