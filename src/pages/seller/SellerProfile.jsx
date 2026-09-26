import { useEffect, useState } from "react";
import SafeImage from "../../components/common/SafeImage";
import { PRODUCT_CATEGORIES } from "../../utils/constants";
import { auth } from "../../firebase/firebaseConfig";
import api from "../../services/api";

function SellerProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
    storeName: "",
    category: "",
    description: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      return;
    }

    api.get(`/sellers/${user.uid}/profile`)
      .then((response) => setProfile(response.data))
      .catch((requestError) => {
        setError(
          requestError.response?.data?.message ||
          "Failed to load store profile"
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (event) => {
    setProfile((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      const response = await api.put(
        `/sellers/${auth.currentUser.uid}/profile`,
        profile
      );
      setProfile(response.data);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        "Store profile update failed"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        Loading store profile...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <section className="mx-auto max-w-4xl rounded-lg border border-slate-200 bg-white p-7">
        <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
          <SafeImage
            src={profile.image}
            alt={profile.storeName || "Store"}
            className="h-24 w-24 rounded-full object-cover"
            fallbackClassName="h-24 w-24 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-purple-600">
              Seller center
            </p>
            <h1 className="mt-1 text-3xl font-bold">
              Store profile
            </h1>
            <p className="mt-1 text-slate-500">
              {profile.email}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 grid gap-5 md:grid-cols-2"
        >
          {[
            ["name", "Your name"],
            ["phone", "Business phone"],
            ["storeName", "Store name"],
            ["image", "Store logo URL"]
          ].map(([name, label]) => (
            <label key={name} className="block">
              <span className="mb-2 block text-sm font-medium">
                {label}
              </span>
              <input
                name={name}
                type={name === "image" ? "url" : "text"}
                value={profile[name] || ""}
                onChange={handleChange}
                required={name !== "image"}
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />
            </label>
          ))}

          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-medium">
              Primary category
            </span>
            <select
              name="category"
              value={profile.category || ""}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            >
              <option value="">Select category</option>
              {PRODUCT_CATEGORIES.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>

          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-medium">
              Store description
            </span>
            <textarea
              name="description"
              value={profile.description || ""}
              onChange={handleChange}
              rows="5"
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </label>

          {error ? (
            <p className="text-sm text-red-600 md:col-span-2">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white disabled:opacity-50 md:col-span-2"
          >
            {saving ? "Saving..." : "Save store profile"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default SellerProfile;
