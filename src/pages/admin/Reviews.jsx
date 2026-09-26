import { useEffect, useState } from "react";
import Rating from "../../components/product/Rating";
import api from "../../services/api";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    api.get("/admin/reviews")
      .then((response) => setReviews(response.data))
      .catch((requestError) => {
        setError(
          requestError.response?.data?.message ||
          "Failed to load reviews"
        );
      });
  }, []);

  const deleteReview = async (id) => {
    if (!window.confirm("Delete this review?")) {
      return;
    }

    try {
      setDeletingId(id);
      await api.delete(`/reviews/${id}`);
      setReviews((current) =>
        current.filter((review) => review._id !== id)
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

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-8">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-medium text-purple-600">
          Moderation
        </p>
        <h1 className="mt-1 text-3xl font-bold">Reviews</h1>

        {error ? (
          <p className="mt-6 rounded-lg bg-red-50 p-4 text-red-600">
            {error}
          </p>
        ) : null}

        <div className="mt-8 space-y-4">
          {reviews.map((review) => (
            <article
              key={review._id}
              className="rounded-lg border border-slate-200 bg-white p-5"
            >
              <div className="flex flex-wrap justify-between gap-4">
                <div>
                  <h2 className="font-semibold">
                    {review.userName || "Customer"}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {review.productName}
                  </p>
                </div>
                <Rating
                  rating={review.rating}
                  showValue={false}
                />
              </div>
              <p className="mt-4 text-slate-600">
                {review.comment}
              </p>
              <button
                type="button"
                onClick={() => deleteReview(review._id)}
                disabled={deletingId === review._id}
                className="mt-4 text-sm font-medium text-red-600 disabled:opacity-50"
              >
                {deletingId === review._id
                  ? "Deleting..."
                  : "Delete review"}
              </button>
            </article>
          ))}

          {!reviews.length && !error ? (
            <p className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">
              No reviews submitted yet.
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}

export default Reviews;
