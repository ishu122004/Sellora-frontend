import { useEffect, useState } from "react";
import SafeImage from "../../components/common/SafeImage";
import api from "../../services/api";

function AdminProfile({ user }) {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    image: ""
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/users/${user.uid}`)
      .then((response) => setProfile(response.data))
      .catch((requestError) => {
        setError(
          requestError.response?.data?.message ||
          "Failed to load profile"
        );
      });
  }, [user.uid]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      const response = await api.put(
        `/users/${user.uid}`,
        profile
      );
      setProfile(response.data);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        "Failed to save profile"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <section className="mx-auto max-w-2xl rounded-lg border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-4">
          <SafeImage
            src={profile.image}
            alt={profile.name || "Admin"}
            className="h-20 w-20 rounded-full object-cover"
            fallbackClassName="h-20 w-20 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-purple-600">
              Administrator
            </p>
            <h1 className="text-2xl font-bold">Admin profile</h1>
            <p className="text-sm text-slate-500">{profile.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {[
            ["name", "Name"],
            ["phone", "Phone"],
            ["image", "Profile image URL"]
          ].map(([name, label]) => (
            <label key={name} className="block">
              <span className="mb-2 block text-sm font-medium">
                {label}
              </span>
              <input
                name={name}
                type={name === "image" ? "url" : "text"}
                value={profile[name] || ""}
                onChange={(event) =>
                  setProfile((current) => ({
                    ...current,
                    [name]: event.target.value
                  }))
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />
            </label>
          ))}

          {error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-lg bg-purple-600 py-3 font-medium text-white disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save profile"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default AdminProfile;
