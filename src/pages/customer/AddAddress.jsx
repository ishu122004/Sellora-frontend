//from to add a new delivery address
import { useState } from "react";

function AddAddress() {
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const addresses = JSON.parse(
      localStorage.getItem("addresses") || "[]"
    );

    localStorage.setItem(
      "addresses",
      JSON.stringify([...addresses, { ...address, id: Date.now() }])
    );

    alert("Address added successfully");

    setAddress({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: ""
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Add Address</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            name="name"
            value={address.name}
            onChange={handleChange}
            placeholder="Full name"
            required
            className="w-full rounded-lg border px-4 py-3"
          />

          <input
            name="phone"
            value={address.phone}
            onChange={handleChange}
            placeholder="Phone number"
            required
            className="w-full rounded-lg border px-4 py-3"
          />

          <textarea
            name="address"
            value={address.address}
            onChange={handleChange}
            placeholder="Address"
            required
            className="w-full rounded-lg border px-4 py-3"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="city"
              value={address.city}
              onChange={handleChange}
              placeholder="City"
              required
              className="rounded-lg border px-4 py-3"
            />

            <input
              name="state"
              value={address.state}
              onChange={handleChange}
              placeholder="State"
              required
              className="rounded-lg border px-4 py-3"
            />
          </div>

          <input
            name="pincode"
            value={address.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            required
            className="w-full rounded-lg border px-4 py-3"
          />

          <button className="w-full rounded-lg bg-black px-5 py-3 font-medium text-white hover:bg-purple-600">
            Save Address
          </button>
        </form>
      </section>
    </main>
  );
}

export default AddAddress;