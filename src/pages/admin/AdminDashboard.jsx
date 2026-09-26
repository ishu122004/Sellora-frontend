//overall market place statistics
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminStats, fetchAdminUsers, fetchAdminSellers, fetchAdminOrders } from "../../redux/slices/adminSlice";

function AdminDashboard() {
  const dispatch = useDispatch();

  const { stats, loading, error } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(fetchAdminStats());
    dispatch(fetchAdminUsers());
    dispatch(fetchAdminSellers());
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  const cards = [
    {
      title: "Customers",
      value: stats.totalCustomers,
      text: "Registered customers"
    },
    {
      title: "Sellers",
      value: stats.totalSellers,
      text: "Active sellers"
    },
    {
      title: "Products",
      value: stats.totalProducts,
      text: "Marketplace products"
    },
    {
      title: "Orders",
      value: stats.totalOrders,
      text: "Total orders"
    },
    {
      title: "Wishlists",
      value: stats.totalWishlists,
      text: "Customer wishlists"
    },
    {
      title: "Revenue",
      value: `₹${stats.totalRevenue.toLocaleString("en-IN")}`,
      text: "Marketplace revenue"
    }
  ];

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-slate-500">Loading dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-black p-7 text-white md:p-10">
          <p className="text-sm font-medium text-purple-300">
            Sellora Admin
          </p>

          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Marketplace Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
            Monitor customers, sellers, products, orders and marketplace
            activity from one place.
          </p>
        </div>

        {error && (
          <p className="mt-5 rounded-xl bg-red-50 p-4 text-red-600">
            {error}
          </p>
        )}

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-slate-500">
                {card.title}
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                {card.value}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                {card.text}
              </p>
            </article>
          ))}
        </div>

        <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                Recent Orders
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Latest marketplace orders
              </p>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-175 text-left">
              <thead>
                <tr className="border-b text-sm text-slate-500">
                  <th className="pb-4">Order</th>
                  <th className="pb-4">Customer</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {stats.recentOrders?.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b last:border-0"
                  >
                    <td className="py-4 font-medium">
                      #{order._id.slice(-6).toUpperCase()}
                    </td>

                    <td className="py-4 text-slate-600">
                      {order.customerId}
                    </td>

                    <td className="py-4 font-semibold">
                      ₹{order.totalAmount}
                    </td>

                    <td className="py-4">
                      <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}

                {!stats.recentOrders?.length && (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-10 text-center text-slate-500"
                    >
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}

export default AdminDashboard;