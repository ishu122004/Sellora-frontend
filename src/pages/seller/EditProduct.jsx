import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../components/seller/ProductForm";
import api from "../../services/api";

function EditProduct({ admin = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    api.get(`/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => {
        setPageError(
          error.response?.data?.message ||
          "Failed to load product"
        );
      });
  }, [id]);

  const handleSubmit = async (updates) => {
    try {
      setLoading(true);
      setPageError("");
      await api.put(`/products/${id}`, updates);
      navigate(
        admin
          ? "/admin/products"
          : "/seller/products"
      );
    } catch (error) {
      setPageError(
        error.response?.data?.message ||
        "Failed to update product"
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
            Edit product
          </h1>
          <p className="mt-2 text-slate-500">
            Update price, stock, description and images.
          </p>
        </div>

        {pageError ? (
          <p className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {pageError}
          </p>
        ) : null}

        {!product && !pageError ? (
          <p className="text-slate-500">Loading product...</p>
        ) : null}

        {product ? (
          <ProductForm
            key={product._id}
            product={product}
            onSubmit={handleSubmit}
            loading={loading}
          />
        ) : null}
      </section>
    </main>
  );
}

export default EditProduct;
