//show complete information about one order
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    const found = orders.find(
      (item) => String(item.id) === String(id)
    );

    setOrder(found);
  }, [id]);

  if (!order) {
    return (
      <main className="min-h-screen bg-gray-50 p-10">
        <p>Order not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">
          Order Details
        </h1>

        <div className="mt-6 rounded-xl bg-white p-6">
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>

          <p className="mt-2">
            <strong>Status:</strong> {order.status}
          </p>

          <p className="mt-2">
            <strong>Payment:</strong> {order.payment}
          </p>

          <p className="mt-2">
            <strong>Address:</strong> {order.address}
          </p>

          <div className="mt-6 space-y-4 border-t pt-5">
            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 border-t pt-5 text-xl font-bold">
            Total: ₹{order.totalAmount}
          </p>

          <Link
            to="/orders"
            className="mt-5 inline-block rounded-lg bg-black px-5 py-3 text-white"
          >
            Back to Orders
          </Link>
        </div>
      </section>
    </main>
  );
}

export default OrderDetails;