//customer previous order
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(
      JSON.parse(localStorage.getItem("orders") || "[]")
    );
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">My Orders</h1>

        <div className="mt-8 space-y-4">
          {orders.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center">
              <p className="text-gray-500">No orders yet.</p>

              <Link
                to="/products"
                className="mt-5 inline-block rounded-lg bg-black px-5 py-3 text-white"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            orders.map((order) => (
              <article
                key={order.id}
                className="rounded-xl bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap justify-between gap-3">
                  <div>
                    <p className="font-semibold">
                      Order #{order.id}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ₹{order.totalAmount}
                  </p>
                </div>

                <p className="mt-3 text-sm">
                  Status:{" "}
                  <span className="font-medium">
                    {order.status}
                  </span>
                </p>

                <Link
                  to={`/orders/${order.id}`}
                  className="mt-4 inline-block text-sm font-medium text-purple-600"
                >
                  View Order
                </Link>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default Orders;