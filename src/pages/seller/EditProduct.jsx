//seller updates an existing product
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setForm(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/products/${id}`, {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      });

      alert("Product updated");
      navigate("/seller/products");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Update failed"
      );
    }
  };

  if (!form) {
    return <main className="p-10">Loading...</main>;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-3xl rounded-xl bg-white p-6">
        <h1 className="text-2xl font-bold">Edit Product</h1>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          {[
            ["name", "Product name"],
            ["category", "Category"],
            ["price", "Price"],
            ["stock", "Stock"],
            ["image", "Image URL"]
          ].map(([name, placeholder]) => (
            <input
              key={name}
              name={name}
              type={
                name === "price" || name === "stock"
                  ? "number"
                  : "text"
              }
              value={form[name] || ""}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full rounded-lg border px-4 py-3"
            />
          ))}

          <textarea
            name="description"
            value={form.description || ""}
            onChange={handleChange}
            className="min-h-32 w-full rounded-lg border px-4 py-3"
          />

          <button className="w-full rounded-lg bg-purple-600 px-5 py-3 text-white">
            Update Product
          </button>
        </form>
      </section>
    </main>
  );
}

export default EditProduct;