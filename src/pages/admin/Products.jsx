import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SafeImage from "../../components/common/SafeImage";
import formatPrice from "../../utils/formatPrice";
import api from "../../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/products")
      .then((response) => setProducts(response.data))
      .catch((requestError) => {
        setError(
          requestError.response?.data?.message ||
          "Failed to load products"
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product permanently?")) {
      return;
    }

    try {
      await api.delete(`/products/${id}`);
      setProducts((current) =>
        current.filter((product) => product._id !== id)
      );
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        "Failed to delete product"
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-8">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-purple-600">
              Admin catalog
            </p>
            <h1 className="mt-1 text-3xl font-bold">Products</h1>
            <p className="mt-2 text-slate-500">
              Manage every seller product from one catalog.
            </p>
          </div>

          <Link
            to="/admin/products/add"
            className="rounded-lg bg-purple-600 px-5 py-3 text-center font-medium text-white"
          >
            Add product
          </Link>
        </div>

        {error ? (
          <p className="mt-6 rounded-lg bg-red-50 p-4 text-red-600">
            {error}
          </p>
        ) : null}

        {loading ? (
          <p className="mt-8 text-slate-500">Loading products...</p>
        ) : (
          <div className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead className="border-b bg-slate-50 text-sm text-slate-500">
                  <tr>
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
                            className="h-12 w-12 rounded object-cover"
                            fallbackClassName="h-12 w-12 rounded"
                          />
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-xs text-slate-400">
                              {product.sellerId}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600">
                        {product.category}
                      </td>
                      <td className="p-4 font-medium">
                        {formatPrice(product.price)}
                      </td>
                      <td className="p-4">{product.stock}</td>
                      <td className="p-4">
                        <div className="flex gap-3">
                          <Link
                            to={`/admin/products/edit/${product._id}`}
                            className="font-medium text-purple-600"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => deleteProduct(product._id)}
                            className="font-medium text-red-600"
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

            {!products.length ? (
              <p className="p-8 text-center text-slate-500">
                No products in the catalog.
              </p>
            ) : null}
          </div>
        )}
      </section>
    </main>
  );
}

export default Products;
