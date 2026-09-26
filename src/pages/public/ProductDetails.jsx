import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import ProductImages from "../../components/product/ProductImages";
import Rating from "../../components/product/Rating";
import ReviewForm from "../../components/review/ReviewForm";
import ReviewList from "../../components/review/ReviewList";
import SafeImage from "../../components/common/SafeImage";
import api from "../../services/api";
import {
  addToWishlist,
  removeFromWishlist,
  fetchWishlist
} from "../../redux/slices/wishlistSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { auth } from "../../firebase/firebaseConfig";
import formatPrice from "../../utils/formatPrice";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [firebaseUser, setFirebaseUser] = useState(null);

  const wishlistProducts = useSelector(
    (state) => state.wishlist.products
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);

      if (user) {
        dispatch(fetchWishlist());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    Promise.all([
      api.get(`/products/${id}`),
      api.get(`/reviews/product/${id}`)
    ])
      .then(([productResponse, reviewResponse]) => {
        setProduct(productResponse.data);
        setReviews(reviewResponse.data);
      })
      .catch((requestError) => {
        setError(
          requestError.response?.data?.message ||
          "Failed to load product"
        );
      })
      .finally(() => setLoading(false));
  }, [id]);

  const isWishlisted = wishlistProducts.some(
    (item) => item._id === id
  );

  const handleAddToCart = () => {
    if (!firebaseUser) {
      navigate("/login");
      return;
    }

    if (product.stock > 0) {
      dispatch(addToCart(product));
    }
  };

  const handleBuyNow = () => {
    if (!firebaseUser) {
      navigate("/login");
      return;
    }

    if (product.stock < 1) {
      return;
    }

    navigate("/checkout", {
      state: {
        buyNowItems: [
          {
            _id: product._id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            image: product.images?.[0] || product.image,
            quantity: 1
          }
        ]
      }
    });
  };

  const handleWishlist = async () => {
    if (!firebaseUser) {
      navigate("/login");
      return;
    }

    try {
      setWishlistLoading(true);

      if (isWishlisted) {
        await dispatch(
          removeFromWishlist({
            productId: product._id
          })
        ).unwrap();
      } else {
        await dispatch(
          addToWishlist({
            productId: product._id
          })
        ).unwrap();
      }
    } catch (requestError) {
      setError(
        requestError?.message || "Wishlist action failed"
      );
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleReview = async (review) => {
    if (!firebaseUser) {
      navigate("/login");
      return false;
    }

    try {
      setReviewLoading(true);
      setError("");
      const response = await api.post("/reviews", {
        productId: id,
        ...review
      });

      setReviews((current) => [
        response.data,
        ...current.filter(
          (item) => item._id !== response.data._id
        )
      ]);
      return true;
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        "Failed to submit review"
      );
      return false;
    } finally {
      setReviewLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      setDeletingId(reviewId);
      await api.delete(`/reviews/${reviewId}`);
      setReviews((current) =>
        current.filter((review) => review._id !== reviewId)
      );
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        "Failed to delete review"
      );
    } finally {
      setDeletingId("");
    }
  };

  const liveRating = reviews.length
    ? reviews.reduce(
        (sum, review) => sum + Number(review.rating),
        0
      ) / reviews.length
    : product?.rating || 0;

  if (loading) {
    return (
      <main className="min-h-screen p-8 text-slate-500">
        Loading product...
      </main>
    );
  }

  if (error && !product) {
    return (
      <main className="min-h-screen p-8 text-red-600">
        {error}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="grid gap-10 md:grid-cols-2">
          <ProductImages
            images={product.images}
            image={product.image}
            name={product.name}
          />

          <article className="py-2">
            <p className="text-sm font-semibold text-purple-600">
              {product.category}
            </p>
            <h1 className="mt-2 text-4xl font-bold">
              {product.name}
            </h1>
            <div className="mt-4 flex items-center gap-3">
              <Rating rating={liveRating} />
              <span className="text-sm text-slate-500">
                {reviews.length} reviews
              </span>
            </div>
            <p className="mt-5 text-3xl font-bold text-purple-600">
              {formatPrice(product.price)}
            </p>
            <p className="mt-6 whitespace-pre-line leading-7 text-slate-600">
              {product.description}
            </p>
            <p className="mt-4 text-sm text-slate-500">
              {product.stock > 0
                ? product.stock + " available"
                : "Out of stock"}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.stock}
                className="rounded-lg bg-purple-600 px-6 py-3 font-medium text-white disabled:opacity-50"
              >
                Add to cart
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={!product.stock}
                className="rounded-lg bg-black px-6 py-3 font-medium text-white disabled:opacity-50"
              >
                Buy now
              </button>
              <button
                type="button"
                onClick={handleWishlist}
                disabled={wishlistLoading}
                className="rounded-lg border border-slate-300 px-6 py-3 font-medium"
              >
                {wishlistLoading
                  ? "Updating..."
                  : isWishlisted
                    ? "Remove from wishlist"
                    : "Add to wishlist"}
              </button>
            </div>

            <section className="mt-10 border-t border-slate-200 pt-6">
              <div className="flex items-center gap-4">
                <SafeImage
                  src={product.seller?.image}
                  alt={product.seller?.storeName || "Seller"}
                  className="h-14 w-14 rounded-full object-cover"
                  fallbackClassName="h-14 w-14 rounded-full"
                />
                <div>
                  <p className="text-sm text-slate-500">
                    Sold by
                  </p>
                  <h2 className="font-semibold">
                    {product.seller?.storeName}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {product.seller?.name}
                  </p>
                </div>
              </div>
            </section>
          </article>
        </div>

        <section className="mt-14 border-t border-slate-200 pt-10">
          <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
            {firebaseUser ? (
              <ReviewForm
                onSubmit={handleReview}
                loading={reviewLoading}
              />
            ) : (
              <div className="rounded-lg border border-slate-200 p-5">
                <h2 className="font-semibold">
                  Review this product
                </h2>
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="mt-4 text-sm font-medium text-purple-600"
                >
                  Login to write a review
                </button>
              </div>
            )}

            <div>
              <h2 className="mb-5 text-2xl font-bold">
                Customer reviews
              </h2>
              {error ? (
                <p className="mb-4 text-sm text-red-600">
                  {error}
                </p>
              ) : null}
              <ReviewList
                reviews={reviews}
                currentUserId={firebaseUser?.uid}
                onDelete={handleDeleteReview}
                deletingId={deletingId}
              />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
