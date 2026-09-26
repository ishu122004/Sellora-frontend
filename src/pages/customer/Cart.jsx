//complete shopping cart page
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import { clearCart } from "../../redux/slices/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!items.length) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <p className="mt-6 text-gray-500">
            Your cart is empty.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            Your Cart
          </h1>

          <button
            onClick={() => dispatch(clearCart())}
            className="text-red-600"
          >
            Clear Cart
          </button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <section className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <CartItem
                key={item._id}
                item={item}
              />
            ))}
          </section>

          <CartSummary total={total} />
        </div>
      </div>
    </main>
  );
}

export default Cart;