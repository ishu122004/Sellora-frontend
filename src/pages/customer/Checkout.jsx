//customer confirms
import { useSelector } from "react-redux";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const buyNowItems = location.state?.buyNowItems || null;

  const items = buyNowItems || cartItems;

  const isBuyNow = Boolean(buyNowItems);

  const [address, setAddress] = useState("");

  const total = items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const handleContinue = () => {
    if (!auth.currentUser) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (!items.length) {
      alert("No products selected");
      navigate("/products");
      return;
    }

    if (!address.trim()) {
      alert("Please enter your delivery address");
      return;
    }

    navigate("/payment", {
      state: {
        items,
        address,
        isBuyNow
      }
    });
  };

  if (!items.length) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold">
            Checkout
          </h1>

          <p className="mt-6 text-gray-500">
            No products selected.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">
          Checkout
        </h1>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl bg-white p-6">
            <h2 className="text-xl font-semibold">
              Delivery Address
            </h2>

            <textarea
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              placeholder="Enter delivery address"
              className="mt-5 min-h-32 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </section>

          <section className="h-fit rounded-xl bg-white p-6">
            <h2 className="text-xl font-semibold">
              Order Summary
            </h2>

            <div className="mt-5 space-y-3">
              {items.map((item) => (
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
              onClick={handleContinue}
              className="mt-6 w-full rounded-lg bg-purple-600 px-5 py-3 font-medium text-white hover:bg-purple-700"
            >
              Continue to Payment
            </button>
          </section>
        </div>
      </section>
    </main>
  );
}

export default Checkout;