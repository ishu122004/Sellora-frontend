//admin views one complete order
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import OrderItem from "../../components/order/OrderItem";
import OrderStatus from "../../components/order/OrderStatus";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/admin/orders/${id}`)
      .then((res) => setOrder(res.data))
      .catch(console.error);
  }, [id]);

  if (!order) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl rounded-xl border bg-white p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">
            Order Details
          </h1>

          <OrderStatus status={order.status} />
        </div>

        <div className="mt-6">
          {order.items?.map((item, index) => (
            <OrderItem
              key={item.productId || index}
              item={item}
            />
          ))}
        </div>

        <p className="mt-6 text-xl font-bold">
          Total: ₹{order.totalAmount}
        </p>
      </div>
    </main>
  );
}

export default OrderDetails;