import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductForm from "../../components/seller/ProductForm";
import api from "../../services/api";

function AddProduct({ admin = false }) {
  const navigate = useNavigate();
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    if (!admin) {
      return;
    }

    api.get("/admin/sellers")
      .then((response) => setSellers(response.data))
      .catch((error) => {
        setPageError(
          error.response?.data?.message ||
          "Failed to load sellers"
        );
      });
  }, [admin]);

  const handleSubmit = async (product) => {
    try {
      setLoading(true);
      setPageError("");
      await api.post("/products", product);
      navigate(
        admin
          ? "/admin/products"
          : "/seller/products"
      );
    } catch (error) {
      setPageError(
        error.response?.data?.message ||
        "Failed to add product"
      );
    } finally {
      setLoading(false);
    }
  };

  const returnPath = admin
    ? "/admin/products"
    : "/seller/products";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <section className="mx-auto max-w-3xl">
        <Link
          to={returnPath}
          className="text-sm font-medium text-purple-600"
        >
          Back to products
        </Link>

        <div className="mb-6 mt-4">
          <p className="text-sm font-medium text-purple-600">
            {admin ? "Admin catalog" : "Seller center"}
          </p>
          <h1 className="mt-1 text-3xl font-bold">
            Add product
          </h1>
          <p className="mt-2 text-slate-500">
            Add pricing, inventory, description and product images.
          </p>
        </div>

        {pageError ? (
          <p className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {pageError}
          </p>
        ) : null}

        {admin && !pageError && !sellers.length ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-amber-800">
            Create or onboard a seller before assigning a product.
          </div>
        ) : (
          <ProductForm
            onSubmit={handleSubmit}
            loading={loading}
            sellers={sellers}
            requireSeller={admin}
          />
        )}
      </section>
    </main>
  );
}

export default AddProduct;
