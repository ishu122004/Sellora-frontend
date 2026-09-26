//seller overview
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";
import api from "../../services/api";

function SellerDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    productsSold: 0,
    pendingOrders: 0,
    wishlistedProducts: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboard = async () => {
      try {
        const uid = auth.currentUser.uid;

        const res = await api.get(
          `/sellers/${uid}/dashboard`
        );

        setStats(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (auth.currentUser) {
      getDashboard();
    }
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        Loading seller dashboard...
      </main>
    );
  }

  const cards = [
    ["My Products", stats.totalProducts],
    ["Orders", stats.totalOrders],
    ["Products Sold", stats.productsSold],
    ["Pending Orders", stats.pendingOrders],
    ["Wishlisted Products", stats.wishlistedProducts],
    [
      "Total Sales",
      `₹${stats.totalSales.toLocaleString("en-IN")}`
    ]
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-black p-7 text-white md:p-10">
          <p className="text-sm text-purple-300">
            Seller Center
          </p>

          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Store Overview
          </h1>

          <p className="mt-3 text-slate-300">
            Manage your products, orders, sales and customer activity.
          </p>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(([title, value]) => (
            <article
              key={title}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
            >
              <p className="text-sm text-slate-500">
                {title}
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                {value}
              </h2>
            </article>
          ))}
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/seller/products"
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 hover:ring-purple-300"
          >
            <h2 className="font-bold">Products</h2>
            <p className="mt-2 text-sm text-slate-500">
              Add, edit and delete products.
            </p>
          </Link>

          <Link
            to="/seller/orders"
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 hover:ring-purple-300"
          >
            <h2 className="font-bold">Orders</h2>
            <p className="mt-2 text-sm text-slate-500">
              View customer orders.
            </p>
          </Link>

          <Link
            to="/seller/reviews"
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 hover:ring-purple-300"
          >
            <h2 className="font-bold">Reviews</h2>
            <p className="mt-2 text-sm text-slate-500">
              See customer reviews.
            </p>
          </Link>

          <Link
            to="/seller/profile"
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 hover:ring-purple-300"
          >
            <h2 className="font-bold">Store Profile</h2>
            <p className="mt-2 text-sm text-slate-500">
              Manage store information.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default SellerDashboard;