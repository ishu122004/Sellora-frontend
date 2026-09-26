import { useEffect, useState } from "react";
import SafeImage from "../../components/common/SafeImage";
import api from "../../services/api";

function Profile({ user }) {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    image: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.uid) {
      return;
    }

    api.get(`/users/${user.uid}`)
      .then((response) => {
        setProfile({
          name: response.data.name || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          image: response.data.image || ""
        });
      })
      .catch((requestError) => {
        setError(
          requestError.response?.data?.message ||
          "Failed to load profile"
        );
      })
      .finally(() => setLoading(false));
  }, [user]);

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
        `/users/${user.uid}`,
        {
          name: profile.name,
          phone: profile.phone,
          image: profile.image
        }
      );
      setProfile(response.data);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        "Profile update failed"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        Loading profile...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <section className="mx-auto max-w-3xl">
        <div className="rounded-lg border border-slate-200 bg-white p-7">
          <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
            <SafeImage
              src={profile.image}
              alt={profile.name || "Customer"}
              className="h-24 w-24 rounded-full object-cover"
              fallbackClassName="h-24 w-24 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-purple-600">
                Account settings
              </p>
              <h1 className="mt-1 text-3xl font-bold">
                My profile
              </h1>
              <p className="mt-1 text-slate-500">
                {profile.email}
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >
            <label className="block">
              <span className="mb-2 block text-sm font-medium">
                Full name
              </span>
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">
                Phone
              </span>
              <input
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">
                Profile image URL
              </span>
              <input
                name="image"
                type="url"
                value={profile.image}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />
            </label>

            {error ? (
              <p className="text-sm text-red-600">{error}</p>
            ) : null}

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save profile"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Profile;
