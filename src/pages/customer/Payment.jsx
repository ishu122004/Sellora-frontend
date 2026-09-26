//payment setup
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import api from "../../services/api";
import { auth } from "../../firebase/firebaseConfig";
import { clearCart } from "../../redux/slices/cartSlice";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const items = location.state?.items || [];
  const address = location.state?.address || "";
  const isBuyNow = location.state?.isBuyNow || false;

  const [loading, setLoading] = useState(false);
  const [razorpayReady, setRazorpayReady] = useState(false);

  const total = items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const script = document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    script.onload = () => {
      setRazorpayReady(true);
    };

    script.onerror = () => {
      alert("Unable to load Razorpay");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
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
        alert("Delivery address is missing");
        navigate("/checkout");
        return;
      }

      if (!razorpayReady || !window.Razorpay) {
        alert(
          "Payment system is still loading. Please try again."
        );
        return;
      }

      setLoading(true);

      const orderResponse = await api.post(
        "/orders/razorpay/order",
        {
          items: items.map((item) => ({
            productId: item._id,
            quantity: item.quantity
          }))
        }
      );

      const razorpayOrder = orderResponse.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Sellora",
        description: "Sellora Purchase",
        order_id: razorpayOrder.id,

        handler: async function (response) {
          try {
            const verifyResponse = await api.post(
              "/orders/razorpay/verify",
              {
                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,

                items: items.map((item) => ({
                  productId: item._id,
                  quantity: item.quantity
                })),

                address
              }
            );

            if (verifyResponse.data.order) {
              if (!isBuyNow) {
                dispatch(clearCart());
              }

              navigate("/order-success");
            }
          } catch (error) {
            alert(
              error.response?.data?.message ||
              "Payment verification failed"
            );
          } finally {
            setLoading(false);
          }
        },

        prefill: {
          name: user.displayName || "",
          email: user.email || "",
          contact: user.phoneNumber || ""
        },

        theme: {
          color: "#7c3aed"
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        function (response) {
          console.log(
            "Payment failed:",
            response.error
          );

          setLoading(false);

          alert(
            response.error?.description ||
            "Payment failed"
          );
        }
      );

      razorpay.open();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Unable to start payment"
      );

      setLoading(false);
    }
  };

  if (!items.length) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <section className="mx-auto max-w-xl rounded-xl bg-white p-6">
          <h1 className="text-2xl font-bold">
            Payment
          </h1>

          <p className="mt-5 text-gray-500">
            No products selected.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-xl rounded-xl bg-white p-6">
        <h1 className="text-2xl font-bold">
          Payment
        </h1>

        <div className="mt-6 rounded-lg border p-4">
          <p className="text-sm text-gray-500">
            Delivery Address
          </p>

          <p className="mt-2">{address}</p>
        </div>

        <div className="mt-6 rounded-lg border p-4">
          <div className="flex justify-between">
            <span>Total Amount</span>

            <span className="font-bold">
              ₹{total}
            </span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading || !razorpayReady}
          className="mt-6 w-full rounded-lg bg-purple-600 px-5 py-3 font-medium text-white hover:bg-purple-700 disabled:opacity-50"
        >
          {!razorpayReady
            ? "Loading Payment..."
            : loading
            ? "Processing..."
            : `Pay ₹${total}`}
        </button>
      </section>
    </main>
  );
}

export default Payment;