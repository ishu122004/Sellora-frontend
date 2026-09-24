//reviews received by sellers products
import { useState } from "react";

function SellerReviews() {
  const [reviews] = useState([]);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">
          Customer Reviews
        </h1>

        {reviews.length === 0 ? (
          <div className="mt-8 rounded-xl bg-white p-8 text-center">
            <p className="text-gray-500">
              No reviews yet.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {reviews.map((review) => (
              <article
                key={review._id}
                className="rounded-xl bg-white p-5"
              >
                <h2 className="font-semibold">
                  {review.title}
                </h2>

                <p className="mt-2 text-gray-600">
                  {review.comment}
                </p>

                <p className="mt-2">
                  Rating: {review.rating}/5
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default SellerReviews;