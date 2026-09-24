//payment setup
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();

  const [method, setMethod] = useState("COD");

  const handlePayment = () => {
    if (method === "COD") {
      navigate("/order-success");
      return;
    }

    alert("Online payment integration will be added later.");
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-xl rounded-xl bg-white p-6">
        <h1 className="text-2xl font-bold">Payment</h1>

        <div className="mt-6 space-y-3">
          <label className="flex gap-3 rounded-lg border p-4">
            <input
              type="radio"
              checked={method === "COD"}
              onChange={() => setMethod("COD")}
            />
            Cash on Delivery
          </label>

          <label className="flex gap-3 rounded-lg border p-4">
            <input
              type="radio"
              checked={method === "Online"}
              onChange={() => setMethod("Online")}
            />
            Online Payment
          </label>
        </div>

        <button
          onClick={handlePayment}
          className="mt-6 w-full rounded-lg bg-purple-600 px-5 py-3 text-white"
        >
          Continue
        </button>
      </section>
    </main>
  );
}

export default Payment;