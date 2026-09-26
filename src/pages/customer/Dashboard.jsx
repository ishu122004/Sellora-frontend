import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function Dashboard({ user }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboard = async () => {
      try {
        const res = await api.get(
          `/users/${user.uid}/dashboard`
        );

        setData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) {
      getDashboard();
    }
  }, [user]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        Loading dashboard...
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        Unable to load dashboard.
      </main>
    );
  }

  const profile = data.user;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-black p-7 text-white md:p-10">
          <p className="text-sm text-purple-300">
            Welcome back
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            {profile.name || "Customer"}
          </h1>

          <p className="mt-2 text-sm text-slate-300">
            {profile.email}
          </p>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <Link
            to="/orders"
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 hover:-translate-y-1 hover:ring-purple-300"
          >
            <p className="text-sm text-slate-500">
              My Orders
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {data.orderCount}
            </h2>

            <p className="mt-2 text-sm text-purple-600">
              View orders →
            </p>
          </Link>

          <Link
            to="/wishlist"
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 hover:-translate-y-1 hover:ring-purple-300"
          >
            <p className="text-sm text-slate-500">
              Wishlist
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {data.wishlistCount}
            </h2>

            <p className="mt-2 text-sm text-purple-600">
              View wishlist →
            </p>
          </Link>
        </div>

        <div className="mt-7 grid gap-7 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                Profile
              </h2>

              <Link
                to="/profile"
                className="text-sm font-medium text-purple-600"
              >
                Edit
              </Link>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs text-slate-400">Name</p>
                <p className="mt-1 font-medium">
                  {profile.name || "Not added"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">Email</p>
                <p className="mt-1 font-medium">
                  {profile.email}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">Phone</p>
                <p className="mt-1 font-medium">
                  {profile.phone || "Not added"}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                Delivery Address
              </h2>

              <Link
                to="/addresses"
                className="text-sm font-medium text-purple-600"
              >
                Manage
              </Link>
            </div>

            {data.addresses?.length ? (
              <div className="mt-5 rounded-xl bg-slate-50 p-5">
                <p className="font-semibold">
                  {data.addresses[0].name}
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  {data.addresses[0].phone}
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {data.addresses[0].addressLine},{" "}
                  {data.addresses[0].city},{" "}
                  {data.addresses[0].state} -{" "}
                  {data.addresses[0].pincode}
                </p>
              </div>
            ) : (
              <div className="mt-5 rounded-xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">
                  No address added.
                </p>

                <Link
                  to="/addresses/add"
                  className="mt-3 inline-block text-sm font-medium text-purple-600"
                >
                  Add address →
                </Link>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;