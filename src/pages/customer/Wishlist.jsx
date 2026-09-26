//complete wishlist page
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWishlist,
  removeFromWishlist
} from "../../redux/slices/wishlistSlice";
import { auth } from "../../firebase/firebaseConfig";
import SafeImage from "../../components/common/SafeImage";
import formatPrice from "../../utils/formatPrice";

function Wishlist() {
  const dispatch = useDispatch();

  const {
    products,
    loading,
    error
  } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (auth.currentUser?.uid) {
      dispatch(fetchWishlist(auth.currentUser.uid));
    }
  }, [dispatch]);

  const removeItem = async (id) => {
    try {
      await dispatch(
        removeFromWishlist({
          uid: auth.currentUser.uid,
          productId: id
        })
      ).unwrap();
    } catch (error) {
      alert(error?.message || "Failed to remove");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <section className="mx-auto max-w-6xl">
        <div>
          <p className="text-sm font-medium text-purple-600">
            Saved Items
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            My Wishlist
          </h1>

          <p className="mt-2 text-slate-500">
            Products you want to keep for later.
          </p>
        </div>

        {loading && (
          <p className="mt-8 text-slate-500">
            Loading wishlist...
          </p>
        )}

        {error && (
          <p className="mt-8 text-red-600">
            {error}
          </p>
        )}

        {!loading && !products.length && (
          <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold">
              Your wishlist is empty
            </h2>

            <p className="mt-2 text-slate-500">
              Save products you like and find them here later.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-block rounded-xl bg-black px-5 py-3 font-medium text-white hover:bg-purple-600"
            >
              Explore Products
            </Link>
          </div>
        )}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article
              key={product._id}
              className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200"
            >
              <SafeImage
                src={product.images?.[0] || product.image}
                alt={product.name}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">
                <p className="text-xs font-medium uppercase text-purple-600">
                  {product.category}
                </p>

                <h2 className="mt-2 font-semibold">
                  {product.name}
                </h2>

                <p className="mt-2 text-xl font-bold">
                  {formatPrice(product.price)}
                </p>

                <div className="mt-5 flex gap-2">
                  <Link
                    to={`/product/${product._id}`}
                    className="flex-1 rounded-xl bg-black px-3 py-2 text-center text-sm text-white hover:bg-purple-600"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => removeItem(product._id)}
                    className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Wishlist;