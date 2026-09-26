//customer previous order
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import { fetchOrders } from "../../redux/slices/orderSlice";
import OrderCard from "../../components/order/OrderCard";
import { auth } from "../../firebase/firebaseConfig";

function Orders() {
  const dispatch = useDispatch();

  const {
    orders = [],
    loading,
    error
  } = useSelector((state) => state.order);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          dispatch(fetchOrders());
        }
      }
    );

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-900">
          My Orders
        </h1>

        {loading && (
          <p className="mt-6 text-gray-600">
            Loading orders...
          </p>
        )}

        {error && (
          <p className="mt-6 text-red-600">
            {error}
          </p>
        )}

        {!loading &&
          !error &&
          !orders.length && (
            <div className="mt-8 rounded-2xl bg-white p-8 text-center">
              <h2 className="text-xl font-semibold">
                No orders yet
              </h2>

              <p className="mt-2 text-gray-500">
                Your completed purchases will
                appear here.
              </p>
            </div>
          )}

        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Orders;