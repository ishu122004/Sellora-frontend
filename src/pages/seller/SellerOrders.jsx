//seller sees orders containing their products
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function SellerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const sellerId = localStorage.getItem("sellerId");

        const res = await api.get(
          `/orders/seller/${sellerId}`
        );

        setOrders(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getOrders();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">
          Seller Orders
        </h1>

        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <article
              key={order._id}
              className="rounded-xl bg-white p-5 shadow-sm"
            >
              <div className="flex justify-between">
                <p className="font-semibold">
                  Order #{order._id}
                </p>

                <p className="font-bold">
                  ₹{order.totalAmount}
                </p>
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Status: {order.status}
              </p>

              <Link
                to={`/seller/orders/${order._id}`}
                className="mt-4 inline-block text-purple-600"
              >
                View Details
              </Link>
            </article>
          ))}

          {!orders.length && (
            <p className="rounded-xl bg-white p-8 text-center text-gray-500">
              No seller orders found.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default SellerOrders;