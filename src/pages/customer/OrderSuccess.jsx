//show after successfull order
import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <section className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm">
        <div className="text-5xl">✓</div>

        <h1 className="mt-5 text-3xl font-bold">
          Order Placed Successfully
        </h1>

        <p className="mt-3 text-gray-500">
          Thank you for shopping with MarketHub.
        </p>

        <div className="mt-7 flex justify-center gap-3">
          <Link
            to="/orders"
            className="rounded-lg bg-black px-5 py-3 text-white"
          >
            View Orders
          </Link>

          <Link
            to="/products"
            className="rounded-lg border px-5 py-3"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    </main>
  );
}

export default OrderSuccess;