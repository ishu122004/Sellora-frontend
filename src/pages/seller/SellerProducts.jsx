//seller products
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import api from "../../services/api";
import SafeImage from "../../components/common/SafeImage";
import formatPrice from "../../utils/formatPrice";

function SellerProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async (uid) => {
    try {
      const res = await api.get(`/products/seller/${uid}`);
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getProducts(user.uid);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);

      setProducts((current) =>
        current.filter((product) => product._id !== id)
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete product"
      );
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 md:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-semibold text-purple-600">
              Seller Center
            </span>

            <h1 className="mt-1 text-3xl font-bold text-black">
              My Products
            </h1>

            <p className="mt-2 text-gray-500">
              Add, edit and manage your store products.
            </p>
          </div>

          <Link
            to="/seller/products/add"
            className="rounded-xl bg-black px-5 py-3 text-center text-sm font-semibold text-white hover:bg-purple-600"
          >
            + Add Product
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Total Products</p>
            <p className="mt-2 text-2xl font-bold">{products.length}</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">In Stock</p>
            <p className="mt-2 text-2xl font-bold">
              {products.filter((item) => item.stock > 0).length}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Out of Stock</p>
            <p className="mt-2 text-2xl font-bold">
              {products.filter((item) => item.stock <= 0).length}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="mt-8 rounded-2xl bg-white p-10 text-center text-gray-500">
            Loading your products...
          </div>
        ) : products.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <h2 className="text-xl font-semibold">
              No products yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Add your first product to start selling.
            </p>

            <Link
              to="/seller/products/add"
              className="mt-5 inline-block rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-purple-600"
            >
              Add Product
            </Link>
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left">
                <thead className="border-b bg-gray-50">
                  <tr className="text-sm text-gray-500">
                    <th className="p-4">Product</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b last:border-0"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <SafeImage
                            src={product.images?.[0] || product.image}
                            alt={product.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />

                          <div>
                            <p className="font-semibold text-black">
                              {product.name}
                            </p>

                            <p className="text-xs text-gray-500">
                              ID: {product._id.slice(-6)}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 text-sm text-gray-600">
                        {product.category}
                      </td>

                      <td className="p-4 font-semibold">
                        {formatPrice(product.price)}
                      </td>

                      <td className="p-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            product.stock > 0
                              ? "bg-purple-100 text-purple-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {product.stock > 0
                            ? `${product.stock} available`
                            : "Out of stock"}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex gap-3">
                          <Link
                            to={`/seller/products/edit/${product._id}`}
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium hover:border-purple-500 hover:text-purple-600"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() =>
                              deleteProduct(product._id)
                            }
                            className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default SellerProducts;