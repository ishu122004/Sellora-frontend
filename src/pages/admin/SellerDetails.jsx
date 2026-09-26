import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SafeImage from "../../components/common/SafeImage";
import formatPrice from "../../utils/formatPrice";
import api from "../../services/api";

function SellerDetails() {
  const { id } = useParams();
  const [seller, setSeller] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/admin/sellers/${id}`)
      .then((response) => setSeller(response.data))
      .catch((requestError) => {
        setError(
          requestError.response?.data?.message ||
          "Failed to load seller"
        );
      });
  }, [id]);

  if (error) {
    return <main className="min-h-screen p-8 text-red-600">{error}</main>;
  }

  if (!seller) {
    return <main className="min-h-screen p-8">Loading seller...</main>;
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-8">
      <section className="mx-auto max-w-6xl">
        <Link
          to="/admin/sellers"
          className="text-sm font-medium text-purple-600"
        >
          Back to sellers
        </Link>

        <div className="mt-5 flex flex-col gap-5 rounded-lg border border-slate-200 bg-white p-6 sm:flex-row sm:items-center">
          <SafeImage
            src={seller.store?.image || seller.image}
            alt={seller.store?.storeName || seller.name}
            className="h-24 w-24 rounded-full object-cover"
            fallbackClassName="h-24 w-24 rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold">
              {seller.store?.storeName || seller.name}
            </h1>
            <p className="mt-1 text-slate-500">
              {seller.name} · {seller.email}
            </p>
            <p className="mt-3 max-w-2xl text-slate-600">
              {seller.store?.description ||
                "No store description provided."}
            </p>
          </div>
        </div>

        <h2 className="mt-8 text-xl font-bold">
          Products ({seller.products.length})
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {seller.products.map((product) => (
            <article
              key={product._id}
              className="rounded-lg border border-slate-200 bg-white p-5"
            >
              <SafeImage
                src={product.images?.[0] || product.image}
                alt={product.name}
                className="aspect-video w-full rounded object-cover"
                fallbackClassName="aspect-video w-full rounded"
              />
              <h3 className="mt-4 font-semibold">{product.name}</h3>
              <p className="mt-1 text-slate-500">
                {formatPrice(product.price)} · {product.stock} in stock
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default SellerDetails;
