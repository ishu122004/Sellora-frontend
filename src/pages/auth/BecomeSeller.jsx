import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SafeImage from "../../components/common/SafeImage";
import { PRODUCT_CATEGORIES } from "../../utils/constants";
import api from "../../services/api";

function BecomeSeller() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    storeName: "",
    phone: "",
    category: "",
    description: "",
    image: ""
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      await api.post("/sellers/onboard", form);
      navigate("/seller");
      window.location.reload();
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        "Failed to create seller account"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <section className="mx-auto max-w-2xl">
        <p className="text-sm font-medium text-purple-600">
          Seller onboarding
        </p>
        <h1 className="mt-1 text-3xl font-bold">
          Open your Sellora store
        </h1>
        <p className="mt-2 text-slate-500">
          Your customer account will become a seller account immediately.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-7 space-y-5 rounded-lg border border-slate-200 bg-white p-6"
        >
          {form.image ? (
            <SafeImage
              src={form.image}
              alt={form.storeName || "Store"}
              className="h-24 w-24 rounded-full object-cover"
              fallbackClassName="h-24 w-24 rounded-full"
            />
          ) : null}

          <input
            name="storeName"
            placeholder="Store name"
            value={form.storeName}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3"
          />
          <input
            name="phone"
            type="tel"
            placeholder="Business phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3"
          >
            <option value="">Primary category</option>
            {PRODUCT_CATEGORIES.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
          <input
            name="image"
            type="url"
            placeholder="Store logo or profile image URL"
            value={form.image}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3"
          />
          <textarea
            name="description"
            placeholder="Tell customers about your store"
            value={form.description}
            onChange={handleChange}
            rows="5"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3"
          />

          {error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-lg bg-purple-600 py-3 font-medium text-white disabled:opacity-50"
          >
            {saving ? "Creating store..." : "Create seller account"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default BecomeSeller;
