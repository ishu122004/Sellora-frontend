import Rating from "../product/Rating";

function ReviewList({
  reviews = [],
  currentUserId,
  onDelete,
  deletingId
}) {
  if (!reviews.length) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">
        No reviews yet. Be the first to review this product.
      </div>
    );
  }

  return (
    <section className="space-y-4">
      {reviews.map((review) => (
        <article
          key={review._id}
          className="rounded-lg border border-slate-200 bg-white p-5"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold">
                {review.userName || "Customer"}
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                {new Date(
                  review.updatedAt || review.createdAt
                ).toLocaleDateString()}
              </p>
            </div>
            <Rating rating={review.rating} showValue={false} />
          </div>

          <p className="mt-4 leading-7 text-slate-600">
            {review.comment}
          </p>

          {currentUserId === review.customerId && onDelete ? (
            <button
              type="button"
              onClick={() => onDelete(review._id)}
              disabled={deletingId === review._id}
              className="mt-4 text-sm font-medium text-red-600 disabled:opacity-50"
            >
              {deletingId === review._id
                ? "Removing..."
                : "Delete review"}
            </button>
          ) : null}
        </article>
      ))}
    </section>
  );
}

export default ReviewList;
