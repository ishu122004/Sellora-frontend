import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import api from "../../services/api";

const EMPTY_STATS = {
  totalSales: 0,
  totalOrders: 0,
  productsSold: 0
};

function SellerSales() {
  const [stats, setStats] = useState(EMPTY_STATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getSales = async () => {
      try {
        const res = await api.get(
          `/sellers/${auth.currentUser.uid}/sales`
        );

        setStats(res.data);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
          "Failed to load sales"
        );
      } finally {
        setLoading(false);
      }
    };

    if (auth.currentUser) {
      getSales();
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">Sales</h1>

        {loading ? (
          <p className="mt-8 text-gray-500">Loading sales...</p>
        ) : error ? (
          <p className="mt-8 text-red-600">{error}</p>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-6">
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="mt-2 text-2xl font-bold">
                ₹{Number(stats.totalSales).toLocaleString("en-IN")}
              </p>
            </div>

            <div className="rounded-xl bg-white p-6">
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="mt-2 text-2xl font-bold">
                {stats.totalOrders}
              </p>
            </div>

            <div className="rounded-xl bg-white p-6">
              <p className="text-sm text-gray-500">Products Sold</p>
              <p className="mt-2 text-2xl font-bold">
                {stats.productsSold}
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default SellerSales;
