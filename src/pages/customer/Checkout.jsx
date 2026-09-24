//customer confirms
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("COD");

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!cart.length) {
      alert("Your cart is empty");
      return;
    }

    if (!address.trim()) {
      alert("Please enter your address");
      return;
    }

    const order = {
      id: Date.now(),
      items: cart,
      totalAmount: total,
      address,
      payment,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    const orders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    localStorage.setItem(
      "orders",
      JSON.stringify([...orders, order])
    );

    localStorage.removeItem("cart");

    navigate("/order-success");
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">Checkout</h1>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl bg-white p-6">
            <h2 className="text-xl font-semibold">
              Delivery Address
            </h2>

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter delivery address"
              className="mt-5 min-h-32 w-full rounded-lg border px-4 py-3"
            />

            <h2 className="mt-6 text-xl font-semibold">
              Payment Method
            </h2>

            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              className="mt-4 w-full rounded-lg border px-4 py-3"
            >
              <option value="COD">Cash on Delivery</option>
              <option value="Online">Online Payment</option>
            </select>
          </section>

          <section className="h-fit rounded-xl bg-white p-6">
            <h2 className="text-xl font-semibold">
              Order Summary
            </h2>

            <div className="mt-5 space-y-3">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between border-t pt-5 text-lg font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-6 w-full rounded-lg bg-purple-600 px-5 py-3 font-medium text-white"
            >
              Place Order
            </button>
          </section>
        </div>
      </section>
    </main>
  );
}

export default Checkout;