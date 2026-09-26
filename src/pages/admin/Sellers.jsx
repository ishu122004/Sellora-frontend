import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SafeImage from "../../components/common/SafeImage";
import api from "../../services/api";

function Sellers() {
  const [sellers, setSellers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/admin/sellers")
      .then((response) => setSellers(response.data))
      .catch((requestError) => {
        setError(
          requestError.response?.data?.message ||
          "Failed to load sellers"
        );
      });
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-8">
      <section className="mx-auto max-w-7xl">
        <p className="text-sm font-medium text-purple-600">
          Marketplace team
        </p>
        <h1 className="mt-1 text-3xl font-bold">Sellers</h1>
        <p className="mt-2 text-slate-500">
          Stores created through seller onboarding appear here.
        </p>

        {error ? (
          <p className="mt-6 rounded-lg bg-red-50 p-4 text-red-600">
            {error}
          </p>
        ) : null}

        <div className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead className="border-b bg-slate-50 text-sm text-slate-500">
                <tr>
                  <th className="p-4">Store</th>
                  <th className="p-4">Owner</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Products</th>
                  <th className="p-4">Joined</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {sellers.map((seller) => (
                  <tr
                    key={seller._id}
                    className="border-b last:border-0"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <SafeImage
                          src={seller.store?.image || seller.image}
                          alt={seller.store?.storeName || seller.name}
                          className="h-11 w-11 rounded-full object-cover"
                          fallbackClassName="h-11 w-11 rounded-full"
                        />
                        <span className="font-medium">
                          {seller.store?.storeName ||
                            seller.name ||
                            "Store"}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <p>{seller.name || "Not provided"}</p>
                      <p className="text-sm text-slate-500">
                        {seller.email}
                      </p>
                    </td>
                    <td className="p-4 text-slate-600">
                      {seller.store?.category || "General"}
                    </td>
                    <td className="p-4">{seller.productCount}</td>
                    <td className="p-4 text-slate-600">
                      {new Date(
                        seller.createdAt
                      ).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <Link
                        to={`/admin/sellers/${seller._id}`}
                        className="font-medium text-purple-600"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!sellers.length && !error ? (
            <p className="p-8 text-center text-slate-500">
              No sellers yet. A customer can use “Become a Seller”
              to create the first store.
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}

export default Sellers;
