import { useState } from "react";
import Rating from "../product/Rating";

function ReviewForm({ onSubmit, loading = false }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!rating) {
      setError("Choose a star rating.");
      return;
    }

    if (!comment.trim()) {
      setError("Write a short review.");
      return;
    }

    setError("");
    const submitted = await onSubmit({
      rating,
      comment: comment.trim()
    });

    if (submitted !== false) {
      setComment("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-200 bg-white p-5"
    >
      <h2 className="text-lg font-semibold">Write a review</h2>
      <p className="mt-1 text-sm text-slate-500">
        Select between one and five stars.
      </p>

      <div className="mt-4">
        <Rating
          rating={rating}
          onChange={setRating}
          size="text-3xl"
          showValue={false}
        />
      </div>

      <textarea
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="Share your experience with this product"
        rows="4"
        maxLength={1000}
        className="mt-4 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-purple-500"
      />

      {error ? (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-4 rounded-lg bg-purple-600 px-5 py-3 font-medium text-white disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit review"}
      </button>
    </form>
  );
}

export default ReviewForm;
