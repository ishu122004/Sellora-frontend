//show complete information about one order
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  fetchOrder
} from "../../redux/slices/orderSlice";

import OrderItem from "../../components/order/OrderItem";
import OrderStatus from "../../components/order/OrderStatus";

function OrderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    selectedOrder,
    loading,
    error
  } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrder(id));
  }, [dispatch, id]);

  if (loading || !selectedOrder) {
    return (
      <main className="min-h-screen p-6">
        <p>Loading order...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen p-6">
        <p className="text-red-600">
          {error}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-6">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Order Details
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Order ID: {selectedOrder._id}
            </p>
          </div>

          <OrderStatus
            status={selectedOrder.status}
          />
        </div>

        <div className="mt-6">
          {selectedOrder.items?.map(
            (item, index) => (
              <OrderItem
                key={
                  item.productId || index
                }
                item={item}
              />
            )
          )}
        </div>

        <div className="mt-6 border-t pt-5">
          <p className="text-xl font-bold">
            Total: ₹{selectedOrder.totalAmount}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Payment:{" "}
            {selectedOrder.paymentStatus}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Delivery Address:{" "}
            {selectedOrder.address}
          </p>
        </div>
      </div>
    </main>
  );
}

export default OrderDetails;