//seller creates a new product
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";
import api from "../../services/api";

function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/products", {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        seller: auth.currentUser.uid
      });

      navigate("/seller/products");
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 md:px-8">
      <section className="mx-auto max-w-3xl">

        <div className="mb-8">
          <p className="text-sm font-medium text-purple-600">
            Seller
          </p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            Add Product
          </h1>
          <p className="mt-2 text-gray-500">
            Add a new product to your store.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8"
        >

          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label className="text-sm font-medium">Product Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Wireless Headphones"
                required
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-purple-500"
              >
                <option value="">Select category</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home">Home</option>
                <option value="Beauty">Beauty</option>
                <option value="Sports">Sports</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Price</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="1999"
                required
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Stock</label>
              <input
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                placeholder="20"
                required
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-purple-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium">Image URL</label>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
                required
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-purple-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your product..."
                rows="4"
                required
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-purple-500"
              />
            </div>

          </div>

          {error && (
            <p className="mt-4 text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            className="mt-6 rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-purple-600"
          >
            Add Product
          </button>

        </form>
      </section>
    </main>
  );
}

export default AddProduct;