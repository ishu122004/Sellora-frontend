//seller creates a new product
import { useState } from "react";
import api from "../../services/api";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
    seller: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/products", {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      });

      alert("Product added successfully");

      setForm({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
        image: "",
        seller: ""
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to add product"
      );
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <section className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Add Product</h1>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product name"
            required
            className="w-full rounded-lg border px-4 py-3"
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="w-full rounded-lg border px-4 py-3"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              required
              className="rounded-lg border px-4 py-3"
            />

            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              placeholder="Stock"
              required
              className="rounded-lg border px-4 py-3"
            />
          </div>

          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            required
            className="w-full rounded-lg border px-4 py-3"
          />

          <input
            name="seller"
            value={form.seller}
            onChange={handleChange}
            placeholder="Seller Firebase UID"
            required
            className="w-full rounded-lg border px-4 py-3"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Product description"
            required
            className="min-h-32 w-full rounded-lg border px-4 py-3"
          />

          <button className="w-full rounded-lg bg-black px-5 py-3 text-white hover:bg-purple-600">
            Add Product
          </button>
        </form>
      </section>
    </main>
  );
}

export default AddProduct;