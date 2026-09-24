//seller products
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";
import api from "../../services/api";

function SellerProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await api.get(
          `/products/seller/${auth.currentUser.uid}`
        );
        setProducts(res.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return <p className="p-8">Loading products...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 md:px-8">
      <section className="mx-auto max-w-7xl">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-purple-600">
              Seller
            </p>
            <h1 className="text-3xl font-bold text-gray-900">
              My Products
            </h1>
          </div>

          <Link
            to="/seller/products/add"
            className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-purple-600"
          >
            + Add Product
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed bg-white p-12 text-center">
            <h2 className="text-xl font-semibold">
              No products yet
            </h2>
            <p className="mt-2 text-gray-500">
              Add your first product.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <article
                key={product._id}
                className="overflow-hidden rounded-2xl border bg-white shadow-sm"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-52 w-full object-cover"
                />

                <div className="p-5">
                  <p className="text-xs text-purple-600">
                    {product.category}
                  </p>

                  <h2 className="mt-2 font-semibold">
                    {product.name}
                  </h2>

                  <p className="mt-2 text-xl font-bold">
                    ₹{product.price}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Stock: {product.stock}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

      </section>
    </main>
  );
}

export default SellerProducts;