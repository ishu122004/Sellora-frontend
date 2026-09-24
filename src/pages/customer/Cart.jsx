//complete shopping cart page
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;

    const updated = cart.map((item) =>
      item._id === id ? { ...item, quantity } : item
    );

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="mt-8 rounded-xl bg-white p-8 text-center">
            <p className="text-gray-500">Your cart is empty.</p>

            <Link
              to="/products"
              className="mt-5 inline-block rounded-lg bg-black px-5 py-3 text-white"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {cart.map((item) => (
                <article
                  key={item._id}
                  className="flex gap-4 rounded-xl bg-white p-4 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h2 className="font-semibold">{item.name}</h2>

                    <p className="mt-1 font-medium">
                      ₹{item.price}
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            item.quantity - 1
                          )
                        }
                        className="rounded border px-3 py-1"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            item.quantity + 1
                          )
                        }
                        className="rounded border px-3 py-1"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeItem(item._id)}
                        className="ml-3 text-sm text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">Summary</h2>

              <div className="mt-5 flex justify-between">
                <span>Total</span>
                <span className="font-bold">₹{total}</span>
              </div>

              <Link
                to="/checkout"
                className="mt-6 block rounded-lg bg-purple-600 px-5 py-3 text-center font-medium text-white"
              >
                Proceed to Checkout
              </Link>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

export default Cart;