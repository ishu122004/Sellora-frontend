//show one complete product
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import api from "../../services/api";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white px-6 py-12">
        <p>Loading product...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white px-6 py-12">
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-white px-6 py-12">
        <p>Product not found.</p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-12 md:grid-cols-2">
          <section className="flex min-h-112.5 items-center justify-center overflow-hidden rounded-2xl bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </section>

          <article className="py-4">
            <p className="text-sm font-semibold text-purple-600">
              {product.category}
            </p>

            <h1 className="mt-3 text-4xl font-bold">
              {product.name}
            </h1>

            <p className="mt-5 text-3xl font-bold text-purple-600">
              ₹{product.price}
            </p>

            <p className="mt-6 leading-7 text-gray-600">
              {product.description}
            </p>

            <p className="mt-4 text-sm text-gray-500">
              Stock: {product.stock}
            </p>

            <div className="mt-8 flex gap-4">
              <button className="rounded-lg bg-purple-600 px-6 py-3 font-medium text-white hover:bg-purple-700">
                Add to Cart
              </button>

              <button className="rounded-lg border border-gray-300 px-6 py-3 font-medium hover:border-purple-600 hover:text-purple-600">
                Add to Wishlist
              </button>
            </div>

            <section className="mt-10 border-t border-gray-200 pt-6">
              <h2 className="font-semibold">
                Seller Information
              </h2>

              <p className="mt-2 text-gray-600">
                {product.seller}
              </p>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}