//shows saved delivery addresses
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Addresses() {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    setAddresses(
      JSON.parse(localStorage.getItem("addresses") || "[]")
    );
  }, []);

  const removeAddress = (id) => {
    const updated = addresses.filter((item) => item.id !== id);

    setAddresses(updated);
    localStorage.setItem("addresses", JSON.stringify(updated));
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Addresses</h1>

          <Link
            to="/addresses/add"
            className="rounded-lg bg-black px-4 py-2 text-white hover:bg-purple-600"
          >
            Add Address
          </Link>
        </div>

        <div className="mt-8 space-y-4">
          {addresses.length === 0 ? (
            <p className="rounded-xl bg-white p-6 text-gray-500">
              No addresses added.
            </p>
          ) : (
            addresses.map((item) => (
              <article
                key={item.id}
                className="rounded-xl bg-white p-5 shadow-sm"
              >
                <h2 className="font-semibold">{item.name}</h2>
                <p className="mt-1 text-gray-600">{item.phone}</p>
                <p className="mt-2 text-gray-600">{item.address}</p>
                <p className="text-gray-600">
                  {item.city}, {item.state} - {item.pincode}
                </p>

                <button
                  onClick={() => removeAddress(item.id)}
                  className="mt-4 text-sm text-red-600"
                >
                  Remove
                </button>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default Addresses;