import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { auth } from "../../firebase/firebaseConfig";

function SellerOrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await api.get(
          `/sellers/${auth.currentUser.uid}/orders/${id}`
        );

        setOrder(res.data);
        setStatus(res.data.status);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
          "Failed to load order"
        );
      }
    };

    getOrder();
  }, [id]);

  const updateStatus = async () => {
    try {
      setSaving(true);
      setError("");

      const res = await api.put(
        `/sellers/${auth.currentUser.uid}/orders/${id}`,
        { status }
      );

      setOrder(res.data);
      alert("Order status updated");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        "Failed to update status"
      );
    } finally {
      setSaving(false);
    }
  };

  if (error && !order) {
    return (
      <main className="min-h-screen p-10 text-red-600">
        {error}
      </main>
    );
  }

  if (!order) {
    return <main className="min-h-screen p-10">Loading...</main>;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-4xl rounded-xl bg-white p-6">
        <h1 className="text-2xl font-bold">Order Details</h1>
        <p className="mt-4">Order ID: {order._id}</p>

        <div className="mt-6 space-y-4">
          {order.items?.map((item, index) => (
            <div
              key={item.productId || index}
              className="flex justify-between border-b pb-4"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>
              <p>₹{item.price * item.quantity}</p>
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
            onChange={(event) => setStatus(event.target.value)}
            className="mt-2 w-full rounded-lg border px-4 py-3"
          >
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>

          {error ? (
            <p className="mt-3 text-sm text-red-600">{error}</p>
          ) : null}

          <button
            type="button"
            onClick={updateStatus}
            disabled={saving}
            className="mt-4 rounded-lg bg-purple-600 px-5 py-3 text-white disabled:opacity-50"
          >
            {saving ? "Updating..." : "Update Status"}
          </button>
        </div>
      </section>
    </main>
  );
}

export default SellerOrderDetails;
