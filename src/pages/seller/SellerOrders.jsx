//seller sees orders containing their products
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import api from "../../services/api";

function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await api.get(
          `/orders/seller/${auth.currentUser.uid}`
        );

        setOrders(res.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  if (loading) {
    return <p className="p-8">Loading orders...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 md:px-8">

      <section className="mx-auto max-w-6xl">

        <div className="mb-8">
          <p className="text-sm text-purple-600">
            Seller
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            Customer Orders
          </h1>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center">
            <h2 className="text-xl font-semibold">
              No orders for your products
            </h2>
          </div>
        ) : (
          <div className="space-y-5">

            {orders.map((order) => (
              <article
                key={order._id}
                className="rounded-2xl border bg-white p-6 shadow-sm"
              >

                <div className="flex justify-between border-b pb-4">
                  <div>
                    <p className="text-xs text-gray-500">
                      Order ID
                    </p>

                    <p className="font-medium">
                      {order._id}
                    </p>
                  </div>

                  <span className="rounded-full bg-purple-50 px-4 py-1 text-sm text-purple-700">
                    {order.status}
                  </span>
                </div>

                <div className="mt-5 space-y-4">

                  {order.items.map((item) => (
                    <div
                      key={item.product}
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
                    >
                      <div>
                        <h3 className="font-semibold">
                          {item.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>

                      <p className="font-bold">
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