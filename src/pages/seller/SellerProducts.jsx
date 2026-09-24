//seller products
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function SellerProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const sellerId = localStorage.getItem("sellerId");

        const res = await api.get(
          `/products/seller/${sellerId}`
        );

        setProducts(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);

      setProducts(
        products.filter((product) => product._id !== id)
      );
    } catch (error) {
      alert("Failed to delete product");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            My Products
          </h1>

          <Link
            to="/seller/products/add"
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            Add Product
          </Link>
        </div>

        <div className="mt-8 overflow-x-auto rounded-xl bg-white">
          <table className="w-full min-w-700 text-left">
            <thead className="border-b">
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
                    {product.name}
                  </td>

                  <td className="p-4">
                    {product.category}
                  </td>

                  <td className="p-4">
                    ₹{product.price}
                  </td>

                  <td className="p-4">
                    {product.stock}
                  </td>

                  <td className="flex gap-3 p-4">
                    <Link
                      to={`/seller/products/edit/${product._id}`}
                      className="text-purple-600"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        deleteProduct(product._id)
                      }
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!products.length && (
            <p className="p-8 text-center text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default SellerProducts;