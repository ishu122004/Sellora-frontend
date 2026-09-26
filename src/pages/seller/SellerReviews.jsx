//reviews received by sellers products
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import api from "../../services/api";

function SellerReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const uid = auth.currentUser.uid;

        const res = await api.get(
          `/sellers/${uid}/reviews`
        );

        setReviews(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (auth.currentUser) {
      getReviews();
    }
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <section className="mx-auto max-w-5xl">
        <div>
          <p className="text-sm text-purple-600">
            Seller Center
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            Customer Reviews
          </h1>

          <p className="mt-2 text-slate-500">
            Reviews received on your products.
          </p>
        </div>

        {loading && (
          <p className="mt-8 text-slate-500">
            Loading reviews...
          </p>
        )}

        <div className="mt-8 space-y-5">
          {reviews.map((review) => (
            <article
              key={review._id}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-bold">
                    {review.productName}
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Customer: {review.customerId}
                  </p>
                </div>

                <span className="rounded-full bg-purple-50 px-3 py-1 text-sm font-semibold text-purple-700">
                  ★ {review.rating}/5
                </span>
              </div>

              <p className="mt-5 leading-7 text-slate-600">
                {review.comment}
              </p>
            </article>
          ))}

          {!loading && !reviews.length && (
            <div className="rounded-2xl bg-white p-10 text-center text-slate-500">
              No reviews received yet.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default SellerReviews;