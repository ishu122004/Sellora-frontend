//seller/store information
import { useState } from "react";

function SellerProfile() {
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    storeName: "",
    description: ""
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
      "sellerProfile",
      JSON.stringify(profile)
    );

    alert("Seller profile updated");
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-2xl rounded-xl bg-white p-6">
        <h1 className="text-2xl font-bold">
          Seller Profile
        </h1>

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

          <input
            name="storeName"
            value={profile.storeName}
            onChange={handleChange}
            placeholder="Store name"
            className="w-full rounded-lg border px-4 py-3"
          />

          <textarea
            name="description"
            value={profile.description}
            onChange={handleChange}
            placeholder="Store description"
            className="min-h-32 w-full rounded-lg border px-4 py-3"
          />

          <button className="w-full rounded-lg bg-black px-5 py-3 text-white">
            Save Profile
          </button>
        </form>
      </section>
    </main>
  );
}

export default SellerProfile;