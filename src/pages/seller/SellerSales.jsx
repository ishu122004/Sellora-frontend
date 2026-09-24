//seller sales information
import { useEffect, useState } from "react";
import api from "../../services/api";

function SellerSales() {
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

  const revenue = orders.reduce(
    (sum, order) => sum + Number(order.totalAmount || 0),
    0
  );

  const productsSold = orders.reduce(
    (sum, order) =>
      sum +
      (order.items || []).reduce(
        (itemSum, item) =>
          itemSum + Number(item.quantity || 0),
        0
      ),
    0
  );

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">
          Sales
        </h1>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-6">
            <p className="text-sm text-gray-500">
              Total Revenue
            </p>
            <p className="mt-2 text-2xl font-bold">
              ₹{revenue}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6">
            <p className="text-sm text-gray-500">
              Total Orders
            </p>
            <p className="mt-2 text-2xl font-bold">
              {orders.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6">
            <p className="text-sm text-gray-500">
              Products Sold
            </p>
            <p className="mt-2 text-2xl font-bold">
              {productsSold}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SellerSales;