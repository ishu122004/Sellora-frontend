//complete wishlist page
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWishlist(
      JSON.parse(localStorage.getItem("wishlist") || "[]")
    );
  }, []);

  const removeItem = (id) => {
    const updated = wishlist.filter(
      (item) => item._id !== id
    );

    setWishlist(updated);
    localStorage.setItem(
      "wishlist",
      JSON.stringify(updated)
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">My Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="mt-8 rounded-xl bg-white p-8 text-center">
            <p className="text-gray-500">
              Your wishlist is empty.
            </p>

            <Link
              to="/products"
              className="mt-5 inline-block rounded-lg bg-black px-5 py-3 text-white"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {wishlist.map((product) => (
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
                  <h2 className="font-semibold">
                    {product.name}
                  </h2>

                  <p className="mt-2 font-bold">
                    ₹{product.price}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <Link
                      to={`/product/${product._id}`}
                      className="flex-1 rounded-lg bg-black px-3 py-2 text-center text-sm text-white"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => removeItem(product._id)}
                      className="rounded-lg border px-3 py-2 text-sm text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Wishlist;