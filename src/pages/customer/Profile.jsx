//customer profile
import { useState } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    phone: ""
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "profile",
      JSON.stringify(profile)
    );

    alert("Profile updated");
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-xl rounded-xl bg-white p-6">
        <h1 className="text-2xl font-bold">My Profile</h1>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          <input
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full rounded-lg border px-4 py-3"
          />

          <input
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full rounded-lg border px-4 py-3"
          />

          <button className="w-full rounded-lg bg-black px-5 py-3 text-white">
            Save Profile
          </button>
        </form>
      </section>
    </main>
  );
}

export default Profile;