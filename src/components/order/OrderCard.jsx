//display one order in the customer order list
import { Link } from "react-router-dom";
import OrderStatus from "./OrderStatus";

function OrderCard({ order }) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            Order ID
          </p>

          <h2 className="font-semibold">
            {order._id}
          </h2>
        </div>

        <OrderStatus status={order.status} />
      </div>

      <div className="mt-5 flex justify-between">
        <span className="text-gray-500">
          {order.items?.length || 0} item(s)
        </span>

        <span className="font-bold">
          ₹{order.totalAmount}
        </span>
      </div>

      <Link
        to={`/orders/${order._id}`}
        className="mt-5 inline-block text-sm font-medium text-purple-600"
      >
        View Order
      </Link>
    </article>
  );
}

export default OrderCard;