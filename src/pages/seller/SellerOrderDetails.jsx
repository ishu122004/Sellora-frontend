//details of a particular seller order
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

function SellerOrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}`);

        setOrder(res.data);
        setStatus(res.data.status);
      } catch (error) {
        console.error(error);
      }
    };

    getOrder();
  }, [id]);

  const updateStatus = async () => {
    try {
      const res = await api.put(`/orders/${id}`, {
        status
      });

      setOrder(res.data);
      alert("Order status updated");
    } catch (error) {
      alert("Failed to update status");
    }
  };

  if (!order) {
    return <main className="p-10">Loading...</main>;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-4xl rounded-xl bg-white p-6">
        <h1 className="text-2xl font-bold">
          Order Details
        </h1>

        <p className="mt-4">
          Order ID: {order._id}
        </p>

        <div className="mt-6 space-y-4">
          {order.items?.map((item, index) => (
            <div
              key={item.productId || index}
              className="flex justify-between border-b pb-4"
            >
              <div>
                <p className="font-medium">
                  {item.name}
                </p>

                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              <p>
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xl font-bold">
          Total: ₹{order.totalAmount}
        </p>

        <div className="mt-6">
          <label className="text-sm font-medium">
            Order Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-2 w-full rounded-lg border px-4 py-3"
          >
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>

          <button
            onClick={updateStatus}
            className="mt-4 rounded-lg bg-purple-600 px-5 py-3 text-white"
          >
            Update Status
          </button>
        </div>
      </section>
    </main>
  );
}

export default SellerOrderDetails;