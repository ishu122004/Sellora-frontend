// Displays total cart calculation.
// Subtotal     ₹4,000
// Delivery     ₹100
// ------------------
// Total        ₹4,100
// Checkout
import { useNavigate } from "react-router-dom";

function CartSummary({ total }) {
  const navigate = useNavigate();

  return (
    <section className="h-fit rounded-2xl bg-white p-6">
      <h2 className="text-xl font-bold">
        Order Summary
      </h2>

      <div className="mt-5 flex justify-between">
        <span>Total</span>
        <span className="font-bold">₹{total}</span>
      </div>

      <button
        onClick={() => navigate("/checkout")}
        className="mt-6 w-full rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700"
      >
        Proceed to Checkout
      </button>
    </section>
  );
}

export default CartSummary;