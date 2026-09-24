//seller sales information
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import api from "../../services/api";

function SellerSales() {
  const [sales, setSales] = useState({
    orders: 0,
    quantity: 0,
    revenue: 0
  });

  useEffect(() => {
    const getSales = async () => {
      try {
        const res = await api.get(
          `/orders/seller/${auth.currentUser.uid}`
        );

        let quantity = 0;
        let revenue = 0;

        res.data.forEach((order) => {
          order.items.forEach((item) => {
            quantity += item.quantity;
            revenue += item.price * item.quantity;
          });
        });

        setSales({
          orders: res.data.length,
          quantity,
          revenue
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    getSales();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 md:px-8">

      <section className="mx-auto max-w-7xl">

        <div className="mb-8">
          <p className="text-sm text-purple-600">
            Seller
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            Sales Overview
          </h1>
        </div>

        <div className="grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Orders
            </p>

            <p className="mt-2 text-3xl font-bold">
              {sales.orders}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Products Sold
            </p>

            <p className="mt-2 text-3xl font-bold">
              {sales.quantity}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Sales
            </p>

            <p className="mt-2 text-3xl font-bold text-purple-600">
              ₹{sales.revenue}
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}

export default SellerSales;