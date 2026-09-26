//seller sees orders containing their products
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import api from "../../services/api";
import { auth } from "../../firebase/firebaseConfig";

function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (!user) {
          setLoading(false);
          return;
        }

        try {
          const res = await api.get(
            `/sellers/${user.uid}/orders`
          );

          setOrders(res.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-8">
        Loading orders...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">
          Seller Orders
        </h1>

        {!orders.length ? (
          <div className="mt-8 rounded-2xl bg-white p-10 text-center">
            <h2 className="text-xl font-semibold">
              No orders yet
            </h2>

            <p className="mt-2 text-gray-500">
              Orders containing your products will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            {orders.map((order) => (
              <article
                key={order._id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap justify-between gap-3">
                  <div>
                    <p className="font-semibold">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Customer: {order.customerId}
                    </p>
                  </div>

                  <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                    {order.status}
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  {order.items
                    .filter(
                      (item) =>
                        item.sellerId === auth.currentUser?.uid
                    )
                    .map((item) => (
                      <div
                        key={item.productId}
                        className="flex justify-between border-t pt-3"
                      >
                        <div>
                          <p className="font-medium">
                            {item.name}
                          </p>

                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>

                        <p className="font-semibold">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default SellerOrders;