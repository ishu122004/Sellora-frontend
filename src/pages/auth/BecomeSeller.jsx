//customer can request/become a seller
import { useState } from "react";

function BecomeSeller() {
  const [form, setForm] = useState({
    storeName: "",
    phone: "",
    category: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-lg border border-gray-200 rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">
          Become a Seller
        </h1>

        <p className="mt-2 text-gray-500">
          Start selling your products on MarketHub.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            name="storeName"
            placeholder="Store name"
            value={form.storeName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            name="phone"
            type="tel"
            placeholder="Phone number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            name="category"
            placeholder="Product category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <textarea
            name="description"
            placeholder="Tell us about your store"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white rounded-lg py-3 font-medium hover:bg-purple-700"
          >
            Submit Seller Application
          </button>
        </form>
      </section>
    </main>
  );
}

export default BecomeSeller;