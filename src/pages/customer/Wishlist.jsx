//complete wishlist page
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWishlist,removeWishlist,fetchWishlist } from "../../redux/slices/wishlistSlice";
import { Link } from "react-router-dom";

function Wishlist() {
  const dispatch = useDispatch();

  const { products } = useSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 md:px-8">

      <section className="mx-auto max-w-7xl">

        <div className="mb-8">
          <p className="text-sm text-purple-600">
            Customer
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            My Wishlist
          </h1>
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center">
            <p className="text-5xl">♡</p>

            <h2 className="mt-4 text-xl font-semibold">
              Your wishlist is empty
            </h2>

            <Link
              to="/products"
              className="mt-5 inline-block rounded-lg bg-black px-5 py-3 text-white hover:bg-purple-600"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <article
                key={product._id}
                className="overflow-hidden rounded-2xl border bg-white shadow-sm"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-52 w-full object-cover"
                />

                <div className="p-5">

                  <p className="text-xs text-purple-600">
                    {product.category}
                  </p>

                  <h2 className="mt-2 font-semibold">
                    {product.name}
                  </h2>

                  <p className="mt-2 text-xl font-bold">
                    ₹{product.price}
                  </p>

                  <div className="mt-4 flex gap-2">

                    <Link
                      to={`/product/${product._id}`}
                      className="flex-1 rounded-lg bg-black px-3 py-2 text-center text-sm text-white hover:bg-purple-600"
                    >
                      View
                    </Link>

                    <button
                      onClick={() =>
                        dispatch(removeWishlist(product._id))
                      }
                      className="rounded-lg border px-4 py-2 text-sm hover:border-purple-500"
                    >
                      ♥
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