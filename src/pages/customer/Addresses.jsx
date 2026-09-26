//shows saved delivery addresses
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import api from "../../services/api";
import { auth } from "../../firebase/firebaseConfig";

function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (!user) {
          setLoading(false);
          return;
        }

        try {
          const res = await api.get(
            "/addresses"
          );

          setAddresses(res.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const removeAddress = async (id) => {
    if (!window.confirm("Remove this address?")) {
      return;
    }

    try {
      await api.delete(
        `/addresses/${id}`
      );

      setAddresses((current) =>
        current.filter(
          (item) => item._id !== id
        )
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to remove address"
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <section className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-purple-600">
              Account
            </p>

            <h1 className="mt-1 text-3xl font-bold">
              My Addresses
            </h1>
          </div>

          <Link
            to="/addresses/add"
            className="rounded-xl bg-black px-5 py-3 text-center font-medium text-white hover:bg-purple-600"
          >
            + Add Address
          </Link>
        </div>

        {loading && (
          <p className="mt-8 text-gray-500">
            Loading addresses...
          </p>
        )}

        {!loading && (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {addresses.map((item) => (
              <article
                key={item._id}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
              >
                <div className="flex items-start justify-between">
                  <h2 className="font-bold">
                    {item.name}
                  </h2>

                  <span className="rounded-full bg-purple-50 px-3 py-1 text-xs text-purple-700">
                    Delivery
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  {item.phone}
                </p>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {item.addressLine}
                  <br />
                  {item.city}, {item.state}
                  <br />
                  {item.pincode}
                </p>

                <button
                  onClick={() =>
                    removeAddress(item._id)
                  }
                  className="mt-5 text-sm font-medium text-red-600"
                >
                  Remove
                </button>
              </article>
            ))}

            {!addresses.length && (
              <div className="rounded-2xl bg-white p-8 text-center text-slate-500 md:col-span-2">
                No addresses added yet.
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

export default Addresses;